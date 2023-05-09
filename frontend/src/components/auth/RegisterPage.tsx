import React from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import {
  RegisterParams,
  registerFunction,
  signUpWithGithub,
} from "redux/authSlice.helpers";
import { notify } from "../../hooks/notify/useNotify";
import { AuthForm } from "./forms/AuthForm";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
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

  const registerHandler = (data: RegisterParams) => {
    if (data.email && data.password.length < 6) {
      notify(
        "Please input valid username and password with more than 5 letters!",
        "warning"
      );
    } else {
      dispatch(registerFunction(data));
    }
  };

  const signUpWithGithubHandler = () => {
    dispatch(signUpWithGithub());
  };

  return (
    <AuthForm
      formType="register"
      formHandler={registerHandler}
      githubHandler={signUpWithGithubHandler}
    />
  );
};
