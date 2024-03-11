import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import OrderPage from "./OrderPage.jsx";
import SignUpPage from "./SignUpPage.jsx";

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
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <SignUpPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
