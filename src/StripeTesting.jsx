import { Button } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";

function StripeTesting() {
  var itemsToPurchase = [
    {
      items: [
        { id: 1, quantity: 3 },
        { id: 2, quantity: 1 },
      ],
    },
  ];

  const handleClickCheckout = () => {
    axios
      .post(`${import.meta.env.VITE_SOME_BACKEND_STRIPE_URL}`, {
        itemsToPurchase,
      })
      .then((response) => {
        var stripedata = response.data;
        console.log(stripedata);
      })
      .catch((error) => {
        console.error("Error sending a request to the backend about stripe.");
      });
  };

  return (
    <>
      <Outlet />
      <Button onClick={handleClickCheckout}>Checkout</Button>
    </>
  );
}

export default StripeTesting;
