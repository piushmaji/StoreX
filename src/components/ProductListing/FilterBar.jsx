import { SlidersHorizontal, LayoutGrid, List } from 'lucide-react';

const FilterBar = ({ count, onOpenFilters, viewMode, setViewMode }) => {
    return (
        <div className="flex items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm font-sans">
            
            {/* Left side: Results Count */}
            <div className="flex items-center gap-1 text-gray-600">
                <span className="font-semibold text-gray-900 text-lg">{count}</span>
                <span className="text-sm hidden sm:inline">products in</span>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md hidden sm:block">
                    Clothing and Accessories
                </span>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md sm:hidden">
                    Clothing
                </span>
            </div>
            
            {/* Right side: View Toggles & Mobile Filter */}
            <div className="flex items-center gap-3">
                {/* View Toggle Group */}
                <div className="flex items-center p-1 bg-gray-100 rounded-lg border border-gray-200">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'grid'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <LayoutGrid size={16} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'list'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <List size={16} />
                    </button>
                </div>

                {/* Mobile Filter Toggle Button (Hidden on Desktop) */}
                <button 
                    onClick={onOpenFilters}
                    className="lg:hidden flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white px-3 py-1.5 rounded-lg font-semibold text-sm shadow-md shadow-blue-500/20 shrink-0"
                >
                    <SlidersHorizontal size={14} /> Filters
                </button>
            </div>
            
        </div>
    );
};

export default FilterBar;