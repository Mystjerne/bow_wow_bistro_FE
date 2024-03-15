import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const [userFirstName, setUserFirstName] = useState(
    localStorage.getItem("userFirstName") || ""
  );

  const [userImage, setUserImage] = useState(
    localStorage.getItem("userImage") || ""
  );
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );

  //get userID from the backend, not from Auth0.
  const [userID, setUserID] = useState(-1);

  //Not sure why keeping stuff in localstorage is needed. Can't i just get all the user details from auth0's provider?
  //nvm i figured it out. im supposed to keep the accessToken in localstorage. the user details are okay to stay

  const handleUserLogout = () => {
    setUserFirstName("");
    setUserImage("");
    setUserEmail("");
    setUserID("");

    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userImage");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userID");
  };

  useEffect(() => {
    localStorage.setItem("userFirstName", userFirstName);
    localStorage.setItem("userImage", userImage);
    localStorage.setItem("userEmail", userEmail);
  }, [userFirstName, userImage, userEmail]);

  useEffect(
    () => {
      const initialising_user = async () => {
        if (isAuthenticated && user) {
          const accessToken = await getAccessTokenSilently({
            audience: "https://project-4/api",
            scope:
              "read:current_user update:current_user_metadata openid profile email",
          });
          axios
            .post(
              `${import.meta.env.VITE_SOME_BACKEND_USER_URL + "/check"}`,
              {
                email: user.email,
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            .then((response) => {
              if (
                response.data === "The user does not exist in the database."
              ) {
                //send an axios request to add the user.
                axios
                  .post(`${import.meta.env.VITE_SOME_BACKEND_USER_URL}`, {
                    email: user.email,
                    admin: false,
                  })
                  .then(async (response) => {
                    const newUser = response.data;
                    setUserID(newUser.id);

                    //get an accessToken so I can make a new cart

                    //Make a new cart for the new user.
                    axios
                      .post(
                        `${import.meta.env.VITE_SOME_BACKEND_CART_URL}`,
                        {
                          userId: newUser.id,
                          totalPrice: 0,
                          completed: false,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${accessToken}`,
                          },
                        }
                      )
                      .then((response) => {
                        const newCart = response.data;
                      });
                  });
              } else {
                //the user exists. get the user's id and store it in UserContext so we can use it for other stuff
                const user_data = response.data;
                console.log(user_data);
                setUserID(user_data.id);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };

      initialising_user();
    },
    //check if the user has an entry in the database. if they do, do nothing. if they don't, add an entry with their email..
    [isAuthenticated, user]
  );

  return (
    <UserContext.Provider
      value={{
        userFirstName,
        setUserFirstName,
        userImage,
        setUserImage,
        userEmail,
        setUserEmail,
        userID,
        setUserID,
        handleUserLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume the UserContext
export const useUser = () => useContext(UserContext);

//when user log in, use localstorage to store the users' main data. once's user log out, clear local storage, in case another user is using the same computer.
