import { useState } from 'react'
import { Send, CheckCircle2, Sparkles } from 'lucide-react'

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
        <section className="py-2 font-sans animate-premium-fade [animation-delay:600ms]">
            <div className="bg-white rounded-[3rem] p-8 md:p-12 lg:p-20 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center relative overflow-hidden border border-gray-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)]">
                
                {/* ── Soft Premium Glows ── */}
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-100/50 rounded-full blur-[100px] pointer-events-none" />

                {/* ── Left: Glassy Premium Copy ── */}
                <div className="w-full lg:w-1/2 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                        <Sparkles size={12} /> B2B Concierge
                    </div>
                    
                    <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-8 text-gray-900 uppercase">
                        Sourcing, <br/>
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                            Reimagined.
                        </span>
                    </h2>
                    
                    <p className="text-gray-500 font-bold text-sm md:text-base leading-relaxed max-w-sm mb-10 tracking-tight">
                        Drop your requirements and let our smart matchmaking engine connect you with elite global manufacturers.
                    </p>

                    <div className="flex flex-col gap-4">
                        {["Verified Global Network", "Transparent Quotes", "Lightning Fast Response"].map((text, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                                    <CheckCircle2 size={14} className="text-blue-600" />
                                </div>
                                <span className="text-sm font-bold text-gray-700 tracking-wide">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Right: App-Native Form ── */}
                <div className="w-full lg:w-1/2 relative z-10">
                    <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-3xl shadow-blue-900/5 relative">
                        
                        <h3 className="text-lg font-black text-gray-900 mb-8 uppercase tracking-[0.1em]">Request Quote</h3>

                        {submitted ? (
                            <div className="flex flex-col items-center text-center py-12 animate-fade-in">
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 border border-blue-100">
                                    <CheckCircle2 size={28} className="text-blue-600" />
                                </div>
                                <h4 className="text-xl font-black text-gray-900 mb-2">Request Delivered</h4>
                                <p className="text-gray-500 text-sm max-w-xs leading-relaxed">Our procurement specialists are matching your specs with the perfect supplier.</p>
                            </div>
                        ) : (
                            <div className="space-y-5">
                                {/* Item Name */}
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Item Name</label>
                                    <input
                                        type="text"
                                        name="item"
                                        value={form.item}
                                        onChange={handleChange}
                                        placeholder="e.g. Supima Cotton T-Shirts"
                                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-medium focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                    />
                                </div>

                                {/* Details */}
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Specifications</label>
                                    <textarea
                                        name="details"
                                        value={form.details}
                                        onChange={handleChange}
                                        placeholder="Material, fit, colorways..."
                                        rows={2}
                                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-medium focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                                    />
                                </div>

                                {/* Quantity Row */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Quantity</label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={form.quantity}
                                            onChange={handleChange}
                                            placeholder="Min. 100"
                                            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-medium focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Unit</label>
                                        <select
                                            name="unit"
                                            value={form.unit}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
                                        >
                                            {UNITS.map(u => <option key={u}>{u}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-gray-900 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-blue-600 active:scale-[0.98] transition-all mt-6 shadow-xl shadow-gray-200"
                                >
                                    <Send size={14} strokeWidth={3} /> Submit Request
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            `}</style>
        </section>
    )
}

export default SendInquiry
