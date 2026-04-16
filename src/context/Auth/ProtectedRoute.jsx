import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import Loader from '../../components/common/Loader/Loader'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) return <Loader fullScreen={true} />

    if (!user) return <Navigate to="/login" replace />

    return children
}

export default ProtectedRoute