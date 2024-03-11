import React from "react";

import { Outlet, Link, useNavigate, Navigate } from "react-router-dom";
import HorizontalScrollingCarousel from "./HorizontallyScrollingCarousel";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link as MuiLink,
  Box,
  Icon,
} from "@mui/material";

/*
<AppBar position="static"></AppBar>
*/

function HomePage() {
  return (
    <div>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src="../main-logo-black-transparent.png" id="fixedSizeImage" />
        </Typography>

        <MuiLink color="inherit" sx={{ marginRight: 2 }}>
          {/* //Make this scroll down to the About Us section of the HomePage when
          clicked. */}
        </MuiLink>
        <MuiLink color="inherit" sx={{ marginRight: 2 }}>
          <Link to="/order">Order</Link>
        </MuiLink>
        <MuiLink color="inherit" sx={{ marginRight: 2 }}>
          <Link to="/login">Login</Link>
        </MuiLink>
        <MuiLink color="inherit">
          <Link to="/signup">Sign Up</Link>
        </MuiLink>
      </Toolbar>

      <HorizontalScrollingCarousel />

      <Box sx={{ bgcolor: "pink", p: 2 }}>
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
    </div>
  );
}

export default HomePage;
