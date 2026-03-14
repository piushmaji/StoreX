import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
    LayoutDashboard, Package, ShoppingBag, PlusCircle,
    Edit3, ChevronRight, Store, LogOut, Settings,
    ChevronLeft, Sparkles
} from "lucide-react"
import { useAuth } from "../../context/Auth/AuthContext"
import storex from "../../assets/images/Logo/storex.png"

const NAV = [
    {
        label: "Overview",
        items: [
            { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
            { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
        ]
    },
    {
        label: "Catalog",
        items: [
            { to: "/admin/products", label: "Products", icon: Package },
            { to: "/admin/products/add", label: "Add Product", icon: PlusCircle },
            { to: "/admin/products/edit/1", label: "Edit Product", icon: Edit3 },
        ]
    },
]

const AdminSidebar = ({ collapsed, setCollapsed }) => {
    const location = useLocation()
    const { logout } = useAuth()

    const isActive = (path) =>
        path === "/admin"
            ? location.pathname === "/admin"
            : location.pathname.startsWith(path)

    return (
        <motion.aside
            animate={{ width: collapsed ? 72 : 240 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-screen bg-slate-900 flex flex-col border-r border-slate-800 shrink-0 overflow-hidden"
        >
            {/* Top accent */}
            <div className="h-[2px] w-full bg-gradient-to-r from-blue-600 via-blue-400 to-transparent" />

            {/* Brand */}
            <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-800">
                <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-blue-500 rounded-xl blur-sm opacity-40" />
                    <img src={storex} className="relative w-9 h-9 rounded-xl border-2 border-blue-500 p-1 bg-slate-800" />
                </div>
                <AnimatePresence>
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <p className="text-white font-black text-lg tracking-tight leading-none">StoreX</p>
                            <p className="text-blue-400 text-[10px] font-bold tracking-widest uppercase mt-0.5">Admin Panel</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-4 space-y-5 px-3">
                {NAV.map(group => (
                    <div key={group.label}>
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-[9px] font-black text-slate-500 uppercase tracking-[0.18em] px-2 mb-2"
                                >
                                    {group.label}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <div className="space-y-1">
                            {group.items.map(({ to, label, icon: Icon }) => {
                                const active = isActive(to)
                                return (
                                    <Link key={to} to={to}>
                                        <motion.div
                                            whileHover={{ x: collapsed ? 0 : 3 }}
                                            whileTap={{ scale: 0.97 }}
                                            className={`relative flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer group ${active
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                                }`}
                                        >
                                            <Icon size={18} strokeWidth={active ? 2.5 : 1.8} className="shrink-0" />

                                            <AnimatePresence>
                                                {!collapsed && (
                                                    <motion.span
                                                        initial={{ opacity: 0, x: -6 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -6 }}
                                                        transition={{ duration: 0.18 }}
                                                        className="text-sm font-semibold truncate flex-1"
                                                    >
                                                        {label}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>

                                            {active && !collapsed && (
                                                <ChevronRight size={14} className="shrink-0 opacity-70" />
                                            )}

                                            {/* Tooltip when collapsed */}
                                            {collapsed && (
                                                <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-800 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-slate-700">
                                                    {label}
                                                </div>
                                            )}
                                        </motion.div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Bottom */}
            <div className="px-3 py-4 border-t border-slate-800 space-y-1">
                <Link to="/">
                    <motion.div
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all cursor-pointer group"
                    >
                        <Store size={18} strokeWidth={1.8} className="shrink-0" />
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm font-semibold">
                                    View Store
                                </motion.span>
                            )}
                        </AnimatePresence>
                        {collapsed && (
                            <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-800 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-slate-700">
                                View Store
                            </div>
                        )}
                    </motion.div>
                </Link>

                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer group"
                >
                    <LogOut size={18} strokeWidth={1.8} className="shrink-0" />
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm font-semibold">
                                Logout
                            </motion.span>
                        )}
                    </AnimatePresence>
                    {collapsed && (
                        <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-800 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-slate-700">
                            Logout
                        </div>
                    )}
                </motion.button>
            </div>

            {/* Collapse toggle */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-20 w-6 h-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 border-2 border-slate-900 transition-colors z-10"
            >
                <motion.div animate={{ rotate: collapsed ? 0 : 180 }} transition={{ duration: 0.3 }}>
                    <ChevronLeft size={12} strokeWidth={3} />
                </motion.div>
            </motion.button>
        </motion.aside>
    )
}

export default AdminSidebar