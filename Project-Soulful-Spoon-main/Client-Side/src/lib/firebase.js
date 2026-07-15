import { initializeApp } from "firebase/app";
// import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut }  from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8uNqA5kpCVFaKamGa95-hLD54vS-0BKg",
  authDomain: "soulfulspoon89-auth.firebaseapp.com",
  projectId: "soulfulspoon89-auth",
  storageBucket: "soulfulspoon89-auth.firebasestorage.app",
  messagingSenderId: "316727530497",
  appId: "1:316727530497:web:834eb881bc53d34a359c00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () =>signOut(auth);