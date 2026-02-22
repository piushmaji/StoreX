import { Home, MapPin, Pencil, Phone, Plus, Trash2, Building2, Star, X, User, Hash } from 'lucide-react'
import { useState } from 'react'

const MOCK_ADDRESSES = [
    { id: 1, type: 'Home', name: 'Piush Maji', address: 'Durga Puja Park, Karolbagh, Regharpura', city: 'New Delhi', pin: '110005', phone: '9899076655', default: true },
    { id: 2, type: 'Work', name: 'Piush Maji', address: '42, Sector 18, Cyber City, DLF Phase 2', city: 'Gurugram', pin: '122002', phone: '9899076655', default: false },
]

const EMPTY_FORM = { type: 'Home', name: '', address: '', city: '', pin: '', phone: '' }

// ── Input field ───────────────────────────────────────────────────────────────
const Field = ({ label, icon: Icon, ...props }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
        <div className="relative">
            {Icon && <Icon size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
            <input
                className={`w-full text-sm bg-gray-100 border-0 focus:ring-2 focus:ring-blue-200 focus:bg-white rounded-xl ${Icon ? 'pl-9' : 'pl-4'} pr-4 py-2.5 outline-none transition-all placeholder:text-gray-300 font-medium`}
                {...props}
            />
        </div>
    </div>
)

// ── Add Address Popup ─────────────────────────────────────────────────────────
const AddressForm = ({ onClose, onSave }) => {
    const [form, setForm] = useState(EMPTY_FORM)
    const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
    const ok = form.name.trim() && form.address.trim() && form.city.trim() && form.pin.trim() && form.phone.trim()

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
            <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
                    <div>
                        <p className="text-sm font-extrabold text-gray-900">Add New Address</p>
                        <p className="text-xs text-gray-400 mt-0.5">Fill in your delivery details</p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                        <X size={14} className="text-gray-500" />
                    </button>
                </div>

                <div className="px-5 py-5 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">

                    {/* Type toggle */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Address Type</label>
                        <div className="flex gap-2">
                            {['Home', 'Work', 'Other'].map(t => (
                                <button
                                    key={t}
                                    onClick={() => set('type', t)}
                                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border-2 transition-all ${form.type === t
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-200'
                                        : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                                        }`}
                                >
                                    {t === 'Home' && <Home size={11} />}
                                    {t === 'Work' && <Building2 size={11} />}
                                    {t === 'Other' && <MapPin size={11} />}
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Field label="Full Name" icon={User} placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)} />

                    <Field label="Street Address" icon={MapPin} placeholder="House no., street, area..." value={form.address} onChange={e => set('address', e.target.value)} />

                    <div className="grid grid-cols-2 gap-3">
                        <Field label="City" icon={MapPin} placeholder="City" value={form.city} onChange={e => set('city', e.target.value)} />
                        <Field label="PIN Code" icon={Hash} placeholder="000000" value={form.pin} onChange={e => set('pin', e.target.value)} maxLength={6} />
                    </div>

                    <Field label="Phone Number" icon={Phone} placeholder="+91 00000 00000" value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>

                {/* Footer */}
                <div className="px-5 pb-5 pt-3 border-t border-gray-100 flex gap-2.5">
                    <button onClick={onClose} className="flex-none px-5 h-11 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-400 hover:bg-gray-50 transition-all">
                        Cancel
                    </button>
                    <button
                        disabled={!ok}
                        onClick={() => { onSave(form); onClose() }}
                        className="flex-1 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-300 text-white font-extrabold text-sm transition-all active:scale-[0.98] shadow-md shadow-blue-100 disabled:shadow-none"
                    >
                        Save Address
                    </button>
                </div>
            </div>
        </div>
    )
}

// ── Main ──────────────────────────────────────────────────────────────────────
const Address = () => {
    const [addresses, setAddresses] = useState(MOCK_ADDRESSES)
    const [showForm, setShowForm] = useState(false)

    const remove = (id) => setAddresses(p => p.filter(a => a.id !== id))
    const setDefault = (id) => setAddresses(p => p.map(a => ({ ...a, default: a.id === id })))

    const handleSave = (form) => {
        setAddresses(p => [...p, { ...form, id: Date.now(), default: p.length === 0 }])
    }

    return (
        <div className="flex flex-col gap-5">

            {/* ── Header ── */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-gray-900 tracking-tight">Saved Addresses</h1>
                    <p className="text-xs text-gray-400 mt-0.5">{addresses.length} address{addresses.length !== 1 ? 'es' : ''} saved</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-extrabold rounded-xl transition-all shadow-md shadow-blue-200"
                >
                    <Plus size={13} /> Add New
                </button>
            </div>

            {/* ── Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addresses.map(({ id, type, name, address, city, pin, phone, default: isDefault }) => {
                    const Icon = type === 'Work' ? Building2 : Home
                    return (
                        <div key={id}
                            className={`relative bg-white rounded-2xl border-2 transition-all duration-200 p-4 flex flex-col gap-3 hover:shadow-lg hover:shadow-slate-100 group
                                ${isDefault ? 'border-blue-200' : 'border-gray-100 hover:border-blue-100'}`}
                        >
                            {/* Top row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDefault ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                        <Icon size={13} className={isDefault ? 'text-blue-600' : 'text-gray-500'} />
                                    </div>
                                    <span className="text-xs font-extrabold text-gray-700">{type}</span>
                                    {isDefault && (
                                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-black rounded-full border border-blue-100">
                                            <Star size={7} className="fill-blue-500" /> Default
                                        </span>
                                    )}
                                </div>

                                {/* Edit / Delete — appear on hover */}
                                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <button className="w-7 h-7 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                                        <Pencil size={11} className="text-blue-600" />
                                    </button>
                                    <button onClick={() => remove(id)} className="w-7 h-7 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors">
                                        <Trash2 size={11} className="text-red-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Name */}
                            <p className="text-sm font-extrabold text-gray-900">{name}</p>

                            {/* Details */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-start gap-2">
                                    <MapPin size={12} className="text-gray-400 mt-0.5 shrink-0" />
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        {address},&nbsp;<span className="font-semibold text-gray-700">{city}</span> — {pin}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={12} className="text-gray-400 shrink-0" />
                                    <p className="text-xs text-gray-500">{phone}</p>
                                </div>
                            </div>

                            {/* Set default */}
                            {!isDefault && (
                                <button
                                    onClick={() => setDefault(id)}
                                    className="text-[11px] font-bold text-blue-500 hover:text-blue-700 text-left transition-colors w-fit mt-0.5"
                                >
                                    Set as default →
                                </button>
                            )}
                        </div>
                    )
                })}

                {/* Ghost add card */}
                <button
                    onClick={() => setShowForm(true)}
                    className="min-h-40 bg-gray-50 hover:bg-blue-50 border-2 border-dashed border-gray-200 hover:border-blue-300 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-200 group"
                >
                    <div className="w-10 h-10 bg-white group-hover:bg-blue-100 rounded-xl flex items-center justify-center border border-gray-200 group-hover:border-blue-200 shadow-sm transition-all">
                        <Plus size={18} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <p className="text-xs font-bold text-gray-400 group-hover:text-blue-600 transition-colors">Add New Address</p>
                </button>
            </div>

            {/* Popup form */}
            {showForm && <AddressForm onClose={() => setShowForm(false)} onSave={handleSave} />}
        </div>
    )
}

export default Address