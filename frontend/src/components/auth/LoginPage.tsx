import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
import { resetErorr, resetSuccess } from "../../redux/authSlice";
import { loginFunction, signUpWithGithub } from "redux/authSlice.helpers";
import { WhiteFormContainer } from "./WhiteFormContainer";
import { notify } from "../../hooks/notify";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const payload = {
    username: username,
    password: password,
    remember: remember,
  };

  const { user, error, success, isLoggedInTemporary } = useAppSelector(
    (state) => state.auth
  );
  const isLoggedInPersisted = user.isLoggedInPersisted;
  const isLoggedCondition =
    isLoggedInPersisted === "true" || isLoggedInTemporary === "true";
  const errorCondition = error.length > 0;
  const successCondition = success.length > 0;

  useEffect(() => {
    if (isLoggedCondition) {
      navigate("/");
    }
    if (errorCondition) {
      notify(error, "warning");
      dispatch(resetErorr());
    }
    if (successCondition) {
      notify(success, "success");
      dispatch(resetSuccess());
    }
  }, [isLoggedCondition, errorCondition, successCondition]);

  const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username && password.length >= 6) {
      dispatch(loginFunction(payload));
      setPassword("");
    } else {
      notify(
        "Please input valid username and password with more than 5 letters!",
        "warning"
      );
    }
  };

  const logInithGithubHandler = () => {
    dispatch(signUpWithGithub());
  };

  return (
    <WhiteFormContainer
      heading="LOG IN"
      onSubmit={loginHandler}
      smallText="E-MAIL"
      inputType="email"
      inputName="email"
      inputValue={username}
      onInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value)
      }
      smallTextTwo="PASSWORD"
      inputTypeTwo="password"
      inputValueTwo={password}
      onInputChangeTwo={(e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value)
      }
      rememberMe={true}
      rememberOnChange={() => setRemember(!remember)}
      buttonText="LOG IN"
      buttonTextTwo="LOG IN WITH GITHUB"
      buttonTwoOnClick={logInithGithubHandler}
      linkText="New User? Click here"
      linkRedirect={"/register"}
      linkTextTwo="Forgot Your Password? Click here"
      linkTwoRedirect={"/forgot-password"}
    />
  );
};
