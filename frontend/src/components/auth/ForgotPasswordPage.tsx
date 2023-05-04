import React from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { forgotPassword } from "redux/authSlice.helpers";
import { notify } from "../../hooks/useNotify";
import { PasswordActionsForm } from "./PasswordActionsForm";

export const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();

  const { error, success } = useAppSelector((state) => state.auth);

  if (error) {
    notify(error, "warning");
  }
  if (success) {
    notify(success, "success");
  }

  const forgotHandler = (data: PasswordActionsForm) => {
    dispatch(forgotPassword(data.email!));
  };

  return (
    <PasswordActionsForm formType="forgot" actionHandler={forgotHandler} />
  );
};
