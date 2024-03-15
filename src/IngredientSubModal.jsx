import React from "react";
import { Typography, Container, Link } from "@mui/material";
import HomePage from "./HomePage";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  fontFamily: "Helvetica, Arial, sans-serif",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

//When the editMeal button is clicked, this appears.
//In the MealTile, get the meal's ingredients, then open the IngredientSubModal.

function IngredientSubModal({
  modaltitle,
  modaldescription,
  open,
  setOpen,
  meal_name,
  meal_id,
  meal_base_price,
}) {
  const { isAuthenticated, user, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getMealIngredients = async () => {
      console.log("getMealIngredients called");
      //After adding meal to the cart in the backend, somehow get the data over to the CartModal and have it display the meal name and price.

      if (!isAuthenticated) {
        loginWithRedirect();
      } else if (user && isAuthenticated) {
        //User is authenticated. need an access token for the protected axios request.
        const accessToken = await getAccessTokenSilently({
          audience: "https://project-4/api",
          scope:
            "read:current_user update:current_user_metadata openid profile email",
        });
        //need to post alongside the mealid of the specific meal.
        axios
          .get(
            `${import.meta.env.VITE_SOME_BACKEND_MEAL_URL + "/" + meal_id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            const meal_and_mealingredients = response.data;
            console.log(
              "i am meal and meal ingredients:",
              meal_and_mealingredients
            );
          })
          .catch((error) => {
            console.error("Error adding meal to cart:", error);
          });
      }
    };
  }, []);

  return (
    <div>
      {" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="cart-modal-title"
        aria-describedby="cart-modal-description"
      >
        <Box
          sx={{
            ...style,
            fontFamily: "'Arial', sans-serif",
          }}
        >
          <h2 id="cart-modal-title">{modaltitle}</h2>
          <p id="cart-modal-description">{modaldescription}</p>
          <p>Meal name: {meal_name}</p>
          <p>Meal id: {meal_id}</p>
          <p>Meal Base Price: {meal_base_price}</p>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default IngredientSubModal;
