import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, github } from "../firebase.js";
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

const promptForPassword = async (email) => {
  try {
    const password = prompt(
      "Please input your account password in order to link it with github"
    );
    const result = await auth.signInWithEmailAndPassword(email, password);
    return result;
  } catch (err) {
    return err.message;
  }
};

export const loginFunction = createAsyncThunk("auth/login", async (params) => {
  try {
    const username = params.username;
    const password = params.password;
    const rememberMe = params.remember;

    const user = await auth.signInWithEmailAndPassword(username, password);
    if (user) {
      const uid = user.user.uid;
      return [uid, rememberMe];
    }
  } catch (err) {
    return err.message;
  }
});

export const signUpWithGithub = createAsyncThunk(
  "auth/signupgithub",
  async () => {
    const provider = github;
    try {
      const user = await auth.signInWithPopup(provider);
      const uid = user.user.uid;
      return [uid];
    } catch (err) {
      if (err.code === "auth/account-exists-with-different-credential") {
        var pendingCred = err.credential;
        var email = err.email;
        const methods = await auth.fetchSignInMethodsForEmail(email);
        if (methods[0] === "password") {
          const result = await promptForPassword(email);
          const successResult = await result.user.linkWithCredential(
            pendingCred
          );
          const uid = successResult.user.uid;
          const successMessage = "Successfuly linked your account with github!";
          return [uid, successMessage];
        }
      }
      return err.message;
    }
  }
);

export const registerFunction = createAsyncThunk(
  "auth/register",
  async (creds) => {
    try {
      const username = creds.username;
      const password = creds.password;
      const user = await auth.createUserWithEmailAndPassword(
        username,
        password
      );
      const uid = user.user.uid;
      return [uid];
    } catch (err) {
      return err.message;
    }
  }
);

export const forgotPassword = createAsyncThunk("auth/forgot", async (email) => {
  try {
    await auth.sendPasswordResetEmail(email, {
      url: "https://spectacular-mochi-986130.netlify.app/login",
    });
  } catch (err) {
    return err.message;
  }
});

export const resetPassword = createAsyncThunk("auth/reset", async (params) => {
  const oobCode = params.code;
  const password = params.password;
  try {
    await auth.confirmPasswordReset(oobCode, password);
  } catch (err) {
    return err.message;
  }
});

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
      const rememberMe = action.payload[1];
      if (action.payload.length > 30) {
        const formatedError = action.payload.slice(10);
        state.error = formatedError;
        state.success = "";
      } else if (rememberMe === true) {
        const uid = action.payload[0];
        state.user.id = uid;
        state.user.isLoggedInPersisted = "true";
        state.error = "";
        state.success = "Successfully logged in!";
      } else if (rememberMe === false) {
        const uid = action.payload[0];
        state.user.id = uid;
        state.isLoggedInTemporary = "true";
        state.error = "";
        state.success = "Successfully logged in!";
      }
    });
    builder.addCase(signUpWithGithub.fulfilled, (state, action) => {
      if (action.payload.length > 30) {
        const formatedError = action.payload.slice(10);
        state.error = formatedError;
        state.success = "";
      } else if (
        action.payload[1] === "Successfuly linked your account with github!"
      ) {
        const uid = action.payload[0];
        state.user.id = uid;
        state.user.isLoggedInPersisted = "true";
        state.error = "";
        state.success = action.payload[1];
      } else {
        const uid = action.payload[0];

        state.user.id = uid;
        state.user.isLoggedInPersisted = "true";
        state.error = "";
        state.success = "Successfully signed with github!";
      }
    });
    builder.addCase(registerFunction.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload.length > 30) {
        const formatedError = action.payload.slice(10);
        state.error = formatedError;
        state.success = "";
      } else {
        const uid = action.payload[0];
        axios.post("https://kicksx.onrender.com/createUserData/", {
          uid: uid,
        });
        state.error = "";
        state.success = "Successfully signed up! You may now log in";
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
