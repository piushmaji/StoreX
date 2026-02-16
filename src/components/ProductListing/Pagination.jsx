import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const totalItems = 50; // Example total count
    const pages = [1, 2, 3, 4, 5];

    // Perfection detail: Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-5 bg-white border-t border-gray-100 shadow-sm rounded-xl font-sans">

            {/* 1. Results Summary (Critical for UX) */}
            <div className="text-sm text-gray-500 order-2 md:order-1">
                Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{' '}
                <span className="font-semibold text-gray-900">{totalItems}</span> results
            </div>

            <div className="flex flex-wrap items-center gap-6 order-1 md:order-2">
                {/* 2. Items Per Page Selector */}
                <div className="flex items-center gap-2.5" ref={dropdownRef}>
                    <label className="text-sm font-medium text-gray-600">Rows per page:</label>
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center justify-between min-w-18 px-3 py-1.5 text-sm font-semibold bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-gray-50 focus:ring-4 focus:ring-blue-50 transition-all duration-200 shadow-sm"
                        >
                            {itemsPerPage}
                            <ChevronDown size={14} className={`ml-2 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} />
                        </button>

                        {isOpen && (
                            <div className="absolute bottom-full left-0 mb-2 w-full min-w-20 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200 z-20">
                                {[10, 25, 50].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => { setItemsPerPage(num); setIsOpen(false); }}
                                        className={`block w-full px-4 py-2.5 text-left text-sm transition-colors ${itemsPerPage === num ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-gray-50 text-gray-700'
                                            }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. Pagination Navigation */}
                <nav className="flex items-center gap-1" aria-label="Pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className="p-2 text-gray-500 hover:bg-gray-100 border border-transparent rounded-lg transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                        title="Previous Page"
                    >
                        <ChevronLeft size={20} strokeWidth={2.5} />
                    </button>

                    <div className="flex items-center gap-1 px-1">
                        {pages.map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`min-w-9 h-9 flex items-center justify-center text-sm font-bold rounded-lg transition-all duration-200 ${currentPage === page
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200 border-blue-600 scale-105'
                                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-transparent hover:border-blue-100'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        disabled={currentPage === pages.length}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, pages.length))}
                        className="p-2 text-gray-500 hover:bg-gray-100 border border-transparent rounded-lg transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                        title="Next Page"
                    >
                        <ChevronRight size={20} strokeWidth={2.5} />
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default Pagination;