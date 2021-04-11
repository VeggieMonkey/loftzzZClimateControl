import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  databaseURL: import.meta.env.VITE_databaseURL,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

firebase.initializeApp(firebaseConfig);
// !firebase.apps.length
//   ? firebase.initializeApp(firebaseConfig)
//   : firebase.app();

const email = import.meta.env.VITE_user || "";
const password = import.meta.env.VITE_pass || "";

const database = firebase.database();
const firebaseDoingAuth = firebase
  .auth()
  .signInWithEmailAndPassword(email as string, password as string)
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("errorCode", errorCode);
    console.log("errorMessage", errorMessage);
  });

export { database, firebaseDoingAuth };
