import { Home, MapPin, Pencil, Phone, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const Address = () => {
    return (
        <div>
            <div className='bg-gray-50 border rounded-lg border-gray-300 py-3 lg:px-6 '>

                {/* Naming section and add to new address button section */}
                <section className='flex justify-between items-center'>
                    <div className='text-2xl py-2 px-4 lg:px-0'>
                        <h1>Addresses</h1>
                    </div>

                    <div>
                        <button className='bg-blue-600 rounded-lg text-white flex justify-center items-center p-2 shadow-lg  cursor-pointer'>
                            <Plus />
                            <h1>Add New Address</h1>
                        </button>
                    </div>
                </section>

                {/* Saved address section */}
                <section className='grid grid-cols-2 gap-4 py-6'>

                    {/* each address section */}
                    {[1, 2, 3, 4].map(() => (
                        <div className='flex flex-col gap-4 border rounded-lg border-gray-300 shadow-lg p-4'>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-2 items-center'>
                                    <Home size={16} />
                                    <h1>Default Shipping Address</h1>
                                </div>

                                <div className='flex gap-2'>
                                    <div className='h-6 w-6 flex items-center justify-center rounded-md bg-blue-300 text-blue-600 p-1 hover:scale-95 transition-all'><Pencil size={16} /></div>
                                    <div className='h-6 w-6 flex items-center justify-center rounded-md bg-red-300 text-red-600 p-1 hover:scale-95 transition-all'><Trash2 size={16} /></div>
                                </div>
                            </div>
                            <div className='text-xl font-semibold px-6'>
                                <h1>Piush Maji</h1>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className='flex gap-2 items-center text-xs'>
                                    <MapPin size={16} />
                                    <h1>Durga Puja Park,Karolbagh,Regharpura,New Delhi-110005</h1>
                                </div>
                                <div className='flex gap-2 items-center text-xs'>
                                    <Phone size={16} />
                                    <h1>9899076655</h1>
                                </div>
                            </div>
                        </div>
                    ))}

                </section>
            </div >
        </div >
    )
}

export default Address
