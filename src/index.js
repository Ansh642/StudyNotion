import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Profile";
import { CartProvider } from "./context/Cart";
import { CourseProvider } from "./context/Course";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  
    <AuthProvider>
    <CartProvider>
    <CourseProvider>
    <BrowserRouter>
     <App />
    </BrowserRouter>
    </CourseProvider>
    </CartProvider>
    </AuthProvider>
  
   <ToastContainer />
   </>
);


