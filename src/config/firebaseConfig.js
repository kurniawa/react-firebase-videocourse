// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVzROmR05Cet5TMHLDC5QzEFhf6HaXiSM",
  authDomain: "video-course-educational.firebaseapp.com",
  projectId: "video-course-educational",
  storageBucket: "video-course-educational.firebasestorage.app",
  messagingSenderId: "801468073700",
  appId: "1:801468073700:web:b34aad8fafd8b862c18ef1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// Anda bisa menambahkan instance layanan lain seperti auth, dll.
export const auth = getAuth(app);