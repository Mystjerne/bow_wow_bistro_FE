import { ToggleButton, ToggleButtonGroup } from "@mui/material";

function SubIngredientMenu({
  selectedSubIngred,
  setSelectedSubIngred,
  allIngredients,
  currentCategory,
}) {
  console.log(allIngredients, currentCategory);
  var ingredient_buttons = allIngredients
    .filter((ingredient) => ingredient.category === currentCategory)
    .map((ingredient, index) => {
      return (
        <ToggleButton key={index} value={ingredient.ingredientName}>
          {ingredient.ingredientName} : $ {ingredient.additionalPrice}
        </ToggleButton>
      );
    });

  const handleSubIngredChange = (e) => {
    setSelectedSubIngred(e.target.value);
    console.log(e.target.value);
  };

  return (
    <ToggleButtonGroup
      exclusive
      onChange={handleSubIngredChange}
      value={selectedSubIngred}
      orientation="vertical"
    >
      {ingredient_buttons}
    </ToggleButtonGroup>
  );
}

export default SubIngredientMenu;

// const { isAuthenticated, user, loginWithRedirect, getAccessTokenSilently } =
//   useAuth0();

//Make an axios get request to get a list of all the ingredients which have meat.
// useEffect(() => {
//   const getMeatIngredients = async () => {
//     if (!isAuthenticated) {
//       loginWithRedirect();
//     } else if (user && isAuthenticated) {
//       //User is authenticated. need an access token for the protected axios request.
//       const accessToken = await getAccessTokenSilently({
//         audience: "https://project-4/api",
//         scope:
//           "read:current_user update:current_user_metadata openid profile email",
//       });
//       //need to post alongside the mealid of the specific meal.
//       axios
//         .get(
//           `${import.meta.env.VITE_SOME_BACKEND_INGREDIENTS_URL + "/meat"}`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         )
//         .then((response) => {
//           setMeatIngredients(response.data);
//         })
//         .catch((error) => {
//           console.error("Error adding meal to cart:", error);
//         });
//     }
//   };
//   getMeatIngredients();
// }, []);
