import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./components/Main";
import Dashboard from "./components/Dashboard";
import ProductPage from "./components/ProductPage";
import SellPage from "./components/SellPage";
import BuyPage from "./components/BuyPage";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import Settings from "./components/Settings";
import EditShipping from "./components/EditShipping";

function App() {
  const { user, isLoggedInTemporary } = useSelector((state) => state.auth);

  const isLoggedInPersisted = user.isLoggedInPersisted;
  const isLoggedTemporary = isLoggedInTemporary;
  const isLoggedCondition =
    isLoggedInPersisted === "true" || isLoggedTemporary === "true";

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate replace to={"/"} />} />
          <Route path="/" element={<Main />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/sell/:id" element={<SellPage />} />
          <Route path="/buy/:id" element={<BuyPage />} />
          {isLoggedCondition && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/shipping" element={<EditShipping />} />
            </>
          )}
          {!isLoggedCondition && (
            <>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </>
          )}
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer limit={3} style={{ width: "400px" }} />
    </>
  );
}

export default App;
