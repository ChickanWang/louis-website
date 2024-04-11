// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object (replace this with your own config)
const firebaseConfig = {
    apiKey: "AIzaSyAnjdtjT36v_4X2q4Qiz1fTzg-7-PBsjlE",
    authDomain: "louis-website-8e388.firebaseapp.com",
    projectId: "louis-website-8e388",
    storageBucket: "louis-website-8e388.appspot.com",
    messagingSenderId: "879089741213",
    appId: "1:879089741213:web:0b7c4d746754e8f005d374"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and export it
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
