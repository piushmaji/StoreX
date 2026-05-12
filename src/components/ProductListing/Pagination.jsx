import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({
    currentPage,
    setCurrentPage,
    totalItems,
    totalPages,
    itemsPerPage,
    setItemsPerPage
}) => {
    // Generate page numbers
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    
    // Calculate display range
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    if (totalItems === 0) return null;

    return (
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 py-1 font-sans">
            
            {/* Results Info */}
            <div className="text-[10px] sm:text-[11px] font-extrabold text-slate-400 uppercase tracking-widest w-full lg:w-auto text-center lg:text-left">
                Showing {startItem}-{endItem} <span className="text-slate-300 px-1">/</span> {totalItems}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-100/50">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="p-1.5 text-slate-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors rounded-[10px] hover:bg-white shadow-sm"
                >
                    <ChevronLeft size={16} strokeWidth={3} />
                </button>

                <div className="flex items-center gap-1">
                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`min-w-8 h-8 flex items-center justify-center text-[13px] font-bold rounded-[10px] transition-all duration-300 ${
                                currentPage === page
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                    : 'text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="p-1.5 text-slate-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors rounded-[10px] hover:bg-white shadow-sm"
                >
                    <ChevronRight size={16} strokeWidth={3} />
                </button>
            </div>
            
            {/* Rows Per Page */}
            <div className="flex items-center gap-2 w-full lg:w-auto justify-center lg:justify-end">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Rows</span>
                <select 
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                    className="bg-slate-50 text-[11px] font-bold text-slate-600 py-1.5 px-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 border border-slate-100 cursor-pointer hover:bg-slate-100 hover:text-slate-900 transition-colors appearance-none text-center"
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </div>
    );
};

export default Pagination;