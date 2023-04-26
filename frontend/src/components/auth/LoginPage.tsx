import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import {
  LoginParams,
  loginFunction,
  signUpWithGithub,
} from "redux/authSlice.helpers";
import { AuthForm } from "./AuthForm";
import { notify } from "../../hooks/notify";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { error, success } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const errorCondition = error.length > 0;
  const successCondition = success.length > 0;

  useEffect(() => {
    if (errorCondition) {
      notify(error, "warning");
    }
    if (successCondition) {
      navigate("/");
      notify(success, "success");
    }
  }, [errorCondition, successCondition]);

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
