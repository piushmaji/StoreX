import React from 'react'

const CategoryCards = ({ title, buttonText, bgImage, items }) => {
    return (
        <div>
            {/* Home and Decor items section */}
            <div className="grid lg:grid-cols-12 lg:w-full p-2 ">
                {/* Source Tag Section  */}
                <div className="group relative overflow-hidden lg:col-span-3 ">
                    <img
                        className="lg:h-96 w-full h-48 object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                        src={bgImage} alt={title} />
                    <div className="flex flex-col items-center justify-center-safe gap-4 absolute inset-0 bg-yellow-200/20">
                        <h1 className="text-2xl text-gray-50">{title}</h1>
                        <button className="p-2 h-10 w-30 rounded-xl bg-gray-50">{buttonText}</button>
                    </div>
                </div>

                {/* image and source section of cards  */}
                <div className="grid lg:col-span-9 grid-cols-2 lg:grid-cols-4 border-t border-gray-300">

                    {/* Each Category card section  */}

                    {items.map((category) => (
                        <div
                            key={items.id}
                            className="h-48 w-full flex bg-gray-50 border-r border-b border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <div className="pt-5 pl-3">
                                <h1 className="text-xl pb-2">{category.name}</h1>
                                <h6 className="text-sm font-thin text-gray-400 ">FROM</h6>
                                <h3 className="text-lg font-thin text-gray-400">₹{category.price}</h3>
                            </div>
                            <div className="relative h-40 w-40 ">
                                <img
                                    className="absolute h-30 w-30 bottom-0 right-0"
                                    src={category.img} alt={category.name} />
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    )
}

export default CategoryCards
