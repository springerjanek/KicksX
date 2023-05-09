import React from "react";
import { Navigate } from "react-router-dom";
import { useGetUserAuth } from "hooks/user/useGetUserAuth,";

interface Props {
  component: React.FC;
  isLoginComponent?: boolean;
}

export const ProtectedRoute = ({
  component: Component,
  isLoginComponent,
}: Props) => {
  const { isLoggedCondition } = useGetUserAuth();

  if (isLoggedCondition) {
    return <Component />;
  }

  if (isLoginComponent && isLoggedCondition) {
    return <Navigate to={"/"} />;
  }
  if (isLoginComponent && !isLoggedCondition) {
    return <Component />;
  }

  return <Navigate to={"/"} />;
};
