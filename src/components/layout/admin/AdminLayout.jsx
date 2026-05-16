import { useState } from "react"
import { Outlet } from "react-router-dom"
import AdminSidebar from "../../admin/AdminSidebar"
import AdminNavbar from "../../admin/AdminNavbar"


const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <AdminSidebar 
                collapsed={collapsed} 
                setCollapsed={setCollapsed} 
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <AdminNavbar onMenuClick={() => setMobileOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout