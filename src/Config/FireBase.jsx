import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyCU8SxxjIS2sW0sfw5JhWWP_yICUU4xzus",
    authDomain: "storex-abef4.firebaseapp.com",
    projectId: "storex-abef4",
    storageBucket: "storex-abef4.firebasestorage.app",
    messagingSenderId: "926457948885",
    appId: "1:926457948885:web:31d202d8f55164ad31905c",
    measurementId: "G-QQK1KH35RZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
