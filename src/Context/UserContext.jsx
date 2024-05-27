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
  //get userID from the localstorage if it exists.
  const [userID, setUserID] = useState(
    parseInt(localStorage.getItem("userID")) || -1
  );

  //im supposed to keep the accessToken in localstorage. the user details are okay to stay
  const handleUserLogout = () => {
    setUserFirstName("");
    setUserImage("");
    setUserEmail("");
    setUserID(-1);

    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userImage");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userID");
  };

  useEffect(() => {
    localStorage.setItem("userFirstName", userFirstName);
    localStorage.setItem("userImage", userImage);
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("userID", userID);
  }, [userFirstName, userImage, userEmail, userID]);

  useEffect(
    () => {
      const accessToken = localStorage.getItem("accessToken");

      const initialising_user = async () => {
        if (isAuthenticated && user) {
          //the user is authenticated. we now need an accessToken. getAccessTokenSilently has been configured to get it from localstorage.

          const accessToken = await getAccessTokenSilently({
            audience: "https://project-4/api",
            scope:
              "read:current_user update:current_user_metadata openid profile email",
          });

          localStorage.setItem("accessToken", accessToken);

          //check to see if the user (that exists) is actually in the database.
          const response = await axios.post(
            `${import.meta.env.VITE_SOME_BACKEND_USER_URL + "/check"}`,
            {
              email: user.email,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          //the user does not exist in the database, which means it does not have a cart yet.
          //add the user into the database, and give it a cart.
          if (response.data === "The user does not exist in the database.") {
            const newUserReqResponse = await axios.post(
              `${import.meta.env.VITE_SOME_BACKEND_USER_URL}`,
              {
                email: user.email,
                admin: false,
              }
            );

            const newUser = newUserReqResponse.data;

            const createCartReq = await axios.post(
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
            );

            //the user exists in the database. get the user's id and store it in UserContext so we can use it for other stuff
          } else {
            const user_data = response.data;
            console.log(user_data);
            setUserID(user_data.id);
          }
        } else {
          //The user is not authenticated, is not a user or does not have an accesstoken.
          console.log(
            "The user is not authenticated, is not a user or does not have an accesstoken."
          );
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
