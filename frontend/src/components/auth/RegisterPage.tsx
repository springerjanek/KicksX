import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { resetErorr, resetSuccess } from "../../redux/authSlice";
import { registerFunction, signUpWithGithub } from "redux/authSlice.helpers";
import { useNavigate } from "react-router-dom";
import { notify } from "../../hooks/notify";
import { WhiteFormContainer } from "./WhiteFormContainer";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const payload = { username: username, password: password };

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

  const registerHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username && password.length >= 6) {
      dispatch(registerFunction(payload));
      setUsername("");
      setPassword("");
    } else {
      notify(
        "Please input valid username and password with more than 5 letters!",
        "warning"
      );
    }
  };

  const signUpWithGithubHandler = () => {
    dispatch(signUpWithGithub());
  };

  return (
    <WhiteFormContainer
      heading="SIGN UP"
      onSubmit={registerHandler}
      smallText="E-MAIL"
      inputType="email"
      inputName="email"
      inputValue={username}
      onInputChange={(e) => setUsername(e.target.value)}
      smallTextTwo="PASSWORD"
      inputTypeTwo="password"
      inputValueTwo={password}
      onInputChangeTwo={(e) => setPassword(e.target.value)}
      buttonText="SIGN UP"
      buttonTextTwo="SIGN UP WITH GITHUB"
      buttonTwoOnClick={signUpWithGithubHandler}
      linkText="Already signed up? Click here"
      linkRedirect={"/login"}
    />
  );
};
