import { useState } from 'react'
import { Send, Package, ChevronDown, CheckCircle } from 'lucide-react'
import factory from '../../assets/images/quiry/factory.svg'

const UNITS = ["Pcs", "Kg", "Ton", "Dozen", "Set"]

const SendInquiry = () => {
    const [submitted, setSubmitted] = useState(false)
    const [form, setForm] = useState({ item: '', details: '', quantity: '', unit: 'Pcs' })

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.item.trim() || !form.quantity.trim()) return
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
            setForm({ item: '', details: '', quantity: '', unit: 'Pcs' })
        }, 3000)
    }

    return (
        <section className="py-8">
            <div className="relative rounded-4xl overflow-hidden shadow-sm" style={{ minHeight: '500px' }}>

                {/* ── Background image ──────────────────────────────── */}
                <img
                    src={factory}
                    alt="Factory"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* ── linear overlay ──────────────────────────────── */}
                <div className="absolute inset-0 bg-linear-to-br from-gray-900/95 via-blue-900/80 to-teal-500/60" />

                {/* ── Decorative Ambient Ligthing ────────────────────────────── */}
                <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-teal-400/20 blur-[80px] pointer-events-none" />

                {/* ── Content ───────────────────────────────────────── */}
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 px-8 lg:px-20 py-16">

                    {/* ── Left: copy ────────────────────────────────── */}
                    <div className="text-white max-w-xl space-y-6">

                        {/* Eyebrow */}
                        <p className="text-[11px] tracking-[0.25em] text-cyan-300 font-bold uppercase flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                            B2B Sourcing Platform
                        </p>

                        <h2 className="text-3xl lg:text-5xl font-black leading-[1.1] tracking-tight">
                            One request.<br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-blue-400">Multiple quotes.</span>
                        </h2>

                        <p className="text-[15px] text-gray-300 leading-relaxed max-w-md font-medium">
                            Send a single inquiry and get competitive quotes from hundreds of verified suppliers worldwide within 24 hours.
                        </p>

                        {/* Trust badges */}
                        <div className="flex flex-wrap gap-5 pt-4">
                            {[
                                "500+ Verified Suppliers",
                                "24hr Response Time",
                                "Zero Platform Fees",
                            ].map(badge => (
                                <div key={badge} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                                    <CheckCircle size={14} className="text-cyan-400 shrink-0" />
                                    <span className="text-[11px] text-gray-200 font-bold tracking-widest uppercase">{badge}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Right: form card ──────────────────────────── */}
                    <div className="w-full max-w-md shrink-0">
                        <div className="bg-white/95 backdrop-blur-xl rounded-4xl shadow-2xl overflow-hidden border border-white/40">

                            {/* Card header */}
                            <div className="bg-linear-to-r from-gray-900 to-gray-800 px-8 py-6 flex items-center gap-4 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 MixBlendMode-overlay" />
                                <div className="relative z-10 h-10 w-10 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center backdrop-blur-sm">
                                    <Package size={18} className="text-blue-400" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-white font-black text-lg leading-none">
                                        Send a Quote Request
                                    </h3>
                                    <p className="text-gray-400 text-xs mt-1.5 font-medium">
                                        Fill in your requirements below
                                    </p>
                                </div>
                            </div>

                            {/* Form body */}
                            <div className="p-8 space-y-5">
                                {submitted ? (
                                    /* ── Success State ──────────────────── */
                                    <div className="flex flex-col items-center justify-center gap-4 py-10 text-center animate-fade-in">
                                        <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center border-4 border-green-100">
                                            <CheckCircle size={36} className="text-green-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-gray-900 text-xl mb-2">
                                                Inquiry Sent Successfully!
                                            </h4>
                                            <p className="text-sm text-gray-500 max-w-[260px] mx-auto leading-relaxed">
                                                Suppliers will review your request and respond within 24 hours. Keep an eye on your email inbox.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    /* ── Form Fields ────────────────────── */
                                    <div className="space-y-4">
                                        {/* Item name */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">
                                                Item Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="item"
                                                value={form.item}
                                                onChange={handleChange}
                                                placeholder="e.g. Organic Cotton T-Shirts"
                                                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-[15px] font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">
                                                Product Details
                                            </label>
                                            <textarea
                                                name="details"
                                                value={form.details}
                                                onChange={handleChange}
                                                placeholder="Describe size, colour, material, specific certs..."
                                                rows={3}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] font-medium text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                                            />
                                        </div>

                                        {/* Quantity + unit row */}
                                        <div className="flex gap-4">
                                            <div className="flex-1 space-y-2">
                                                <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">
                                                    Quantity *
                                                </label>
                                                <input
                                                    type="number"
                                                    name="quantity"
                                                    value={form.quantity}
                                                    onChange={handleChange}
                                                    placeholder="1000"
                                                    min="1"
                                                    className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-[15px] font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                                                />
                                            </div>

                                            <div className="w-32 space-y-2">
                                                <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">
                                                    Unit
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        name="unit"
                                                        value={form.unit}
                                                        onChange={handleChange}
                                                        className="w-full h-12 bg-gray-50 appearance-none border border-gray-200 rounded-xl pl-4 pr-10 text-[15px] font-bold text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 cursor-pointer"
                                                    >
                                                        {UNITS.map(u => (
                                                            <option key={u}>{u}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Submit */}
                                        <button
                                            onClick={handleSubmit}
                                            className="w-full h-14 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-bold tracking-widest uppercase rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/30 mt-4"
                                        >
                                            <Send size={16} />
                                            Submit Inquiry
                                        </button>

                                        <p className="text-[10px] uppercase tracking-wider text-gray-400 text-center font-medium mt-4">
                                            By submitting, you agree to our{' '}
                                            <a href="#" className="underline hover:text-gray-600 transition-colors">Terms</a>.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* CSS Animation Keyframe */}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in { animation: fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}</style>
        </section>
    )
}

export default SendInquiry
