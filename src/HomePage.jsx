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
import ReviewTile from "./Ordering/ReviewTile";
import ResponsiveAppBar from "./ResponsiveAppBarExp";

function HomePage() {
  return (
    <div>
      {/* <ResponsiveAppBar /> */}
      <NavBar />
      <HorizontalScrollingCarousel />
      <Box className="red-bar">
        <Container>
          <Typography variant="h3" gutterBottom textAlign={"center"}>
            About Us
          </Typography>
          <p textAlign={"center"}>
            Welcome to our dog-friendly restaurant in Singapore, where every
            dish reflects our love for dogs. Inspired by our furry friend
            Darcie, we craft wholesome meals tailored to their unique needs.
            Join us in celebrating the joy of canine companionship and good
            food, one wagging tail at a time. Welcome to our dog-loving
            community!
          </p>
        </Container>
      </Box>

      <Box sx={{ margin: 4 }}>
        <Container>
          <Grid container className="blackText">
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                margin: { xs: 2, md: 0 },
              }}
              textAlign={"center"}
            >
              <PetsRoundedIcon />
              <br />
              <h4>Treat Your Best Friend</h4>
              Your pup will savor every delicious bite of our gourmet dog food!
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              sx={{
                margin: { xs: 2, md: 0 },
              }}
              textAlign={"center"}
            >
              <SetMealRoundedIcon />
              <br />
              <h4>Allergy Friendly</h4>
              Don't like an ingredient? Want to switch an ingredient for
              another? We have your back.
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              textAlign={"center"}
              sx={{
                margin: { xs: 2, md: 0 },
              }}
            >
              <EggRoundedIcon />
              <br />
              <h4>All Natural</h4>
              Crafted with only the finest all-natural ingredients, ensuring
              your furry friend enjoys wholesome nutrition with every bite.
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        className="red-bar"
        sx={{ flexDirection: { xs: "column", md: "flex" } }}
      >
        <Container>
          <Typography variant="h3" gutterBottom textAlign={"center"}>
            Customer Reviews
          </Typography>
        </Container>

        <Container>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            // Adjust the spacing between grid items
          >
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                margin: { xs: 2, md: 0 },
              }}
            >
              <ReviewTile
                reviewer_name="Benjamin, 3.5 years old"
                review_text="mounch mounch mounch"
                reviewer_image_src={"/Benjamin.jpg"}
                borderRight={true}
                borderLeft={false}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                margin: { xs: 2, md: 0 },
              }}
            >
              <ReviewTile
                reviewer_name="Henry, 3 years old"
                review_text="WOOF WOOF WOOF GRR WOOF WOOF WOOF"
                reviewer_image_src={"/Henry.jpg"}
                borderRight={false}
                borderLeft={false}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                margin: { xs: 2, md: 0 },
              }}
            >
              <ReviewTile
                reviewer_name="Yuki, 3 months old"
                review_text="Bow Wow offers the most delightful foods I've ever sampled in my life!"
                reviewer_image_src={"/Yuki.jpg"}
                borderRight={false}
                borderLeft={true}
              />
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
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default HomePage;
