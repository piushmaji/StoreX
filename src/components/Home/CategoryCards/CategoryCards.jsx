import { Link } from 'react-router-dom'
import { ArrowRight, Flame } from 'lucide-react'

const CategoryCards = ({ title, buttonText, bgImage, items, categorySlug }) => {
    return (
        <div className="py-10 font-sans">
            {/* ── Fun & Clear Header ── */}
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                        {title}
                    </h2>
                    <p className="text-[10px] font-black tracking-[0.3em] text-blue-600 uppercase mt-3">
                        Seasonal Highlights
                    </p>
                </div>
                <Link
                    to={`/category/${categorySlug}`}
                    className="hidden md:flex items-center gap-2 text-xs font-black tracking-widest text-gray-400 hover:text-gray-900 uppercase transition-colors group"
                >
                    View Selection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* ── Main Layout (Super simple: 1 big banner, 4 cards) ── */}
            <div className="flex flex-col lg:flex-row gap-4">

                {/* ── The Big Banner (Left) ── */}
                <div className="lg:w-[35%] relative rounded-[2.5rem] overflow-hidden group cursor-pointer h-[400px] lg:h-auto premium-shadow">
                    <img
                        src={bgImage}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <span className="text-[10px] font-black tracking-[0.4em] text-white/70 uppercase mb-2">Curated</span>
                        <h3 className="text-4xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
                            {title.split(' ')[0]}<br/>
                            <span className="text-blue-400">Edit.</span>
                        </h3>
                        <Link 
                            to={`/category/${categorySlug}`}
                            className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-gray-100 transition-all text-[11px] tracking-widest uppercase shadow-2xl active:scale-95 text-center"
                        >
                            {buttonText}
                        </Link>
                    </div>
                </div>

                {/* ── Easy to Understand Product Cards (Right) ── */}
                <div className="lg:w-[65%] grid grid-cols-2 md:grid-cols-4 gap-4">
                    {items.slice(0, 4).map((category) => (
                        <div key={category.id} className="flex flex-col bg-white rounded-[2rem] p-3 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group premium-shadow">
                            
                            {/* Cute Image Box */}
                            <div className="w-full aspect-square bg-[#F9FAFB] rounded-2xl overflow-hidden relative mb-4">
                                <img
                                    src={category.img}
                                    alt={category.name}
                                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 p-6"
                                />
                            </div>

                            {/* Info & Price */}
                            <div className="flex flex-col flex-1 px-2 pb-2">
                                <h3 className="text-xs font-black text-gray-900 leading-tight mb-3 line-clamp-2 uppercase tracking-tight">
                                    {category.name}
                                </h3>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-sm font-black text-gray-900 tracking-tighter">
                                        ₹{category.price}
                                    </span>
                                    <div className="h-8 w-8 bg-gray-50 text-gray-900 rounded-full flex items-center justify-center transition-colors group-hover:bg-gray-900 group-hover:text-white">
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Mobile View All ── */}
            <div className="mt-8 md:hidden">
                <Link 
                    to={`/category/${categorySlug}`}
                    className="block w-full bg-gray-100 text-gray-900 font-black py-4 rounded-[1.5rem] text-[10px] tracking-widest uppercase active:scale-95 transition-all text-center"
                >
                    Explore {title}
                </Link>
            </div>
        </div>
    )
}

export default CategoryCards
