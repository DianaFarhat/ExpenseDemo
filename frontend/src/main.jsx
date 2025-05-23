import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles/index.css'
import App from "./App"; 
import Home from "./pages/home";
import Login from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",           // Root route uses App as a layout wrapper
    element: <App />,
    children: [
      {
        index: true,     // default child of route ("/") -> Login
        element: <Login />,
      },
      {
        path: "home",    // "/home" route -> Home
        element: <Home />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

console.log("App mounted");
