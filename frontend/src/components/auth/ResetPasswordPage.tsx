import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { resetErorr, resetSuccess } from "../../redux/authSlice";
import { resetPassword } from "redux/authSlice.helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { notify } from "../../hooks/notify";
import { PasswordActionsForm } from "./PasswordActionsForm";

export const ResetPasswordPage = () => {
  const location = useLocation();

  const searchForCode = () => {
    return new URLSearchParams(location.search);
  };

  const navigate = useNavigate();
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
      navigate("/login");
    }
  }, [errorCondition, successCondition]);

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
