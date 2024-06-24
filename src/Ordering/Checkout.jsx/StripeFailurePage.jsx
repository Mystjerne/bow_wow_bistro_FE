import { Button } from "@mui/material";
import { useEffect } from "react";

import { Outlet } from "react-router-dom";

function StripeFailurePage() {
  return (
    <>
      <Outlet />
      <h1>You failed :/</h1>;
    </>
  );
}

export default StripeFailurePage;
