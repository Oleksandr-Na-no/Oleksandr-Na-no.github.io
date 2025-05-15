// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBq2JPk8dOY4BxLQosv4liqaJw5zi9ZjNM",
  authDomain: "web-lab-3fdff.firebaseapp.com",
  projectId: "web-lab-3fdff",
  storageBucket: "web-lab-3fdff.firebasestorage.app",
  messagingSenderId: "405161819521",
  appId: "1:405161819521:web:fa360020ae5b5de8547c80",
  measurementId: "G-P65BXVE7HZ",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const db = getFirestore();


export { app, auth, db };
