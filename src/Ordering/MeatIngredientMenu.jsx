import React from "react";
import {
  Typography,
  Container,
  Link,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import axios from "axios";

function MeatIngredientMenu({
  selectedSubIngred,
  setSelectedSubIngred,
  meatIngredients,
  setMeatIngredients,
}) {
  const { isAuthenticated, user, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();

  //Make an axios get request to get a list of all the ingredients which have meat.
  useEffect(() => {
    const getMeatIngredients = async () => {
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
            `${import.meta.env.VITE_SOME_BACKEND_INGREDIENTS_URL + "/meat"}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            setMeatIngredients(response.data);
          })
          .catch((error) => {
            console.error("Error adding meal to cart:", error);
          });
      }
    };
    getMeatIngredients();
  }, []);

  var ingredient_buttons = meatIngredients.map((ingredient, index) => {
    return (
      // <Grid item xs={12} key={index}>
      <ToggleButton key={index} value={ingredient.ingredientName}>
        {ingredient.ingredientName}
      </ToggleButton>
      // </Grid>
    );
  });

  const handleSubIngredChange = (e) => {
    setSelectedSubIngred(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <ToggleButtonGroup
          exclusive
          onChange={handleSubIngredChange}
          value={selectedSubIngred}
          orientation="vertical"
        >
          {ingredient_buttons}
        </ToggleButtonGroup>
      </Grid>
    </div>
  );
}

export default MeatIngredientMenu;
