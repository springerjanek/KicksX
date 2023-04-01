import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// INPUT YOUR OWN CREDENTIALS https://console.firebase.google.com/u/0/

const firebaseConfig = {
  apiKey: "AIzaSyBW4HJsD2w4hDVEv0fVp9Q1ip2NEP76X7I",
  authDomain: "authredux-71e24.firebaseapp.com",
  projectId: "authredux-71e24",
  storageBucket: "authredux-71e24.appspot.com",
  messagingSenderId: "265312777045",
  appId: "1:265312777045:web:b36023ac6fb422e043b5dc",
  measurementId: "G-3KZYXS4VZ4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const github = new firebase.auth.GithubAuthProvider();

export const auth = firebase.auth();
