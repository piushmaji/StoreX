import { createContext, useContext, useEffect, useState } from "react"
import supabase from "../../lib/Supabase/Supabase"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    // const navigate = useNavigate()

    // restore session
    useEffect(() => {

        const getSession = async () => {

            const { data, error } = await supabase.auth.getSession()

            if (error) {
                console.error(error.message)
            }

            setSession(data.session)
            setUser(data.session?.user ?? null)

            setLoading(false)
        }

        getSession()

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {

                setSession(session)
                setUser(session?.user ?? null)

            }
        )

        return () => {
            listener.subscription.unsubscribe()
        }

    }, [])



    // SIGNUP
    const signup = async (email, password) => {

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })

        return { data, error }
    }



    // LOGIN
    const login = async (email, password) => {

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        return { data, error }
    }



    // GOOGLE LOGIN
    const loginWithGoogle = async () => {

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin
            }
        })

        return { data, error }
    }



    // LOGOUT
    const logout = async () => {

        const { error } = await supabase.auth.signOut()
        if (!error) {
            // navigate("/")
            console.log(error);
            
        }
        return { error }
    }



    const value = {
        user,
        session,
        loading,
        signup,
        login,
        loginWithGoogle,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)