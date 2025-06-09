import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDf5O-uPELTxQkvkkNaBd21VT-2yuYat0g",
  authDomain: "road-map-a7ba8.firebaseapp.com",
  projectId: "road-map-a7ba8",
  storageBucket: "road-map-a7ba8.firebasestorage.app",
  messagingSenderId: "668686812861",
  appId: "1:668686812861:web:6a174360d2d15e3b2259d4",
  measurementId: "G-HWFWY6KD2S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
