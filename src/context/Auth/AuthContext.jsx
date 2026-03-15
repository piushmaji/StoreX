import { createContext, useContext, useEffect, useState } from "react"
import supabase from "../../lib/Supabase/Supabase"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    // CREATE PROFILE IF NOT EXISTS
    const createProfile = async (user) => {
        const { error } = await supabase
            .from("profiles")
            .insert([{
                id: user.id,
                email: user.email,
                role: "user"
            }])

        if (error && error.code !== "23505") {
            console.error("Profile creation error:", error.message)
        }
    }

    // Auth state listener
    useEffect(() => {

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                console.log("Auth event:", _event)
                setSession(session)
                setUser(session?.user ?? null)
                if (!session) {
                    setProfile(null)
                }
                setLoading(false)
            }
        )

        return () => listener.subscription.unsubscribe()

    }, [])

    // Profile fetch — runs when user changes
    useEffect(() => {
        if (!user) return

        console.log("Fetching profile for:", user.id)

        supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle()
            .then(({ data, error }) => {
                console.log("Profile result:", { data, error })
                if (data) setProfile(data)
            })

    }, [user])

    // SIGNUP
    const signup = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) return { error }
        if (data?.user) await createProfile(data.user)
        return { data }
    }

    // LOGIN
    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) return { error }
        return { data }
    }

    // GOOGLE LOGIN
    const loginWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: window.location.origin }
        })
        return { data, error }
    }

    // LOGOUT
    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        if (!error) {
            setUser(null)
            setSession(null)
            setProfile(null)
            navigate("/")
        }
        return { error }
    }

    const value = {
        user,
        session,
        profile,
        loading,
        signup,
        login,
        loginWithGoogle,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)