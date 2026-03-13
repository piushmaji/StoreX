import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
    Check, Package, Truck, MapPin, CreditCard,
    ChevronRight, Download, Share2, Headphones,
    Clock, Star, Home, CalendarDays, Zap, Copy, CheckCheck
} from "lucide-react"

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ORDER = {
    id: `STX-2026-${Math.floor(Math.random() * 90000 + 10000)}`,
    eta: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }),
    address: "42, Sector 15, Near Metro Station, Faridabad, Haryana — 121007",
    payment: "Credit Card  ••••  3456",
    items: [
        { id: 1, name: "Thermal Full Sleeve Base Layer", variant: "XL · Dark Green", price: 599, qty: 1, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&q=80" },
        { id: 2, name: "Denim Trucker Jacket", variant: "L · Classic Blue", price: 1699, qty: 1, img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=120&q=80" },
        { id: 3, name: "Premium Fleece Pullover Hoodie", variant: "M · Burgundy", price: 999, qty: 1, img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=120&q=80" },
        { id: 4, name: "Windcheater Shell Jacket", variant: "L · Olive", price: 1399, qty: 1, img: "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=120&q=80" },
    ],
    subtotal: 4696,
    discount: 200,
    total: 4496,
}

const TIMELINE = [
    { label: "Order Placed", sub: "Just now", done: true, active: false },
    { label: "Confirmed", sub: "Processing", done: true, active: true },
    { label: "Dispatched", sub: "Est. tomorrow", done: false, active: false },
    { label: "Out for Delivery", sub: "Almost there", done: false, active: false },
    { label: "Delivered", sub: ORDER.eta, done: false, active: false },
]

// ─── Tiny fade-in wrapper ──────────────────────────────────────────────────────
const Fade = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={className}
    >
        {children}
    </motion.div>
)

// ─── Section card ─────────────────────────────────────────────────────────────
const Card = ({ title, icon: Icon, children, className = "" }) => (
    <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden ${className}`}>
        {title && (
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
                {Icon && <Icon className="w-4 h-4 text-blue-600" />}
                <h3 className="text-sm font-bold text-gray-800">{title}</h3>
            </div>
        )}
        {children}
    </div>
)

// ─── Main Page ────────────────────────────────────────────────────────────────
const OrderConfirmationPage = () => {
    const navigate = useNavigate()
    const [copied, setCopied] = useState(false)

    const copyId = () => {
        navigator.clipboard.writeText(ORDER.id)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-4">

                {/* ── Hero ── */}
                <Fade delay={0} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    {/* Top blue strip */}
                    <div className="h-1.5 bg-linear-to-r from-blue-500 to-blue-600" />

                    <div className="px-6 py-8 text-center">
                        {/* Check icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
                            className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/25"
                        >
                            <Check className="w-8 h-8 text-white" strokeWidth={3} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">Order Confirmed</p>
                            <h1 className="text-3xl font-black text-gray-900 mb-2">Thank you!</h1>
                            <p className="text-sm text-gray-500 max-w-xs mx-auto">
                                Your order is confirmed. A confirmation email has been sent to you.
                            </p>
                        </motion.div>

                        {/* Order ID */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }}
                            className="mt-6 inline-flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3"
                        >
                            <div className="text-left">
                                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Order ID</p>
                                <p className="text-sm font-black text-gray-900">{ORDER.id}</p>
                            </div>
                            <button
                                onClick={copyId}
                                className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all ${copied ? "bg-emerald-100 text-emerald-600" : "bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300"
                                    }`}
                            >
                                {copied ? <><CheckCheck className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                            </button>
                        </motion.div>

                        {/* ETA */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55 }}
                            className="mt-3 inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-100 px-4 py-2 rounded-full"
                        >
                            <CalendarDays className="w-3.5 h-3.5" />
                            <span className="text-xs font-semibold">Arriving by <strong>{ORDER.eta}</strong></span>
                        </motion.div>
                    </div>
                </Fade>

                {/* ── Delivery Timeline ── */}
                <Fade delay={0.15}>
                    <Card title="Delivery Status" icon={Truck}>
                        <div className="px-5 py-5">
                            <div className="relative space-y-4">
                                {/* Vertical line */}
                                <div className="absolute left-3.75 top-2 bottom-2 w-px bg-gray-100" />
                                <motion.div
                                    className="absolute left-3.75 top-2 w-px bg-blue-500"
                                    initial={{ height: 0 }}
                                    animate={{ height: "28%" }}
                                    transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                />

                                {TIMELINE.map((step, i) => (
                                    <div key={step.label} className="flex items-center gap-4 relative">
                                        {/* Dot */}
                                        <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${step.done
                                            ? "bg-blue-600 border-blue-600"
                                            : step.active
                                                ? "bg-white border-blue-400"
                                                : "bg-white border-gray-200"
                                            }`}>
                                            {step.done
                                                ? <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                                                : step.active
                                                    ? <motion.div
                                                        animate={{ scale: [1, 1.4, 1] }}
                                                        transition={{ duration: 1.5, repeat: Infinity }}
                                                        className="w-2 h-2 bg-blue-500 rounded-full"
                                                    />
                                                    : <div className="w-2 h-2 bg-gray-200 rounded-full" />
                                            }
                                        </div>

                                        <div className="flex-1 flex items-center justify-between">
                                            <div>
                                                <p className={`text-sm font-semibold ${step.done || step.active ? "text-gray-800" : "text-gray-400"}`}>
                                                    {step.label}
                                                </p>
                                                <p className={`text-xs mt-0.5 ${step.active ? "text-blue-500 font-medium" : "text-gray-400"}`}>
                                                    {step.sub}
                                                </p>
                                            </div>
                                            {step.active && (
                                                <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2.5 py-1 rounded-full">
                                                    Current
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </Fade>

                {/* ── Items ── */}
                <Fade delay={0.2}>
                    <Card title={`${ORDER.items.length} Items Ordered`} icon={Package}>
                        <div className="px-4 py-3 space-y-2">
                            {ORDER.items.map(item => (
                                <div key={item.id} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl hover:bg-blue-50/40 transition-colors">
                                    <div className="relative shrink-0">
                                        <img src={item.img} className="w-12 h-12 rounded-lg object-cover" />
                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                                            {item.qty}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-700 truncate">{item.name}</p>
                                        <p className="text-xs text-gray-400">{item.variant}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-bold text-gray-800">₹{item.price.toLocaleString()}</p>
                                        <button className="text-[10px] text-blue-500 font-medium flex items-center gap-0.5 ml-auto mt-0.5 hover:text-blue-700">
                                            <Star className="w-2.5 h-2.5" /> Review
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Fade>

                {/* ── Payment + Address ── */}
                <Fade delay={0.25} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <Card title="Payment" icon={CreditCard}>
                        <div className="px-5 py-4 space-y-2.5">
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Subtotal</span>
                                <span className="font-semibold text-gray-700">₹{ORDER.subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Discount</span>
                                <span className="font-semibold text-emerald-500">−₹{ORDER.discount}</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Delivery</span>
                                <span className="font-semibold text-emerald-500">FREE</span>
                            </div>
                            <div className="pt-2 border-t border-gray-100 flex justify-between">
                                <span className="text-sm font-bold text-gray-900">Total Paid</span>
                                <span className="text-sm font-black text-blue-600">₹{ORDER.total.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 mt-1">
                                <Zap className="w-3 h-3 text-gray-400 shrink-0" />
                                <span className="text-[11px] text-gray-500 truncate">{ORDER.payment}</span>
                            </div>
                        </div>
                    </Card>

                    <Card title="Delivering to" icon={MapPin}>
                        <div className="px-5 py-4">
                            <div className="flex items-start gap-2.5">
                                <span className="text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-md mt-0.5 shrink-0">HOME</span>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">Aryan Sharma</p>
                                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{ORDER.address}</p>
                                    <p className="text-xs text-gray-400 mt-1">+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                                <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span className="text-xs font-semibold text-emerald-700">{ORDER.eta}</span>
                            </div>
                        </div>
                    </Card>
                </Fade>

                {/* ── Quick Actions ── */}
                <Fade delay={0.3}>
                    <Card>
                        <div className="px-4 py-4 grid grid-cols-4 gap-2">
                            {[
                                { icon: Package, label: "Track", onClick: () => navigate("/profile/orders"), primary: true },
                                { icon: Download, label: "Invoice", onClick: () => { }, primary: false },
                                { icon: Share2, label: "Share", onClick: () => { }, primary: false },
                                { icon: Headphones, label: "Support", onClick: () => { }, primary: false },
                            ].map(({ icon: Icon, label, onClick, primary }) => (
                                <motion.button
                                    key={label}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={onClick}
                                    className={`flex flex-col items-center gap-1.5 py-3.5 rounded-xl transition-all ${primary
                                        ? "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20"
                                        : "bg-gray-50 hover:bg-gray-100 border border-gray-100"
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${primary ? "text-white" : "text-blue-500"}`} />
                                    <span className={`text-[11px] font-semibold ${primary ? "text-white" : "text-gray-600"}`}>{label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </Card>
                </Fade>

                {/* ── Bottom CTAs ── */}
                <Fade delay={0.35} className="flex gap-3">
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate("/")}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-500/20"
                    >
                        <Home className="w-4 h-4" />
                        Continue Shopping
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate("/profile/orders")}
                        className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-bold py-3.5 rounded-xl border border-gray-200 hover:border-blue-200 transition-all flex items-center justify-center gap-2 text-sm"
                    >
                        <Package className="w-4 h-4 text-blue-500" />
                        My Orders
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </motion.button>
                </Fade>

            </div>
        </div>
    )
}

export default OrderConfirmationPage