import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, github } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";

export type LoginParams = {
  email: string;
  password: string;
  remember?: boolean;
};

export type RegisterParams = {
  email: string;
  password: string;
};

const promptForPassword = async (email: string) => {
  try {
    const password = prompt(
      "Please input your account password in order to link it with github"
    );
    if (password) {
      const result = await signInWithEmailAndPassword(auth, email, password);
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
  async (params: LoginParams) => {
    try {
      const email = params.email;
      const password = params.password;
      const rememberMe = params.remember;

      const user = await signInWithEmailAndPassword(auth, email, password);
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
      const user = await signInWithPopup(auth, provider);
      const uid = user.user!.uid;
      return { uid: uid };
    } catch (err) {
      if (err) {
        // @ts-ignore
        var pendingCred = err.credential;
        // @ts-ignore
        var email = err.email;
        const methods = await fetchSignInMethodsForEmail(auth, email);
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
  async (creds: RegisterParams) => {
    try {
      const email = creds.email;
      const password = creds.password;
      const user = await createUserWithEmailAndPassword(auth, email, password);
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
      await sendPasswordResetEmail(auth, email, {
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
      await confirmPasswordReset(auth, oobCode, password);
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      return message;
    }
  }
);
