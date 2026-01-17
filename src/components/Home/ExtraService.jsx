import { Search, Sliders, Send, ShieldCheck } from "lucide-react"

const ExtraService = () => {
    const extraServices = [
        {
            id: 1,
            img: "/img/extraService/factory.svg",
            icon: Search,
            title: "Source from Industry Hubs",
        },
        {
            id: 2,
            img: "/img/extraService/customize.svg",
            icon: Sliders,
            title: "Customize Your Products",
        },
        {
            id: 3,
            img: "/img/extraService/shipping.svg",
            icon: Send,
            title: "Fast, reliable shipping by ocean or air",
        },
        {
            id: 4,
            img: "/img/extraService/inspection.svg",
            icon: ShieldCheck,
            title: "Product monitoring and inspection",
        }
    ];
    return (
        <div className='p-2'>
            <div className='text-2xl p-2'>
                <h1>Our extra services</h1>
            </div>
            <div className=' grid lg:grid-cols-4 grid-cols-2 gap-2'>

                {extraServices.map((cards) => {

                    const Icon = cards.icon

                    return (
                        <div key={cards.id} className="border border-gray-300 rounded-lg ">
                            <div className='relative bg-gray-900 rounded-lg'>
                                {/* img section  */}
                                <div>
                                    <img
                                        className="object-cover h-full w-full"
                                        src={cards.img} alt={cards.title} />
                                </div>

                                {/* Icon Section */}
                                <div className="lg:h-18 lg:w-18 h-12 w-12  lg:top-27 lg:right-9 top-14 right-4 flex justify-center items-center absolute bg-neutral-50 rounded-full ">
                                </div>
                                <div className="lg:h-16 lg:w-16 h-10 w-10 lg:top-28 lg:right-10 top-15 right-5 flex justify-center items-center absolute bg-blue-200 rounded-full shadow-lg ">
                                    <Icon className="h-6 w-6" />
                                </div>

                                {/* text section */}
                                <div className="h-20 bg-neutral-50 pl-4 pt-4 rounded-b-lg ">
                                    <h2 className="lg:w-[55%] w-[75%]">{cards.title}</h2>
                                </div>
                            </div>
                        </div>
                    )
                })}


            </div>
        </div>
    )
}

export default ExtraService
