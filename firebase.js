// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbe8gPeQHVjFpRLgqjlMAaKeuGjRo1N9k",
  authDomain: "pantry-app-6cfa4.firebaseapp.com",
  projectId: "pantry-app-6cfa4",
  storageBucket: "pantry-app-6cfa4.appspot.com",
  messagingSenderId: "251816049359",
  appId: "1:251816049359:web:7944ac94625958aa9bd5ba",
  measurementId: "G-YBKCTD1LX2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}