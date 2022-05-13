import { initializeApp } from 'firebase/app';
// import 'firebase/auth';
// import * as storage from'firebase/storage';

import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";



const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
});

const auth = getAuth()
const storage = getStorage();

// const storage = getStorage(firebaseApp);
// console.log(storage.storage)
export {auth, storage, firebaseApp as default};