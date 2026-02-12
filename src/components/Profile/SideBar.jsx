import { ClipboardList, CreditCard, MapPin, Pencil } from 'lucide-react'
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth"
import { Navigate, useNavigate } from 'react-router-dom'
import { auth } from '../../context/Firebase/Firebase';

const linkClass = ({ isActive }) => `flex gap-2 items-center p-4 rounded-lg  cursor-pointer  transition-all duration-200 ease-in-out

 ${isActive
        ? "bg-blue-500 text-white "
        : "text-gray-700 hover:bg-gray-200 "
    }}`

const SideBar = () => {

    const navigate = useNavigate()
    const handleSignOut = async () => {
        try {
            await signOut(auth)
            navigate('/')

        } catch (error) {
            console.log("Logout error:", error)
        }
    }

    return (
        <div className=''>
            <section className='hidden lg:block border rounded-lg bg-gray-50 border-gray-300 p-4'>
                <div className='text-2xl py-2'>
                    <h1>Profile</h1>
                </div>

                <div className='flex flex-col cursor-pointer gap-2'>

                    {/* Edit Profile Section */}

                    <NavLink to='' end className={linkClass}>
                        <Pencil size={16} />
                        <h1>Edit Profile</h1>
                    </NavLink>


                    {/* Orders Section */}

                    <NavLink to='orders' className={linkClass}>
                        <ClipboardList size={16} />
                        <h1>Orders</h1>
                    </NavLink>


                    {/* Address Section */}
                    <NavLink to="address" className={linkClass}>
                        <MapPin size={16} />
                        <h1>Address</h1>
                    </NavLink>

                    {/* Payment Section */}
                    <NavLink to="payment" className={linkClass}>
                        <CreditCard size={16} />
                        <h1>Payment Method</h1>
                    </NavLink>

                </div>

                <div
                    onClick={handleSignOut}
                    className='text-red-500 flex  items-center p-4 cursor-pointer'>
                    <h1>Log Out</h1>
                </div>
            </section>
        </div>
    )
}

export default SideBar
