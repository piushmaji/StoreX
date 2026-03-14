import { createContext, useContext, useEffect, useState } from "react"
import supabase from "../../lib/Supabase/Supabase"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [profileLoading, setProfileLoading] = useState(false)

    const navigate = useNavigate()

    // FETCH USER PROFILE
    const fetchProfile = async (userId) => {

        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single()

        if (error) {
            console.error("Profile fetch error:", error.message)
            return null
        }

        setProfile(data)
        return data
    }


    // CREATE PROFILE IF NOT EXISTS
    const createProfile = async (user) => {

        const { data: existingProfile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle()

        if (!existingProfile) {

            const { error } = await supabase
                .from("profiles")
                .insert([
                    {
                        id: user.id,
                        email: user.email,
                        role: "user"
                    }
                ])

            if (error) {
                console.error("Profile creation error:", error.message)
            }
        }
    }


    // CHECK SESSION ON PAGE LOAD
    useEffect(() => {

        const initializeAuth = async () => {

            const { data, error } = await supabase.auth.getSession()

            if (error) {
                console.error(error.message)
            }

            const session = data.session

            setSession(session)
            setUser(session?.user ?? null)

            if (session?.user) {
                await fetchProfile(session.user.id)
            }

            setLoading(false)
        }

        initializeAuth()

        const { data: listener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {

                setSession(session)
                setUser(session?.user ?? null)

                if (session?.user) {
                    setProfileLoading(true)
                    await fetchProfile(session.user.id)
                    setProfileLoading(false)

                } else {
                    setProfile(null)
                }

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

        if (error) return { error }

        if (data?.user) {
            await createProfile(data.user)
        }

        return { data }
    }


    // LOGIN
    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) return { error }
        return { data }
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
        profileLoading,
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)