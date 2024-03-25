import { useEffect, useState } from "react";
/*
<AppBar position="static"></AppBar>
*/
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import { Toolbar, Typography, Link as MuiLink } from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartModal from "./Ordering/Cart/CartModal";
import { useUser } from "./Context/UserContext";

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
    await getUserCartModalData();
    setOpenCartModal(true);
  };

  return (
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Link to={"/"}>
          <img src="/main-logo-black-transparent.png" id="fixedSizeImage" />
        </Link>
      </Typography>
      <MuiLink color="inherit" sx={{ marginRight: 2 }}>
        {/* //Make this scroll down to the About Us section of the HomePage when
          clicked. */}
      </MuiLink>
      <MuiLink
        component={Link}
        to="/order"
        // color="inherit"
        underline="hover"
        sx={{ marginRight: 2 }}
        variant="button"
      >
        Order
      </MuiLink>

      {isAuthenticated ? (
        <MuiLink
          // color="inherit"
          underline="hover"
          variant="button"
          sx={{ marginRight: 2 }}
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Logout
        </MuiLink>
      ) : (
        <MuiLink
          // color="inherit"
          underline="hover"
          variant="button"
          sx={{ marginRight: 2 }}
          onClick={() => loginWithRedirect()}
        >
          SignUp/Login
        </MuiLink>
      )}

      <MuiLink
        // color="inherit"
        underline="hover"
        variant="button"
        sx={{ marginRight: 2 }}
        onClick={handleCartIconClick}
      >
        <ShoppingCartIcon />
      </MuiLink>

      <MuiLink
        component={Link}
        to="/history"
        // color="inherit"
        underline="hover"
        sx={{ marginRight: 2 }}
        variant="button"
      >
        History
      </MuiLink>

      <CartModal
        modaltitle={"Cart"}
        modaldescription={"Here are your items."}
        open={openCartModal}
        setOpen={setOpenCartModal}
        cartData={cartData}
      />
    </Toolbar>
  );
}

export default NavBar;
