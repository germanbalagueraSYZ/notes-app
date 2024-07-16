import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAex6kn-RORYZiaxa8l0tTltHwU2k8zqMQ",
    authDomain: "sublime-cargo-381118.firebaseapp.com",
    projectId: "sublime-cargo-381118",
    storageBucket: "sublime-cargo-381118.appspot.com",
    messagingSenderId: "1006757000385",
    appId: "1:1006757000385:web:7a224380dbf8578a885040",
    measurementId: "G-3EKV57BFDN"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener las instancias de Auth y Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
