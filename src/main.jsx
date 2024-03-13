import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { UserProvider } from "./Context/UserContext.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import OrderPage from "./Ordering/OrderPage.jsx";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={import.meta.env.VITE_SOME_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_SOME_AUTH0_CLIENTID}
    authorizationParams={{
      redirect_uri: import.meta.env.VITE_SOME_AUTH0_REDIRECTURL,
    }}
  >
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </Auth0Provider>
);
