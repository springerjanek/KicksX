import { getAuth, GithubAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

// INPUT YOUR OWN CREDENTIALS https://console.firebase.google.com/u/0/

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const firebaseApp = initializeApp(firebaseConfig);

export const github = new GithubAuthProvider();

export const auth = getAuth();
