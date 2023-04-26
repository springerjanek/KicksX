import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { forgotPassword } from "redux/authSlice.helpers";
import { notify } from "../../hooks/notify";
import { PasswordActionsForm } from "./PasswordActionsForm";

export const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();

  const { error, success } = useAppSelector((state) => state.auth);

  const errorCondition = error.length > 0;
  const successCondition = success.length > 0;

  useEffect(() => {
    if (errorCondition) {
      notify(error, "warning");
    }
    if (successCondition) {
      notify(success, "success");
    }
  }, [errorCondition, successCondition]);

  const forgotHandler = (data: PasswordActionsForm) => {
    dispatch(forgotPassword(data.email!));
  };

  return (
    <PasswordActionsForm formType="forgot" actionHandler={forgotHandler} />
  );
};
