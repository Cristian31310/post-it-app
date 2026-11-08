// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Meterlo en otro lado por seguridad e importarlo aquí
const firebaseConfig = {
  apiKey: "AIzaSyA4wRr92KOC048z7wbjJBsz2WIo7FmCLcU",
  authDomain: "notas-7b214.firebaseapp.com",
  projectId: "notas-7b214",
  storageBucket: "notas-7b214.firebasestorage.app",
  messagingSenderId: "880619240450",
  appId: "1:880619240450:web:6b6e64ce07e994aeebfb1b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const notesCollection = collection(db, "notes");

// async function getCities(db) {
//   const citiesCol = collection(db, "cities");
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map((doc) => doc.data());
//   return cityList;
// }

export { db, notesCollection, addDoc, getDocs, updateDoc };
