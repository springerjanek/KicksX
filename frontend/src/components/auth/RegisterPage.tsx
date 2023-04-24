import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { resetErorr, resetSuccess } from "../../redux/authSlice";
import {
  RegisterParams,
  registerFunction,
  signUpWithGithub,
} from "redux/authSlice.helpers";
import { notify } from "../../hooks/notify";
import { AuthForm } from "./AuthForm";

export const RegisterPage = () => {
  const dispatch = useAppDispatch();

  const { error, success } = useAppSelector((state) => state.auth);

  const errorCondition = error.length > 0;
  const successCondition = success.length > 0;

  useEffect(() => {
    if (errorCondition) {
      notify(error, "warning");
      dispatch(resetErorr());
    }
    if (successCondition) {
      notify(success, "success");
      dispatch(resetSuccess());
    }
  }, [errorCondition, successCondition]);

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
