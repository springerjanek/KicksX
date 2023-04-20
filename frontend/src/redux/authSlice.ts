import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase";
import {
  loginFunction,
  signUpWithGithub,
  registerFunction,
  forgotPassword,
  resetPassword,
} from "./authSlice.helpers";
import storage from "redux-persist/lib/storage";
import axios from "axios";

const initialState = {
  user: {
    isLoggedInPersisted: "false",
    id: "",
  },
  isLoggedInTemporary: "false",
  error: "",
  success: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      auth.signOut();
      state.user.isLoggedInPersisted = "false";
      state.isLoggedInTemporary = "false";
      storage.removeItem("persist:root");
      state.user.id = "";
      state.success = "";
    },
    resetErorr: (state) => {
      state.error = "";
    },
    resetSuccess: (state) => {
      state.success = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(loginFunction.fulfilled, (state, action) => {
      if (action.payload) {
        if (typeof action.payload !== "string") {
          const rememberMe = action.payload.rememberMe;

          if (rememberMe === true) {
            const uid = action.payload.uid;
            state.user.id = uid;
            state.user.isLoggedInPersisted = "true";
            state.error = "";
            state.success = "Successfully logged in!";
          }
          if (rememberMe === false) {
            const uid = action.payload.uid;
            state.user.id = uid;
            state.isLoggedInTemporary = "true";
            state.error = "";
            state.success = "Successfully logged in!";
          }
        } else {
          const formatedError = action.payload.slice(10);
          state.error = formatedError;
          state.success = "";
        }
      }
    });
    builder.addCase(signUpWithGithub.fulfilled, (state, action) => {
      if (typeof action.payload !== "string") {
        if (
          action.payload?.successMessage ===
          "Successfuly linked your account with github!"
        ) {
          const uid = action.payload.uid;
          state.user.id = uid;
          state.user.isLoggedInPersisted = "true";
          state.error = "";
          state.success = action.payload.successMessage;
        } else {
          const uid = action.payload?.uid;

          state.user.id = uid;
          state.user.isLoggedInPersisted = "true";
          state.error = "";
          state.success = "Successfully signed with github!";
        }
      } else {
        const formatedError = action.payload.slice(10);
        state.error = formatedError;
        state.success = "";
      }
    });
    builder.addCase(registerFunction.fulfilled, (state, action) => {
      if (typeof action.payload !== "string") {
        const uid = action.payload?.uid;
        axios.post("https://kicksxbackend.onrender.com/createUserData/", {
          uid: uid,
        });
        state.error = "";
        state.success = "Successfully signed up! You may now log in";
      } else {
        const formatedError = action.payload.slice(10);
        state.error = formatedError;
        state.success = "";
      }
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      if (action.payload) {
        const formatedError = action.payload.slice(10);
        state.error = formatedError;
        state.success = "";
      } else {
        state.error = "";
        state.success = "Successfully sent reset email!";
      }
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      if (action.payload) {
        const formatedError = action.payload.slice(10);
        state.error = formatedError;
        state.success = "";
      } else {
        state.error = "";
        state.success = "Successfully set new password!";
      }
    });
  },
});

export const { logout, resetErorr, resetSuccess } = authSlice.actions;

export default authSlice.reducer;
