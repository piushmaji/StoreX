import { Plus, Trash2, Pencil, Star, X, CreditCard, Lock, User, Calendar } from 'lucide-react'
import { useState } from 'react'

const MOCK_CARDS = [
    { id: 1, type: 'Visa', last4: '4243', name: 'Piush Maji', expiry: '08/27', color: 'from-slate-800 to-slate-900', default: true },
    { id: 2, type: 'Mastercard', last4: '8812', name: 'Piush Maji', expiry: '03/26', color: 'from-blue-800 to-indigo-900', default: false },
]

// ── Card visuals ──────────────────────────────────────────────────────────────
const CardChip = () => (
    <div className="w-8 h-6 bg-linear-to-br from-yellow-300 to-amber-400 rounded-md grid grid-cols-2 gap-px p-0.5 opacity-90">
        {[...Array(4)].map((_, i) => <div key={i} className="bg-yellow-200/60 rounded-sm" />)}
    </div>
)

const VisaLogo = () => (
    <span className="text-white font-black text-lg italic tracking-tighter" style={{ fontFamily: 'serif' }}>VISA</span>
)

const MastercardLogo = () => (
    <div className="flex -space-x-2">
        <div className="w-6 h-6 rounded-full bg-red-500 opacity-90" />
        <div className="w-6 h-6 rounded-full bg-amber-400 opacity-90" />
    </div>
)

// ── Add Card Form popup ───────────────────────────────────────────────────────
const AddCardForm = ({ onClose, onSave }) => {
    const [form, setForm] = useState({ number: '', name: '', expiry: '', cvv: '', type: 'Visa' })
    const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

    const formatNumber = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
    const formatExpiry = (v) => { const d = v.replace(/\D/g, '').slice(0, 4); return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d }

    const last4 = form.number.replace(/\s/g, '').slice(-4)
    const ok = form.number.replace(/\s/g, '').length === 16 && form.name.trim() && form.expiry.length === 5 && form.cvv.length >= 3

    const COLORS = ['from-slate-800 to-slate-900', 'from-blue-800 to-indigo-900', 'from-violet-800 to-purple-900', 'from-emerald-800 to-teal-900']

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
            <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
                    <div>
                        <p className="text-sm font-extrabold text-gray-900">Add New Card</p>
                        <p className="text-xs text-gray-400 mt-0.5">Your card details are encrypted</p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                        <X size={14} className="text-gray-500" />
                    </button>
                </div>

                {/* Live card preview */}
                <div className="px-5 pt-5">
                    <div className={`relative w-full h-40 bg-gradient-to-br ${COLORS[0]} rounded-2xl p-5 overflow-hidden shadow-xl`}>
                        {/* Glow orbs */}
                        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full" />
                        <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white/5 rounded-full" />

                        <div className="relative flex flex-col h-full justify-between">
                            <div className="flex items-center justify-between">
                                <CardChip />
                                {form.type === 'Visa' ? <VisaLogo /> : <MastercardLogo />}
                            </div>
                            <div>
                                <p className="text-white/50 text-[10px] font-medium mb-0.5 tracking-widest uppercase">Card Number</p>
                                <p className="text-white text-sm font-bold tracking-widest font-mono">
                                    {form.number || '•••• •••• •••• ••••'}
                                </p>
                            </div>
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-white/50 text-[9px] tracking-widest uppercase">Cardholder</p>
                                    <p className="text-white text-xs font-bold uppercase tracking-wide">{form.name || 'YOUR NAME'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-white/50 text-[9px] tracking-widest uppercase">Expires</p>
                                    <p className="text-white text-xs font-bold">{form.expiry || 'MM/YY'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fields */}
                <div className="px-5 py-4 flex flex-col gap-3">
                    {/* Card type */}
                    <div className="flex gap-2">
                        {['Visa', 'Mastercard'].map(t => (
                            <button key={t} onClick={() => set('type', t)}
                                className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-all ${form.type === t ? 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-200' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* Number */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Card Number</label>
                        <div className="relative">
                            <CreditCard size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <input value={form.number} onChange={e => set('number', formatNumber(e.target.value))}
                                placeholder="0000 0000 0000 0000"
                                className="w-full text-sm bg-gray-100 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition-all placeholder:text-gray-300 font-mono border-0" />
                        </div>
                    </div>

                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cardholder Name</label>
                        <div className="relative">
                            <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <input value={form.name} onChange={e => set('name', e.target.value.toUpperCase())}
                                placeholder="AS ON CARD"
                                className="w-full text-sm bg-gray-100 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition-all placeholder:text-gray-300 font-medium border-0 uppercase" />
                        </div>
                    </div>

                    {/* Expiry + CVV */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expiry</label>
                            <div className="relative">
                                <Calendar size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input value={form.expiry} onChange={e => set('expiry', formatExpiry(e.target.value))}
                                    placeholder="MM/YY"
                                    className="w-full text-sm bg-gray-100 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition-all placeholder:text-gray-300 font-mono border-0" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CVV</label>
                            <div className="relative">
                                <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input value={form.cvv} onChange={e => set('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                                    placeholder="•••"
                                    type="password"
                                    className="w-full text-sm bg-gray-100 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition-all placeholder:text-gray-300 font-mono border-0" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-5 pb-5 flex gap-2.5">
                    <button onClick={onClose} className="flex-none px-5 h-11 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-400 hover:bg-gray-50 transition-all">
                        Cancel
                    </button>
                    <button disabled={!ok}
                        onClick={() => { onSave({ ...form, last4, id: Date.now(), color: COLORS[Math.floor(Math.random() * COLORS.length)], default: false }); onClose() }}
                        className="flex-1 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-300 text-white font-extrabold text-sm transition-all active:scale-[0.98] shadow-md shadow-blue-100 disabled:shadow-none">
                        Save Card
                    </button>
                </div>
            </div>
        </div>
    )
}

// ═══ MAIN ═════════════════════════════════════════════════════════════════════
const PaymentMethod = () => {
    const [cards, setCards] = useState(MOCK_CARDS)
    const [showForm, setShowForm] = useState(false)

    const remove = (id) => setCards(p => p.filter(c => c.id !== id))
    const setDefault = (id) => setCards(p => p.map(c => ({ ...c, default: c.id === id })))
    const addCard = (card) => setCards(p => [...p, card])

    return (
        <div className="flex flex-col gap-5">

            {/* ── Header ── */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-gray-900 tracking-tight">Payment Methods</h1>
                    <p className="text-xs text-gray-400 mt-0.5">{cards.length} card{cards.length !== 1 ? 's' : ''} saved</p>
                </div>
                <button onClick={() => setShowForm(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-extrabold rounded-xl transition-all shadow-md shadow-blue-200">
                    <Plus size={13} /> Add Card
                </button>
            </div>

            {/* ── Cards Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cards.map(({ id, type, last4, name, expiry, color, default: isDefault }) => (
                    <div key={id} className="flex flex-col gap-3 group">

                        {/* Credit card visual */}
                        <div className={`relative w-full h-44 bg-linear-to-br ${color} rounded-2xl p-5 overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300`}>
                            {/* Decorative orbs */}
                            <div className="absolute -top-8 -right-8 w-36 h-36 bg-white/5 rounded-full pointer-events-none" />
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />

                            {/* Actions — hover */}
                            <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button className="w-7 h-7 bg-white/20 hover:bg-white/35 rounded-lg flex items-center justify-center backdrop-blur-sm transition-all">
                                    <Pencil size={11} className="text-white" />
                                </button>
                                <button onClick={() => remove(id)} className="w-7 h-7 bg-white/20 hover:bg-red-400/60 rounded-lg flex items-center justify-center backdrop-blur-sm transition-all">
                                    <Trash2 size={11} className="text-white" />
                                </button>
                            </div>

                            <div className="relative flex flex-col h-full justify-between">
                                <div className="flex items-center justify-between">
                                    <CardChip />
                                    {type === 'Visa' ? <VisaLogo /> : <MastercardLogo />}
                                </div>
                                <div>
                                    <p className="text-white/40 text-[9px] tracking-widest uppercase mb-0.5">Card Number</p>
                                    <p className="text-white font-bold tracking-widest font-mono text-sm">•••• •••• •••• {last4}</p>
                                </div>
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-white/40 text-[9px] tracking-widest uppercase">Cardholder</p>
                                        <p className="text-white text-xs font-bold uppercase tracking-wide">{name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white/40 text-[9px] tracking-widest uppercase">Expires</p>
                                        <p className="text-white text-xs font-bold">{expiry}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Below card — default badge + set default */}
                        <div className="flex items-center justify-between px-1">
                            {isDefault ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-extrabold rounded-full border border-blue-100">
                                    <Star size={9} className="fill-blue-500" /> Default
                                </span>
                            ) : (
                                <button onClick={() => setDefault(id)} className="text-[11px] font-bold text-gray-400 hover:text-blue-600 transition-colors">
                                    Set as default →
                                </button>
                            )}
                            <span className="text-[10px] text-gray-400 font-medium">{type} ···{last4}</span>
                        </div>
                    </div>
                ))}

                {/* Ghost add card */}
                <div className="flex flex-col gap-3">
                    <button onClick={() => setShowForm(true)}
                        className="w-full h-44 bg-gray-50 hover:bg-blue-50 border-2 border-dashed border-gray-200 hover:border-blue-300 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-200 group">
                        <div className="w-11 h-11 bg-white group-hover:bg-blue-100 rounded-xl flex items-center justify-center border border-gray-200 group-hover:border-blue-200 shadow-sm transition-all">
                            <Plus size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <p className="text-xs font-bold text-gray-400 group-hover:text-blue-600 transition-colors">Add New Card</p>
                        <p className="text-[10px] text-gray-400">Visa, Mastercard accepted</p>
                    </button>
                </div>
            </div>

            {/* Popup */}
            {showForm && <AddCardForm onClose={() => setShowForm(false)} onSave={addCard} />}
        </div>
    )
}

export default PaymentMethod