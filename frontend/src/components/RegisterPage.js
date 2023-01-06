import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerFunction,
  signUpWithGithub,
  resetErorr,
  resetSuccess,
} from "../redux/authSlice";

import { useNavigate } from "react-router-dom";
import { notify } from "../hooks/notify";
import WhiteFormContainer from "./WhiteFormContainer";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const payload = { username: username, password: password };

  const { user, error, success, isLoggedInTemporary } = useSelector(
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

  const registerHandler = (event) => {
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
      linkMargin="md:ml-10 2xl:ml-24"
    />
  );
};

export default RegisterPage;
