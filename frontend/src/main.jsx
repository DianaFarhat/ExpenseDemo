import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom"; 
//import { store } from "./store";
import { Provider } from "react-redux";


// Define the router with App as a layout
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "", // ✅ this allows children below
        element: <Home />,
        children: [
        ],
      },
     /*  { path: "login", element: <Login /> },
      { path: "register", element: <Register /> }, */

    ],
  },
]);

// Wrap the entire application inside <Provider>
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>  
    <RouterProvider router={router} />
  </Provider>
);

console.log('App mounted'); // Debugging check
