import { Mail, Search } from 'lucide-react'
import React from 'react'

const NewSletter = () => {
    return (
        <div>
            <div className='bg-gray-200 p-6 '>
                <div className='flex flex-col justify-center items-center gap-4'>
                    <div className='text-lg flex flex-col justify-center items-center'>
                        <h1>Subscribe on our newsletter</h1>
                        <p className='lg:w-full w-[80%] text-center text-xs text-gray-600'>Get daily news on upcoming offers from many suppliers all over the world</p>
                    </div>

                    <div className='relative flex gap-2'>
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            className='pl-10 w-72 bg-gray-50 border rounded-lg border-gray-400 '
                            type="text"
                            placeholder='Email' />
                        <button
                            className='p-2 bg-blue-600 rounded-lg text-white'>
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewSletter
