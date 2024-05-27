import { CircularProgress, Grid } from "@mui/material";
import MealTile from "./MealTile";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../NavBar";
import { useUser } from "../Context/UserContext";

function OrderPage() {
  //Make a get request to the backend for all the meals.
  const [loading, setLoading] = useState(true);
  const [mealData, setMealData] = useState([]);
  const [AllIngredients, setAllIngredients] = useState([]);
  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect, user } =
    useAuth0();

  const { userID } = useUser();

  //getting meal data doesn't need to be protected.
  //Only get meals that have a null user id.

  //Have to also get the meal's prices. have that info be given to the front end (calculated in the backend.)
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SOME_BACKEND_MEAL_URL}`)
      .then((response) => {
        const mealdata = response.data;

        setMealData(mealdata);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  var allmealtiles = mealData.map((meal, index) => (
    <Grid
      key={index}
      style={{ transform: `rotate(${Math.random() * 10 - 5}deg)` }}
    >
      <MealTile
        meal_id={meal.id}
        meal_name={meal.mealName}
        meal_description={meal.mealDescription}
        meal_img_path={meal.mealPhoto}
        meal_base_price={meal.basePrice}
        meal_price={meal.mealPrice}
        AllIngredients={AllIngredients}
      />
    </Grid>
  ));

  useEffect(() => {
    const getAllIngredients = async () => {
      //No longer need to be authenticated to get all ingredients. Will run again on refresh.
      axios
        .get(`${import.meta.env.VITE_SOME_BACKEND_INGREDIENTS_URL}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          setAllIngredients(response.data);
        })
        .catch((error) => {
          console.error("Error adding meal to cart:", error);
        });
    };
    getAllIngredients();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <NavBar />
      <Grid container spacing={0} justifyContent={"center"}>
        {allmealtiles}
      </Grid>
    </div>
  );
}

export default OrderPage;
