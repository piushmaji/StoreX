import React from 'react'

const Deal = () => {
    const products = [
        { name: "Laptop", img: "img/DealsandOffers/laptop.svg", discount: "10%" },
        { name: "Phone", img: "img/DealsandOffers/phone.svg", discount: "15%" },
        { name: "Headphones", img: "img/DealsandOffers/headphone.svg", discount: "20%" },
        { name: "Camera", img: "img/DealsandOffers/camera.svg", discount: "12%" },
        { name: "Watch", img: "img/DealsandOffers/watch.svg", discount: "18%" }
    ];
    const timeData = [
        {
            id: 1,
            value: 4,
            label: "Days",
        },
        {
            id: 2,
            value: 12,
            label: "Hour",
        },
        {
            id: 3,
            value: 32,
            label: "Min",
        },
        {
            id: 4,
            value: 53,
            label: "Sec",
        },
    ];

    return (
        <div className='m-2 grid grid-cols-12 lg:col-span-1'>

            {/* Deal and offers section */}
            <div className='col-span-12 lg:col-span-3 bg-gray-50 border border-gray-300 flex lg:flex-col justify-between items-center p-5 gap-4'>
                <div className='flex flex-col '>
                    <h1 className=' text-xl lg:text-2xl '>Deals and Offers</h1>
                    <h2 className='text-md text-gray-400'>Hygiene Equipments</h2>
                </div>
                <div className='grid grid-cols-4 items-center justify-items-center gap-4'>
                    {timeData.map((items) => [
                        <div key={items.id} className='lg:h-13 lg:w-13 h-12 w-12 bg-gray-300 flex flex-col items-center rounded-lg'>
                            <h2>{items.value}</h2>
                            <h3>{items.label}</h3>
                        </div>
                    ])}
                </div>
            </div>
            <div className='grid grid-cols-2 col-span-12 lg:grid-cols-5  lg:col-span-9'>

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

                        <div className="text-xl flex justify-center">
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
