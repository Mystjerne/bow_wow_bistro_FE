import { Button } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

function StripeFailurePage() {
  var itemsToPurchase = [
    {
      items: [
        { id: 1, quantity: 3 },
        { id: 2, quantity: 1 },
      ],
    },
  ];

  return (
    <>
      <Outlet />
      <h1>You failed :/</h1>;
    </>
  );
}

export default StripeFailurePage;
