import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { resetErorr, resetSuccess } from "../../redux/authSlice";
import { forgotPassword } from "redux/authSlice.helpers";
import { notify } from "../../hooks/notify";
import { WhiteFormContainer } from "./WhiteFormContainer";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

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

  const forgotHandler = (event: React.FormEvent<HTMLFormElement>) => {
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
        onInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        buttonText="RESET PASSWORD"
      />
    </>
  );
};
