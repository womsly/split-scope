import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

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
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {
  app,
  auth,
  analytics,
  db
}