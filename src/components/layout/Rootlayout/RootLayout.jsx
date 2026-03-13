import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../../../context/Auth/AuthContext'

const RootLayout = () => (
    <AuthProvider>
        <Outlet />
    </AuthProvider>
)

export default RootLayout