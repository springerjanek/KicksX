import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "ProtectedRoute";
import { MainPage } from "components/ui/MainPage/MainPage";
import { ProductPage } from "components/productPage/ProductPage";
import { Dashboard } from "components/dashboard/Dashboard";
import { Selling } from "components/dashboard/selling/Selling";
import { Buying } from "components/dashboard/buying/Buying";
import { Settings } from "components/dashboard/settings/Settings";
import { EditShipping } from "components/dashboard/settings/shipping/EditShipping";
import { NavbarSell } from "components/ui/Navbar/NavbarSell";
import { SellModal } from "components/modals/sell/SellModal";
import { BuyModal } from "components/modals/buy/BuyModal";

import { LoginPage } from "components/auth/LoginPage";
import { RegisterPage } from "components/auth/RegisterPage";
import { ForgotPasswordPage } from "components/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "components/auth/ResetPasswordPage";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate replace to={"/"} />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/sell" element={<NavbarSell />} />
        <Route path="/sell/:id" element={<SellModal />} />
        <Route path="/buy/:id" element={<BuyModal />} />
        <Route path="/buy/:id?size=:size" element={<BuyModal />} />

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
