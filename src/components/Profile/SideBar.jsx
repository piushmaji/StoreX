import { ClipboardList, CreditCard, MapPin, Pencil } from 'lucide-react'

const SideBar = () => {
    return (
        <div className=' lg:w-[25%]'>
            <section className='hidden lg:block border rounded-lg bg-gray-50 border-gray-300 p-4'>
                <div className='text-2xl py-2'>
                    <h1>Profile</h1>
                </div>

                <div className='flex flex-col cursor-pointer '>
                    <div className='flex gap-2 items-center p-4 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in-out cursor-pointer'>
                        <Pencil size={16} />
                        <h1>Edit Profile</h1>
                    </div>
                    <div className='flex gap-2 items-center p-4 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in-out cursor-pointer'>
                        <ClipboardList size={16} />
                        <h1>Orders</h1>
                    </div>
                    <div className='flex gap-2 items-center p-4 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in-out cursor-pointer'>
                        <MapPin size={16} />
                        <h1>Address</h1>
                    </div>
                    <div className='flex gap-2 items-center p-4 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in-out cursor-pointer'>
                        <CreditCard size={16} />
                        <h1>Payment Method</h1>
                    </div>
                </div>

                <div className='bg-blue-600 rounded-lg text-white flex justify-center items-center py-4 cursor-pointer my-2'>
                    <h1>Log Out</h1>
                </div>
            </section>
        </div>
    )
}

export default SideBar
