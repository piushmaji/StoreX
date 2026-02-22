import { Camera, CheckCircle, Pencil, X } from 'lucide-react'
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

    // Photo pick from gallery
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

    return (
        <div className="flex flex-col gap-6 max-w-lg">

            {/* ── Title ── */}
            <div>
                <h1 className="text-xl font-black text-gray-900">Edit Profile</h1>
                <p className="text-xs text-gray-400 mt-0.5">Update your photo and personal details</p>
            </div>

            {/* ── Photo ── */}
            <div className="flex items-center gap-5">
                <div className="relative group shrink-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-gray-100">
                        <img src={photo} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    {/* Hover overlay */}
                    <button
                        onClick={() => fileRef.current.click()}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-2xl flex flex-col items-center justify-center gap-1 transition-opacity cursor-pointer"
                    >
                        <Camera size={16} className="text-white" />
                        <span className="text-white text-[9px] font-bold">Change</span>
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                </div>

                <div className="flex flex-col gap-1.5">
                    <p className="text-sm font-bold text-gray-800">{name || 'Your Name'}</p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                    <button
                        onClick={() => fileRef.current.click()}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors text-left"
                    >
                        Upload new photo →
                    </button>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100" />

            {/* ── Fields ── */}
            <div className="flex flex-col gap-4">

                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                    {editingName ? (
                        <div className="flex gap-2 items-center">
                            <input
                                autoFocus
                                value={draftName}
                                onChange={e => setDraftName(e.target.value)}
                                placeholder={name || 'Your name'}
                                onKeyDown={e => e.key === 'Enter' && handleSave()}
                                className="flex-1 text-sm bg-gray-100 border-0 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-2.5 outline-none transition-all font-medium placeholder:text-gray-300"
                            />
                            <button
                                onClick={handleSave}
                                className="w-9 h-9 bg-gray-900 hover:bg-gray-800 rounded-xl flex items-center justify-center text-white transition-all active:scale-95 shrink-0"
                            >
                                <CheckCircle size={15} />
                            </button>
                            <button
                                onClick={() => { setEditingName(false); setDraftName('') }}
                                className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 transition-all active:scale-95 shrink-0"
                            >
                                <X size={15} />
                            </button>
                        </div>
                    ) : (
                        <div
                            onClick={() => { setEditingName(true); setDraftName(name) }}
                            className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200 rounded-xl px-4 py-2.5 cursor-pointer transition-all group"
                        >
                            <span className={`text-sm font-medium ${name ? 'text-gray-800' : 'text-gray-300'}`}>
                                {name || 'Add your name'}
                            </span>
                            <Pencil size={12} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    )}
                </div>

                {/* Email — read only */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
                        <span className="text-sm font-medium text-gray-500">{user?.email || 'your@email.com'}</span>
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Verified</span>
                    </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+91 00000 00000"
                        className="w-full text-sm bg-gray-50 border-2 border-transparent focus:border-blue-200 focus:bg-white rounded-xl px-4 py-2.5 outline-none transition-all font-medium placeholder:text-gray-300"
                    />
                </div>
            </div>

            {/* ── Save ── */}
            <div className="flex items-center gap-3">
                <button
                    onClick={handleSave}
                    className="flex-1 h-11 bg-gray-900 hover:bg-gray-800 active:scale-[0.98] text-white font-extrabold text-sm rounded-2xl transition-all shadow-lg shadow-gray-900/15"
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
    )
}

export default Dashboard