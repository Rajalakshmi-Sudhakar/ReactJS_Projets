// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2RQfSvuDCmpTstwRQHXWJkpeJMNHaKoc",
  authDomain: "simpleloginapplication-eb372.firebaseapp.com",
  databaseURL:
    "https://simpleloginapplication-eb372-default-rtdb.firebaseio.com/",
  projectId: "simpleloginapplication-eb372",
  storageBucket: "simpleloginapplication-eb372.firebasestorage.app",
  messagingSenderId: "327851805069",
  appId: "1:327851805069:web:39b17c9ecb60e50c47d5c4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const auth = getAuth(app);
const db = getFirestore(app);

export default database;
//export default app;
export { auth, db };
