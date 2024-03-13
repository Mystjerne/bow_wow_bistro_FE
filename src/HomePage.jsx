import React from "react";

import { Outlet, Link, useNavigate, Navigate } from "react-router-dom";
import HorizontalScrollingCarousel from "./HorizontallyScrollingCarousel";

import { Typography, Container, Link as MuiLink, Box } from "@mui/material";
import NavBar from "./NavBar";
import OrderPage from "./Ordering/OrderPage";

import { Button } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "./Context/UserContext";

/*
<AppBar position="static"></AppBar>
*/

function HomePage() {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("email - ", user.email);
      console.log("image - ", user.picture);
      console.log("user first name - ", user.given_name);
      console.log("user data", user);
    }
  }, [isAuthenticated, user]);

  //If the user is already logged in and clicks on this page, redirect them to the OrderPage.
  //Include a button which will redirect the user to the login page just in case they already have an account.

  return (
    <div>
      <NavBar />

      <HorizontalScrollingCarousel />

      <Box className="pink-bar">
        <Container>
          <Typography variant="h3" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </Container>
      </Box>

      <OrderPage />
    </div>
  );
}

export default HomePage;
