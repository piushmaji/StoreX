import { useState } from 'react'
import { Truck, Package, Clock, RotateCcw, ShieldCheck, AlertCircle, MapPin, CheckCircle, ArrowRight } from 'lucide-react'

const SHIPPING_OPTIONS = [
    {
        icon: <Truck size={22} className="text-blue-600" />,
        iconBg: 'bg-blue-50',
        badge: 'FREE',
        badgeBg: 'bg-emerald-100 text-emerald-700',
        title: 'Standard Delivery',
        subtitle: '2–4 business days',
        detail: 'Free on orders above ₹499',
        highlight: true,
    },
    {
        icon: <Package size={22} className="text-indigo-600" />,
        iconBg: 'bg-indigo-50',
        badge: '₹99',
        badgeBg: 'bg-indigo-100 text-indigo-700',
        title: 'Express Delivery',
        subtitle: '1–2 business days',
        detail: 'Available for most pin codes',
        highlight: false,
    },
    {
        icon: <Clock size={22} className="text-blue-700" />,
        iconBg: 'bg-blue-50',
        badge: '₹199',
        badgeBg: 'bg-blue-100 text-blue-700',
        title: 'Same Day Delivery',
        subtitle: 'Order before 12 PM',
        detail: 'Select cities only',
        highlight: false,
    },
]

const STEPS = [
    { label: 'Order Confirmed', desc: 'Confirmation sent to your email', done: true },
    { label: 'Processing',      desc: 'Item packed & ready to ship',     done: true },
    { label: 'Out for Delivery', desc: 'On the way to your address',      done: false },
    { label: 'Delivered',       desc: 'Estimated 2–4 business days',      done: false },
]

const Shipping = ({ product }) => {
    const [pincode, setPincode] = useState('')
    const [pinResult, setPinResult] = useState(null)

    const checkPin = () => {
        if (pincode.length === 6) {
            setPinResult(Math.random() > 0.3 ? 'available' : 'unavailable')
        }
    }

    return (
        <div className="flex flex-col gap-8">

            {/* ── Delivery Options ── */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 bg-blue-600 rounded-full" />
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Delivery Options</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SHIPPING_OPTIONS.map(({ icon, iconBg, badge, badgeBg, title, subtitle, detail, highlight }) => (
                        <div
                            key={title}
                            className={`relative flex flex-col gap-3 p-4 rounded-2xl border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer
                                ${highlight
                                    ? 'border-blue-300 bg-gradient-to-br from-blue-50 to-white shadow-sm shadow-blue-100'
                                    : 'border-blue-100 bg-white hover:border-blue-200'
                                }`}
                        >
                            {highlight && (
                                <div className="absolute -top-2.5 left-4">
                                    <span className="text-xs font-bold bg-blue-600 text-white px-2.5 py-0.5 rounded-full shadow-sm">Popular</span>
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <div className={`${iconBg} w-11 h-11 rounded-xl flex items-center justify-center`}>
                                    {icon}
                                </div>
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${badgeBg}`}>{badge}</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">{title}</p>
                                <p className="text-xs text-blue-600 font-semibold mt-0.5">{subtitle}</p>
                                <p className="text-xs text-gray-400 mt-1">{detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-px bg-gradient-to-r from-blue-200 via-blue-100 to-transparent" />

            {/* ── PIN Code Checker ── */}
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl border border-blue-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                    <MapPin size={16} className="text-blue-600" />
                    <p className="text-sm font-bold text-gray-800">Check Delivery to Your Area</p>
                </div>
                <div className="flex gap-2">
                    <input
                        type="number"
                        maxLength={6}
                        value={pincode}
                        onChange={e => { setPincode(e.target.value.slice(0, 6)); setPinResult(null) }}
                        placeholder="Enter 6-digit PIN code"
                        className="flex-1 text-sm bg-white border-2 border-blue-100 focus:border-blue-400 outline-none rounded-xl px-4 py-2.5 text-gray-700 placeholder-gray-300 transition-colors"
                    />
                    <button
                        onClick={checkPin}
                        disabled={pincode.length !== 6}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-200 disabled:cursor-not-allowed text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 active:scale-95 flex items-center gap-1.5"
                    >
                        Check <ArrowRight size={14} />
                    </button>
                </div>

                {pinResult === 'available' && (
                    <div className="flex items-center gap-2 mt-3 text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2.5">
                        <CheckCircle size={15} />
                        <span className="text-xs font-semibold">Delivery available! Estimated 2–4 business days.</span>
                    </div>
                )}
                {pinResult === 'unavailable' && (
                    <div className="flex items-center gap-2 mt-3 text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                        <AlertCircle size={15} />
                        <span className="text-xs font-semibold">Sorry, delivery not available for this PIN code.</span>
                    </div>
                )}
            </div>

            <div className="h-px bg-gradient-to-r from-blue-200 via-blue-100 to-transparent" />

            {/* ── Order Journey ── */}
            <div>
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-1 h-5 bg-blue-600 rounded-full" />
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Order Journey</h3>
                </div>
                <div className="flex items-start justify-between relative">
                    {/* Progress line */}
                    <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 z-0">
                        <div className="h-full bg-blue-500 w-[40%] transition-all duration-700" />
                    </div>

                    {STEPS.map(({ label, desc, done }, i) => (
                        <div key={label} className="flex flex-col items-center gap-2 z-10 flex-1">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${done ? 'bg-blue-600 shadow-md shadow-blue-200' : 'bg-white border-2 border-gray-200'}`}>
                                {done
                                    ? <CheckCircle size={18} className="text-white" />
                                    : <span className="text-xs font-bold text-gray-400">{i + 1}</span>
                                }
                            </div>
                            <div className="text-center">
                                <p className={`text-xs font-bold ${done ? 'text-gray-900' : 'text-gray-400'}`}>{label}</p>
                                <p className="text-xs text-gray-400 hidden sm:block leading-tight mt-0.5">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-px bg-gradient-to-r from-blue-200 via-blue-100 to-transparent" />

            {/* ── Returns Policy ── */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 bg-blue-600 rounded-full" />
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Returns & Refunds</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                        { icon: <RotateCcw size={18} className="text-blue-600" />,   bg: 'bg-blue-50',   border: 'border-blue-100',   title: '7-Day Returns',  desc: 'Easy hassle-free returns within 7 days of delivery' },
                        { icon: <ShieldCheck size={18} className="text-emerald-600" />, bg: 'bg-emerald-50', border: 'border-emerald-100', title: 'Full Refund',    desc: 'Refund processed within 5–7 business days' },
                        { icon: <AlertCircle size={18} className="text-amber-500" />,  bg: 'bg-amber-50',   border: 'border-amber-100',   title: 'Conditions Apply', desc: 'Item must be unused, unwashed & with original tags' },
                    ].map(({ icon, bg, border, title, desc }) => (
                        <div key={title} className={`flex flex-col gap-3 p-4 ${bg} rounded-2xl border ${border} hover:shadow-sm transition-all duration-200`}>
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                {icon}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-800">{title}</p>
                                <p className="text-xs text-gray-500 leading-relaxed mt-1">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Shipping