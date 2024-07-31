// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  {getAuth} from "firebase/auth";
import { getFirestore} from 'firebase/firestore';
import { getDatabase} from 'firebase/database';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_v1fR0n5dsQXctfYfGsBIrV9USFDnLig",
  authDomain: "test2-3cab3.firebaseapp.com",
  projectId: "test2-3cab3",
  storageBucket: "test2-3cab3.appspot.com",
  messagingSenderId: "512885708607",
  appId: "1:512885708607:web:8ed5a51e55fa172db2258a"
};
// Initialize Firebase
export const Firebase_App = initializeApp(firebaseConfig);
export const Firebase_AUTH = getAuth(Firebase_App);
export const FireStore_DB = getFirestore(Firebase_App);
// initialize database
export const db = getDatabase(Firebase_App);