import React from 'react';
import Timer from './Timer';
import { ArrowRight, Sparkles } from 'lucide-react';

const Deal = () => {
    // Category-focused Deals
    const mainCategoryDeal = {
        title: "The Winter Collection",
        desc: "Coats, Sweaters & Heavy Knits.",
        img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
        discount: "Up to 40% OFF"
    };

    const flexCategories = [
        { name: "Luxury Accessories", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop", discount: "Flat 20% OFF" },
        { name: "Everyday Essentials", img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop", discount: "Min 15% OFF" },
        { name: "Premium Silks", img: "https://images.unsplash.com/photo-1632128913346-60195ee0f019?q=80&w=800&auto=format&fit=crop", discount: "Up to 30% OFF" },
        { name: "Eyewear & Watches", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop", discount: "Flat 25% OFF" }
    ];

    const offerEndDate = new Date();
    offerEndDate.setDate(offerEndDate.getDate() + 3);

    return (
        <div className="w-full my-8">
            <div className="flex flex-col lg:flex-row gap-6">

                {/* ── Left: Main Category Highlight ── */}
                <div className="lg:w-[45%] relative rounded-[2rem] overflow-hidden group cursor-pointer h-[500px] lg:h-[600px] shadow-2xl shadow-slate-200/50">
                    {/* Background Image */}
                    <img 
                        src={mainCategoryDeal.img} 
                        alt={mainCategoryDeal.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    />
                    
                    {/* Ambient Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 z-10">
                        {/* Top: Timer & Badge */}
                        <div className="flex justify-between items-start">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex items-center gap-2">
                                <Sparkles size={14} className="text-white" />
                                <span className="text-[10px] uppercase tracking-[0.2em] text-white font-bold">Category Deal</span>
                            </div>
                            
                            <div className="text-right">
                                <p className="text-white/60 text-[9px] uppercase tracking-[0.25em] font-bold mb-1.5">Sale Ends In</p>
                                <div className="bg-black/40 backdrop-blur-md rounded-xl px-4 py-2 text-white border border-white/10">
                                    <Timer endDate={offerEndDate} />
                                </div>
                            </div>
                        </div>

                        {/* Bottom: Category Info */}
                        <div className="text-white pt-10 mt-auto">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2 opacity-95">
                                {mainCategoryDeal.title}
                            </h2>
                            <p className="text-white/70 text-sm font-medium tracking-wide mb-5">
                                {mainCategoryDeal.desc}
                            </p>

                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-2xl font-black text-amber-300">{mainCategoryDeal.discount}</span>
                            </div>

                            <button className="flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-xs font-black uppercase tracking-[0.15em] hover:bg-gray-100 transition-colors group/btn w-max">
                                Explore Category
                                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Right: Collection Categories Grid ── */}
                <div className="lg:w-[55%] flex flex-col space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between px-2">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Shop by Offers</h3>
                            <p className="text-xs text-slate-500 font-medium mt-1">Exclusive discounts across all major categories</p>
                        </div>
                        <button className="text-[11px] uppercase tracking-widest font-bold text-slate-900 hover:text-slate-500 transition-colors border-b border-black pb-0.5">
                            All Categories
                        </button>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {flexCategories.map((cat, idx) => (
                            <div key={idx} className="group relative rounded-[1.5rem] bg-white border border-slate-100 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col aspect-square lg:aspect-[4/5]">
                                {/* Image Box */}
                                <div className="absolute inset-0 bg-slate-50">
                                    <img 
                                        src={cat.img} 
                                        alt={cat.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient overlay to make text readable */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/5" />
                                </div>

                                {/* Text Label (Pinned to bottom) */}
                                <div className="absolute inset-0 p-5 flex flex-col justify-end z-10 text-white">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-amber-300 mb-1">
                                        {cat.discount}
                                    </span>
                                    <h4 className="text-[16px] md:text-lg font-bold truncate">
                                        {cat.name}
                                    </h4>
                                    
                                    {/* Quick Hover Button */}
                                    <div className="h-0 overflow-hidden group-hover:h-10 transition-all duration-300 mt-0 group-hover:mt-3">
                                        <button className="w-full bg-white/20 backdrop-blur-md text-white py-2 rounded-lg text-[10px] font-black tracking-widest uppercase hover:bg-white hover:text-black transition-colors">
                                            Shop Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Deal;
