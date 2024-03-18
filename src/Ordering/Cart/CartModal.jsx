import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Grid, Link as MuiLink } from "@mui/material";
import { Outlet, Link, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  fontFamily: "Helvetica, Arial, sans-serif",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  color: "black",
};

function CartModal({ modaltitle, modaldescription, open, setOpen, cartData }) {
  const navigate = useNavigate();
  //check if user has ebeen authenticated when clicked. If not authenticated, prompt user to log in.
  const { isAuthenticated, user } = useAuth0();
  var totalPrice = 0;

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const calculateTotalPrice = () => {
    cartData.forEach((meal, index) => {
      // Add the price of the current meal to the total price
      totalPrice += meal.mealPrice;
    });
  };

  calculateTotalPrice();
  return (
    <div>
      {isAuthenticated && user ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="cart-modal-title"
          aria-describedby="cart-modal-description"
        >
          <Box
            sx={{
              ...style,
              fontFamily: "'Arial', sans-serif",
            }}
          >
            <h2 id="cart-modal-title" style={{ textAlign: "center" }}>
              {modaltitle} <ShoppingCartIcon />
            </h2>
            <Grid container>
              <Grid item xs={6} textAlign={"center"}>
                Items
              </Grid>
              <Grid item xs={6} textAlign={"center"}>
                Price
              </Grid>
            </Grid>
            {/* <p id="cart-modal-description">{modaldescription}</p> */}
            {isAuthenticated ? (
              cartData.map((meal, index) => (
                <Grid container key={index}>
                  <Grid item xs={6} textAlign={"center"}>
                    {meal.mealName}
                  </Grid>
                  <Grid item xs={6} textAlign={"center"}>
                    $ {meal.mealPrice}
                  </Grid>
                </Grid>
              ))
            ) : (
              <p>Please log in before attempting to view cart.</p>
            )}

            <Grid container>
              <Grid item xs={12} textAlign={"center"}>
                Total Price: $ {totalPrice}
              </Grid>
            </Grid>

            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleCheckout}>Checkout</Button>
          </Box>
        </Modal>
      ) : (
        <p className="blackText">Please sign in to view your cart.</p>
      )}
    </div>
  );
}

export default CartModal;
