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
        <div className="hidden lg:block shrink-0 w-72">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

                {/* Header */}
                <div className="px-5 pt-5 pb-4 border-b border-gray-100">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.14em]">My Account</p>
                </div>

                {/* Nav */}
                <nav className="p-2.5 flex flex-col gap-0.5">
                    {NAV.map(({ to, label, icon: Icon, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                `flex items-center justify-between gap-3 px-3 py-2.5 rounded-2xl text-[13.5px] font-semibold transition-all cursor-pointer
                                ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                                    : 'text-gray-500 hover:bg-blue-50 hover:text-blue-700'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors
                                            ${isActive
                                                ? 'bg-white/20'
                                                : 'bg-gray-100 group-hover:bg-blue-100'
                                            }`}
                                        >
                                            <Icon size={13} className={isActive ? 'text-white' : 'text-gray-500'} />
                                        </div>
                                        {label}
                                    </div>
                                    {isActive && <ChevronRight size={13} className="text-white/60 shrink-0" />}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Divider */}
                <div className="mx-4 h-px bg-gray-100" />

                {/* Sign Out */}
                <div className="p-2.5">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-[13.5px] font-semibold text-red-400 hover:bg-red-50 hover:text-red-500 transition-all group"
                    >
                        <div className="w-8 h-8 rounded-xl bg-red-50 group-hover:bg-red-100 flex items-center justify-center shrink-0 transition-colors">
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