import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyABV2GOU2SXk5Yl_5iODUromGGuFdzJm2U",
  authDomain: "zomato-clone-2a12e.firebaseapp.com",
  projectId: "zomato-clone-2a12e",
  storageBucket: "zomato-clone-2a12e.appspot.com",
  messagingSenderId: "1056097708070",
  appId: "1:1056097708070:web:8e0dbf177abc3b165c5ee7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()