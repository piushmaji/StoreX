import { ChevronUp } from "lucide-react"

const FilteredCategory = () => {
    return (
        <div className='h-full bg-gray-50'>
            <div>
                {/* Category section */}
                <div className="border-t border-gray-400 flex flex-col gap-4 py-4">
                    <div className="flex justify-between">
                        <h1>Category</h1>
                        <ChevronUp />
                    </div>
                    <div>
                        <ul className="flex flex-col gap-2 font-light text-gray-600">
                            <li className="hover:text-gray-950 hover:cursor-pointer ">Mobile accessory</li>
                            <li className="hover:text-gray-950 hover:cursor-pointer ">Electronics</li>
                            <li className="hover:text-gray-950 hover:cursor-pointer ">Smartphones </li>
                            <li className="hover:text-gray-950 hover:cursor-pointer ">Modern tech</li>
                            <li className="text-blue-500 font-semibold  hover:text-blue-800 hover:cursor-pointer ">See all</li>
                        </ul>
                    </div>
                </div>

                {/* Brands section */}
                <div className="border-t border-gray-400 flex flex-col gap-4 py-2">

                    <div className="flex justify-between">
                        <h1>Brands</h1>
                        <ChevronUp />
                    </div>

                    <div className="flex flex-col gap-2 font-light">

                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4"
                                type="checkbox" name="Samsung" /><label>Samsung</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4"
                                type="checkbox" name="Apple" /><label>Apple</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4"
                                type="checkbox" name="Huwai" /><label>Huwai</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4"
                                type="checkbox" name="Oppo" /><label>Oppo</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4"
                                type="checkbox" name="OnePlus" /><label>OnePlus</label>
                        </div>
                        <ul>
                            <li className="text-blue-500 font-semibold  hover:text-blue-800 hover:cursor-pointer ">See all</li>
                        </ul>

                    </div>
                </div>

                {/* Features section */}
                <div className="border-t border-gray-400 flex flex-col gap-4 py-2">

                    <div className="flex justify-between">
                        <h1>Features</h1>
                        <ChevronUp />
                    </div>

                    <div className="flex flex-col gap-2 font-light">

                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4"
                                type="checkbox" name="Metallic" /><label>Metallic</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4"
                                type="checkbox" name="Plastic cover" /><label>Plastic cover</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4"
                                type="checkbox" name="8GB Ram" /><label>8GB Ram</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4"
                                type="checkbox" name="Super power" /><label>Super power</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4"
                                type="checkbox" name="Large Memory" /><label>Large Memory</label>
                        </div>
                        <ul>
                            <li className="text-blue-500 font-semibold  hover:text-blue-800 hover:cursor-pointer ">See all</li>
                        </ul>

                    </div>
                </div>

                {/* Price Range section */}
                <div className="border-t border-gray-400 flex flex-col gap-4 py-2">
                    <div className="flex justify-between">
                        <h1>Price range</h1>
                        <ChevronUp />
                    </div>
                    <div>
                        <input type="range" min={6000} max={200000} />
                    </div>
                    <div className="w-full flex gap-4">
                        <div className="w-1/2">
                            <h1>Min</h1>
                            <input className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg " type="text" placeholder="0" />
                        </div>
                        <div className="w-1/2">
                            <h1>Max</h1>
                            <input className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg " type="text" placeholder="200000" />
                        </div>
                    </div>
                    <div className="">
                        <button className="w-full border border-gray-300 p-2 rounded-lg text-blue-600 bg-gray-50">Apply</button>
                    </div>
                </div>

                {/* Condition section */}
                <div className="border-t border-gray-400 flex flex-col gap-4 py-2">
                    <div className="flex justify-between">
                        <h1>Condition</h1>
                        <ChevronUp />
                    </div>
                    <div className="flex flex-col gap-2 font-light">

                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4"
                                type="radio" name="Any" /><label>Any</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4"
                                type="radio" name="Refurbished" /><label>Refurbished</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4"
                                type="radio" name="Brand New" /><label>Brand New</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4"
                                type="radio" name="Old Items" /><label>Old Items</label>
                        </div>
                        <ul>
                            <li className="text-blue-500 font-semibold  hover:text-blue-800 hover:cursor-pointer ">See all</li>
                        </ul>
                    </div>
                </div>
                {/* Condition section */}
                <div className="border-t border-gray-400 flex flex-col gap-4 py-2">
                    <div className="flex justify-between">
                        <h1>Condition</h1>
                        <ChevronUp />
                    </div>
                    <div className="flex flex-col gap-2 font-light">

                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4"
                                type="checkbox" /><label>⭐️⭐️⭐️⭐️⭐️</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4"
                                type="checkbox" /><label>⭐️⭐️⭐️⭐️</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4"
                                type="checkbox" /><label>⭐️⭐️⭐️</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="h-4 w-4"
                                type="checkbox" /><label>⭐️⭐️</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FilteredCategory
