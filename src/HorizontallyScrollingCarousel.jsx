import { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";

import { Button, Paper } from "@mui/material";

const images = [
  {
    thumbnail: {
      uri: "../public/Darcie.jpg",
      name: "Darcie (Inedible)",
    },
  },
  {
    thumbnail: {
      uri: "https://images.pexels.com/photos/1618914/pexels-photo-1618914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Big Beefy Bowl",
    },
  },
  {
    thumbnail: {
      uri: "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Turkey Treat",
    },
  },
  {
    thumbnail: {
      uri: "https://images.pexels.com/photos/19034918/pexels-photo-19034918/free-photo-of-fried-fish-and-chips-sprinkled-with-parsley.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Cod Crunch",
    },
  },
  {
    thumbnail: {
      uri: "https://images.pexels.com/photos/8753745/pexels-photo-8753745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Pork Potato Platter",
    },
  },
  {
    thumbnail: {
      uri: "https://images.pexels.com/photos/10309477/pexels-photo-10309477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Chicken Casserole",
    },
  },
  {
    thumbnail: {
      uri: "https://images.pexels.com/photos/17019386/pexels-photo-17019386/free-photo-of-soup-in-bowl.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Lamb and Lentil Stew",
    },
  },
  {
    thumbnail: {
      uri: "https://images.pexels.com/photos/5837092/pexels-photo-5837092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Cheesy Chicken Chompers",
    },
  },
  {
    thumbnail: {
      uri: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      name: "Lemon Lickers",
    },
  },
  {
    thumbnail: {
      uri: "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      name: "Salicious Salmon Chunk",
    },
  },
  {
    thumbnail: {
      uri: "https://images.pexels.com/photos/7218638/pexels-photo-7218638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      name: "Pumpkin Pot Stew",
    },
  },
  {
    thumbnail: { uri: "../public/stock_dog_food.jpg", name: "Bark & Biscuits" },
  },
];

function HorizontallScrollingCarousel(props) {
  var items = [
    {
      name: "Random Name #1",
      url: "../public/stock_dog_food.jpg",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      url: "https://images.pexels.com/photos/8753745/pexels-photo-8753745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
      <h2>{props.item.name}</h2>
      <img className="carousel-image" src={`${props.item.url}`}></img>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}

export default HorizontallScrollingCarousel;
