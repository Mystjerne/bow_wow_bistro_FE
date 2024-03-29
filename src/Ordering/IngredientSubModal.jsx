import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";

import axios from "axios";
import SubIngredientMenu from "./SubIngredientMenu";
import AddCircleOutlineRounded from "@mui/icons-material/AddCircleOutlineRounded";
import { useUser } from "../Context/UserContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  fontFamily: "Helvetica, Arial, sans-serif",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  color: "black",
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
  meal_photo,
  meal_description,
  AllIngredients,
}) {
  const { isAuthenticated, user, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();

  const handleClose = () => {
    setOpen(false);
  };

  const { userID } = useUser();
  const [mealingredients, setMealIngredients] = useState([]);
  const [selectedCurrentIngred, setSelectedCurrIngred] = useState("");
  const [selectedSubIngred, setSelectedSubIngred] = useState("");
  const [ingredCategory, setIngredCategory] = useState("");

  const handleAddClicked = async () => {
    //Make a post request to the meal, adding the meal to the meals list.
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
          `${import.meta.env.VITE_SOME_BACKEND_MEAL_URL}`,
          {
            userId: userID,
            mealName: "Modified " + meal_name,
            mealPhoto: meal_photo,
            mealDescription:
              "This meal has been modified by a user. " + meal_description,
            basePrice: meal_base_price,
            availability: true,
            //ingredients is a list of ingredient ids
            ingredients: mealingredients.map((element) => element.id),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(
            "i am response.data in ingredientSubModal",
            response.data
          );

          //should be a newMeal.
          var newMeal = response.data;
          //if I want to show that the user has made a successful request, put the returned new meal here.

          //Add the newly created meal to cart. Or make it so that addMeal adds the newly made meal to cart automatically.

          const addMealToUserCart = async () => {
            axios
              .post(
                `${
                  import.meta.env.VITE_SOME_BACKEND_CART_URL +
                  "/" +
                  userID +
                  "/current"
                }`,
                {
                  mealId: newMeal.id,
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
          };

          addMealToUserCart();
        })
        .catch((error) => {
          console.error("Error adding meal to cart:", error);
        });
    }
  };

  useEffect(() => {
    if (!open) {
      return;
    }
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
            console.log("i am response.data", response.data);
            setMealIngredients(response.data.ingredients);
          })
          .catch((error) => {
            console.error("Error adding meal to cart:", error);
          });
      }
    };

    getMealIngredients();
  }, [open]);

  //I realise now that I can actually get the pks of the ingredients from the mealingredients useState and don't actually really need getOneMealByPk in the backend
  //sigh

  //When the user clicks the swap button ->
  //need to get the PKS of the ingredient that's being subbed and the ingredient that's getting removed.
  //send those over via axios put request

  //made it so that I only need to send the names instead.

  const handleSwapIngredients = () => {
    var ingredient_to_be_removed = mealingredients.find(
      (element) => element.ingredientName === selectedCurrentIngred
    );

    var index_of_ingred_to_be_removed = mealingredients.indexOf(
      ingredient_to_be_removed
    );

    var ingredient_to_be_added = AllIngredients.find(
      (element) => element.ingredientName === selectedSubIngred
    );
    console.log(index_of_ingred_to_be_removed, 1, ingredient_to_be_added);
    //toSpliced returns a new array with the elements removed/replaced.

    //Bug: when the swap button is spammed, the index_of_ingred_to_be_removed becomes negative and starts taking out ingredients from the BACK of the array instead.

    //fix: index_of_ingred_to_be_removed is negative, don't run the function?

    if (index_of_ingred_to_be_removed < 0) {
      console.log("Ingredient you are trying to remove does not exist.");
      return;
    }

    var newMealIngredients = mealingredients.toSpliced(
      index_of_ingred_to_be_removed,
      1,
      ingredient_to_be_added
    );

    setMealIngredients(newMealIngredients);
  };

  var current_ingred_buttons = mealingredients.map((ingredient, index) => {
    return (
      <ToggleButton
        key={index}
        value={ingredient.ingredientName}
        category={ingredient.category}
      >
        {ingredient.ingredientName} : $ {ingredient.additionalPrice}
      </ToggleButton>
    );
  });

  const handleCurrentIngredChange = (e) => {
    setSelectedCurrIngred(e.target.value);

    var ingredient_to_be_removed = mealingredients.find(
      (element) => element.ingredientName === e.target.value
    );

    setIngredCategory(ingredient_to_be_removed.category);
  };

  useEffect(() => {
    console.log("currentingred: ", selectedCurrentIngred);
    console.log("selectedSubIngred: ", selectedSubIngred);
  }, [selectedCurrentIngred, selectedSubIngred]);

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
          <Grid container>
            {/*first row*/}
            <Grid item xs={5} textAlign={"center"}>
              Current Ingredients
            </Grid>

            <Grid item xs={2} textAlign={"center"}>
              <Button>
                <SwapHorizOutlinedIcon onClick={handleSwapIngredients} />
              </Button>
            </Grid>

            <Grid item xs={5} textAlign={"center"}>
              Other Ingredients
            </Grid>
            {/*2nd row*/}

            <Grid xs={5} textAlign={"center"}>
              <ToggleButtonGroup
                exclusive
                value={selectedCurrentIngred}
                onChange={handleCurrentIngredChange}
                orientation="vertical"
              >
                {current_ingred_buttons}
              </ToggleButtonGroup>
            </Grid>

            <Grid item xs={2} textAlign={"center"}>
              <Button>
                <AddCircleOutlineRounded onClick={handleAddClicked} />
              </Button>
            </Grid>

            <Grid item xs={5} textAlign={"center"}>
              <SubIngredientMenu
                selectedSubIngred={selectedSubIngred}
                setSelectedSubIngred={setSelectedSubIngred}
                allIngredients={AllIngredients}
                currentCategory={ingredCategory}
              />
            </Grid>
          </Grid>

          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default IngredientSubModal;
/*
<p>Meal id: {meal_id}</p>
            <p>Meal name: {meal_name}</p>
            <p>Meal Base Price: {meal_base_price}</p>*/

// Previous Swap Ingredients function body

// make axios request to updateMealIngredients?
// const swapMealIngredients = async () => {
//   console.log("swapMealIngredients called");

//   if (!isAuthenticated) {
//     loginWithRedirect();
//   } else if (user && isAuthenticated) {
//     //User is authenticated. need an access token for the protected axios request.
//     const accessToken = await getAccessTokenSilently({
//       audience: "https://project-4/api",
//       scope:
//         "read:current_user update:current_user_metadata openid profile email",
//     });
//     //need to post alongside the mealid of the specific meal.

//     //The meal id in this params needs to be of the newly created meal entry that's unique to the user, not the actual original meal id

//     axios
//       .put(
//         `${
//           import.meta.env.VITE_SOME_BACKEND_MEAL_URL +
//           "/" +
//           meal_id +
//           "sub-meal-ingredient"
//         }`,
//         {
//           old_ingredient: selectedCurrentIngred,
//           new_ingredient: selectedSubIngred,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log("i am response.data", response.data);
//         //should the updateMealIngredient backend function return a list of the current meal's ingredients after the swap?
//       })
//       .catch((error) => {
//         console.error("Error adding meal to cart:", error);
//       });
//   }
// };

// swapMealIngredients();
