import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/Auth/AuthContext"
import Loader from "../components/common/Loader/Loader"

const AdminRoute = () => {
    const { user, profile, loading } = useAuth()

    // Auth loading
    if (loading) return <Loader fullScreen={true} text="Loading..." />

    // Not logged in
    if (!user) return <Navigate to="/login" replace />

    // User exists but profile still loading — wait karo
    if (!profile) return <Loader fullScreen={true} text="Loading profile..." />

    // Not admin
    if (profile.role !== "admin") return <Navigate to="/" replace />

    return <Outlet />
}

export default AdminRoute
