import { useState, useEffect } from "react";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";

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
