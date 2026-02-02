import { Home, Pencil, Plus, Trash2 } from 'lucide-react'
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
                    <div className='flex flex-col border rounded-lg border-gray-300 p-4'>
                        <div className='flex justify-between'>
                            <div className='flex gap-2'>
                                <Home />
                                <h1>Default Shipping Address</h1>
                            </div>

                            <div className='flex'>
                                <div><Pencil /></div>
                                <div><Trash2 /></div>
                            </div>
                        </div>
                        <div></div>
                        <div></div>
                    </div>
                </section>
            </div >
        </div >
    )
}

export default Address
