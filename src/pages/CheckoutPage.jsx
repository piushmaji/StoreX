import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
    MapPin, CreditCard, Package, Plus, Check,
    ChevronRight, ShieldCheck, Truck, Tag, Lock,
    ArrowLeft, Pencil, Zap, Building2
} from "lucide-react"
import { useCart } from "../context/CartContext/CartContext"
import { useAuth } from "../context/Auth/AuthContext"

// ─── Mock Data (addresses & payment — to be replaced with user profile later) ─
const ADDRESSES = [
    { id: 1, tag: "Home", name: "Aryan Sharma", line: "42, Sector 15, Near Metro Station", city: "Faridabad, Haryana — 121007", phone: "+91 98765 43210", default: true },
    { id: 2, tag: "Work", name: "Aryan Sharma", line: "Plot 5, Cyber Hub, DLF Phase 2", city: "Gurugram, Haryana — 122002", phone: "+91 91234 56789", default: false },
]

const PAYMENT = [
    { id: "card", label: "Credit / Debit Card", sub: "Visa · Mastercard · Rupay", icon: CreditCard },
    { id: "upi", label: "UPI", sub: "GPay · PhonePe · Paytm", icon: Zap },
    { id: "cod", label: "Cash on Delivery", sub: "Pay when it arrives", icon: Package },
    { id: "emi", label: "No-cost EMI", sub: "0% interest · All banks", icon: Building2 },
]

// ─── Step Bar ─────────────────────────────────────────────────────────────────
const STEPS = ["Delivery", "Payment", "Review"]

const StepBar = ({ current }) => (
    <div className="flex items-center justify-center mb-8">
        {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${i < current ? "bg-blue-600 text-white" :
                            i === current ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                                "bg-gray-100 text-gray-400"
                        }`}>
                        {i < current ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : i + 1}
                    </div>
                    <span className={`text-[10px] font-semibold mt-1.5 tracking-wide transition-colors ${i <= current ? "text-blue-600" : "text-gray-400"
                        }`}>{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                    <div className="w-16 sm:w-24 h-px mx-3 mb-5 transition-all duration-500" style={{
                        background: i < current ? "#2563eb" : "#e5e7eb"
                    }} />
                )}
            </div>
        ))}
    </div>
)

// ─── Reusable Section Card ─────────────────────────────────────────────────────
const Card = ({ title, icon: Icon, action, children }) => (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {title && (
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <div className="flex items-center gap-2.5">
                    {Icon && <Icon className="w-4 h-4 text-blue-600" />}
                    <h2 className="text-sm font-bold text-gray-800">{title}</h2>
                </div>
                {action}
            </div>
        )}
        {children}
    </div>
)

// ─── Address Card ─────────────────────────────────────────────────────────────
const AddrCard = ({ addr, selected, onSelect }) => (
    <button
        onClick={() => onSelect(addr.id)}
        className={`w-full text-left rounded-xl border-2 p-4 transition-all duration-200 ${selected
                ? "border-blue-500 bg-blue-50/40"
                : "border-gray-100 hover:border-gray-200"
            }`}
    >
        <div className="flex items-start gap-3">
            <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${selected ? "border-blue-600 bg-blue-600" : "border-gray-300"
                }`}>
                {selected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${addr.tag === "Home" ? "bg-emerald-50 text-emerald-600" : "bg-violet-50 text-violet-600"
                        }`}>{addr.tag}</span>
                    <span className="text-sm font-semibold text-gray-800">{addr.name}</span>
                    {addr.default && <span className="text-[10px] text-blue-500 font-semibold">· Default</span>}
                </div>
                <p className="text-xs text-gray-500">{addr.line}</p>
                <p className="text-xs text-gray-400">{addr.city} · {addr.phone}</p>
            </div>
            {selected && (
                <span className="text-xs text-blue-500 font-semibold flex items-center gap-1 shrink-0">
                    <Pencil className="w-3 h-3" /> Edit
                </span>
            )}
        </div>
    </button>
)

// ─── Payment Card ─────────────────────────────────────────────────────────────
const PayCard = ({ method, selected, onSelect }) => {
    const Icon = method.icon
    return (
        <div>
            <button
                onClick={() => onSelect(method.id)}
                className={`w-full text-left rounded-xl border-2 p-4 transition-all duration-200 ${selected ? "border-blue-500 bg-blue-50/40" : "border-gray-100 hover:border-gray-200"
                    }`}
            >
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${selected ? "bg-blue-600" : "bg-gray-50"
                        }`}>
                        <Icon className={`w-4.5 h-4.5 ${selected ? "text-white" : "text-gray-400"} w-5 h-5`} />
                    </div>
                    <div className="flex-1">
                        <p className={`text-sm font-semibold ${selected ? "text-blue-700" : "text-gray-700"}`}>{method.label}</p>
                        <p className="text-xs text-gray-400">{method.sub}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${selected ? "border-blue-600 bg-blue-600" : "border-gray-300"
                        }`}>
                        {selected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                </div>
            </button>

            <AnimatePresence>
                {selected && method.id === "card" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-2 p-4 bg-gray-50 rounded-xl space-y-2.5">
                            <input placeholder="Card number" className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder-gray-300 font-mono tracking-wider transition-all" />
                            <div className="flex gap-2">
                                <input placeholder="MM / YY" className="flex-1 px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder-gray-300 transition-all" />
                                <input placeholder="CVV" className="w-20 px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder-gray-300 transition-all" />
                            </div>
                            <input placeholder="Name on card" className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder-gray-300 transition-all" />
                        </div>
                    </motion.div>
                )}
                {selected && method.id === "upi" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-2 p-4 bg-gray-50 rounded-xl">
                            <input placeholder="yourname@upi" className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder-gray-300 transition-all" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ─── Order Summary Sidebar ────────────────────────────────────────────────────
const Summary = ({ step, onPlace, cartItems, subtotal }) => {
    const [coupon, setCoupon] = useState("")
    const [applied, setApplied] = useState(false)
    const discount = applied ? Math.round(subtotal * 0.1) : 0
    const total = subtotal - discount

    return (
        <div className="sticky top-6 space-y-3">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

                {/* Items */}
                <div className="px-5 pt-5 pb-4 space-y-3 border-b border-gray-50">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{cartItems.length} Items</p>
                    {cartItems.map(item => {
                        const product = item.products
                        const variant = item.product_variants
                        const price = variant?.discount_price || variant?.price || 0
                        const img = product?.image_urls?.[0] || 'https://via.placeholder.com/100'
                        const variantLabel = [variant?.size, variant?.color].filter(Boolean).join(' · ')
                        return (
                            <div key={item.id} className="flex items-center gap-3">
                                <div className="relative shrink-0">
                                    <img src={img} className="w-11 h-11 rounded-lg object-cover border border-gray-100" />
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                                        {item.quantity}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-gray-700 truncate">{product?.name}</p>
                                    {variantLabel && <p className="text-[10px] text-gray-400">{variantLabel}</p>}
                                </div>
                                <p className="text-xs font-bold text-gray-800 shrink-0">₹{(price * item.quantity).toLocaleString()}</p>
                            </div>
                        )
                    })}
                </div>

                {/* Coupon */}
                <div className="px-5 py-4 border-b border-gray-50">
                    <div className="flex gap-2">
                        <div className={`flex-1 flex items-center gap-2 px-3 border rounded-lg transition-all ${applied ? "border-emerald-300 bg-emerald-50" : "border-gray-200 bg-gray-50"
                            }`}>
                            <Tag className="w-3 h-3 text-gray-400 shrink-0" />
                            <input
                                value={coupon}
                                onChange={e => { setCoupon(e.target.value); setApplied(false) }}
                                placeholder="Promo code"
                                disabled={applied}
                                className="bg-transparent text-xs py-2.5 w-full focus:outline-none placeholder-gray-400"
                            />
                            {applied && <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                        </div>
                        <button
                            onClick={() => coupon.trim() && setApplied(!applied)}
                            className={`text-xs font-bold px-3 rounded-lg transition-all ${applied ? "bg-emerald-100 text-emerald-600" : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                        >
                            {applied ? "Remove" : "Apply"}
                        </button>
                    </div>
                    {applied && (
                        <p className="text-[11px] text-emerald-600 font-semibold mt-1.5 ml-1">✓ 10% off applied!</p>
                    )}
                </div>

                {/* Totals */}
                <div className="px-5 py-4 space-y-2 border-b border-gray-50">
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Subtotal</span>
                        <span className="font-medium text-gray-700">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Delivery</span>
                        <span className="font-semibold text-emerald-500">FREE</span>
                    </div>
                    {applied && (
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>Discount (10%)</span>
                            <span className="font-semibold text-emerald-500">−₹{discount.toLocaleString()}</span>
                        </div>
                    )}
                    <div className="pt-2.5 border-t border-gray-100 flex justify-between items-center">
                        <span className="font-bold text-gray-900 text-sm">Total</span>
                        <span className="font-black text-xl text-blue-600">₹{total.toLocaleString()}</span>
                    </div>
                </div>

                {/* CTA */}
                <div className="px-5 py-4">
                    {step === 2 ? (
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={onPlace}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
                        >
                            <Lock className="w-3.5 h-3.5" />
                            Place Order · ₹{total.toLocaleString()}
                        </motion.button>
                    ) : (
                        <div className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
                            <Lock className="w-3.5 h-3.5" />
                            Complete steps above
                        </div>
                    )}
                    <div className="flex items-center justify-center gap-1.5 mt-3">
                        <ShieldCheck className="w-3 h-3 text-gray-400" />
                        <span className="text-[10px] text-gray-400">256-bit SSL · Secure Checkout</span>
                    </div>
                </div>
            </div>

            {/* Trust row */}
            <div className="flex gap-2">
                {[
                    { icon: ShieldCheck, label: "Secure", color: "text-blue-500" },
                    { icon: Truck, label: "Free Shipping", color: "text-emerald-500" },
                    { icon: Package, label: "Genuine", color: "text-violet-500" },
                ].map(({ icon: Icon, label, color }) => (
                    <div key={label} className="flex-1 bg-white border border-gray-100 rounded-xl py-2.5 flex flex-col items-center gap-1">
                        <Icon className={`w-3.5 h-3.5 ${color}`} />
                        <span className="text-[9px] font-semibold text-gray-500 text-center">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const CheckoutPage = () => {
    const navigate = useNavigate()
    const { cartItems, totalPrice, loadCart } = useCart()
    const { user } = useAuth()
    const [step, setStep] = useState(0)
    const [addr, setAddr] = useState(1)
    const [pay, setPay] = useState("card")

    // Load cart on mount
    useEffect(() => {
        if (user?.id) loadCart(user.id)
    }, [user])

    const selectedAddr = ADDRESSES.find(a => a.id === addr)
    const selectedPay = PAYMENT.find(p => p.id === pay)

    const slideProps = {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <button
                        onClick={() => step > 0 ? setStep(s => s - 1) : navigate("/cart")}
                        className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:border-blue-300 hover:text-blue-600 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-gray-900">Checkout</h1>
                        <p className="text-xs text-gray-400">{cartItems.length} items · ₹{totalPrice.toLocaleString()} payable</p>
                    </div>
                </div>

                <StepBar current={step} />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-start">

                    {/* Left */}
                    <AnimatePresence mode="wait">

                        {/* Step 0 — Address */}
                        {step === 0 && (
                            <motion.div key="s0" {...slideProps} className="space-y-3">
                                <Card
                                    title="Delivery Address"
                                    icon={MapPin}
                                    action={
                                        <button className="flex items-center gap-1 text-blue-600 text-xs font-semibold hover:text-blue-700">
                                            <Plus className="w-3.5 h-3.5" /> Add New
                                        </button>
                                    }
                                >
                                    <div className="p-4 space-y-2.5">
                                        {ADDRESSES.map(a => (
                                            <AddrCard key={a.id} addr={a} selected={addr === a.id} onSelect={setAddr} />
                                        ))}
                                    </div>
                                </Card>

                                <div className="flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                                    <Truck className="w-4 h-4 text-blue-500 shrink-0" />
                                    <p className="text-xs text-blue-700 font-medium">Free delivery · Arrives in 3–5 business days</p>
                                </div>

                                <button
                                    onClick={() => setStep(1)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/20 text-sm"
                                >
                                    Continue to Payment
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </motion.div>
                        )}

                        {/* Step 1 — Payment */}
                        {step === 1 && (
                            <motion.div key="s1" {...slideProps} className="space-y-3">
                                <Card title="Payment Method" icon={CreditCard}>
                                    <div className="p-4 space-y-2.5">
                                        {PAYMENT.map(m => (
                                            <PayCard key={m.id} method={m} selected={pay === m.id} onSelect={setPay} />
                                        ))}
                                    </div>
                                </Card>

                                <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                                    <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                                    <p className="text-xs text-gray-500">Your payment is encrypted with 256-bit SSL. Card details are never stored.</p>
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/20 text-sm"
                                >
                                    Review Order
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </motion.div>
                        )}

                        {/* Step 2 — Review */}
                        {step === 2 && (
                            <motion.div key="s2" {...slideProps} className="space-y-3">

                                {/* Address review */}
                                <Card title="Delivering to" icon={MapPin}
                                    action={
                                        <button onClick={() => setStep(0)} className="text-xs text-blue-500 font-semibold hover:text-blue-700 flex items-center gap-1">
                                            <Pencil className="w-3 h-3" /> Change
                                        </button>
                                    }
                                >
                                    <div className="px-5 py-4">
                                        <p className="text-sm font-semibold text-gray-800">{selectedAddr?.name}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{selectedAddr?.line}, {selectedAddr?.city}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{selectedAddr?.phone}</p>
                                    </div>
                                </Card>

                                {/* Payment review */}
                                <Card title="Payment via" icon={CreditCard}
                                    action={
                                        <button onClick={() => setStep(1)} className="text-xs text-blue-500 font-semibold hover:text-blue-700 flex items-center gap-1">
                                            <Pencil className="w-3 h-3" /> Change
                                        </button>
                                    }
                                >
                                    <div className="px-5 py-4 flex items-center gap-3">
                                        {selectedPay && (() => {
                                            const Icon = selectedPay.icon
                                            return (
                                                <>
                                                    <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                                                        <Icon className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800">{selectedPay.label}</p>
                                                        <p className="text-xs text-gray-400">{selectedPay.sub}</p>
                                                    </div>
                                                </>
                                            )
                                        })()}
                                    </div>
                                </Card>

                                {/* Items review */}
                                <Card title={`${cartItems.length} Items`} icon={Package}>
                                    <div className="px-4 py-3 space-y-2">
                                        {cartItems.map(item => {
                                            const product = item.products
                                            const variant = item.product_variants
                                            const price = variant?.discount_price || variant?.price || 0
                                            const img = product?.image_urls?.[0] || 'https://via.placeholder.com/100'
                                            const variantLabel = [variant?.size, variant?.color].filter(Boolean).join(' · ')
                                            return (
                                                <div key={item.id} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl">
                                                    <img src={img} className="w-11 h-11 rounded-lg object-cover shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-semibold text-gray-700 truncate">{product?.name}</p>
                                                        {variantLabel && <p className="text-[10px] text-gray-400">{variantLabel}</p>}
                                                    </div>
                                                    <p className="text-xs font-bold text-gray-800 shrink-0">₹{(price * item.quantity).toLocaleString()}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Card>

                                {/* Mobile CTA */}
                                <div className="lg:hidden">
                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => navigate("/order-confirmation")}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                                    >
                                        <Lock className="w-3.5 h-3.5" />
                                        Place Order · ₹{totalPrice.toLocaleString()}
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>

                    {/* Right — Summary */}
                    <div className="hidden lg:block">
                        <Summary step={step} onPlace={() => navigate("/order-confirmation")} cartItems={cartItems} subtotal={totalPrice} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage