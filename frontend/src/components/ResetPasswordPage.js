import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, resetErorr, resetSuccess } from "../redux/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { notify } from "../hooks/notify";
import WhiteFormContainer from "./WhiteFormContainer";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");

  const useQuery = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
  };

  const payload = {
    password: password,
    code: useQuery().get("oobCode"),
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.auth);
  console.log(success);

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

  const resetHandler = (event) => {
    event.preventDefault();
    if (password.length >= 6 && payload.code !== null) {
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
        inputValue={password}
        onInputChange={(e) => setPassword(e.target.value)}
        buttonText="RESET PASSWORD"
      />
    </>
  );
};

export default ResetPasswordPage;
