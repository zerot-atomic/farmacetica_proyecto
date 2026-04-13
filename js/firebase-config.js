// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzPskXy59pyahjfM5i6Ema-7BnJbX2blk",
  authDomain: "farmacia-fortaleza.firebaseapp.com",
  projectId: "farmacia-fortaleza",
  storageBucket: "farmacia-fortaleza.firebasestorage.app",
  messagingSenderId: "356946637429",
  appId: "1:356946637429:web:90ae3f44c1a943f324be3c",
  measurementId: "G-QBBSQ4WXJ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exportamos los servicios para usarlos en login.js o auth.js
export const auth = getAuth(app);
export const db = getFirestore(app);