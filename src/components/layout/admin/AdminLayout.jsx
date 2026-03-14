import { useState } from "react"
import { Outlet } from "react-router-dom"
import AdminSidebar from "../../admin/AdminSidebar"
import AdminNavbar from "../../admin/AdminNavbar"


const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <AdminNavbar />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout