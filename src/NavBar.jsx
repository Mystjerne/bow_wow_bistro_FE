import { useEffect, useState } from "react";
/*
<AppBar position="static"></AppBar>
*/
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import { Toolbar, Typography, Link as MuiLink, Box } from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartModal from "./Ordering/Cart/CartModal";
import { useUser } from "./Context/UserContext";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function NavBar() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();
  const [openCartModal, setOpenCartModal] = useState(false);
  //if the user's email isnt in the database, add them as a user.
  //else, set the current user to the user that just logged in.

  //only try to access the userID if the user was authenticated first.
  //or it will freak out
  const { userID } = useUser();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    getUserCartModalData();
  }, [isAuthenticated, user]);

  const getUserCartModalData = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: "https://project-4/api",
      scope:
        "read:current_user update:current_user_metadata openid profile email",
    });

    if (!(isAuthenticated && user) || userID === -1) {
      return;
    }
    var user_cart_data = [];

    console.log("I am being triggered before the cartdata is being gotten.");
    axios
      .get(
        `${
          import.meta.env.VITE_SOME_BACKEND_CART_URL + "/" + userID + "/current"
        }`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        user_cart_data = response.data;
        console.log("usercartdata", user_cart_data);
        setCartData(user_cart_data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCartIconClick = async () => {
    //get the cart data so I can put it in the CartModal
    await getUserCartModalData();
    setOpenCartModal(true);
  };
  //id="fixedSizeImage"
  //sx={{ display: { xs: "flex", md: "none" }

  return (
    <Toolbar>
      <Box sx={{ flexGrow: 1 }}>
        <Grid2 container alignItems="center">
          <Grid2 item>
            <Link to="/">
              <img
                style={{ height: 50, width: 50 }}
                src="/bowwowicon.png"
                alt="Bow Wow Bistro logo"
              />
            </Link>
          </Grid2>

          <Grid2 item sx={{ display: { xs: "none", md: "flex" } }}>
            <Typography
              sx={{
                marginLeft: 2,
                fontFamily: "monospace",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Bow Wow Bistro
            </Typography>
          </Grid2>
        </Grid2>
      </Box>

      <MuiLink
        component={Link}
        to="/order"
        color="#432818"
        underline="hover"
        sx={{
          marginRight: 2,
          padding: "8px 16px",
          borderRadius: "4px",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "#f4e1d2",
            textDecoration: "none",
          },
          typography: "button",
          fontWeight: "bold",
        }}
      >
        Order
      </MuiLink>

      {isAuthenticated ? (
        <MuiLink
          color="#432818"
          underline="hover"
          sx={{
            marginRight: 2,
            padding: "8px 16px",
            borderRadius: "4px",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#f4e1d2",
              textDecoration: "none",
            },
            typography: "button",
            fontWeight: "bold",
          }}
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Logout
        </MuiLink>
      ) : (
        <MuiLink
          // component={Link}
          // to="/order"
          color="#432818"
          underline="hover"
          sx={{
            marginRight: 2,
            padding: "8px 16px",
            borderRadius: "4px",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#f4e1d2",
              textDecoration: "none",
            },
            typography: "button",
            fontWeight: "bold",
          }}
          onClick={() => loginWithRedirect()}
        >
          Login
        </MuiLink>
      )}

      {/* <MuiLink
        component={Link}
        to="/history"
        color="#432818"
        underline="hover"
        sx={{
          marginRight: 2,
          padding: "8px 16px",
          borderRadius: "4px",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "#f4e1d2",
            textDecoration: "none",
          },
          typography: "button",
          fontWeight: "bold",
        }}
      >
        History
      </MuiLink> */}
      <MuiLink
        underline="hover"
        variant="button"
        color="#432818"
        sx={{
          marginRight: 2,
          padding: "8px 16px",
          borderRadius: "4px",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "#f4e1d2",
            textDecoration: "none",
          },
          typography: "button",
          fontWeight: "bold",
        }}
        onClick={handleCartIconClick}
      >
        <ShoppingCartIcon />
      </MuiLink>
      <CartModal
        modaltitle={"Cart"}
        modaldescription={"Here are your items."}
        open={openCartModal}
        setOpen={setOpenCartModal}
        cartData={cartData}
        setCartData={setCartData}
      />
    </Toolbar>
  );
}

export default NavBar;
