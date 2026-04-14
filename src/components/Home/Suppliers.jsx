import React from 'react'
import { ExternalLink } from 'lucide-react'

const Suppliers = () => {
    const regions = [
        {
            id: 1,
            title: "Arabic Emirates",
            website: "shopname.ae",
            flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/1920px-Flag_of_the_United_Arab_Emirates.svg.png"
        },
        {
            id: 2,
            title: "Australia",
            website: "shopname.com.au",
            flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1920px-Flag_of_Australia_%28converted%29.svg.png"
        },
        {
            id: 3,
            title: "United States",
            website: "shopname.us",
            flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Flag_of_the_United_States_%28DDD-F-416E_specifications%29.svg/1920px-Flag_of_the_United_States_%28DDD-F-416E_specifications%29.svg.png"
        },
        {
            id: 4,
            title: "Russia",
            website: "shopname.ru",
            flag: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/1920px-Flag_of_Russia.svg.png?20120812153731"
        },
        {
            id: 5,
            title: "Italy",
            website: "shopname.it",
            flag: "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/250px-Flag_of_Italy.svg.png"
        },
        {
            id: 6,
            title: "Denmark",
            website: "denmark.dk",
            flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/250px-Flag_of_Denmark.svg.png"
        },
        {
            id: 7,
            title: "France",
            website: "shopname.fr",
            flag: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/250px-Flag_of_France.svg.png"
        },
        {
            id: 8,
            title: "Saudi Arabia",
            website: "shopname.sa",
            flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/250px-Flag_of_Saudi_Arabia.svg.png"
        },
        {
            id: 9,
            title: "China",
            website: "shopname.cn",
            flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/250px-Flag_of_the_People%27s_Republic_of_China.svg.png"
        },
        {
            id: 10,
            title: "Great Britain",
            website: "shopname.co.uk",
            flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Great_Britain_%281707%E2%80%931800%29.svg/960px-Flag_of_Great_Britain_%281707%E2%80%931800%29.svg.png"
        }
    ]

    return (
        <div className="py-6">
            <div className="mb-8 px-2">
                <h2 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">
                    Suppliers By Region
                </h2>
                <p className="text-xs tracking-[0.2em] text-gray-500 font-semibold uppercase">
                    Our Global Network
                </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-5 px-2">
                {regions.map((item) => (
                    <a
                        key={item.id}
                        href={`https://${item.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col sm:flex-row items-start sm:items-center p-4 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                        {/* Flag image */}
                        <div className="h-10 w-14 shrink-0 rounded-lg overflow-hidden border border-gray-100 shadow-sm mb-3 sm:mb-0">
                            <img 
                                src={item.flag} 
                                alt={item.title} 
                                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        {/* Text info block */}
                        <div className="sm:pl-4 flex-1">
                            <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                {item.title}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[11px] font-medium text-gray-400 group-hover:text-blue-500 transition-colors">
                                    {item.website}
                                </span>
                                <ExternalLink size={10} className="text-gray-300 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0" />
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Suppliers