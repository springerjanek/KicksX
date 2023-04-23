import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { resetErorr, resetSuccess } from "../../redux/authSlice";
import { resetPassword } from "redux/authSlice.helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { notify } from "../../hooks/notify";
import { WhiteFormContainer } from "./WhiteFormContainer";

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");

  const useQuery = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
  };

  const payload = {
    password: password,
    code: useQuery().get("oobCode") ?? "",
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

  const resetHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.length >= 6 && payload.code !== "") {
      dispatch(resetPassword(payload));
    } else {
      notify(
        "Please input password with more than 5 letters or visit this page from the right url!",
        "warning"
      );
    }
  };

  return (
    <>
      <WhiteFormContainer
        heading="INPUT NEW PASSWORD"
        onSubmit={resetHandler}
        smallText="PASSWORD"
        inputType="password"
        inputName="password"
        inputValue={password}
        onInputChange={(e) => setPassword(e.target.value)}
        buttonText="RESET PASSWORD"
      />
    </>
  );
};
