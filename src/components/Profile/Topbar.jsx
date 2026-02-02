import { ClipboardList, CreditCard, MapPin, Pencil } from 'lucide-react'
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) => `flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out min-w-[80px]
 ${isActive
        ? "bg-blue-500 text-white "
        : "text-gray-700 hover:bg-gray-200 "
    }}`

const Topbar = () => {

    return (
        <div className='lg:hidden w-full mb-4'>
            <section className='border rounded-lg bg-gray-50 border-gray-300 p-4'>
                <div className='text-xl py-2 mb-2'>
                    <h1>Profile</h1>
                </div>

                <div className='flex items-center justify-between'>

                    {/* Edit Profile Section */}
                    <NavLink to='' end className={linkClass}>
                        <Pencil size={20} />
                        <span className='text-xs mt-1'>Profile</span>
                    </NavLink>

                    {/* Orders Section */}
                    <NavLink to='orders' className={linkClass}>
                        <ClipboardList size={20} />
                        <span className='text-xs mt-1'>Orders</span>
                    </NavLink>

                    {/* Address Section */}
                    <NavLink to="address" className={linkClass}>
                        <MapPin size={20} />
                        <span className='text-xs mt-1'>Address</span>
                    </NavLink>

                    {/* Payment Section */}
                    <NavLink to="payment" className={linkClass}>
                        <CreditCard size={20} />
                        <span className='text-xs mt-1'>Payment</span>
                    </NavLink>

                </div>
            </section>
        </div>
    )
}

export default Topbar