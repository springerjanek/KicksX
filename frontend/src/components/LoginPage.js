import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginFunction,
  signUpWithGithub,
  resetErorr,
  resetSuccess,
} from "../redux/authSlice";
import WhiteFormContainer from "./WhiteFormContainer";
import { notify } from "../hooks/notify";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const payload = {
    username: username,
    password: password,
    remember: remember,
  };

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

  const loginHandler = (event) => {
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
      onInputChange={(e) => setUsername(e.target.value)}
      smallTextTwo="PASSWORD"
      inputTypeTwo="password"
      inputValueTwo={password}
      onInputChangeTwo={(e) => setPassword(e.target.value)}
      rememberMe={true}
      rememberOnChange={() => setRemember(!remember)}
      buttonText="LOG IN"
      buttonTextTwo="LOG IN WITH GITHUB"
      buttonTwoOnClick={logInithGithubHandler}
      linkText="New User? Click here"
      linkRedirect={"/register"}
      linkMargin="md:ml-20 2xl:ml-32"
      linkTextTwo="Forgot Your Password? Click here"
      linkTwoRedirect={"/forgot-password"}
    />
  );
};

export default LoginPage;
