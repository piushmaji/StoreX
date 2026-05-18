import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    ShoppingBag, Package, Users, ArrowUpRight, ArrowDownRight,
    Clock, CheckCircle2, XCircle, Truck, Star, Calendar,
    Layers, DollarSign, X, AlertTriangle, Sparkle, Check,
    Copy, Printer, Activity
} from "lucide-react"
import { toast } from "react-hot-toast"
import {
    ResponsiveContainer, AreaChart, Area, XAxis,
    YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend
} from "recharts"

// ─── Multi-Timeframe Mock Datasets ────────────────────────────────────────────
const STATS_DATA = {
    "7D": [
        {
            label: "Total Revenue",
            value: "₹2,84,920",
            change: "+12.5%",
            up: true,
            sub: "vs last 7 days",
            icon: DollarSign,
            color: "blue",
            iconBg: "bg-blue-600",
            sparkPath: "M0,25 Q15,5 30,20 T60,8 T90,3 T120,12",
            targetPct: 78,
        },
        {
            label: "Total Orders",
            value: "1,284",
            change: "+8.2%",
            up: true,
            sub: "vs last 7 days",
            icon: ShoppingBag,
            color: "violet",
            iconBg: "bg-violet-600",
            sparkPath: "M0,20 Q15,10 30,25 T60,18 T90,5 T120,8",
            targetPct: 64,
        },
        {
            label: "Total Products",
            value: "342",
            change: "+4",
            up: true,
            sub: "added this week",
            icon: Package,
            color: "emerald",
            iconBg: "bg-emerald-600",
            sparkPath: "M0,28 Q15,25 30,20 T60,16 T90,12 T120,4",
            targetPct: 92,
        },
        {
            label: "Total Customers",
            value: "8,920",
            change: "-2.1%",
            up: false,
            sub: "vs last 7 days",
            icon: Users,
            color: "amber",
            iconBg: "bg-amber-500",
            sparkPath: "M0,8 Q15,15 30,10 T60,20 T90,18 T120,27",
            targetPct: 45,
        },
    ],
    "1M": [
        {
            label: "Total Revenue",
            value: "₹12,48,200",
            change: "+15.8%",
            up: true,
            sub: "vs last month",
            icon: DollarSign,
            color: "blue",
            iconBg: "bg-blue-600",
            sparkPath: "M0,28 Q15,10 30,18 T60,8 T90,2 T120,5",
            targetPct: 82,
        },
        {
            label: "Total Orders",
            value: "5,420",
            change: "+11.4%",
            up: true,
            sub: "vs last month",
            icon: ShoppingBag,
            color: "violet",
            iconBg: "bg-violet-600",
            sparkPath: "M0,25 Q15,15 30,22 T60,10 T90,4 T120,6",
            targetPct: 76,
        },
        {
            label: "Total Products",
            value: "356",
            change: "+18",
            up: true,
            sub: "added this month",
            icon: Package,
            color: "emerald",
            iconBg: "bg-emerald-600",
            sparkPath: "M0,26 Q15,22 30,19 T60,15 T90,10 T120,6",
            targetPct: 88,
        },
        {
            label: "Total Customers",
            value: "9,230",
            change: "+4.6%",
            up: true,
            sub: "vs last month",
            icon: Users,
            color: "amber",
            iconBg: "bg-amber-500",
            sparkPath: "M0,24 Q15,20 30,18 T60,15 T90,8 T120,5",
            targetPct: 58,
        },
    ],
    "3M": [
        {
            label: "Total Revenue",
            value: "₹38,91,400",
            change: "+22.3%",
            up: true,
            sub: "vs last quarter",
            icon: DollarSign,
            color: "blue",
            iconBg: "bg-blue-600",
            sparkPath: "M0,30 Q15,20 30,22 T60,12 T90,4 T120,2",
            targetPct: 89,
        },
        {
            label: "Total Orders",
            value: "16,840",
            change: "+18.9%",
            up: true,
            sub: "vs last quarter",
            icon: ShoppingBag,
            color: "violet",
            iconBg: "bg-violet-600",
            sparkPath: "M0,28 Q15,20 30,24 T60,12 T90,5 T120,3",
            targetPct: 85,
        },
        {
            label: "Total Products",
            value: "382",
            change: "+44",
            up: true,
            sub: "added last 90 days",
            icon: Package,
            color: "emerald",
            iconBg: "bg-emerald-600",
            sparkPath: "M0,28 Q15,24 30,20 T60,16 T90,8 T120,3",
            targetPct: 95,
        },
        {
            label: "Total Customers",
            value: "10,840",
            change: "+12.1%",
            up: true,
            sub: "vs last quarter",
            icon: Users,
            color: "amber",
            iconBg: "bg-amber-500",
            sparkPath: "M0,26 Q15,20 30,18 T60,12 T90,6 T120,4",
            targetPct: 70,
        },
    ],
    "1Y": [
        {
            label: "Total Revenue",
            value: "₹1.64 Cr",
            change: "+48.2%",
            up: true,
            sub: "vs last fiscal year",
            icon: DollarSign,
            color: "blue",
            iconBg: "bg-blue-600",
            sparkPath: "M0,30 Q15,25 30,20 T60,10 T90,3 T120,1",
            targetPct: 94,
        },
        {
            label: "Total Orders",
            value: "72,900",
            change: "+35.4%",
            up: true,
            sub: "vs last fiscal year",
            icon: ShoppingBag,
            color: "violet",
            iconBg: "bg-violet-600",
            sparkPath: "M0,29 Q15,22 30,18 T60,8 T90,4 T120,2",
            targetPct: 91,
        },
        {
            label: "Total Products",
            value: "420",
            change: "+82",
            up: true,
            sub: "added last 365 days",
            icon: Package,
            color: "emerald",
            iconBg: "bg-emerald-600",
            sparkPath: "M0,29 Q15,25 30,22 T60,18 T90,10 T120,2",
            targetPct: 98,
        },
        {
            label: "Total Customers",
            value: "14,890",
            change: "+28.7%",
            up: true,
            sub: "vs last fiscal year",
            icon: Users,
            color: "amber",
            iconBg: "bg-amber-500",
            sparkPath: "M0,28 Q15,24 30,20 T60,14 T90,8 T120,2",
            targetPct: 82,
        },
    ]
}

const REVENUE_CHART_DATA = {
    "7D": [
        { name: "Mon", Revenue: 34200, Orders: 112 },
        { name: "Tue", Revenue: 45100, Orders: 148 },
        { name: "Wed", Revenue: 28900, Orders: 95 },
        { name: "Thu", Revenue: 56400, Orders: 182 },
        { name: "Fri", Revenue: 48200, Orders: 154 },
        { name: "Sat", Revenue: 61200, Orders: 198 },
        { name: "Sun", Revenue: 70920, Orders: 225 },
    ],
    "1M": [
        { name: "Week 1", Revenue: 280000, Orders: 920 },
        { name: "Week 2", Revenue: 310000, Orders: 1020 },
        { name: "Week 3", Revenue: 295000, Orders: 980 },
        { name: "Week 4", Revenue: 363200, Orders: 1210 },
    ],
    "3M": [
        { name: "March", Revenue: 1190000, Orders: 3920 },
        { name: "April", Revenue: 1340000, Orders: 4380 },
        { name: "May", Revenue: 1561400, Orders: 5140 },
    ],
    "1Y": [
        { name: "Q1", Revenue: 3620000, Orders: 12400 },
        { name: "Q2", Revenue: 3940000, Orders: 13800 },
        { name: "Q3", Revenue: 4290000, Orders: 15100 },
        { name: "Q4", Revenue: 5640000, Orders: 20400 },
    ]
}

const DONUT_CHART_DATA = {
    "7D": [
        { name: "Delivered", value: 72, color: "#10b981" },
        { name: "Shipped", value: 18, color: "#3b82f6" },
        { name: "Pending", value: 7, color: "#f59e0b" },
        { name: "Cancelled", value: 3, color: "#ef4444" },
    ],
    "1M": [
        { name: "Delivered", value: 75, color: "#10b981" },
        { name: "Shipped", value: 15, color: "#3b82f6" },
        { name: "Pending", value: 8, color: "#f59e0b" },
        { name: "Cancelled", value: 2, color: "#ef4444" },
    ],
    "3M": [
        { name: "Delivered", value: 78, color: "#10b981" },
        { name: "Shipped", value: 14, color: "#3b82f6" },
        { name: "Pending", value: 6, color: "#f59e0b" },
        { name: "Cancelled", value: 2, color: "#ef4444" },
    ],
    "1Y": [
        { name: "Delivered", value: 82, color: "#10b981" },
        { name: "Shipped", value: 12, color: "#3b82f6" },
        { name: "Pending", value: 4, color: "#f59e0b" },
        { name: "Cancelled", value: 2, color: "#ef4444" },
    ]
}

const TOP_PRODUCTS = [
    { name: "Denim Trucker Jacket", sold: 284, revenue: "₹4.8L", rating: 4.8, img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&q=80" },
    { name: "Premium Fleece Hoodie", sold: 219, revenue: "₹2.2L", rating: 4.6, img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=100&q=80" },
    { name: "Thermal Base Layer", sold: 198, revenue: "₹1.2L", rating: 4.9, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80" },
    { name: "Windcheater Shell Jacket", sold: 156, revenue: "₹2.2L", rating: 4.5, img: "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=100&q=80" },
]

const LOW_STOCK_PRODUCTS = [
    { name: "Linen Summer Shirt", stock: 0, category: "Luxury", price: "₹2,499", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&q=80" },
    { name: "Silk Evening Dress", stock: 8, category: "Luxury", price: "₹8,999", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&q=80" },
    { name: "Premium Oversized Hoodie", stock: 12, category: "Luxury", price: "₹2,999", img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=100&q=80" },
]

const INITIAL_RECENT_ORDERS = [
    {
        id: "STX-28451",
        customer: "Aryan Sharma",
        email: "aryan@gmail.com",
        phone: "+91 98765 43210",
        address: "A-404, Shanti Nagar, Mumbai, MH - 400101",
        date: "May 18, 2026 • 11:23 PM",
        method: "UPI (GooglePay)",
        product: "Thermal Base Layer",
        price: "₹599",
        quantity: 1,
        amount: "₹599",
        discount: "₹0",
        shipping: "₹0",
        total: "₹599",
        status: "delivered",
        time: "2m ago",
        productImg: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80"
    },
    {
        id: "STX-28450",
        customer: "Priya Singh",
        email: "priya.s@yahoo.com",
        phone: "+91 87654 32109",
        address: "Flat 12B, Ocean View Heights, Worli, Mumbai, MH - 400018",
        date: "May 18, 2026 • 11:07 PM",
        method: "Credit Card (HDFC)",
        product: "Denim Trucker Jacket",
        price: "₹1,699",
        quantity: 1,
        amount: "₹1,699",
        discount: "₹200",
        shipping: "₹0",
        total: "₹1,499",
        status: "pending",
        time: "18m ago",
        productImg: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&q=80"
    },
    {
        id: "STX-28449",
        customer: "Rahul Verma",
        email: "rahul.verma@outlook.com",
        phone: "+91 76543 21098",
        address: "H.No 89, Sector 15, Noida, UP - 201301",
        date: "May 18, 2026 • 10:25 PM",
        method: "UPI (PhonePe)",
        product: "Premium Fleece Hoodie",
        price: "₹999",
        quantity: 1,
        amount: "₹999",
        discount: "₹50",
        shipping: "₹0",
        total: "₹949",
        status: "shipped",
        time: "1h ago",
        productImg: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=100&q=80"
    },
    {
        id: "STX-28448",
        customer: "Sneha Patel",
        email: "sneha.p@gmail.com",
        phone: "+91 95432 10987",
        address: "45, Royal Enclave, Juhu, Mumbai, MH - 400049",
        date: "May 18, 2026 • 08:25 PM",
        method: "Net Banking (SBI)",
        product: "Windcheater Shell Jacket",
        price: "₹1,399",
        quantity: 1,
        amount: "₹1,399",
        discount: "₹0",
        shipping: "₹0",
        total: "₹1,399",
        status: "delivered",
        time: "3h ago",
        productImg: "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=100&q=80"
    },
    {
        id: "STX-28447",
        customer: "Rohan Kapoor",
        email: "rohan.k@gmail.com",
        phone: "+91 91234 56789",
        address: "12A, DLF Phase 3, Gurugram, HR - 122002",
        date: "May 18, 2026 • 06:25 PM",
        method: "Cash on Delivery",
        product: "Cotton Oversized Tee",
        price: "₹449",
        quantity: 1,
        amount: "₹449",
        discount: "₹0",
        shipping: "₹0",
        total: "₹449",
        status: "cancelled",
        time: "5h ago",
        productImg: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80"
    },
    {
        id: "STX-28446",
        customer: "Meera Joshi",
        email: "meera.j@gmail.com",
        phone: "+91 90123 45678",
        address: "234, Park Street, Kolkata, WB - 700016",
        date: "May 18, 2026 • 05:25 PM",
        method: "UPI (BharatPe)",
        product: "Thermal Base Layer",
        price: "₹599",
        quantity: 1,
        amount: "₹599",
        discount: "₹0",
        shipping: "₹0",
        total: "₹599",
        status: "pending",
        time: "6h ago",
        productImg: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80"
    },
]

const STATUS_CONFIG = {
    delivered: { label: "Delivered", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
    pending: { label: "Pending", icon: Clock, color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
    shipped: { label: "Shipped", icon: Truck, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
    cancelled: { label: "Cancelled", icon: XCircle, color: "text-red-500", bg: "bg-red-50 border-red-100" },
}

// ─── Reusable Glass Card ──────────────────────────────────────────────────────
const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.035)] transition-all duration-300 overflow-hidden ${className}`}>
        {children}
    </div>
)

// ─── Fade animation wrapper ───────────────────────────────────────────────────
const Fade = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
        className={className}
    >
        {children}
    </motion.div>
)

const AdminDashboard = () => {
    // States
    const [timeframe, setTimeframe] = useState("7D")
    const [currentTime, setCurrentTime] = useState(new Date())
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [recentOrders, setRecentOrders] = useState(INITIAL_RECENT_ORDERS)
    const [activityLog, setActivityLog] = useState([
        { id: 1, text: "Order #STX-28451 was paid & processed successfully", time: "2m ago", type: "success" },
        { id: 2, text: "Product 'Linen Summer Shirt' inventory dropped to 0", time: "15m ago", type: "warning" },
        { id: 3, text: "Customer Aryan Sharma added Denim Trucker to wishlist", time: "45m ago", type: "info" },
        { id: 4, text: "New 5-Star review received from Sneha Patel", time: "3h ago", type: "review" },
        { id: 5, text: "Weekly system health report generated", time: "5h ago", type: "system" }
    ])
    const [copiedId, setCopiedId] = useState(null)
    const [newStatus, setNewStatus] = useState("")

    // Running Clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    // Dynamic Greeting String
    const getGreeting = () => {
        const hour = currentTime.getHours()
        if (hour < 12) return { text: "Good Morning, Admin!", sub: "Rise and shine ☀️ Let's hit today's sales goals!" }
        if (hour < 17) return { text: "Good Afternoon, Admin!", sub: "Operations running smooth ⚡ All systems nominal." }
        return { text: "Good Evening, Admin!", sub: "Wrapping up a strong day 🌙 View today's stats below." }
    }
    const greeting = getGreeting()

    // Format Digital Clock
    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
    }

    // Format Date String
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
    }

    // Copy to clipboard helper
    const handleCopy = (text, type = "Order ID") => {
        navigator.clipboard.writeText(text)
        setCopiedId(text)
        toast.success(`${type} copied to clipboard!`)
        setTimeout(() => setCopiedId(null), 2000)
    }

    // Restock stock helper
    const handleRestock = (productName) => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 800)),
            {
                loading: 'Generating restock request...',
                success: `Restocked request for '${productName}' sent to supplier!`,
                error: 'Could not send request.',
            }
        )
    }

    // Update order status from drawer
    const handleStatusUpdate = (orderId) => {
        if (!newStatus) return
        setRecentOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                const updated = { ...order, status: newStatus }
                // Set the active details drawer state to updated order so it renders immediately
                setSelectedOrder(updated)
                return updated
            }
            return order
        }))

        // Log this action
        const newLog = {
            id: Date.now(),
            text: `Order #${orderId} status was manually updated to '${newStatus}'`,
            time: "Just now",
            type: newStatus === "delivered" ? "success" : newStatus === "cancelled" ? "warning" : "info"
        }
        setActivityLog(prev => [newLog, ...prev])

        toast.success(`Order #${orderId} updated to ${newStatus.toUpperCase()}`)
    }

    // Simulated charts custom tooltip
    const CustomAreaTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 p-3.5 rounded-2xl shadow-xl text-white">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                    <p className="text-sm font-black mt-1 text-blue-400">Revenue: ₹{payload[0].value.toLocaleString()}</p>
                    {payload[1] && <p className="text-xs font-bold text-violet-400 mt-0.5">Orders: {payload[1].value}</p>}
                </div>
            )
        }
        return null
    }

    const CustomPieTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 px-3 py-2 rounded-xl shadow-xl text-white text-xs font-bold">
                    {payload[0].name}: {payload[0].value}%
                </div>
            )
        }
        return null
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10" style={{ fontFamily: "'Sora', sans-serif" }}>

            {/* ── Greeting Banner Widget (Hero) ── */}
            <Fade delay={0.02}>
                <div className="relative overflow-hidden rounded-[32px] bg-linear-to-br from-slate-900 via-slate-950 to-blue-950 p-6 md:p-8 text-white shadow-xl">
                    {/* Glowing background accent circles */}
                    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full w-fit border border-white/5">
                                <Sparkle size={12} className="text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
                                <span className="text-[10px] font-black tracking-widest uppercase">Operational Console</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{greeting.text}</h1>
                            <p className="text-slate-400 text-xs md:text-sm mt-1 font-medium">{greeting.sub}</p>
                        </div>

                        {/* Calendar & Digital Live Clock */}
                        <div className="flex items-center gap-4 bg-slate-900/60 backdrop-blur-md border border-white/5 p-4 rounded-2xl w-full md:w-auto shadow-inner">
                            <Calendar size={20} className="text-blue-400 shrink-0" />
                            <div className="min-w-0">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{formatDate(currentTime)}</p>
                                <p className="text-base font-black tracking-wide text-blue-50 mt-0.5 tabular-nums">{formatTime(currentTime)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>

            {/* ── Timeline Select Tabs & Quick Controls ── */}
            <Fade delay={0.06}>
                <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-3 rounded-2xl border border-gray-100 gap-4 shadow-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                            <Activity size={15} />
                        </div>
                        <div>
                            <p className="text-xs font-extrabold text-slate-700">Analytical Filters</p>
                            <p className="text-[10px] text-slate-400 font-medium">Dynamic timeline adjustment</p>
                        </div>
                    </div>

                    {/* Styled Pill Filter Switcher */}
                    <div className="flex bg-slate-100/80 p-1.5 rounded-xl border border-gray-100">
                        {["7D", "1M", "3M", "1Y"].map((t) => (
                            <button
                                key={t}
                                onClick={() => {
                                    setTimeframe(t)
                                    toast.success(`Dashboard data updated for timeframe: ${t === "7D" ? "Last 7 Days" : t === "1M" ? "Last Month" : t === "3M" ? "Last Quarter" : "Last Year"}`, {
                                        id: 'timeframe-switch',
                                        icon: '⏱️',
                                    })
                                }}
                                className={`relative px-4 py-1.5 text-xs font-black tracking-wide rounded-lg transition-all ${timeframe === t
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-slate-500 hover:text-slate-800"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </Fade>

            {/* ── Advanced Stats Cards Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {STATS_DATA[timeframe].map((stat, i) => {
                    const Icon = stat.icon
                    const isUp = stat.up
                    return (
                        <Fade key={stat.label} delay={i * 0.08}>
                            <Card className="p-6 relative group cursor-default">
                                {/* Border Gradient Accent */}
                                <div className={`absolute top-0 inset-x-0 h-1 bg-linear-to-r ${stat.color === 'blue' ? 'from-blue-500 to-sky-400' : stat.color === 'violet' ? 'from-violet-500 to-purple-400' : stat.color === 'emerald' ? 'from-emerald-500 to-teal-400' : 'from-amber-500 to-orange-400'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 ${stat.iconBg} rounded-2xl flex items-center justify-center shadow-md shadow-blue-500/5 group-hover:scale-105 transition-transform duration-200`}>
                                        <Icon size={20} className="text-white" strokeWidth={2.2} />
                                    </div>

                                    {/* SVG Sparkline */}
                                    <div className="w-18 h-8 self-center shrink-0">
                                        <svg className={`w-full h-full ${isUp ? 'text-emerald-500' : 'text-red-500'} fill-none`} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                                            <path d={stat.sparkPath} />
                                        </svg>
                                    </div>

                                    <span className={`text-[11px] font-black flex items-center gap-0.5 px-2.5 py-1 rounded-full border ${isUp
                                        ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                                        : "bg-red-50 border-red-100 text-red-500"
                                        }`}>
                                        {isUp ? <ArrowUpRight size={11} strokeWidth={3.5} /> : <ArrowDownRight size={11} strokeWidth={3.5} />}
                                        {stat.change}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                    <p className="text-2xl font-black text-slate-900 leading-none">{stat.value}</p>
                                </div>

                                {/* Custom target tracking progress indicator */}
                                <div className="mt-4 pt-4 border-t border-slate-50 space-y-1.5">
                                    <div className="flex justify-between text-[10px] font-extrabold text-slate-400">
                                        <span className="uppercase tracking-wider">Goal Progress</span>
                                        <span>{stat.targetPct}%</span>
                                    </div>
                                    <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${stat.targetPct}%` }}
                                            transition={{ delay: 0.3 + i * 0.08, duration: 0.75 }}
                                            className={`h-full bg-linear-to-r ${stat.color === 'blue' ? 'from-blue-500 to-sky-400' : stat.color === 'violet' ? 'from-violet-500 to-purple-400' : stat.color === 'emerald' ? 'from-emerald-500 to-teal-400' : 'from-amber-500 to-orange-400'} rounded-full`}
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-semibold mt-1">{stat.sub}</p>
                                </div>
                            </Card>
                        </Fade>
                    )
                })}
            </div>

            {/* ── Recharts Trend Chart & Donut breakdowns ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Sales Area Chart */}
                <Fade delay={0.28} className="xl:col-span-2">
                    <Card>
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-50">
                            <div>
                                <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Revenue & Volume Trend</h2>
                                <p className="text-xs text-slate-400 font-semibold mt-0.5">Timeframe timeline index overview</p>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-bold text-slate-400 shrink-0">
                                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-blue-600 block" /> Revenue</span>
                                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-violet-500 block" /> Orders</span>
                            </div>
                        </div>

                        {/* Interactive Area Chart */}
                        <div className="px-6 py-6 select-none">
                            <div className="h-68">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={REVENUE_CHART_DATA[timeframe]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                                            </linearGradient>
                                            <linearGradient id="colorOrd" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="name"
                                            stroke="#94a3b8"
                                            fontSize={10}
                                            fontWeight={800}
                                            tickLine={false}
                                            axisLine={false}
                                            dy={10}
                                        />
                                        <YAxis
                                            stroke="#94a3b8"
                                            fontSize={10}
                                            fontWeight={800}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip content={<CustomAreaTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="Revenue"
                                            stroke="#2563eb"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorRev)"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="Orders"
                                            stroke="#8b5cf6"
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorOrd)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </Card>
                </Fade>

                {/* Donut Order Breakdown */}
                <Fade delay={0.34}>
                    <Card className="flex flex-col h-full">
                        <div className="px-6 py-5 border-b border-slate-50">
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Order Status Distribution</h2>
                            <p className="text-xs text-slate-400 font-semibold mt-0.5">Ratio and efficiency percentages</p>
                        </div>

                        <div className="flex-1 flex flex-col justify-center items-center py-6 px-4">
                            <div className="h-44 w-full relative flex items-center justify-center select-none">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Tooltip content={<CustomPieTooltip />} />
                                        <Pie
                                            data={DONUT_CHART_DATA[timeframe]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={4}
                                            dataKey="value"
                                        >
                                            {DONUT_CHART_DATA[timeframe].map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute text-center">
                                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">Delivered ratio</p>
                                    <p className="text-2xl font-black text-slate-900 mt-1 leading-none">
                                        {DONUT_CHART_DATA[timeframe][0].value}%
                                    </p>
                                </div>
                            </div>

                            {/* Donut Legend */}
                            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 w-full px-2">
                                {DONUT_CHART_DATA[timeframe].map((item) => (
                                    <div key={item.name} className="flex items-center justify-between gap-2 border-b border-slate-50 pb-1 last:border-0 md:last:border-b">
                                        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                            {item.name}
                                        </span>
                                        <span className="text-xs font-black text-slate-800">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </Fade>
            </div>

            {/* ── Recent Orders + Bento Widgets Grid ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Recent Orders List Widget */}
                <Fade delay={0.4} className="xl:col-span-2">
                    <Card>
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-50">
                            <div>
                                <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Recent Orders Listing</h2>
                                <p className="text-xs text-slate-400 font-semibold mt-0.5">Click any row for premium order management & invoice processing</p>
                            </div>
                            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 uppercase tracking-widest">
                                Live Feeds
                            </span>
                        </div>

                        <div className="divide-y divide-slate-50 overflow-x-auto">
                            {recentOrders.map((order, i) => {
                                const cfg = STATUS_CONFIG[order.status]
                                const StatusIcon = cfg.icon
                                return (
                                    <motion.div
                                        key={order.id}
                                        whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.7)" }}
                                        onClick={() => {
                                            setSelectedOrder(order)
                                            setNewStatus(order.status)
                                        }}
                                        className="flex items-center gap-4 px-6 py-4.5 transition-colors cursor-pointer"
                                    >
                                        {/* Avatar initials with beautiful linear gradient */}
                                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 via-indigo-500 to-violet-600 flex items-center justify-center shrink-0 shadow-sm">
                                            <span className="text-white text-xs font-black">
                                                {order.customer.split(" ").map(w => w[0]).join("")}
                                            </span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="text-xs font-black text-slate-800 truncate">{order.customer}</p>
                                                <span className="text-[9px] text-slate-400 shrink-0 font-bold uppercase tracking-wider">{order.time}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 truncate mt-0.5">{order.product}</p>
                                        </div>

                                        {/* ID badge */}
                                        <div className="hidden sm:block shrink-0 px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg">
                                            <span className="font-mono text-[10px] text-slate-400 font-black">{order.id}</span>
                                        </div>

                                        <div className="text-right shrink-0">
                                            <p className="text-sm font-black text-slate-900">{order.amount}</p>
                                            <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border mt-1 ${cfg.bg} ${cfg.color}`}>
                                                <StatusIcon size={9} strokeWidth={3.5} />
                                                {cfg.label}
                                            </span>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </Card>
                </Fade>

                {/* Top Products Volume List */}
                <Fade delay={0.46}>
                    <Card className="h-full">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-50">
                            <div>
                                <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Top Selling Catalog</h2>
                                <p className="text-xs text-slate-400 font-semibold mt-0.5">By sales volume ranking</p>
                            </div>
                            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">
                                High Rank
                            </span>
                        </div>

                        <div className="p-5 space-y-4">
                            {TOP_PRODUCTS.map((p, i) => (
                                <div
                                    key={p.name}
                                    className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors duration-200"
                                >
                                    <div className="relative shrink-0 select-none">
                                        <img src={p.img} className="w-12 h-12 rounded-xl object-cover border border-slate-100" />
                                        <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-slate-900 border border-white text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-md">
                                            {i + 1}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-black text-slate-700 truncate">{p.name}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <div className="flex items-center gap-0.5">
                                                <Star size={10} className="text-amber-400 fill-amber-400" />
                                                <span className="text-[10px] text-slate-500 font-bold">{p.rating}</span>
                                            </div>
                                            <span className="text-slate-200">•</span>
                                            <span className="text-[10px] text-slate-400 font-bold">{p.sold} units sold</span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-xs font-black text-blue-600 bg-blue-50/50 border border-blue-50 px-2 py-0.5 rounded-lg">{p.revenue}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Fade>
            </div>

            {/* ── Bento widgets: Low Stock alerts & Live activity logs ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Low Stock Alerts */}
                <Fade delay={0.52}>
                    <Card className="h-full">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-50">
                            <div>
                                <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                    <AlertTriangle size={15} className="text-amber-500" /> Stock Monitor
                                </h2>
                                <p className="text-xs text-slate-400 font-semibold mt-0.5">Critical restock threshold alarms</p>
                            </div>
                        </div>

                        <div className="p-5 space-y-4">
                            {LOW_STOCK_PRODUCTS.map((prod) => (
                                <div key={prod.name} className="p-3 bg-slate-50/80 border border-slate-100 rounded-2xl flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <img src={prod.img} className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-200" />
                                        <div className="min-w-0">
                                            <p className="text-xs font-black text-slate-800 truncate">{prod.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 mt-0.5">Price: {prod.price}</p>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0 flex flex-col items-end gap-1">
                                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${prod.stock === 0 ? "bg-red-50 border-red-100 text-red-600" : "bg-amber-50 border-amber-100 text-amber-600"}`}>
                                            {prod.stock === 0 ? "Out Of Stock" : `${prod.stock} Left`}
                                        </span>
                                        <button
                                            onClick={() => handleRestock(prod.name)}
                                            className="text-[9px] font-extrabold text-blue-600 hover:text-blue-700 bg-white hover:bg-slate-100 px-2 py-1 rounded border border-slate-200 transition-colors"
                                        >
                                            Restock
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Fade>

                {/* Operations Checklist (Progress tracker) */}
                <Fade delay={0.58}>
                    <Card className="h-full">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-50">
                            <div>
                                <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                    <Activity size={15} className="text-indigo-500" /> System Metrics
                                </h2>
                                <p className="text-xs text-slate-400 font-semibold mt-0.5">Core KPI operational progress</p>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            {[
                                { name: "Shipping Dispatch Speed", count: "94.8%", progress: 94.8, color: "bg-blue-600" },
                                { name: "Order Payment Success", count: "99.2%", progress: 99.2, color: "bg-emerald-500" },
                                { name: "Stock Fulfillment Ratio", count: "87.5%", progress: 87.5, color: "bg-violet-500" },
                                { name: "Customer Rating Standard", count: "4.8 / 5.0", progress: 96, color: "bg-amber-500" },
                            ].map((row) => (
                                <div key={row.name} className="space-y-1.5">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-slate-600">{row.name}</span>
                                        <span className="font-black text-slate-900">{row.count}</span>
                                    </div>
                                    <div className="h-2 bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.progress}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Fade>

                {/* Simulated Audit Feed logs */}
                <Fade delay={0.64}>
                    <Card className="h-full">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-50">
                            <div>
                                <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                    <Layers size={15} className="text-violet-500" /> Audit Log Feed
                                </h2>
                                <p className="text-xs text-slate-400 font-semibold mt-0.5">Automated admin operation logs</p>
                            </div>
                        </div>

                        <div className="p-5 space-y-4 max-h-[300px] overflow-y-auto no-scrollbar">
                            {activityLog.map((log) => (
                                <div key={log.id} className="flex gap-2.5 text-xs pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-slate-600 tracking-tight leading-relaxed">{log.text}</p>
                                        <span className="text-[9px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider block">{log.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Fade>
            </div>

            {/* ── Detailed Spring-driven Slide drawer from right ── */}
            <AnimatePresence>
                {selectedOrder && (
                    <>
                        {/* Glass backdrop overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrder(null)}
                            className="fixed inset-0 bg-slate-950/20 backdrop-blur-xs z-[99]"
                        />

                        {/* Drawer body */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 26, stiffness: 220 }}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[100] shadow-2xl flex flex-col overflow-hidden border-l border-slate-100"
                        >
                            {/* Drawer Header */}
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-black text-slate-900 tracking-tight">Order Inspection</h3>
                                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 border rounded-full ${STATUS_CONFIG[selectedOrder.status].bg} ${STATUS_CONFIG[selectedOrder.status].color}`}>
                                            {selectedOrder.status}
                                        </span>
                                    </div>
                                    <p className="text-xs font-mono font-black text-slate-400 mt-1">Invoice ID: {selectedOrder.id}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center shadow-xs"
                                >
                                    <X size={16} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Drawer scroll content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">

                                {/* Delivery Timeline Step Progress Tracker */}
                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3.5">Fulfillment Pipeline</p>

                                    <div className="relative flex justify-between items-center px-2 select-none">
                                        {/* Connector Track Bar */}
                                        <div className="absolute top-3 left-6 right-6 h-0.5 bg-slate-200 -z-10" />
                                        <div className="absolute top-3 left-6 h-0.5 bg-blue-500 -z-10 transition-all duration-300" style={{
                                            width: selectedOrder.status === 'pending' ? '0%' : selectedOrder.status === 'shipped' ? '50%' : selectedOrder.status === 'delivered' ? '100%' : '0%'
                                        }} />

                                        {[
                                            { label: "Placed", check: true },
                                            { label: "Paid", check: true },
                                            { label: "Shipped", check: selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered' },
                                            { label: "Delivered", check: selectedOrder.status === 'delivered' }
                                        ].map((step, idx) => (
                                            <div key={idx} className="flex flex-col items-center gap-1.5">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${step.check
                                                    ? "bg-blue-600 border-blue-600 text-white"
                                                    : "bg-white border-slate-200 text-slate-400"
                                                    }`}>
                                                    {step.check ? <Check size={11} strokeWidth={3} /> : <span className="text-[9px] font-bold">{idx + 1}</span>}
                                                </div>
                                                <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">{step.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Items summary list */}
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ordered Product Items</p>
                                    <div className="p-3 border border-slate-100 rounded-2xl flex items-center gap-3 bg-white hover:bg-slate-50 transition-colors">
                                        <img src={selectedOrder.productImg} className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-100" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-black text-slate-800 truncate">{selectedOrder.product}</p>
                                            <p className="text-[10px] font-bold text-slate-400 mt-0.5">Quantity: {selectedOrder.quantity} • Unit: {selectedOrder.price}</p>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <p className="text-xs font-black text-slate-800">{selectedOrder.amount}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Profile */}
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Details</p>
                                    <div className="p-4 bg-white border border-slate-100 rounded-2xl space-y-3.5">
                                        <div className="flex justify-between items-start gap-4">
                                            <div>
                                                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Recipient name</p>
                                                <p className="text-xs font-black text-slate-800 mt-0.5">{selectedOrder.customer}</p>
                                            </div>
                                            <button
                                                onClick={() => handleCopy(selectedOrder.customer, "Customer Name")}
                                                className="p-1 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded transition-colors"
                                            >
                                                <Copy size={13} />
                                            </button>
                                        </div>

                                        <div className="h-px bg-slate-50" />

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Email Address</p>
                                                <p className="text-xs font-bold text-slate-700 truncate mt-0.5">{selectedOrder.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Mobile Number</p>
                                                <p className="text-xs font-bold text-slate-700 mt-0.5">{selectedOrder.phone}</p>
                                            </div>
                                        </div>

                                        <div className="h-px bg-slate-50" />

                                        <div>
                                            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Shipping Address</p>
                                            <p className="text-xs font-bold text-slate-600 leading-relaxed mt-0.5">{selectedOrder.address}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Billing & payment summary details */}
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Financial Summary</p>
                                    <div className="p-4 bg-white border border-slate-100 rounded-2xl space-y-2">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="font-bold text-slate-500">Subtotal</span>
                                            <span className="font-bold text-slate-700">{selectedOrder.amount}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="font-bold text-slate-500">Discount Applied</span>
                                            <span className="font-bold text-red-500">-{selectedOrder.discount}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="font-bold text-slate-500">Shipping Rates</span>
                                            <span className="font-bold text-emerald-500">Free</span>
                                        </div>
                                        <div className="h-px bg-slate-50 my-1" />
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="font-black text-slate-800">Total Settlement</span>
                                            <span className="font-black text-slate-900 text-sm">{selectedOrder.total}</span>
                                        </div>
                                        <div className="h-px bg-slate-50 my-1" />
                                        <div className="flex justify-between items-center text-[10px]">
                                            <span className="font-extrabold text-slate-400 uppercase tracking-wider">Settled Method</span>
                                            <span className="font-extrabold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-100 uppercase tracking-wider">{selectedOrder.method}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order modification trigger status Panel */}
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin Actions Panel</p>
                                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-3">
                                        <div className="flex items-center gap-2 w-full">
                                            <select
                                                value={newStatus}
                                                onChange={(e) => setNewStatus(e.target.value)}
                                                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
                                            >
                                                <option value="pending">Mark as Pending</option>
                                                <option value="shipped">Mark as Shipped</option>
                                                <option value="delivered">Mark as Delivered</option>
                                                <option value="cancelled">Mark as Cancelled</option>
                                            </select>
                                            <button
                                                onClick={() => handleStatusUpdate(selectedOrder.id)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
                                            >
                                                Update Status
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Drawer Sticky Footer Print Invoice */}
                            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-3 select-none">
                                <button
                                    onClick={() => {
                                        toast.promise(
                                            new Promise(resolve => setTimeout(resolve, 1000)),
                                            {
                                                loading: 'Generating PDF receipt...',
                                                success: 'Invoice downloaded successfully!',
                                                error: 'Failure occurred.'
                                            }
                                        )
                                    }}
                                    className="flex-1 h-11 bg-slate-900 hover:bg-black text-white text-xs font-black rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                                >
                                    <Printer size={14} /> Download Invoice
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </div>
    )
}

export default AdminDashboard