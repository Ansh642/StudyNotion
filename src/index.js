import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/context";
import { CartProvider } from "./context/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  </React.StrictMode>
   <ToastContainer />
   </>
);


