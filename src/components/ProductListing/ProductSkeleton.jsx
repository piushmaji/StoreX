import React from 'react';
import { motion } from 'framer-motion';

const skeletonVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const ProductSkeleton = () => {
  return (
    <motion.div 
      variants={skeletonVariants}
      className="group relative bg-white rounded-3xl p-3 border border-slate-100 shadow-sm flex flex-col"
    >
      {/* Image Skeleton */}
      <div className="relative aspect-4/5 rounded-2xl bg-slate-100 mb-4 overflow-hidden animate-pulse">
        {/* Shimmer effect */}
      </div>

      {/* Details Section Skeleton */}
      <div className="flex-1 flex flex-col px-2 gap-3 animate-pulse">
        {/* Category & Rating */}
        <div className="flex items-center justify-between">
          <div className="w-20 h-4 bg-slate-100 rounded-md" />
          <div className="w-10 h-4 bg-slate-100 rounded-md" />
        </div>

        {/* Title */}
        <div className="space-y-2 mt-1">
          <div className="w-full h-4 bg-slate-100 rounded-md" />
          <div className="w-2/3 h-4 bg-slate-100 rounded-md" />
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-auto pt-4 pb-1 flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <div className="w-12 h-3 bg-slate-100 rounded-md" />
            <div className="w-16 h-5 bg-slate-100 rounded-md" />
          </div>
          <div className="w-10 h-10 bg-slate-100 rounded-[14px]" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductSkeleton;
