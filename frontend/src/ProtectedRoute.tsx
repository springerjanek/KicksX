import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "redux/store";

interface Props {
  component: React.FC;
  isLoginComponent?: boolean;
}

const ProtectedRoute = ({ component: Component, isLoginComponent }: Props) => {
  const { user, isLoggedInTemporary } = useAppSelector((state) => state.auth);
  const isLoggedInPersisted = user.isLoggedInPersisted;
  const isLoggedTemporary = isLoggedInTemporary;
  const isLoggedCondition =
    isLoggedInPersisted === "true" || isLoggedTemporary === "true";

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

export default ProtectedRoute;
