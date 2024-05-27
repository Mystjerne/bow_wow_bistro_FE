import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Grid, Link as MuiLink, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../../Context/UserContext";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRef } from "react";

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

function CartModal({
  modaltitle,
  modaldescription,
  open,
  setOpen,
  cartData,
  setCartData,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  //check if user has been authenticated when clicked. If not authenticated, prompt user to log in.
  const { isAuthenticated, user, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();
  const { userID } = useUser();
  var calTotalPrice = 0;

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckout = async () => {
    //mark completed as true in the backend.
    navigate("/stripe");
  };

  const handleDeleteItem = async (meal) => {
    const accessToken = await getAccessTokenSilently({
      audience: "https://project-4/api",
      scope:
        "read:current_user update:current_user_metadata openid profile email",
    });

    if (!(isAuthenticated && user) || userID === -1) {
      return;
    }

    try {
      var response = await axios.delete(
        `${import.meta.env.VITE_SOME_BACKEND_CART_URL}/${userID}/current`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            mealId: meal.id,
          },
        }
      );

      var updatedCartData = await response.data;
      console.log("response.data:", response.data);
      setCartData(updatedCartData);
    } catch (error) {
      console.log("axios request failed because of this :(");
    }
  };

  //cartData was gotten in the Navbar.
  //Do not calculate the total price in the front end and then try to charge using the value you calculated.
  const calculateTotalPrice = () => {
    calTotalPrice = 0;
    cartData.forEach((meal, index) => {
      // Add the price of the current meal to the total price
      calTotalPrice += meal.mealPrice;
    });
    return calTotalPrice;
  };

  useEffect(() => {
    console.log("cartdata has changed. it is now:", cartData);
  }, [cartData]);

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
            {/*map expects an array, so make sure cartData is an array.*/}
            {isAuthenticated && cartData ? (
              cartData.map((meal, index) => (
                <Grid container key={index}>
                  <Grid item xs={4} textAlign={"center"}>
                    {meal.mealName}
                  </Grid>
                  <Grid item xs={4} textAlign={"center"}>
                    $ {meal.mealPrice}
                  </Grid>
                  <Grid item xs={4} textAlign={"center"}>
                    <Button
                      onClick={() => {
                        handleDeleteItem(meal);
                      }}
                    >
                      <DeleteRoundedIcon />
                    </Button>
                  </Grid>
                </Grid>
              ))
            ) : (
              <p>Please log in before attempting to view cart.</p>
            )}

            <Grid container>
              <Grid item xs={12} textAlign={"center"}>
                Total Price: $ {calculateTotalPrice()}
              </Grid>
            </Grid>

            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleCheckout}>Checkout</Button>
          </Box>
        </Modal>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
}

export default CartModal;

/*
  const handleCheckout = async () => {
    //mark completed as true in the backend.
    if (!isAuthenticated) {
      loginWithRedirect();
    } else if (user && isAuthenticated) {
      //User is authenticated. need an access token for the protected axios request.
      const accessToken = await getAccessTokenSilently({
        audience: "https://project-4/api",
        scope:
          "read:current_user update:current_user_metadata openid profile email",
      });
      //NOTE 24/4 it doesn't seem safe to modify the backend's totalPrice value of the cart using calculations from the frontend.
      await axios
        .put(
          `${import.meta.env.VITE_SOME_BACKEND_CART_URL + "/" + userID}`,
          {
            completed: false,
            totalPrice: calTotalPrice,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          const cart_completed = response.data;
        })
        .catch((error) => {
          console.error("Error adding meal to cart:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    navigate("/checkout");
  };

*/
