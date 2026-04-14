import React from 'react'
import Timer from './Timer';
import { Zap, ArrowRight } from 'lucide-react';

const Deal = () => {
    const products = [
        { name: "Cashmere Sweater", img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop", discount: "10%", original: "₹6,000", sale: "₹5,400", sold: 65 },
        { name: "Leather Tote", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop", discount: "15%", original: "₹4,200", sale: "₹3,570", sold: 42 },
        { name: "Silk Scarf", img: "https://images.unsplash.com/photo-1632128913346-60195ee0f019?q=80&w=800&auto=format&fit=crop", discount: "20%", original: "₹1,800", sale: "₹1,440", sold: 88 },
        { name: "Polarized Sunglasses", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop", discount: "12%", original: "₹2,500", sale: "₹2,200", sold: 20 },
        { name: "Minimalist Watch", img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop", discount: "18%", original: "₹5,000", sale: "₹4,100", sold: 75 }
    ];

    const offerEndDate = new Date();
    offerEndDate.setDate(offerEndDate.getDate() + 7);

    return (
        <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white">

            {/* ── Header Bar ───────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-900 px-8 py-5">

                {/* Left — title */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <span className="flex items-center justify-center p-3 rounded-full bg-blue-600/20 backdrop-blur-md">
                        <Zap size={22} className="text-blue-400 fill-blue-400 animate-pulse" />
                    </span>
                    <div>
                        <h2 className="text-white font-black text-2xl tracking-tight">
                            Flash Deals
                        </h2>
                        <p className="text-gray-400 text-[10px] tracking-widest uppercase font-semibold mt-0.5">
                            Luxury Apparel &amp; Accessories
                        </p>
                    </div>
                </div>

                {/* Right — Timer */}
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <span className="text-gray-400 text-[11px] tracking-[0.2em] uppercase font-bold">
                        Ends In
                    </span>
                    <Timer endDate={offerEndDate} />
                </div>
            </div>

            {/* ── Product Cards Strip ───────────────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 divide-x divide-y xl:divide-y-0 divide-gray-100">
                {products.map((product, idx) => (
                    <div
                        key={product.name}
                        className="group relative flex flex-col items-center gap-4 px-6 py-8 hover:bg-blue-50/50 transition-colors duration-300 cursor-pointer"
                    >
                        {/* Discount badge */}
                        <div className="absolute top-4 left-4">
                            <span className="bg-red-500 text-white text-[11px] font-black tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                                -{product.discount}
                            </span>
                        </div>

                        {/* Product image */}
                        <div className="h-32 w-32 flex items-center justify-center mb-2">
                            <img
                                src={product.img}
                                alt={product.name}
                                className="h-28 w-28 object-cover rounded-full shadow-md border-4 border-white transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-sm"
                            />
                        </div>

                        {/* Info Block */}
                        <div className="text-center space-y-1.5 w-full">
                            <p className="text-sm font-bold text-gray-900 line-clamp-1">
                                {product.name}
                            </p>

                            {/* Pricing */}
                            <div className="flex items-end justify-center gap-2">
                                <span className="text-lg font-black text-blue-600">{product.sale}</span>
                                <span className="text-xs font-semibold text-gray-400 line-through mb-0.5">{product.original}</span>
                            </div>

                            {/* Progress bar — "selling fast" */}
                            <div className="w-full pt-3">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-500">Available</span>
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-red-500">{100 - product.sold}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-linear-to-r from-red-500 to-orange-400 rounded-full transition-all duration-1000"
                                        style={{ width: `${product.sold}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Hover Overlay Button */}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Deal;
