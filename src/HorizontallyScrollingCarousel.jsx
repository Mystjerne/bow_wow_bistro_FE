import { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import {
  Button,
  Paper,
  Grid,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
function HorizontallScrollingCarousel(props) {
  const items = [
    {
      name: "Random Name #1",
      url: "/beef-carousel-image.jpg",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      url: "dog-biscuit-carousel-image.jpg",
      description: "Hello World!",
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper>
      <div className="carousel-grid">
        <div className="carousel-item">
          <img
            className="carousel-image"
            src={props.item.url}
            alt={props.item.name}
          />
        </div>
        <div className="carousel-item">
          {/* <Typography variant="h5">{props.item.name}</Typography>
          <Typography variant="body1">{props.item.description}</Typography> */}
          <MuiLink
            component={Link}
            to="/order"
            color="#432818"
            justifyItems={"center"}
            underline="hover"
            sx={{
              marginRight: 2,
              padding: "8px 16px",
              borderRadius: "4px",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#f4e1d2",
                textDecoration: "none",
              },
              typography: "button",
              fontWeight: "bold",
            }}
          >
            Order
          </MuiLink>
        </div>
      </div>
    </Paper>
  );
}

export default HorizontallScrollingCarousel;
