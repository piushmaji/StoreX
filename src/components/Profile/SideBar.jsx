import { ClipboardList, CreditCard, MapPin, Pencil, LogOut, ChevronRight } from 'lucide-react'
import { NavLink, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from '../../context/Firebase/Firebase'

const NAV = [
    { to: '', label: 'Edit Profile', icon: Pencil, end: true },
    { to: 'orders', label: 'Orders', icon: ClipboardList },
    { to: 'address', label: 'Address', icon: MapPin },
    { to: 'payment', label: 'Payment Method', icon: CreditCard },
]

const SideBar = () => {
    const navigate = useNavigate()

    const handleSignOut = async () => {
        try {
            await signOut(auth)
            navigate('/')
        } catch (err) {
            console.log("Logout error:", err)
        }
    }

    return (
        <div className="hidden lg:block shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">

                {/* Header */}
                <div className="px-4 py-4 border-b border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">My Account</p>
                </div>

                {/* Nav links */}
                <nav className="p-2 flex flex-col gap-0.5">
                    {NAV.map(({ to, label, icon: Icon, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                `flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 group
                                ${isActive
                                    ? 'bg-blue-600 text-white shadow-md shadow-gray-900/20'
                                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isActive ? 'bg-white/15' : 'bg-gray-100 group-hover:bg-gray-200'}`}>
                                            <Icon size={13} className={isActive ? 'text-white' : 'text-gray-500'} />
                                        </div>
                                        {label}
                                    </div>
                                    {isActive && <ChevronRight size={13} className="text-white/60" />}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Divider */}
                <div className="mx-4 h-px bg-gray-100" />

                {/* Sign out */}
                <div className="p-2">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold text-red-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200 group"
                    >
                        <div className="w-7 h-7 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                            <LogOut size={13} className="text-red-400" />
                        </div>
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SideBar