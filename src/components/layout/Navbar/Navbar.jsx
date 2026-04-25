import { Heart, Search, ShoppingCart, Store, UserRound, Sparkles } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useLocation, Link, useNavigate } from "react-router-dom"
import storex from "../../../assets/images/Logo/storex.png"
import SideDrawer from './SideDrawer'
import { useCart } from '../../../context/CartContext/CartContext'
import { useState } from 'react'
import { useProduct } from '../../../context/admin/ProductContext'
import Dropdown from '../SearchBar/Dropdown'
import { useAuth } from '../../../context/Auth/AuthContext'

const NAV_LINKS = [
    { to: "/product", label: "Store", Icon: Store },
    { to: "/wishlist", label: "Wishlist", Icon: Heart },
]

const Navbar = () => {
    const navigate = useNavigate()
    const { products } = useProduct()
    const { cartItems } = useCart()
    const { user,profile } = useAuth()
    const location = useLocation()

    const [query, setQuery] = useState('')
    const [show, setShow] = useState(false)
    const [focused, setFocused] = useState(false)

    const filtered = products.filter(p =>
        p.name?.toLowerCase().includes(query.toLowerCase())
    )

    const { scrollY } = useScroll()
    const navBg = useTransform(scrollY, [0, 60], ["rgba(255,255,255,0.7)", "rgba(255,255,255,0.92)"])
    const navShadow = useTransform(scrollY, [0, 60], ["0 0 0 rgba(37,99,235,0)", "0 4px 24px rgba(37,99,235,0.08)"])
    const navBorder = useTransform(scrollY, [0, 60], ["rgba(219,234,254,0.4)", "rgba(219,234,254,1)"])

    const isActive = (path) => location.pathname === path

    return (
        <motion.div
            style={{ backgroundColor: navBg, boxShadow: navShadow, borderColor: navBorder }}
            className="sticky top-0 z-40 w-full backdrop-blur-xl border-b"
        >
            <div className="grid grid-cols-12 w-full lg:px-16 xl:px-20 lg:py-3 p-2 gap-3 items-center">

                {/* ── Brand ── */}
                <div className="flex h-full lg:col-span-2 col-span-6 items-center gap-2.5">
                    <div className="md:hidden">
                        <SideDrawer />
                    </div>

                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500 rounded-xl blur-sm opacity-0 group-hover:opacity-30 transition-all duration-300" />
                            <img
                                className="relative md:h-9 md:w-9 h-7 w-7 border-2 border-blue-500 md:rounded-xl rounded-lg p-1 bg-white transition-transform duration-200 group-hover:scale-105"
                                src={storex}
                                alt="StoreX"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="md:text-xl text-lg font-black text-blue-600 tracking-tight leading-none">
                                StoreX
                            </span>
                            <span className="hidden md:block text-[9px] text-blue-400 font-semibold tracking-[0.15em] uppercase leading-none mt-0.5">
                                Shop Smarter
                            </span>
                        </div>
                    </Link>
                </div>

                {/* ── Search Bar ── */}
                <div className="relative flex justify-center items-center col-span-12 lg:col-span-7 lg:order-2">
                    <div className={`relative w-full flex items-center transition-all duration-300 ${focused ? "scale-[1.01]" : ""}`}>

                        {/* Input wrapper with glow */}
                        <div className={`relative flex-1 transition-all duration-300 ${focused
                            ? "drop-shadow-[0_0_12px_rgba(37,99,235,0.2)]"
                            : "drop-shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
                            }`}>
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
                            <input
                                value={query}
                                onChange={(e) => { setQuery(e.target.value); setShow(true) }}
                                onFocus={() => { setShow(true); setFocused(true) }}
                                onBlur={() => { setTimeout(() => setShow(false), 200); setFocused(false) }}
                                className="w-full h-11 rounded-l-2xl pl-11 pr-4 bg-gray-50/80 border border-r-0 border-blue-100 focus:border-blue-300 focus:bg-white focus:outline-none text-sm text-gray-700 placeholder-gray-400 transition-all duration-200"
                                type="text"
                                placeholder="Search for products, brands..."
                            />
                        </div>

                        {/* Search button */}
                        <button className="h-11 px-6 rounded-r-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-bold transition-all duration-200 border border-blue-600 hover:border-blue-700 flex items-center gap-2 shrink-0 shadow-md shadow-blue-500/20">
                            <Search className="w-3.5 h-3.5" />
                            <span className="hidden sm:block">Search</span>
                        </button>
                    </div>

                    {/* Dropdown */}
                    <div className="absolute left-0 right-0 top-13 z-50 mt-1">
                        <AnimatePresence>
                            {show && (
                                <Dropdown data={filtered} query={query} close={() => setShow(false)} />
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* ── Nav Icons ── */}
                <div className="flex items-center justify-end lg:col-span-3 col-span-6 lg:order-3">
                    <div className="flex items-center gap-1">

                        {/* Store + Wishlist */}
                        {NAV_LINKS.map(({ to, label, Icon }) => (
                            <Link key={to} to={to}>
                                <motion.div
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.94 }}
                                    className={`relative hidden md:flex flex-col items-center px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 ${isActive(to)
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-blue-500"
                                        }`}
                                >
                                    <Icon
                                        size={18}
                                        strokeWidth={isActive(to) ? 2.5 : 1.5}
                                        className="transition-all duration-200"
                                    />
                                    <span className={`text-[10px] font-semibold mt-0.5 transition-colors ${isActive(to) ? "text-blue-600" : "text-gray-400"
                                        }`}>
                                        {label}
                                    </span>
                                    {isActive(to) && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-blue-50 rounded-xl -z-10 border border-blue-100"
                                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                        />
                                    )}
                                </motion.div>
                            </Link>
                        ))}

                        {/* Cart */}
                        <Link to="/cart">
                            <motion.div
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.94 }}
                                className={`relative flex flex-col items-center px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 ${isActive("/cart")
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-blue-500"
                                    }`}
                            >
                                <div className="relative">
                                    <ShoppingCart
                                        size={18}
                                        strokeWidth={isActive("/cart") ? 2.5 : 1.5}
                                    />
                                    {cartItems.length > 0 && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-2 -right-2 w-4 h-4 bg-blue-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                                        >
                                            {cartItems.length > 9 ? "9+" : cartItems.length}
                                        </motion.div>
                                    )}
                                </div>
                                <span className={`text-[10px] font-semibold mt-0.5 ${isActive("/cart") ? "text-blue-600" : "text-gray-400"}`}>
                                    Cart
                                </span>
                                {isActive("/cart") && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-blue-50 rounded-xl -z-10 border border-blue-100"
                                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                    />
                                )}
                            </motion.div>
                        </Link>

                        {/* Profile / Login */}
                        {user ? (
                            <Link to={profile?.role === "admin" ? "/admin/dashboard" : "/profile"}>
                                <motion.div
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.94 }}
                                    className={`relative hidden md:flex flex-col items-center px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 ${isActive("/profile")
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-blue-500"
                                        }`}
                                >
                                    <UserRound
                                        size={18}
                                        strokeWidth={isActive("/profile") ? 2.5 : 1.5}
                                    />
                                    <span className={`text-[10px] font-semibold mt-0.5 ${isActive("/profile") ? "text-blue-600" : "text-gray-400"}`}>
                                        Profile
                                    </span>
                                    {isActive("/profile") && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-blue-50 rounded-xl -z-10 border border-blue-100"
                                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                        />
                                    )}
                                </motion.div>
                            </Link>
                        ) : (
                            <motion.button
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => navigate("/login")}
                                className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/20 ml-1"
                            >
                                <UserRound size={14} />
                                Sign In
                            </motion.button>
                        )}
                    </div>
                </div>

            </div>
        </motion.div>
    )
}

export default Navbar