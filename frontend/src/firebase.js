import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// INPUT YOUR OWN CREDENTIALS https://console.firebase.google.com/u/0/

const firebaseConfig = {
  apiKey: "e",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const github = new firebase.auth.GithubAuthProvider();

export const auth = firebase.auth();
