import { motion } from "framer-motion"
import {
    ShoppingBag, Package, Users, TrendingUp,
    ArrowUpRight, ArrowDownRight, MoreHorizontal,
    Eye, Clock, CheckCircle2, XCircle, Truck,
    Star, ChevronRight
} from "lucide-react"

// ─── Mock Data ────────────────────────────────────────────────────────────────
const STATS = [
    {
        label: "Total Revenue",
        value: "₹2,84,920",
        change: "+12.5%",
        up: true,
        sub: "vs last month",
        icon: TrendingUp,
        color: "blue",
        bg: "bg-blue-50",
        iconBg: "bg-blue-600",
    },
    {
        label: "Total Orders",
        value: "1,284",
        change: "+8.2%",
        up: true,
        sub: "vs last month",
        icon: ShoppingBag,
        color: "violet",
        bg: "bg-violet-50",
        iconBg: "bg-violet-600",
    },
    {
        label: "Total Products",
        value: "342",
        change: "+4",
        up: true,
        sub: "added this week",
        icon: Package,
        color: "emerald",
        bg: "bg-emerald-50",
        iconBg: "bg-emerald-600",
    },
    {
        label: "Total Customers",
        value: "8,920",
        change: "-2.1%",
        up: false,
        sub: "vs last month",
        icon: Users,
        color: "amber",
        bg: "bg-amber-50",
        iconBg: "bg-amber-500",
    },
]

const RECENT_ORDERS = [
    { id: "STX-28451", customer: "Aryan Sharma", product: "Thermal Base Layer", amount: "₹599", status: "delivered", time: "2m ago" },
    { id: "STX-28450", customer: "Priya Singh", product: "Denim Trucker Jacket", amount: "₹1699", status: "pending", time: "18m ago" },
    { id: "STX-28449", customer: "Rahul Verma", product: "Premium Fleece Hoodie", amount: "₹999", status: "shipped", time: "1h ago" },
    { id: "STX-28448", customer: "Sneha Patel", product: "Windcheater Shell Jacket", amount: "₹1399", status: "delivered", time: "3h ago" },
    { id: "STX-28447", customer: "Rohan Kapoor", product: "Cotton Oversized Tee", amount: "₹449", status: "cancelled", time: "5h ago" },
    { id: "STX-28446", customer: "Meera Joshi", product: "Thermal Base Layer", amount: "₹599", status: "pending", time: "6h ago" },
]

const TOP_PRODUCTS = [
    { name: "Denim Trucker Jacket", sold: 284, revenue: "₹4.8L", rating: 4.8, img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=60&q=80" },
    { name: "Premium Fleece Hoodie", sold: 219, revenue: "₹2.2L", rating: 4.6, img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=60&q=80" },
    { name: "Thermal Base Layer", sold: 198, revenue: "₹1.2L", rating: 4.9, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=60&q=80" },
    { name: "Windcheater Shell Jacket", sold: 156, revenue: "₹2.2L", rating: 4.5, img: "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=60&q=80" },
]

const STATUS_CONFIG = {
    delivered: { label: "Delivered", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
    pending: { label: "Pending", icon: Clock, color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
    shipped: { label: "Shipped", icon: Truck, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
    cancelled: { label: "Cancelled", icon: XCircle, color: "text-red-500", bg: "bg-red-50 border-red-100" },
}

// ─── Reusable Card ────────────────────────────────────────────────────────────
const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden ${className}`}>
        {children}
    </div>
)

// ─── Fade in animation ────────────────────────────────────────────────────────
const Fade = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={className}
    >
        {children}
    </motion.div>
)
// ─── Main Dashboard ───────────────────────────────────────────────────────────
const AdminDashboard = () => {
    return (

        <div className="space-y-6 max-w-7xl mx-auto">

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {STATS.map((stat, i) => {
                    const Icon = stat.icon
                    return (
                        <Fade key={stat.label} delay={i * 0.07}>
                            <Card className="p-5 hover:shadow-md transition-shadow duration-200">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-10 h-10 ${stat.iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
                                        <Icon size={18} className="text-white" strokeWidth={2} />
                                    </div>
                                    <span className={`text-[11px] font-bold flex items-center gap-0.5 px-2 py-1 rounded-full ${stat.up
                                        ? "bg-emerald-50 text-emerald-600"
                                        : "bg-red-50 text-red-500"
                                        }`}>
                                        {stat.up
                                            ? <ArrowUpRight size={11} strokeWidth={3} />
                                            : <ArrowDownRight size={11} strokeWidth={3} />
                                        }
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-2xl font-black text-slate-900 leading-none mb-1">{stat.value}</p>
                                <p className="text-xs font-semibold text-slate-500">{stat.label}</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">{stat.sub}</p>
                            </Card>
                        </Fade>
                    )
                })}
            </div>

            {/* ── Revenue Chart placeholder + Quick Stats ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

                {/* Chart area */}
                <Fade delay={0.28} className="xl:col-span-2">
                    <Card>
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                            <div>
                                <h2 className="text-sm font-bold text-slate-800">Revenue Overview</h2>
                                <p className="text-xs text-slate-400 mt-0.5">Last 7 days performance</p>
                            </div>
                            <div className="flex gap-2">
                                {["7D", "1M", "3M"].map((t, i) => (
                                    <button key={t} className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors ${i === 0 ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-gray-100"
                                        }`}>{t}</button>
                                ))}
                            </div>
                        </div>

                        {/* Simple bar chart */}
                        <div className="px-5 py-5">
                            <div className="flex items-end justify-between gap-2 h-36">
                                {[65, 82, 55, 91, 78, 88, 96].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ delay: 0.35 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                        className="flex-1 rounded-t-lg bg-blue-100 hover:bg-blue-500 transition-colors cursor-pointer relative group"
                                    >
                                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            ₹{(h * 1200).toLocaleString()}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-2">
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                                    <span key={d} className="flex-1 text-center text-[10px] text-slate-400 font-medium">{d}</span>
                                ))}
                            </div>
                        </div>
                    </Card>
                </Fade>

                {/* Quick stats */}
                <Fade delay={0.32}>
                    <Card className="flex flex-col">
                        <div className="px-5 py-4 border-b border-gray-50">
                            <h2 className="text-sm font-bold text-slate-800">Order Status</h2>
                            <p className="text-xs text-slate-400 mt-0.5">Today's breakdown</p>
                        </div>
                        <div className="flex-1 p-4 space-y-3">
                            {[
                                { label: "Delivered", count: 48, pct: 72, color: "bg-emerald-500" },
                                { label: "Shipped", count: 12, pct: 18, color: "bg-blue-500" },
                                { label: "Pending", count: 5, pct: 7, color: "bg-amber-500" },
                                { label: "Cancelled", count: 2, pct: 3, color: "bg-red-400" },
                            ].map((row, i) => (
                                <div key={row.label}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-xs font-semibold text-slate-700">{row.label}</span>
                                        <span className="text-xs font-bold text-slate-500">{row.count} <span className="text-slate-300">·</span> <span className="text-slate-400">{row.pct}%</span></span>
                                    </div>
                                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${row.pct}%` }}
                                            transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                            className={`h-full ${row.color} rounded-full`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="mx-4 mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                            <p className="text-xs font-bold text-blue-700">67 total orders today</p>
                            <p className="text-[10px] text-blue-500 mt-0.5">↑ 14% from yesterday</p>
                        </div>
                    </Card>
                </Fade>
            </div>

            {/* ── Recent Orders + Top Products ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

                {/* Recent Orders */}
                <Fade delay={0.38} className="xl:col-span-2">
                    <Card>
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                            <div>
                                <h2 className="text-sm font-bold text-slate-800">Recent Orders</h2>
                                <p className="text-xs text-slate-400 mt-0.5">Latest 6 orders</p>
                            </div>
                            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                View all <ChevronRight size={12} />
                            </button>
                        </div>

                        <div className="divide-y divide-gray-50">
                            {RECENT_ORDERS.map((order, i) => {
                                const cfg = STATUS_CONFIG[order.status]
                                const StatusIcon = cfg.icon
                                return (
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + i * 0.06 }}
                                        className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/60 transition-colors"
                                    >
                                        {/* Avatar */}
                                        <div className="w-8 h-8 rounded-xl bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0">
                                            <span className="text-white text-[11px] font-black">
                                                {order.customer[0]}
                                            </span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="text-xs font-bold text-slate-800 truncate">{order.customer}</p>
                                                <span className="text-[10px] text-slate-400 shrink-0">{order.time}</span>
                                            </div>
                                            <p className="text-[11px] text-slate-400 truncate">{order.product}</p>
                                        </div>

                                        <div className="text-right shrink-0">
                                            <p className="text-sm font-black text-slate-800">{order.amount}</p>
                                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color}`}>
                                                <StatusIcon size={9} strokeWidth={3} />
                                                {cfg.label}
                                            </span>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </Card>
                </Fade>

                {/* Top Products */}
                <Fade delay={0.42}>
                    <Card>
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                            <div>
                                <h2 className="text-sm font-bold text-slate-800">Top Products</h2>
                                <p className="text-xs text-slate-400 mt-0.5">By sales volume</p>
                            </div>
                            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                All <ChevronRight size={12} />
                            </button>
                        </div>

                        <div className="p-4 space-y-3">
                            {TOP_PRODUCTS.map((p, i) => (
                                <motion.div
                                    key={p.name}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.44 + i * 0.07 }}
                                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <div className="relative shrink-0">
                                        <img src={p.img} className="w-11 h-11 rounded-xl object-cover border border-gray-100" />
                                        <span className="absolute -top-1 -left-1 w-4 h-4 bg-slate-800 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                                            {i + 1}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-slate-700 truncate">{p.name}</p>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <Star size={9} className="text-amber-400 fill-amber-400" />
                                            <span className="text-[10px] text-slate-400 font-medium">{p.rating}</span>
                                            <span className="text-slate-200">·</span>
                                            <span className="text-[10px] text-slate-400">{p.sold} sold</span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-xs font-black text-blue-600">{p.revenue}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </Card>
                </Fade>
            </div>

        </div>
    )
}

export default AdminDashboard