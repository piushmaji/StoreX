import React from 'react'

const RecomendedItems = () => {
    return (
        <>
            <div className='h-150'>
                <div className='text-2xl p-2'>
                    <h1>Recommended items</h1>
                </div>
                <div className='h-150 p-2 grid lg:grid-cols-5 grid-cols-2'>
                    <div className='bg-green-100'>
                        <div className='h-40 w-40 bg-amber-600 '>
                            <img src="https://www.freepnglogos.com/uploads/t-shirt-png/t-shirt-png-shirt-png-transparent-image-pngpix-1.png" alt="" />
                        </div>
                        <h2>₹399</h2>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div className='bg-green-200'>h</div>
                    <div className='bg-green-300'>h</div>
                    <div className='bg-green-50'>h</div>
                    <div className='bg-green-400'>h</div>
                    <div className='bg-green-500'>h</div>
                    <div className='bg-green-600'>h</div>
                    <div className='bg-green-700'>h</div>
                    <div className='bg-green-800'>h</div>
                    <div className='bg-green-900'>h</div>
                </div>
            </div>
        </>
    )
}

export default RecomendedItems
