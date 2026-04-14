import React from 'react'
import { ArrowRight } from 'lucide-react'

const CategoryCards = ({ title, buttonText, bgImage, items }) => {
    return (
        <div className="py-6">
            {/* ── Section Header ─────────────────────────────────────── */}
            <div className="flex items-end justify-between mb-6 px-2">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">
                        {title}
                    </h2>
                    <p className="text-xs tracking-[0.2em] text-gray-500 font-semibold uppercase">
                        Curated Collections
                    </p>
                </div>
                <a
                    href="#"
                    className="hidden lg:flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-gray-400 hover:text-gray-900 uppercase transition-colors duration-200 group"
                >
                    Explore Category
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
            </div>

            {/* ── Main Grid ──────────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                {/* ── Featured Banner (left) ─────────────────────────── */}
                <div className="group relative lg:col-span-3 overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-500 cursor-pointer"
                    style={{ minHeight: '360px' }}>
                    <img
                        src={bgImage}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    {/* Cinematic linear overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Text content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                        <h3 className="text-2xl font-black text-white mb-6 leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{title}</h3>
                        <button className="flex items-center justify-center gap-2 bg-white text-gray-900 text-xs font-bold tracking-widest px-6 py-3.5 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                            {buttonText}
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </div>

                {/* ── Product Cards Grid (right) ─────────────────────── */}
                <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {items.map((category) => (
                        <div
                            key={category.id}
                            className="group relative flex flex-col justify-between bg-white border border-gray-100 rounded-3xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer overflow-hidden"
                            style={{ minHeight: '180px' }}
                        >
                            {/* Subtle hover background tint */}
                            <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                            {/* Text block */}
                            <div className="relative z-10 space-y-1">
                                <h3 className="text-[15px] font-bold text-gray-800 leading-tight">
                                    {category.name}
                                </h3>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-[9px] text-gray-400 tracking-widest uppercase font-bold">
                                        From
                                    </span>
                                    <span className="text-sm font-black text-blue-600">
                                        ₹{category.price}
                                    </span>
                                </div>
                            </div>

                            {/* Product image */}
                            <div className="relative z-10 flex justify-end items-end mt-4">
                                <img
                                    src={category.img}
                                    alt={category.name}
                                    className="h-24 w-24 object-contain transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-x-2 group-hover:-translate-y-2 drop-shadow-sm"
                                />
                            </div>

                            {/* Hover arrow indicator */}
                            <div className="absolute top-5 right-5 h-8 w-8 bg-white shadow-sm border border-gray-100 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 z-10">
                                <ArrowRight size={14} className="text-blue-600" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Mobile View All ─────────────────────────────── */}
            <div className="flex lg:hidden justify-center mt-6">
                <a
                    href="#"
                    className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-900 uppercase bg-gray-100 px-6 py-3.5 rounded-full hover:bg-gray-200 transition-colors"
                >
                    View All {title} <ArrowRight size={14} />
                </a>
            </div>
        </div>
    )
}

export default CategoryCards
