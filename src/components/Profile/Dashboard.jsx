import { Camera, CheckCircle, Pencil, X, Shield, Phone, User } from 'lucide-react'
import { useContext, useRef, useState } from 'react'
import { updateProfile } from 'firebase/auth'
import { auth, FirebaseContext } from '../../context/Firebase/Firebase'

const Dashboard = () => {
    const { user } = useContext(FirebaseContext)

    const [photo, setPhoto] = useState(
        user?.photoURL || "https://i.pinimg.com/1200x/d9/e1/4c/d9e14c251d468cc476c0ec33f969b5da.jpg"
    )
    const [name, setName] = useState(user?.displayName || '')
    const [editingName, setEditingName] = useState(false)
    const [draftName, setDraftName] = useState('')
    const [phone, setPhone] = useState('')
    const [saved, setSaved] = useState(false)
    const fileRef = useRef()

    const handlePhoto = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (ev) => setPhoto(ev.target.result)
        reader.readAsDataURL(file)
    }

    const handleSave = async () => {
        await updateProfile(auth.currentUser, {
            displayName: draftName.trim() || name,
        })
        if (draftName.trim()) setName(draftName.trim())
        setEditingName(false)
        setDraftName('')
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
    }

    const initials = (name || user?.email || 'U').slice(0, 2).toUpperCase()

    return (
        <div className="w-full max-w-2xl flex flex-col gap-3">

            {/* ── Hero Banner ── */}
            <div className="bg-linear-to-br from-blue-700 via-blue-600 to-blue-500 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
                <div className="absolute -bottom-8 left-8 w-28 h-28 rounded-full bg-white/5" />

                <div className="relative flex items-center gap-5">
                    {/* Avatar */}
                    <div className="relative group shrink-0">
                        <div className="p-1 rounded-[20px] bg-white/30">
                            <div className="w-18 h-18 rounded-2xl overflow-hidden">
                                {photo
                                    ? <img src={photo} alt="avatar" className="w-full h-full object-cover" />
                                    : <div className="w-full h-full flex items-center justify-center text-lg font-bold text-blue-700 bg-blue-100">{initials}</div>
                                }
                            </div>
                        </div>
                        <button
                            onClick={() => fileRef.current.click()}
                            className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40"
                        >
                            <Camera size={15} className="text-white" />
                            <span className="text-white text-[8px] font-bold uppercase tracking-wider">Change</span>
                        </button>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col">
                        <p className="text-blue-200 text-[10px] font-semibold uppercase tracking-widest mb-1">Profile</p>
                        <h2 className="text-white text-lg font-bold leading-snug">{name || 'Your Name'}</h2>
                        <p className="text-blue-200 text-xs font-medium mt-0.5">{user?.email || 'your@email.com'}</p>
                        <button
                            onClick={() => fileRef.current.click()}
                            className="mt-2 text-white/70 hover:text-white text-xs font-semibold transition-colors border-b border-white/25 hover:border-white/60 pb-px w-fit"
                        >
                            Upload new photo
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Form Card ── */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

                <div className="mb-5">
                    <h1 className="text-[15px] font-bold text-gray-900">Personal Details</h1>
                    <p className="text-xs text-gray-400 mt-0.5">Update your name, email, and phone</p>
                </div>

                <div className="flex flex-col gap-4">

                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                            <User size={9} /> Full Name
                        </label>
                        {editingName ? (
                            <div className="flex gap-2">
                                <input
                                    autoFocus
                                    value={draftName}
                                    onChange={e => setDraftName(e.target.value)}
                                    placeholder={name || 'Your full name'}
                                    onKeyDown={e => e.key === 'Enter' && handleSave()}
                                    className="flex-1 text-sm bg-gray-50 border-2 border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-2xl px-4 py-2.5 outline-none font-medium text-gray-800 placeholder:text-gray-300 transition-all"
                                />
                                <button
                                    onClick={handleSave}
                                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-2xl flex items-center justify-center text-white transition-colors shrink-0"
                                >
                                    <CheckCircle size={15} />
                                </button>
                                <button
                                    onClick={() => { setEditingName(false); setDraftName('') }}
                                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 transition-colors shrink-0"
                                >
                                    <X size={15} />
                                </button>
                            </div>
                        ) : (
                            <div
                                onClick={() => { setEditingName(true); setDraftName(name) }}
                                className="flex items-center justify-between bg-gray-50 hover:bg-blue-50 border-2 border-transparent hover:border-blue-100 rounded-2xl px-4 py-2.5 cursor-pointer group transition-all"
                            >
                                <span className={`text-sm font-medium ${name ? 'text-gray-800' : 'text-gray-300'}`}>
                                    {name || 'Add your full name'}
                                </span>
                                <span className="w-7 h-7 rounded-xl bg-white border border-gray-200 group-hover:bg-blue-100 group-hover:border-blue-200 flex items-center justify-center shrink-0 transition-all opacity-0 group-hover:opacity-100">
                                    <Pencil size={11} className="text-blue-600" />
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                            <Shield size={9} /> Email Address
                        </label>
                        <div className="flex items-center justify-between bg-gray-50 border-2 border-transparent rounded-2xl px-4 py-2.5">
                            <span className="text-sm font-medium text-gray-500">{user?.email || 'your@email.com'}</span>
                            <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                                Verified
                            </span>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                            <Phone size={9} /> Phone Number
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder="+91 00000 00000"
                            className="w-full text-sm bg-gray-50 border-2 border-transparent hover:border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:bg-white rounded-2xl px-4 py-2.5 outline-none font-medium text-gray-800 placeholder:text-gray-300 transition-all"
                        />
                    </div>
                </div>

                <div className="h-px bg-gray-100 my-5" />

                {/* Save */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSave}
                        className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all"
                    >
                        Save Changes
                    </button>
                    {saved && (
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-100 whitespace-nowrap">
                            <CheckCircle size={12} /> Saved!
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard