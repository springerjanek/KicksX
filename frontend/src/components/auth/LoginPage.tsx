import React from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import {
  LoginParams,
  loginFunction,
  signUpWithGithub,
} from "redux/authSlice.helpers";
import { AuthForm } from "./forms/AuthForm";
import { notify } from "../../hooks/notify/useNotify";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { error, success } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  if (error) {
    notify(error, "warning");
  }
  if (success) {
    navigate("/");
    notify(success, "success");
  }

  const loginHandler = (data: LoginParams) => {
    if (data.email && data.password.length < 6) {
      notify(
        "Please input valid username and password with more than 5 letters!",
        "warning"
      );
    } else {
      dispatch(loginFunction(data));
    }
  };

  const logInithGithubHandler = () => {
    dispatch(signUpWithGithub());
  };

  return (
    <AuthForm
      formType="login"
      formHandler={loginHandler}
      githubHandler={logInithGithubHandler}
    />
  );
};
