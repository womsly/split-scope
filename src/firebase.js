import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API,
  authDomain: "trackly-v1.firebaseapp.com",
  projectId: "trackly-v1",
  storageBucket: "trackly-v1.appspot.com",
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING,
  appId: import.meta.env.VITE_APP_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);