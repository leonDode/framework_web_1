import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKB14FdZizpmXCYNYPQHHfzZQBdk_WVqA",
  authDomain: "sleep-company-b8d44.firebaseapp.com",
  projectId: "sleep-company-b8d44",
  storageBucket: "sleep-company-b8d44.firebasestorage.app",
  messagingSenderId: "1041256659493",
  appId: "1:1041256659493:web:617f13e2c44a7f51aa1dcc",
  measurementId: "G-11F1Z5JGJH",
};

export const app = initializeApp(firebaseConfig);

//const auth = getAuth(app);
export const firestore = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
