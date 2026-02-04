import React from "react";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes";

const App = () => {
  return (
    <div>
      <RouterProvider router={routes} />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;
