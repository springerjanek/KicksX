import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface Props {
  component: React.FC;
  isLoginComponent?: boolean;
}

const ProtectedRoute = ({ component: Component, isLoginComponent }: Props) => {
  const { user, isLoggedInTemporary } = useSelector(
    (state: ReduxAuth) => state.auth
  );
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
