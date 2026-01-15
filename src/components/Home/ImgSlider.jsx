import { ArrowRightLeft, MoveLeft, MoveRight } from 'lucide-react'
import React from 'react'

const ImgSlider = () => {
    return (
        <div className='p-2'>
            <div className='bg-gray-50 grid grid-cols-12'>
                <div className='h-56 lg:h-80 w-full order-2 col-span-10'>
                    <img
                        className='h-56 lg:h-80 w-full object-cover'
                        src="img/SlidePage/Slideimg.svg" alt="Slideimg" />
                </div>
                <div className='order-1 cols-span-1 flex items-center justify-center'>
                    <MoveLeft className='h-8 w-8 lg:h-10 lg:w-10 p-2 bg-gray-200 rounded-full ' />
                </div>
                <div className='order-3 col-span-1 flex items-center justify-center'>
                    <MoveRight className='h-8 w-8 lg:h-10 lg:w-10 p-2  bg-gray-200 rounded-full' />
                </div>
            </div>
        </div>
    )
}

export default ImgSlider
