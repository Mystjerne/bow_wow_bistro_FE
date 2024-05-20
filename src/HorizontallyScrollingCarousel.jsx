import { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";

import { Button, Paper } from "@mui/material";

function HorizontallScrollingCarousel(props) {
  var items = [
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
      {/* <h2>{props.item.name}</h2> */}
      <img className="carousel-image" src={`${props.item.url}`}></img>
      {/* <p>{props.item.description}</p> */}

      <Button className="CheckButton">Order</Button>
    </Paper>
  );
}

export default HorizontallScrollingCarousel;
