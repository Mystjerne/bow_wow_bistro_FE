import React from "react";
import { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

const images = [
  {
    thumbnail: {
      uri: "../public/dalmation_fruit.jpg",
      name: "dog_food",
    },
  },
  {
    thumbnail: {
      uri: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
      name: "dog_food",
    },
  },
  { thumbnail: { uri: "../public/stock_dog_food.jpg", name: "dog_food" } },
  { thumbnail: { uri: "../public/stock_dog_food.jpg", name: "dog_food" } },
  { thumbnail: { uri: "../public/stock_dog_food.jpg", name: "dog_food" } },
  { thumbnail: { uri: "../public/stock_dog_food.jpg", name: "dog_food" } },
  { thumbnail: { uri: "../public/stock_dog_food.jpg", name: "dog_food" } },
  { thumbnail: { uri: "../public/stock_dog_food.jpg", name: "dog_food" } },
  { thumbnail: { uri: "../public/stock_dog_food.jpg", name: "dog_food" } },
  { thumbnail: { uri: "../public/stock_dog_food.jpg", name: "dog_food" } },
  { thumbnail: { uri: "../public/stock_dog_food.jpg", name: "dog_food" } },
  { thumbnail: { uri: "../public/stock_dog_food.jpg", name: "dog_food" } },
  { thumbnail: { uri: "../public/stock_dog_food.jpg", name: "dog_food" } },
];

const HorizontalScrollingCarousel = () => {
  // Logic for tracking the current index of the displayed image
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to advance to the next image
  const goToNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Automatically advance to the next image every few seconds
  useEffect(() => {
    const intervalId = setInterval(goToNextImage, 3000); // Change 3000 to desired interval in milliseconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ImageList
      sx={{
        gridAutoFlow: "column",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr)) !important",
        gridAutoColumns: "minmax(160px, 1fr)",
      }}
    >
      {images.map((image, index) => (
        <ImageListItem key={index}>
          <img src={image.thumbnail.uri} />
          <ImageListItemBar title={image.thumbnail.name} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default HorizontalScrollingCarousel;
