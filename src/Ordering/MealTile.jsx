import * as React from "react";
import { useState, onClick } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";

export default function MealTile({
  meal_img_path,
  meal_name,
  meal_description,
}) {
  const addMealToUserCart = () => {
    console.log("Add button clicked!");
  };

  return (
    <Card className="card" sx={{ maxWidth: 345, padding: 2, margin: 3 }}>
      <CardMedia sx={{ height: 140 }} image={meal_img_path} title="Meal" />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign={"center"}
        >
          {meal_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {meal_description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">
          <EditNoteRoundedIcon />
        </Button>

        <Button size="small" onClick={addMealToUserCart}>
          <AddCircleOutlineRoundedIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
