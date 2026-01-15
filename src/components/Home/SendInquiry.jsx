import React from 'react'

const SendInquiry = () => {
    return (
        <div className='p-2'>
            <div className=' lg:h-96 h-140 relative '>
                <div>
                    <img
                        className='lg:h-96 h-140  w-full object-cover rounded-lg '
                        src="https://images.unsplash.com/photo-1449247666642-264389f5f5b1?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
                <div className='lg:h-96 h-140 grid lg:grid-cols-6 justify-center items-center absolute inset-0  bg-linear-to-r from-blue-500/80 to-teal-300/40 rounded-lg'>
                    <div className=' lg:col-span-2 flex flex-col  lg:pt-14 lg:pl-14 pt-5 pl-16  gap-5 text-justify text-gray-100'>
                        <h1 className='text-4xl text-left text-gray-50 w-110'>An easy way to send requests to all suppliers</h1>
                        <p className='w-90'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis quos enim error sunt quibusdam, suscipit cupiditate itaque rem earum expedita?</p>
                    </div>
                    <div className='flex justify-end-safe items-center w-full col-span-4 p-2 pr-10 '>
                        <form className='lg:h-90 h-80 lg:w-[50%]  p-5 bg-gray-50 flex flex-col gap-5 rounded-2xl'>
                            <h1 className='text-xl'>Send quote to suppliers</h1>
                            <input
                                className='h-10 w-96 rounded-lg bg-gray-50 border border-gray-300 p-2 focus:outline-none'
                                readOnly
                                type="text"
                                value='What item you need?' />
                            <textarea
                                className='h-20 w-96 rounded-lg bg-gray-50 border border-gray-300 p-2 placeholder-gray-300 focus:outline-none'
                                type="r"
                                placeholder='Type More Detail' />

                            <div className='flex gap-5'>
                                <input
                                    className='h-10 w-48 rounded-lg bg-gray-50 border border-gray-300 p-2 placeholder-gray-600 focus:outline-none'
                                    type="text"
                                    placeholder='Quantity' />

                                <select className='h-10 w-40 rounded-lg bg-gray-50 border border-gray-300 p-2 placeholder-gray-600 focus:outline-none'>
                                    <option value="Pcs">Pcs</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="More">More</option>
                                </select>
                            </div>

                            <button
                                className='h-10 w-40 rounded-lg bg-blue-500 p-2 text-gray-50'
                            >Send Inquiry</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendInquiry
