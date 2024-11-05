import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCSylEWIA5i_fIfModVnuFWaQXLur8oVGs",
  authDomain: "stylesavvy-fc450.firebaseapp.com",
  projectId: "stylesavvy-fc450",
  storageBucket: "stylesavvy-fc450.appspot.com",
  messagingSenderId: "676959394765",
  appId: "1:676959394765:web:fc44c53be78daf7f668284",
  measurementId: "G-FF7TW08YGP"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)