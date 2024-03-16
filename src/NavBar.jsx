import React, { useEffect, useState } from "react";
/*
<AppBar position="static"></AppBar>
*/
import { Outlet, Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link as MuiLink,
  Box,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartModal from "./Ordering/Cart/CartModal";
import { useUser } from "./Context/UserContext";

function NavBar() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();
  const [openCartModal, setOpenCartModal] = useState(false);
  //if the user's email isnt in the database, add them as a user.
  //else, set the current user to the user that just logged in.

  //only try to access the userID if the user was authenticated first.
  //or it will freak the fuck out
  const { userID } = useUser();
  const [mealData, setMealData] = useState([]);

  const getUserCartModalData = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: "https://project-4/api",
      scope:
        "read:current_user update:current_user_metadata openid profile email",
    });

    var user_cart_data = [];
    axios
      .get(
        `${
          import.meta.env.VITE_SOME_BACKEND_CART_URL + "/" + userID + "/current"
        }`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        user_cart_data = response.data;
        console.log("usercartdata", user_cart_data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCartIconClick = async () => {
    await getUserCartModalData();
    setOpenCartModal(true);
  };

  return (
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <img src="/main-logo-black-transparent.png" id="fixedSizeImage" />
      </Typography>
      <MuiLink color="inherit" sx={{ marginRight: 2 }}>
        {/* //Make this scroll down to the About Us section of the HomePage when
          clicked. */}
      </MuiLink>
      <MuiLink
        component={Link}
        to="/order"
        // color="inherit"
        underline="hover"
        sx={{ marginRight: 2 }}
        variant="button"
      >
        Order
      </MuiLink>

      {isAuthenticated ? (
        <MuiLink
          // color="inherit"
          underline="hover"
          variant="button"
          sx={{ marginRight: 2 }}
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Logout
        </MuiLink>
      ) : (
        <MuiLink
          // color="inherit"
          underline="hover"
          variant="button"
          sx={{ marginRight: 2 }}
          onClick={() => loginWithRedirect()}
        >
          SignUp/Login
        </MuiLink>
      )}

      <MuiLink
        // color="inherit"
        underline="hover"
        variant="button"
        sx={{ marginRight: 2 }}
        onClick={handleCartIconClick}
      >
        <ShoppingCartIcon />
      </MuiLink>

      <CartModal
        modaltitle={"Cart"}
        modaldescription={"Here are your items."}
        open={openCartModal}
        setOpen={setOpenCartModal}
      />
    </Toolbar>
  );
}

export default NavBar;

/*
    //once i get the cart modal data, I should put them into <p>tags and then stick them inside the cartmodal using map.
    var allusercartmeals = user_cart_data.map((cartmeal, index) => (
      //every single row of user_cart_data comes with a mealId. use the meal id to get the relevant data.
      axios
      .get(`${import.meta.env.VITE_SOME_BACKEND_MEAL_URL} +"/"+  ${cartmeal.mealId}`)
      .then((response) => {
        const singlemealdata = response.data;

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })

      <Box
        key={index}
        meal_name={singlemealdata.mealName}
        meal_img_path={singlemealdata.mealPhoto}
      />
    ));
  };
*/
