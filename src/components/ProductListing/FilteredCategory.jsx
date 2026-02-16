import { ChevronUp } from "lucide-react"
import FilterAccordion from "../common/Filter/FilterAccordion"
import PriceFilter from "../common/Filter/PriceFilter"
import PriceInputFilter from "../common/Filter/PriceInputFilter"




const FilteredCategory = () => {
    return (
        <div className='h-full bg-gray-50'>

            <div>
                {/* Category section */}

                {/* Brands section */}
                <div className="flex flex-col gap-4 py-4">
                    <div className="flex justify-between">
                        <FilterAccordion
                            title="Brands"
                            options={["Samsung", "Apple", "Huawei", "Oppo", "OnePlus"]} />
                    </div>
                </div>


                {/* Features section */}
                <div className="flex flex-col gap-4 py-2">
                    <FilterAccordion
                        title="Features"
                        options={[
                            "Metallic",
                            "Plastic Cover",
                            "8GB RAM",
                            "Super Power",
                            "Large Memory",
                        ]} />
                </div>


                {/* Price Range section */}
                <div className=" flex flex-col py-2">
                    <PriceFilter />
                    <div className="w-full">
                        <PriceInputFilter />
                    </div>
                </div>

                {/* Condition section */}
                <div className=" flex flex-col gap-4 py-2">
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
                <div className="flex flex-col gap-4 py-2">
                    {/* <div className="flex justify-between">
                        <h1>Condition</h1>
                        <ChevronUp />
                    </div> */}
                    {/* <div className="flex flex-col gap-2 font-light">

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
                    </div> */}
                </div>

            </div>
        </div>
    )
}

export default FilteredCategory
