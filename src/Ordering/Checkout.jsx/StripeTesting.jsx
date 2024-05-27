import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../../Context/UserContext";
import { CircularProgress } from "@mui/material";

function StripeTesting() {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const { userID } = useUser();
  const [cartdata, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const transformMealsToItems = (cartmeals) => {
    return [
      {
        items: cartmeals.map((cartmeal) => ({
          id: cartmeal.id,
          quantity: 1, // Assuming default quantity of 1 for each meal
        })),
      },
    ];
  };

  //need to get the cart data and then format it in the order of itemsToPurchase.
  useEffect(() => {
    var stripeurl = "";
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

        //get cart data
        const response = await axios.get(
          `${import.meta.env.VITE_SOME_BACKEND_CART_URL}/${userID}/current`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setCartData(response.data);
        let itemsToPurchase = transformMealsToItems(response.data);

        //make an axios request to start the stripe checkout process
        axios
          .post(`${import.meta.env.VITE_SOME_BACKEND_STRIPE_URL}`, {
            itemsToPurchase,
          })
          .then((response) => {
            stripeurl = response.data;
            window.location = stripeurl.url;
          })
          .catch((error) => {
            console.error(
              "Error sending a request to the backend about stripe."
            );
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserCartModalData();
  }, [isAuthenticated, user, userID]);

  if (loading) {
    return (
      <>
        <h1>Redirecting...</h1>
        <br />
        <CircularProgress />
      </>
    );
  }

  return (
    <>
      <h1>Redirecting...</h1>
    </>
  );
}

export default StripeTesting;

//format for itemsToPurchase, for future reference
// var itemsToPurchase = [
//   {
//     items: [
//       { id: 1, quantity: 1 },
//       { id: 2, quantity: 1 },
//     ],
//   },
// ];
