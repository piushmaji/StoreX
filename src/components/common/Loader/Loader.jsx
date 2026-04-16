import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ fullScreen = false, text = "Loading" }) => {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-[999] flex flex-col items-center justify-center bg-slate-900/20 backdrop-blur-md" 
    : "flex flex-col items-center justify-center min-h-[300px] w-full p-8";

  const cleanText = text ? text.replace(/\.+$/, "") : "";

  return (
    <div className={containerClasses}>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 min-w-[140px]"
      >
        {/* Modern minimalistic gradient spinner */}
        <div className="relative flex items-center justify-center w-10 h-10 mb-4">
          <svg className="w-full h-full animate-spin" viewBox="0 0 50 50">
            <circle
              className="text-slate-100"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="20"
              cx="25"
              cy="25"
            />
            <circle
              className="text-blue-600"
              strokeWidth="4"
              strokeDasharray="90 150"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="20"
              cx="25"
              cy="25"
            />
          </svg>
        </div>
        
        {cleanText && (
          <div className="flex items-center gap-1.5 opacity-80">
            <span className="text-slate-700 text-[10px] font-extrabold uppercase tracking-widest">
              {cleanText}
            </span>
            <div className="flex gap-0.5">
              <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0 }} className="w-1 h-1 bg-blue-600 rounded-full"/>
              <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }} className="w-1 h-1 bg-blue-600 rounded-full"/>
              <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }} className="w-1 h-1 bg-blue-600 rounded-full"/>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Loader;