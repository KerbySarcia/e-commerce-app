// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjZN25Qmcc6FbIuQxCoCjcZfjrOK2M1m0",
  authDomain: "login-nextjs-e7eac.firebaseapp.com",
  databaseURL: "https://login-nextjs-e7eac-default-rtdb.firebaseio.com",
  projectId: "login-nextjs-e7eac",
  storageBucket: "login-nextjs-e7eac.appspot.com",
  messagingSenderId: "176466009642",
  appId: "1:176466009642:web:6f3fc9c8ce775c82246d53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// authentication
export const auth = getAuth(app);
