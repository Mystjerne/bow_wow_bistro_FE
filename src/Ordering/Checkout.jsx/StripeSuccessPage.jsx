import { Button } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

function StripeSuccessPage() {
  return (
    <>
      <Outlet />
      <h1>You succeeded!</h1>;
    </>
  );
}

export default StripeSuccessPage;
