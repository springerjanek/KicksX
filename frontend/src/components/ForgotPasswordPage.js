import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetErorr, resetSuccess } from "../redux/authSlice";
import { notify } from "../hooks/notify";
import WhiteFormContainer from "./WhiteFormContainer";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.auth);

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

  const forgotHandler = (event) => {
    event.preventDefault();
    if (email) {
      dispatch(forgotPassword(email));
      setEmail("");
    } else {
      notify("Please input valid email!", "warning");
    }
  };

  return (
    <>
      <WhiteFormContainer
        heading="INPUT YOUR E-MAIL"
        onSubmit={forgotHandler}
        smallText="E-MAIL"
        inputType="email"
        inputName="email"
        inputValue={email}
        onInputChange={(e) => setEmail(e.target.value)}
        buttonText="RESET PASSWORD"
      />
    </>
  );
};

export default ForgotPasswordPage;
