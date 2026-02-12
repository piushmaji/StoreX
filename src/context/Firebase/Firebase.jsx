import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

import { createContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import ClipLoader from "react-spinners/ClipLoader"

export const FirebaseContext = createContext()

const Firebase = {
    apiKey: "AIzaSyCU8SxxjIS2sW0sfw5JhWWP_yICUU4xzus",
    authDomain: "storex-abef4.firebaseapp.com",
    projectId: "storex-abef4",
    storageBucket: "storex-abef4.firebasestorage.app",
    messagingSenderId: "926457948885",
    appId: "1:926457948885:web:31d202d8f55164ad31905c",
    measurementId: "G-QQK1KH35RZ"
};


export const FirebaseProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        })

        return () => unsubscribe();
    }, [])

    return (
        <FirebaseContext.Provider value={{ user }}>
            {loading ? (
                <div className="h-screen flex items-center justify-center">
                    <ClipLoader size={50} />
                </div>
            ) : (
                children
            )}
        </FirebaseContext.Provider>
    )

}



// Initialize Firebase
const app = initializeApp(Firebase);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()