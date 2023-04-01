import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, github } from "../firebase.js";
import { FirebaseError } from "firebase-admin";
import storage from "redux-persist/lib/storage";
import axios from "axios";

const initialState = {
  user: {
    isLoggedInPersisted: "false",
    id: "",
    isPayoutSet: false,
    isShippingSet: false,
    isPaymentSet: false,
  },
  isLoggedInTemporary: "false",
  error: "",
  success: "",
};

type loginParams = {
  username: string;
  password: string;
  remember: boolean;
};

type userPass = {
  username: string;
  password: string;
};

const promptForPassword = async (email: string) => {
  try {
    const password = prompt(
      "Please input your account password in order to link it with github"
    );
    if (password) {
      const result = await auth.signInWithEmailAndPassword(email, password);
      return result;
    }
  } catch (err) {
    let message;
    if (err instanceof Error) message = err.message;
    return message;
  }
};

export const loginFunction = createAsyncThunk(
  "auth/login",
  async (params: loginParams) => {
    try {
      const username = params.username;
      const password = params.password;
      const rememberMe = params.remember;

      const user = await auth.signInWithEmailAndPassword(username, password);
      if (user) {
        const uid: string = user.user!.uid;
        return {
          uid: uid,
          rememberMe: rememberMe,
        };
      }
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      return message;
    }
  }
);

export const signUpWithGithub = createAsyncThunk(
  "auth/signupgithub",
  async () => {
    const provider = github;
    try {
      const user = await auth.signInWithPopup(provider);
      const uid = user.user!.uid;
      return { uid: uid };
    } catch (err) {
      if (err) {
        // @ts-ignore
        var pendingCred = err.credential;
        // @ts-ignore
        var email = err.email;
        const methods = await auth.fetchSignInMethodsForEmail(email);
        if (methods[0] === "password") {
          const result = await promptForPassword(email);
          // @ts-ignore
          const successResult = await result.user.linkWithCredential(
            pendingCred
          );
          const uid = successResult.user.uid;
          const successMessage = "Successfuly linked your account with github!";
          return { uid: uid, successMessage: successMessage };
        }
      }
      let message;
      if (err instanceof Error) message = err.message;
      return message;
    }
  }
);

export const registerFunction = createAsyncThunk(
  "auth/register",
  async (creds: userPass) => {
    try {
      const username = creds.username;
      const password = creds.password;
      const user = await auth.createUserWithEmailAndPassword(
        username,
        password
      );
      const uid = user!.user!.uid;
      return { uid: uid };
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      return message;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot",
  async (email: string) => {
    try {
      await auth.sendPasswordResetEmail(email, {
        url: "https://famous-tiramisu-a4a400.netlify.app/login",
      });
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      return message;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset",
  async (params: { code: string; password: string }) => {
    const oobCode = params.code;
    const password = params.password;
    try {
      await auth.confirmPasswordReset(oobCode, password);
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      return message;
    }
  }
);

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
