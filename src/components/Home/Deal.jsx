import React from 'react'

const Deal = () => {
    const products = [
        { name: "Laptop", img: "https://png.pngtree.com/png-vector/20250304/ourmid/pngtree-sleek-modern-laptop-with-high-resolution-display-png-image_15711292.png", discount: "10%" },
        { name: "Phone", img: "https://png.pngtree.com/png-vector/20240216/ourmid/pngtree-apple-iphone-11-pro-max-clear-case-3d-render-png-image_11742978.png", discount: "15%" },
        { name: "Headphones", img: "https://png.pngtree.com/png-vector/20241204/ourmid/pngtree-cool-black-headphone-png-image_14581226.png", discount: "20%" },
        { name: "Camera", img: "https://www.freeiconspng.com/uploads/camera-icon--reality-icons--softiconsm-29.png", discount: "12%" },
        { name: "Watch", img: "https://png.pngtree.com/png-vector/20241025/ourmid/pngtree-smart-watch-png-image_14171827.png", discount: "18%" }
    ];

    return (
        <div className='m-2  h-screen lg:h-64 grid grid-rows-6 grid-cols-2 lg:grid-cols-6 lg:col-span-1 lg:grid-rows-1'>

            {/* Deal and offers section */}
            <div className='h-full col-start-1 col-end-7 row-span-1 lg:col-span-1 bg-gray-50 grid grid-cols-8 lg:block border border-gray-300'>
                <div className='flex flex-col items-center pt-8 col-span-3'>
                    <h1 className='text-2xl'>Deals and Offers</h1>
                    <h2 className='text-lg text-gray-400'>Hygiene Equipments</h2>
                </div>
                <div className='grid grid-cols-4 col-span-5 p-4 lg:pt-7 gap-1 items-center justify-items-center '>
                    <div className='h-13 w-13 bg-gray-300 flex flex-col items-center rounded-lg'>
                        <h2>4</h2>
                        <h3>Days</h3>
                    </div>
                    <div className='h-13 w-13 bg-gray-300 flex flex-col items-center rounded-lg'>
                        <h2>12</h2>
                        <h3>Hour</h3>
                    </div>
                    <div className='h-13 w-13 bg-gray-300 flex flex-col items-center rounded-lg'>
                        <h2>32</h2>
                        <h3>Min</h3>
                    </div>
                    <div className='h-13 w-13 bg-gray-300 flex flex-col items-center rounded-lg'>
                        <h2>53</h2>
                        <h3>Sec</h3>
                    </div>
                </div>
            </div>
            <div className='h-64 grid grid-cols-2 col-span-2 lg:grid-cols-5  lg:col-span-5 row-span-5 lg:row-col-5'>

                {/* Deal Card section */}

                {products.map((product) => (
                    <div
                        key={product.name}
                        className="h-full bg-gray-50 flex flex-col items-center gap-4 pb-2 border border-t-0 lg:border-t lg:border-l-0 border-gray-300"
                    >
                        <div className="flex flex-col items-center pt-4">
                            <img
                                className="h-24 object-cover"
                                src={product.img}
                                alt={product.name}
                            />
                        </div>

                        <div className="text-2xl flex justify-center">
                            <h1>{product.name}</h1>
                        </div>

                        <div className="w-15 flex justify-center rounded-4xl bg-green-200 p-2 text-green-500">
                            <div>{product.discount}</div>
                        </div>
                    </div>
                ))}



            </div>
        </div>
    )
}

export default Deal
