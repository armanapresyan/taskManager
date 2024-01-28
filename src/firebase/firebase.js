// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getFunctions } from "firebase/functions";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNs0AXSaulc2v3tF1M5Uqgmi6_wc95Gl8",
  authDomain: "task-manager-cfff7.firebaseapp.com",
  projectId: "task-manager-cfff7",
  storageBucket: "task-manager-cfff7.appspot.com",
  messagingSenderId: "167092065853",
  appId: "1:167092065853:web:68153fb107fe8fb312fc54"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);



export { app, db, storage, functions };