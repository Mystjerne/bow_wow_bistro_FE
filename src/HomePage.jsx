import React from "react";

import { Outlet, Link, useNavigate, Navigate } from "react-router-dom";
import HorizontalScrollingCarousel from "./HorizontallyScrollingCarousel";
import MealTile from "./MealTile";

import { Typography, Container, Link as MuiLink, Box } from "@mui/material";
import NavBar from "./NavBar";
import OrderPage from "./OrderPage";

/*
<AppBar position="static"></AppBar>
*/

function HomePage() {
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
