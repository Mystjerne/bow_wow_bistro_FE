import React from "react";
import { AppBar, Toolbar, Typography, Container, Link } from "@mui/material";
import { useState, useEffect } from "react";
import NavBar from "../../NavBar";
/*
<AppBar position="static"></AppBar>
*/

function Checkout() {
  return (
    <div>
      <NavBar />
      <h3 className="blackText" style={{ textAlign: "center" }}>
        Scan the QR code below using Paynow to make payment:
      </h3>
      <div style={{ textAlign: "center" }}>
        <img
          src="../public/paynow.png"
          alt="Kyler"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "400px",
            maxHeight: "400px",
          }}
        />
      </div>
    </div>
  );
}

export default Checkout;
