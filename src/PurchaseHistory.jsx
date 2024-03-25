import React, { useState, useEffect, Fragment } from "react";
import {
  Typography,
  Container,
  CircularProgress,
  Box,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import NavBar from "./NavBar";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "./Context/UserContext";

function PurchaseHistory() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { userID } = useUser();
  const [prevCartData, setPrevCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserAllCartData = async () => {
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
          `${import.meta.env.VITE_SOME_BACKEND_CART_URL}/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setPrevCartData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUserAllCartData();
  }, [isAuthenticated, user, userID]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const CustomOutlinedCard = ({ cart }) => {
    return (
      <Box sx={{ minWidth: 275, marginBottom: 2 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              Cart Id: {cart.id}
            </Typography>
            <Typography variant="body2">
              Total Price: {cart.totalPrice}
            </Typography>
            <Typography variant="body2">
              Completed at: {cart.updatedAt}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  };

  const cartCards = prevCartData.map((cart, index) => (
    <CustomOutlinedCard key={index} cart={cart} />
  ));

  return (
    <div>
      <NavBar />
      <Typography variant="h5" textAlign={"center"} className="blackText">
        Purchase History
      </Typography>
      <Container maxWidth="sm">{cartCards}</Container>
    </div>
  );
}

export default PurchaseHistory;
