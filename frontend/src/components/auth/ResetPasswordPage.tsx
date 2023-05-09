import React from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { resetPassword } from "redux/authSlice.helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { notify } from "../../hooks/notify/useNotify";
import { PasswordActionsForm } from "./forms/PasswordActionsForm";

export const ResetPasswordPage = () => {
  const location = useLocation();

  const searchForCode = () => {
    return new URLSearchParams(location.search);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { error, success } = useAppSelector((state) => state.auth);

  if (error) {
    notify(error, "warning");
  }
  if (success) {
    notify(success, "success");
    navigate("/login");
  }

  const resetHandler = (data: PasswordActionsForm) => {
    const code = searchForCode().get("oobCode") ?? "";
    if (data.password!.length >= 6 && code !== "") {
      dispatch(resetPassword({ password: data.password!, code: code }));
    } else {
      notify(
        "Please input password with more than 5 letters or visit this page from the right url!",
        "warning"
      );
    }
  };

  return (
    <PasswordActionsForm formType="resetting" actionHandler={resetHandler} />
  );
};
