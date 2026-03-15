import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/Auth/AuthContext"

const AdminRoute = () => {
    const { user, profile, loading } = useAuth()

    // Auth loading
    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-900">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-400 text-sm font-medium">Loading...</p>
                </div>
            </div>
        )
    }

    // Not logged in
    if (!user) return <Navigate to="/login" replace />

    // User exists but profile still loading — wait karo
    if (!profile) return (
        <div className="h-screen flex items-center justify-center bg-slate-900">
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-400 text-sm font-medium">Loading profile...</p>
            </div>
        </div>
    )

    // Not admin
    if (profile.role !== "admin") return <Navigate to="/" replace />

    return <Outlet />
}

export default AdminRoute
