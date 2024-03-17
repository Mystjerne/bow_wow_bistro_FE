import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  Grid,
} from "@mui/material";
import MealTile from "./MealTile";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function OrderPage() {
  //Make a get request to the backend for all the meals.

  const [mealData, setMealData] = useState([]);
  const [AllIngredients, setAllIngredients] = useState([]);
  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect, user } =
    useAuth0();

  //getting meal data doesn't need to be protected.
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SOME_BACKEND_MEAL_URL}`)
      .then((response) => {
        const mealdata = response.data;

        console.log(response.data);
        setMealData(mealdata);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  var allmealtiles = mealData.map((meal, index) => (
    <Grid key={index}>
      <MealTile
        meal_id={meal.id}
        meal_name={meal.mealName}
        meal_description={meal.mealDescription}
        meal_img_path={meal.mealPhoto}
        meal_base_price={meal.basePrice}
        AllIngredients={AllIngredients}
      />
    </Grid>
  ));

  useEffect(() => {
    const getAllIngredients = async () => {
      console.log("i am get all ingredients and i am being called.");
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
          .get(`${import.meta.env.VITE_SOME_BACKEND_INGREDIENTS_URL}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            console.log("i am response.data", response.data);
            setAllIngredients(response.data);
          })
          .catch((error) => {
            console.error("Error adding meal to cart:", error);
          });
      }
    };
    getAllIngredients();
  }, [isAuthenticated, user]);

  return (
    <div>
      <h1>
        {isAuthenticated ? (
          <Grid container spacing={0}>
            {allmealtiles}
          </Grid>
        ) : null}
      </h1>
    </div>
  );
}

export default OrderPage;
