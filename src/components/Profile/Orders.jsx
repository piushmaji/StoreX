import { CircleCheck } from 'lucide-react'
import React from 'react'

const Orders = () => {
    return (
        <section className='flex flex-col px-4 py-6'>

            <div className='text-2xl'>
                <h1>My Orders</h1>
            </div>

            <section className='flex flex-col  gap-4 py-6'>

                <div className='flex flex-col  p-4 rounded-lg border border-gray-300 '>
                    <div className='text-xl'>
                        <h1>Order #9822</h1>
                    </div>
                    <div className='flex flex-col lg:flex-row py-4 gap-6 w-full'>
                        <div className='h-36 w-36 border rounded-lg border-gray-300 p-2'>
                            <img
                                className='h-full w-full object-contain'
                                src="https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/o/l/2/-original-imahgfmzvanpgncf.jpeg?q=70&crop=false" alt="" />
                        </div>
                        <div className='w-[55%] p-2 flex flex-col gap-4'>
                            <div className='bg-green-400 w-32 rounded-full flex items-center gap-2 px-2 py-1 text-white shadow-lg'>
                                <CircleCheck />
                                <h1>Delivered</h1>
                            </div>
                            <div>
                                <h1>Gaming Laptop</h1>
                            </div>
                            <div className='text-2xl font-bold'>
                                <h1>₹890000</h1>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-col justify-center gap-4'>
                            <button className='bg-blue-600 rounded-lg text-white flex justify-center items-center py-4 cursor-pointer'>Track Package</button>
                            <button className='bg-white rounded-lg text-blue-600 flex justify-center items-center py-4 cursor-pointer border border-blue-600'>View Details</button>
                        </div>
                    </div>
                </div>

            </section>
        </section>
    )
}

export default Orders
