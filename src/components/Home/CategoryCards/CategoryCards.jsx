import React from 'react'
import { ArrowRight, Flame } from 'lucide-react'

const CategoryCards = ({ title, buttonText, bgImage, items }) => {
    return (
        <div className="py-10 font-sans">
            {/* ── Fun & Clear Header ── */}
            <div className="flex items-center justify-between mb-6 px-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        <Flame fill="currentColor" size={20} />
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">
                        {title}
                    </h2>
                </div>
                <a
                    href="#"
                    className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                    See all <ArrowRight size={18} />
                </a>
            </div>

            {/* ── Main Layout (Super simple: 1 big banner, 4 cards) ── */}
            <div className="flex flex-col lg:flex-row gap-4 px-4">

                {/* ── The Big Banner (Left) ── */}
                <div className="lg:w-[30%] relative rounded-4xl overflow-hidden group cursor-pointer h-[350px] lg:h-auto shadow-lg shadow-gray-200/50">
                    <img
                        src={bgImage}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
                    
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <h3 className="text-3xl font-black text-white mb-4 leading-tight">
                            Trending<br/>Right Now
                        </h3>
                        <button className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-100 transition-colors text-sm shadow-xl active:scale-95">
                            {buttonText}
                        </button>
                    </div>
                </div>

                {/* ── Easy to Understand Product Cards (Right) ── */}
                <div className="lg:w-[70%] grid grid-cols-2 md:grid-cols-4 gap-4">
                    {items.slice(0, 4).map((category) => (
                        <div key={category.id} className="flex flex-col bg-white rounded-3xl p-3 border-2 border-gray-100 hover:border-blue-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                            
                            {/* Cute Image Box */}
                            <div className="w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden relative mb-3">
                                <img
                                    src={category.img}
                                    alt={category.name}
                                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 p-4"
                                />
                                {/* Overlay "Quick Add" for desktop */}
                                <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        Quick View
                                    </div>
                                </div>
                            </div>

                            {/* Info & Price */}
                            <div className="flex flex-col flex-1 justify-between px-1">
                                <h3 className="text-[15px] font-bold text-gray-900 leading-tight mb-2 line-clamp-2">
                                    {category.name}
                                </h3>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="bg-blue-50 text-blue-700 font-black px-3 py-1.5 rounded-xl text-sm">
                                        ₹{category.price}
                                    </div>
                                    <div className="h-8 w-8 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-md">
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Mobile View All ── */}
            <div className="mt-6 px-4 md:hidden">
                <button className="w-full bg-blue-50 text-blue-600 font-bold py-4 rounded-2xl text-sm active:scale-95 transition-transform">
                    View All {title}
                </button>
            </div>
        </div>
    )
}

export default CategoryCards
