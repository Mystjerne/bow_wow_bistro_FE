import * as React from "react";
import { useState, onClick } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";

import axios from "axios";
import { UserProvider, useUser } from "../Context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import IngredientSubModal from "./IngredientSubModal";

export default function MealTile({
  meal_id,
  meal_img_path,
  meal_name,
  meal_description,
  meal_base_price,
  meal_price,
  AllIngredients,
}) {
  const { userID } = useUser();
  const { isAuthenticated, user, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();
  const [openIngredientSubModal, setOpenIngredientSubModal] = useState(false);

  const addMealToUserCart = async () => {
    console.log("Add button clicked!");
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
        .post(
          `${
            import.meta.env.VITE_SOME_BACKEND_CART_URL +
            "/" +
            userID +
            "/current"
          }`,
          {
            mealId: meal_id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          const meal_added = response.data;
        })
        .catch((error) => {
          console.error("Error adding meal to cart:", error);
        });
    }
  };

  return (
    <>
      <Card className="card" sx={{ maxWidth: 345, padding: 2, margin: 3 }}>
        <CardMedia sx={{ height: 140 }} image={meal_img_path} title="Meal" />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign={"center"}
          >
            {meal_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {meal_description}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign={"center"}
          >
            $ {meal_price}
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small">
            <EditNoteRoundedIcon
              onClick={() => {
                setOpenIngredientSubModal(true);
              }}
            />
          </Button>

          <Button size="small" onClick={addMealToUserCart}>
            <AddCircleOutlineRoundedIcon />
          </Button>
        </CardActions>
      </Card>

      <IngredientSubModal
        modaltitle={"Ingredient Subtitution"}
        modaldescription={
          "Click on an ingredient you don't want, select an alternative ingredient, then click the Swap icon to switch them. When you're done, click the Add icon!"
        }
        open={openIngredientSubModal}
        setOpen={setOpenIngredientSubModal}
        //Only let the ingredientSubModal open if it was authenticated?
        meal_name={meal_name}
        meal_id={meal_id}
        meal_photo={meal_img_path}
        meal_base_price={meal_base_price}
        meal_description={meal_description}
        AllIngredients={AllIngredients}
      />
    </>
  );
}
