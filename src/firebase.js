
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth/cordova";
import { user } from "react";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCmVPQSO3RqEmEkgD8g4dYBgZQEB7ssSGo",
  authDomain: "netflix-clone-53a94.firebaseapp.com",
  projectId: "netflix-clone-53a94",
  storageBucket: "netflix-clone-53a94.firebasestorage.app",
  messagingSenderId: "578494793175",
  appId: "1:578494793175:web:973ad83a07d8a532953792",
  measurementId: "G-LYZ1V5Y84R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        });
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signUp, logout};