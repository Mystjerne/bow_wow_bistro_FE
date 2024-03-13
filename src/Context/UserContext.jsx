import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();

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

  useEffect(() => {
    //check if the user has an entry in the database. if they do, do nothing. if they don't, add an entry with their email..
    if (isAuthenticated && user) {
      axios
        .post(`${import.meta.env.VITE_SOME_BACKEND_USER_URL + "/check"}`, {
          email: user.email,
        })
        .then((response) => {
          if (response.data === "The user does not exist in the database.") {
            //send an axios request to add the user.
            console.log("The logged in user no existy :(");
            axios
              .post(`${import.meta.env.VITE_SOME_BACKEND_USER_URL}`, {
                email: user.email,
                admin: false,
              })
              .then((response) => {
                const newUser = response.data;
                setUserID(newUser.id);
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
  }, [isAuthenticated, user]);
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
