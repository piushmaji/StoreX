import React from 'react'

const Deal = () => {
    const products = [
        { name: "Laptop", img: "img/DealsandOffers/laptop.svg", discount: "10%" },
        { name: "Phone", img: "img/DealsandOffers/phone.svg", discount: "15%" },
        { name: "Headphones", img: "img/DealsandOffers/headphone.svg", discount: "20%" },
        { name: "Camera", img: "img/DealsandOffers/camera.svg", discount: "12%" },
        { name: "Watch", img: "img/DealsandOffers/watch.svg", discount: "18%" }
    ];

    return (
        <div className='m-2  h-screen lg:h-64 grid grid-rows-6 grid-cols-2 lg:grid-cols-12 lg:col-span-1 lg:grid-rows-1'>

            {/* Deal and offers section */}
            <div className='h-full col-start-1 col-end-7 row-span-1 lg:col-span-3 bg-gray-50 grid grid-cols-8 lg:block border border-gray-300'>
                <div className='flex flex-col items-center pt-7 pl-3 col-span-3'>
                    <h1 className='text-2xl'>Deals and Offers</h1>
                    <h2 className='text-lg text-gray-400'>Hygiene Equipments</h2>
                </div>
                <div className='grid grid-cols-4 col-span-5 p-6 lg:pt-7 items-center justify-items-center '>
                    <div className='h-13 w-13  bg-gray-300 flex flex-col items-center rounded-lg'>
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
            <div className='h-64 grid grid-cols-2 col-span-2 lg:grid-cols-5  lg:col-span-9 row-span-5 lg:row-col-5'>

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
