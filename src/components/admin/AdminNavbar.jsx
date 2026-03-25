import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Search, ChevronDown, Settings, LogOut, User, Moon, Sun } from "lucide-react"
import { useAuth } from "../../context/Auth/AuthContext"
import { useLocation } from "react-router-dom"

const PAGE_TITLES = {
    "/admin": { title: "Dashboard", sub: "Welcome back 👋" },
    "/admin/orders": { title: "Orders", sub: "Manage all customer orders" },
    "/admin/products": { title: "Products", sub: "Your product catalog" },
    "/admin/add-product": { title: "Add Product", sub: "Create a new listing" },
    "/admin/edit-product": { title: "Edit Product", sub: "Update product details" },
}

const NOTIFS = [
    { id: 1, text: "New order #STX-28451 received", time: "2m ago", dot: "bg-blue-500" },
    { id: 2, text: "Product 'Hoodie' low on stock", time: "15m ago", dot: "bg-amber-500" },
    { id: 3, text: "User Aryan left a 5★ review", time: "1h ago", dot: "bg-emerald-500" },
    { id: 4, text: "New order #STX-28449 received", time: "2h ago", dot: "bg-blue-500" },
]

const AdminNavbar = () => {
    const { user, logout } = useAuth()
    const location = useLocation()

    const [notifOpen, setNotifOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const [search, setSearch] = useState("")

    const page = PAGE_TITLES[location.pathname] ?? { title: "Admin", sub: "StoreX Panel" }

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-[0_1px_12px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between px-6 py-3.5 gap-4">

                {/* Left — Page title */}
                <div className="min-w-0">
                    <h1 className="text-lg font-black text-slate-900 leading-tight truncate">{page.title}</h1>
                    <p className="text-xs text-slate-400 font-medium">{page.sub}</p>
                </div>

                {/* Right — Actions */}
                <div className="flex items-center gap-2 shrink-0">

                    {/* Search */}
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Quick search..."
                            className="w-48 pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 placeholder-gray-400 transition-all"
                        />
                    </div>

                    {/* Notifications */}
                    <div className="relative">
                        <motion.button
                            whileTap={{ scale: 0.94 }}
                            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false) }}
                            className="relative w-9 h-9 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center transition-colors"
                        >
                            <Bell size={16} className="text-gray-500" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border border-white" />
                        </motion.button>

                        <AnimatePresence>
                            {notifOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                    transition={{ duration: 0.18 }}
                                    className="absolute right-0 top-12 w-80 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden z-50"
                                >
                                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                                        <p className="text-sm font-bold text-slate-800">Notifications</p>
                                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{NOTIFS.length} new</span>
                                    </div>
                                    {NOTIFS.map((n, i) => (
                                        <motion.div
                                            key={n.id}
                                            initial={{ opacity: 0, x: 8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-0"
                                        >
                                            <div className={`w-2 h-2 ${n.dot} rounded-full mt-1.5 shrink-0`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold text-slate-700">{n.text}</p>
                                                <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                    <div className="px-4 py-2.5">
                                        <button className="w-full text-xs font-semibold text-blue-600 hover:text-blue-700 text-center">
                                            View all notifications
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Profile */}
                    <div className="relative">
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false) }}
                            className="flex items-center gap-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 transition-colors"
                        >
                            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                                <span className="text-white text-[10px] font-black">
                                    {user?.email?.[0]?.toUpperCase() ?? "A"}
                                </span>
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-xs font-bold text-slate-800 leading-none">Admin</p>
                                <p className="text-[10px] text-slate-400 truncate max-w-[100px]">{user?.email}</p>
                            </div>
                            <ChevronDown size={12} className={`text-slate-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
                        </motion.button>

                        <AnimatePresence>
                            {profileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                    transition={{ duration: 0.18 }}
                                    className="absolute right-0 top-12 w-52 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden z-50 py-1.5"
                                >
                                    {[
                                        { icon: User, label: "My Account", onClick: () => { } },
                                        { icon: Settings, label: "Settings", onClick: () => { } },
                                        { icon: LogOut, label: "Logout", onClick: logout, danger: true },
                                    ].map(({ icon: Icon, label, onClick, danger }) => (
                                        <button
                                            key={label}
                                            onClick={onClick}
                                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors text-left ${danger
                                                    ? "text-red-500 hover:bg-red-50"
                                                    : "text-slate-700 hover:bg-gray-50"
                                                }`}
                                        >
                                            <Icon size={14} />
                                            {label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AdminNavbar