import React from "react";
/*
<AppBar position="static"></AppBar>
*/
import { Outlet, Link, useNavigate, Navigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link as MuiLink,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function NavBar() {
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

      <MuiLink
        component={Link}
        to="/login"
        // color="inherit"
        underline="hover"
        variant="button"
        sx={{ marginRight: 2 }}
      >
        Login
      </MuiLink>
      <MuiLink
        component={Link}
        to="/signup"
        // color="inherit"
        underline="hover"
        variant="button"
        sx={{ marginRight: 2 }}
      >
        Sign Up
      </MuiLink>

      <MuiLink
        component={Link}
        to="/signup"
        // color="inherit"
        underline="hover"
        variant="button"
        sx={{ marginRight: 2 }}
      >
        <ShoppingCartIcon />
      </MuiLink>
    </Toolbar>
  );
}

export default NavBar;
