import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth,getReactNativePersistence  } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBfwpQrwYjpR6xsMrkaIN-DGowmTU55lRA",
  authDomain: "framework1-f38f9.firebaseapp.com",
  projectId: "framework1-f38f9",
  storageBucket: "framework1-f38f9.appspot.com",
  messagingSenderId: "191878876251",
  appId: "1:191878876251:web:196cbdc7086e4ab433c37e",
  measurementId: "G-2HPVVWR807"
};

const app = initializeApp(firebaseConfig);

//const auth = getAuth(app);


const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export { auth };
