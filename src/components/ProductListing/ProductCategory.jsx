import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { useProduct } from "../../context/admin/ProductContext";
import WishListIcon from '../common/WishListIcon/WishListIcon';
import Pagination from './Pagination';
import FilterBar from './FilterBar';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const ProductCategory = () => {
    const { products } = useProduct();

    return (
        <div className="w-full h-full flex flex-col gap-6">
            
            {/* Header & Filter Bar */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Our Collection</h1>
                        <p className="text-xs text-slate-400 font-medium mt-1">Showing {products.length} premium products</p>
                    </div>
                </div>
                <FilterBar count={products.length} />
            </div>

            {/* Product Grid */}
            <motion.div 
               variants={containerVariants} 
               initial="hidden" 
               animate="show" 
               className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
            >
                {products.map((product) => {
                    // Extract data from variants if available
                    const variant = product.variants?.[0];
                    const price = variant?.price || 0;
                    const discountPrice = variant?.discount_price;
                    const hasDiscount = discountPrice && discountPrice < price;

                    const rating = product.rating || 0;
                    const image = product.image_urls?.[0] || 'https://via.placeholder.com/300';

                    return (
                        <motion.div 
                           key={product.id} 
                           variants={cardVariants}
                           className="group relative bg-white rounded-3xl p-3 border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500 flex flex-col"
                        >
                            {/* Image Section */}
                            <div className="relative aspect-4/5 rounded-2xl bg-slate-50 overflow-hidden mb-4">
                                <Link to={`${product.id}`} className="absolute inset-0 z-10 block">
                                    <img 
                                        src={image} 
                                        alt={product.name} 
                                        className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" 
                                    />
                                </Link>
                                
                                {/* Badges */}
                                <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                                    {hasDiscount && (
                                        <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-md">
                                            Sale
                                        </span>
                                    )}
                                </div>
                                
                                {/* Wishlist */}
                                <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
                                    <div className="w-9 h-9 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-slate-100 text-slate-400 hover:text-red-500 transition-colors">
                                        <WishListIcon product={product} />
                                    </div>
                                </div>

                                {/* Quick View Overlay */}
                                <div className="absolute bottom-3 inset-x-3 z-20 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    <Link to={`${product.id}`} className="w-full bg-white/95 backdrop-blur-md text-blue-600 text-xs font-black py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/20 shadow-black/5 border border-slate-100 hover:bg-blue-600 hover:text-white transition-all">
                                        <Eye size={14} /> Quick View
                                    </Link>
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="flex-1 flex flex-col px-2">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[9px] font-extrabold text-blue-500 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">
                                        {product.category?.name || "Tech Devices"}
                                    </span>
                                    <div className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded-md">
                                        <Star fill="currentColor" className="text-amber-400" size={10} />
                                        <span className="text-[10px] font-bold text-slate-600">{Number(rating).toFixed(1)}</span>
                                    </div>
                                </div>

                                <Link to={`${product.id}`} className="group-hover:text-blue-600 transition-colors mt-1">
                                    <h2 className="text-sm font-black text-slate-800 line-clamp-2 leading-snug">
                                        {product.name}
                                    </h2>
                                </Link>

                                <div className="mt-auto pt-4 pb-1 flex items-end justify-between">
                                    <div className="flex flex-col">
                                        {hasDiscount && (
                                            <span className="text-[10px] text-slate-400 font-bold line-through decoration-slate-300">
                                                ₹{price.toLocaleString()}
                                            </span>
                                        )}
                                        <span className="text-lg font-black text-slate-900 tracking-tight">
                                            ₹{hasDiscount ? discountPrice.toLocaleString() : price.toLocaleString()}
                                        </span>
                                    </div>
                                    <button className="w-10 h-10 bg-slate-900 hover:bg-blue-600 text-white rounded-[14px] flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-blue-500/30 hover:-translate-y-1 active:translate-y-0">
                                        <ShoppingCart size={15} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Pagination */}
            <div className="mt-8 mb-4 w-full flex justify-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <Pagination />
            </div>
        </div>
    );
};

export default ProductCategory;