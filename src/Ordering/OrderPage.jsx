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

// import.meta.env.BACKEND_MEAL_URL;

/*
<AppBar position="static"></AppBar>
*/

function OrderPage() {
  //Make a get request to the backend for all the meals.

  const [mealData, setMealData] = useState([]);

  useEffect(() => {
    console.log(mealData);
  }, [mealData]);

  useEffect(() => {
    //get the specific job listing data.
    //also get all applications associated with that job listing.
    console.log(import.meta.env.VITE_SOME_BACKEND_MEAL_URL);
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
        meal_name={meal.mealName}
        meal_description={meal.mealDescription}
        meal_img_path={meal.mealPhoto}
      />
    </Grid>
  ));

  return (
    <div>
      <h1>
        <Grid container spacing={0}>
          {allmealtiles}
        </Grid>
        {/* This is the order page, where people can pick meals and put them in
        their carts.
        //Put orders in a grid. each order is a box that has three things in it: a photo, a button to add it to the cart, and an edit button. */}
      </h1>
    </div>
  );
}

export default OrderPage;
