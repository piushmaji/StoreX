import { createContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../Firebase/MainFirebase"
import ClipLoader from "react-spinners/ClipLoader"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

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
        <AuthContext.Provider value={{ user }}>
            {loading ? (
                <div className="h-screen flex items-center justify-center">
                    <ClipLoader size={50} />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    )

}