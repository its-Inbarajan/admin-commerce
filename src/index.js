import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ProductContextProvider } from "./context/ProductContext";

import { AuthContextProvider } from "./context/authContex";
import { Tooltip } from "react-tooltip";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductContextProvider>
        <App />
        <Tooltip id="my-tooltip" />
        <ToastContainer />
      </ProductContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
