import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  CircularProgress,
} from "@mui/material";
import NavBar from "../../NavBar";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../../Context/UserContext";

function Checkout() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { userID } = useUser();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserCartModalData = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: "https://project-4/api",
          scope:
            "read:current_user update:current_user_metadata openid profile email",
        });

        if (!(isAuthenticated && user) || userID === -1) {
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_SOME_BACKEND_CART_URL}/${userID}/current`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setCartData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUserCartModalData();
  }, [isAuthenticated, user, userID]);

  const calculateTotalPrice = () => {
    return cartData.reduce((total, meal) => total + meal.mealPrice, 0);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <NavBar />
      <Container maxWidth="sm">
        <Typography
          variant="h3"
          align="center"
          className="blackText"
          gutterBottom
        >
          Scan the QR code below using Paynow to make payment:
        </Typography>
        <Typography
          variant="h4"
          align="center"
          className="blackText"
          gutterBottom
        >
          Total Price: $ {calculateTotalPrice()}
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src="../public/paynow.png"
            alt="Paynow QR Code"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              maxHeight: "400px",
              color: "black",
            }}
          />
        </div>
      </Container>
    </div>
  );
}

export default Checkout;
