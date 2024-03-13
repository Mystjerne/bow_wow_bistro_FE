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
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartModal from "./Ordering/Cart/CartModal";

function NavBar() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [openCartModal, setOpenCartModal] = useState(false);

  //if the user's email isnt in the database, add them as a user.
  //else, set the current user to the user that just logged in.

  console.log(user);

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
        onClick={() => {
          setOpenCartModal(true);
        }}
      >
        <ShoppingCartIcon />
      </MuiLink>

      {openCartModal && (
        <CartModal
          modaltitle={"Cart"}
          modaldescription={"Here are your items."}
          open={openCartModal}
          setOpen={setOpenCartModal}
        />
      )}
    </Toolbar>
  );
}

export default NavBar;
