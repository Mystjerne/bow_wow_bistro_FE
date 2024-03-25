import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { UserProvider } from "./Context/UserContext.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrderPage from "./Ordering/OrderPage.jsx";
import Checkout from "./Ordering/Cart/Checkout.jsx";
import PurchaseHistory from "./PurchaseHistory.jsx";

const router = createBrowserRouter([
  {
    //this is also a new route
    path: "/",
    element: <App />,
    // children: [
    //   //this is a new route
    //   {
    //     path: "/",
    //     element: <Navbar />,

    //   },
    // ],
  },

  {
    path: "/order",
    element: <OrderPage />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/history",
    element: <PurchaseHistory />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={import.meta.env.VITE_SOME_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_SOME_AUTH0_CLIENTID}
    authorizationParams={{
      redirect_uri: import.meta.env.VITE_SOME_AUTH0_REDIRECTURL,
      audience: import.meta.env.VITE_SOME_AUTH0_AUDIENCE,
      scope:
        "read:current_user update:current_user_metadata openid profile email",
    }}
  >
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </Auth0Provider>
);
