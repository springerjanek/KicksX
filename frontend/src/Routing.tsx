import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "ProtectedRoute";
import Main from "components/Main";
import ProductPage from "components/productPage/ProductPage";
import SellPage from "components/SellPage";
import BuyPage from "components/BuyPage";
import Dashboard from "components/dashboard/Dashboard";
import Settings from "components/dashboard/Settings";
import EditShipping from "components/dashboard/EditShipping";
import NavbarSell from "components/ui/NavbarSell";
import Selling from "components/dashboard/Selling";
import Buying from "components/dashboard/Buying";

import LoginPage from "components/auth/LoginPage";
import RegisterPage from "components/auth/RegisterPage";
import ForgotPasswordPage from "components/auth/ForgotPasswordPage";
import ResetPasswordPage from "components/auth/ResetPasswordPage";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate replace to={"/"} />} />
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/sell" element={<NavbarSell />} />
        <Route path="/sell/:id" element={<SellPage />} />
        <Route path="/buy/:id" element={<BuyPage />} />
        <Route
          path="/dashboard/profile"
          element={<ProtectedRoute component={Dashboard} />}
        />

        <Route
          path="/dashboard/settings"
          element={<ProtectedRoute component={Settings} />}
        />
        <Route
          path="/dashboard/buying"
          element={<ProtectedRoute component={Buying} />}
        />
        <Route
          path="/dashboard/selling"
          element={<ProtectedRoute component={Selling} />}
        />
        <Route
          path="/dashboard/settings/shipping"
          element={<ProtectedRoute component={EditShipping} />}
        />

        <Route
          path="/register"
          element={
            <ProtectedRoute component={RegisterPage} isLoginComponent={true} />
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute component={LoginPage} isLoginComponent={true} />
          }
        />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
