import { Search, Sliders, Send, ShieldCheck, ArrowRight } from "lucide-react"

const ExtraService = () => {
    const extraServices = [
        {
            id: 1,
            img: "https://images.unsplash.com/photo-1558024920-b41e1887dc32?q=80&w=600&auto=format&fit=crop",
            icon: Search,
            title: "Source from Textile Hubs",
        },
        {
            id: 2,
            img: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=600&auto=format&fit=crop",
            icon: Sliders,
            title: "Bespoke & Custom Fittings",
        },
        {
            id: 3,
            img: "https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?q=80&w=600&auto=format&fit=crop",
            icon: Send,
            title: "Global Supply Chain Shipping",
        },
        {
            id: 4,
            img: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=600&auto=format&fit=crop",
            icon: ShieldCheck,
            title: "Quality Material Inspection",
        }
    ];

    return (
        <div className="py-6">
            <div className="mb-8 px-2">
                <h2 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">
                    Premium Services
                </h2>
                <p className="text-xs tracking-[0.2em] text-gray-500 font-semibold uppercase">
                    Beyond sourcing limits
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {extraServices.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div key={card.id} className="group relative overflow-hidden bg-white border border-gray-100 rounded-3xl cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                            
                            {/* Image container */}
                            <div className="relative h-40 overflow-hidden">
                                <img
                                    className="object-cover h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
                                    src={card.img}
                                    alt={card.title}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 to-transparent" />
                            </div>

                            {/* Icon overlay */}
                            <div className="absolute top-32 right-6 z-20">
                                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-gray-50 transform group-hover:-translate-y-2 transition-transform duration-500">
                                    <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                                        <Icon className="h-5 w-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                                    </div>
                                </div>
                            </div>

                            {/* Text container */}
                            <div className="bg-white p-6 pt-5 h-full relative z-10">
                                <h3 className="text-[17px] font-bold text-gray-900 leading-tight w-[85%] group-hover:text-blue-600 transition-colors">
                                    {card.title}
                                </h3>
                                <div className="mt-4 flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-blue-600 opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all duration-300">
                                    Learn More <ArrowRight size={12} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ExtraService;
