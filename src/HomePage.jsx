import HorizontalScrollingCarousel from "./HorizontallyScrollingCarousel";

import {
  Typography,
  Container,
  Link as MuiLink,
  Box,
  Grid,
} from "@mui/material";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import SetMealRoundedIcon from "@mui/icons-material/SetMealRounded";
import EggRoundedIcon from "@mui/icons-material/EggRounded";

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
            Welcome to our dog-friendly restaurant in Singapore, where every
            dish reflects our love for dogs. Inspired by our furry friend
            Darcie, we craft wholesome meals tailored to their unique needs.
            Join us in celebrating the joy of canine companionship and good
            food, one wagging tail at a time. Welcome to our dog-loving
            community!
          </Typography>
        </Container>
      </Box>

      <Box margin={4}>
        <Container>
          <Grid container className="blackText">
            <Grid item xs={4} textAlign={"center"}>
              <PetsRoundedIcon />
            </Grid>
            <Grid item xs={4} textAlign={"center"}>
              <SetMealRoundedIcon />
            </Grid>
            <Grid item xs={4} textAlign={"center"}>
              <EggRoundedIcon />
            </Grid>
          </Grid>
          <Grid container className="blackText">
            <Grid item xs={4} textAlign={"center"}>
              Treat Your Best Friend
            </Grid>
            <Grid item xs={4} textAlign={"center"}>
              Allergy Friendly
            </Grid>
            <Grid item xs={4} textAlign={"center"}>
              All Natural
            </Grid>
          </Grid>

          <Grid container className="blackText">
            <Grid item xs={4} textAlign={"center"}>
              Your pup will savor every delicious bite of our gourmet dog food!
            </Grid>
            <Grid item xs={4} textAlign={"center"}>
              Don't like an ingredient? Want to switch an ingredient for
              another? We have your back.
            </Grid>
            <Grid item xs={4} textAlign={"center"}>
              Crafted with only the finest all-natural ingredients, ensuring
              your furry friend enjoys wholesome nutrition with every bite.
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box className="pink-bar">
        <Container>
          <Typography variant="h3" gutterBottom>
            Customer Reviews
          </Typography>
          <Container>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2} // Adjust the spacing between grid items
            >
              <Grid item xs={4}>
                <div style={{ textAlign: "center" }}>
                  <img
                    src="../public/Benjamin.jpg"
                    alt="Benjamin"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "200px",
                      maxHeight: "200px",
                      borderRadius: "200px",
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div style={{ textAlign: "center" }}>
                  <img
                    src="../public/Henry.jpg"
                    alt="Henry"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "200px",
                      maxHeight: "200px",
                      borderRadius: "200px",
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div style={{ textAlign: "center" }}>
                  <img
                    src="../public/Kyler.jpeg"
                    alt="Kyler"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "200px",
                      maxHeight: "200px",
                      borderRadius: "200px",
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </Container>

          <Grid container>
            <Grid item xs={4} textAlign={"center"}>
              "mounch mounch mounch"
            </Grid>
            <Grid item xs={4} textAlign={"center"}>
              "arf! huff, huff, arrf!!"
            </Grid>
            <Grid item xs={4} textAlign={"center"}>
              "A most delightful spread of treats, a pleasure for my delicate
              palate!"
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={4} textAlign={"center"}>
              Benjamin, 3.5 years old
            </Grid>
            <Grid item xs={4} textAlign={"center"}>
              Henry, 7.1 years old
            </Grid>
            <Grid item xs={4} textAlign={"center"}>
              Kyler, 4.8 years old
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box margin={4}>
        <Container>
          <Grid container className="blackText">
            <Grid item xs={12} textAlign={"center"}>
              <PetsRoundedIcon />
            </Grid>
            {/* <Grid item xs={6} textAlign={"center"}>
              <SetMealRoundedIcon />
            </Grid> */}
          </Grid>
          {/* <Grid container className="blackText">
            <Grid item xs={6} textAlign={"center"}>
              Treat Your Best Friend
            </Grid>
            <Grid item xs={6} textAlign={"center"}>
              Allergy Friendly
            </Grid>
          </Grid> */}
        </Container>
      </Box>
    </div>
  );
}

export default HomePage;
// useEffect(() => {
//   if (isAuthenticated && user) {
//     console.log("email - ", user.email);
//     console.log("image - ", user.picture);
//     console.log("user first name - ", user.given_name);
//     console.log("user data", user);
//   }
// }, [isAuthenticated, user]);

// const  fetchData = async () => {
//   try {
//     const accessToken = await getAccessTokenSilently({
//       authorizationParams: {
//         audience: `https://${domain}/api/v2/`,
//         scope: "read:current_user",
//       },
//     });
// }
