import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../../lib/Supabase/Supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Auth listener
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // 🔹 Fetch profile (auto created via DB trigger)
  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }

    setLoading(true);

    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) {
          console.error("Profile fetch error:", error);
        }
        setProfile(data || null);
        setLoading(false);
      });
  }, [user]);

  // 🔹 Signup (full_name goes to metadata → trigger will store it)
  const signup = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    return { data, error };
  };

  // 🔹 Login
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  };

  // 🔹 Google Login
  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    return { data, error };
  };

  // 🔹 Logout
  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setUser(null);
      setSession(null);
      setProfile(null);
    }

    return { error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signup,
        login,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 Hook
export const useAuth = () => useContext(AuthContext);
