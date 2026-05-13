import { Search, Sliders, Send, ShieldCheck, ArrowUpRight, Sparkles } from "lucide-react"

const ExtraService = () => {
    const extraServices = [
        {
            id: 1,
            img: "https://images.unsplash.com/photo-1558024920-b41e1887dc32?q=80&w=600&auto=format&fit=crop",
            icon: Search,
            title: "Source from Textile Hubs",
            desc: "Direct access to premium global manufacturers.",
            color: "bg-blue-600 text-white",
            span: "md:col-span-2 md:row-span-2", // Big hero card (2x2)
        },
        {
            id: 2,
            img: "https://images.unsplash.com/photo-1549262870-0acbac9e1efe?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            icon: Sliders,
            title: "Bespoke & Custom",
            desc: "Tailored fits.",
            color: "bg-lime-400 text-black",
            span: "md:col-span-1 md:row-span-1", // Square bright card (1x1)
        },
        {
            id: 3,
            img: "https://images.unsplash.com/photo-1761307234387-d9291985eaf9?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            icon: Send,
            title: "Global Shipping",
            desc: "Lightning fast.",
            color: "bg-black text-white",
            span: "md:col-span-1 md:row-span-2", // Tall dark card (1x2)
        },
        {
            id: 4,
            img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            icon: ShieldCheck,
            title: "Quality Check",
            desc: "100% verified materials.",
            color: "bg-purple-100 text-purple-900",
            span: "md:col-span-1 md:row-span-1", // Square soft card (1x1)
        }
    ];

    return (
        <div className="py-16 font-sans mb-12">
            {/* ── Quirky Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 px-4 gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-xs font-black uppercase tracking-widest mb-4 shadow-[4px_4px_0px_0px_rgba(200,200,200,1)]">
                        <Sparkles size={14} className="text-yellow-300" /> Member Perks
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-[0.9] uppercase">
                        Beyond <br/> The Rack.
                    </h2>
                </div>
                <p className="text-sm font-medium text-gray-500 max-w-xs leading-relaxed">
                    Unlock exclusive services designed for the modern fashion connoisseur.
                </p>
            </div>

            {/* ── Atrangi Bento Grid ── */}
            {/* Removed hardcoded h-[1200px] md:h-[600px] and used auto-rows to prevent overlap */}
            <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] gap-4 px-4">
                
                {/* 1. Big Hero Card */}
                <a href="#service-1" className={`group relative rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${extraServices[0].color} ${extraServices[0].span}`}>
                    {/* Background Image inside a pill */}
                    <div className="absolute top-6 right-6 bottom-6 w-1/2 rounded-[2rem] overflow-hidden opacity-90 group-hover:w-[55%] transition-all duration-700 hidden md:block">
                        <img src={extraServices[0].img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="relative z-10 w-full md:w-1/2 flex flex-col h-full">
                        <div className="bg-white/20 backdrop-blur-md w-14 h-14 rounded-full flex items-center justify-center mb-auto group-hover:rotate-12 transition-transform">
                            <Search className="text-white h-6 w-6" />
                        </div>
                        <div className="mt-8">
                            <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter leading-none mb-4">{extraServices[0].title}</h3>
                            <p className="text-sm font-medium opacity-80 mb-6">{extraServices[0].desc}</p>
                            <div className="inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest group-hover:bg-blue-900 group-hover:text-white transition-colors">
                                Explore <ArrowUpRight size={16} />
                            </div>
                        </div>
                    </div>
                </a>

                {/* 2. Square Bright Card */}
                <a href="#service-2" className={`group relative rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${extraServices[1].color} ${extraServices[1].span}`}>
                    <div className="flex justify-between items-start">
                        <Sliders className="h-8 w-8" />
                        <div className="bg-black text-lime-400 rounded-full p-2 group-hover:scale-110 transition-transform">
                            <ArrowUpRight size={16} />
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2">{extraServices[1].title}</h3>
                        <p className="text-xs font-bold opacity-80">{extraServices[1].desc}</p>
                    </div>
                </a>

                {/* 3. Tall Dark Card */}
                <a href="#service-3" className={`group relative rounded-[2rem] p-6 flex flex-col justify-end overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${extraServices[2].color} ${extraServices[2].span}`}>
                    <img src={extraServices[2].img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700" />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                    
                    <div className="relative z-10">
                        <div className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform">
                            <Send className="h-5 w-5" />
                        </div>
                        <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">{extraServices[2].title}</h3>
                        <p className="text-xs font-medium text-gray-400 mb-6">{extraServices[2].desc}</p>
                        <div className="w-full border-t border-white/20 pt-4 flex justify-between items-center text-xs font-bold uppercase tracking-widest group-hover:text-blue-400 transition-colors">
                            Track <ArrowUpRight size={16} />
                        </div>
                    </div>
                </a>

                {/* 4. Square Soft Card (Replaced the wide card to fit the 4x2 grid perfectly) */}
                <a href="#service-4" className={`group relative rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${extraServices[3].color} ${extraServices[3].span}`}>
                    <div className="flex justify-between items-start">
                        <ShieldCheck className="h-8 w-8" />
                        <div className="bg-white text-purple-900 rounded-full p-2 shadow-md group-hover:bg-purple-900 group-hover:text-white transition-colors">
                            <ArrowUpRight size={16} />
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2">{extraServices[3].title}</h3>
                        <p className="text-xs font-bold opacity-80">{extraServices[3].desc}</p>
                    </div>
                </a>

            </div>
        </div>
    );
};

export default ExtraService;
