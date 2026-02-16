import { useState } from 'react';
import { LayoutGrid, List, ChevronDown } from 'lucide-react';

const FilterBar = ({ count }) => {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [isVerified, setIsVerified] = useState(false);

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm font-sans">

            {/* Left side: Results Count */}
            <div className="flex items-center gap-1 text-gray-600">
                <span className="font-semibold text-gray-900 text-lg">{count}</span>
                <span className="text-sm">products in</span>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    Mobile accessories
                </span>
            </div>

            {/* Right side: Controls */}
            <div className="flex flex-wrap items-center gap-6">

                {/* Custom Styled Checkbox/Toggle */}
                <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isVerified}
                            onChange={() => setIsVerified(!isVerified)}
                        />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 flex items-center justify-center">
                            <svg
                                className={`w-3 h-3 text-white transition-opacity ${isVerified ? 'opacity-100' : 'opacity-0'}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"
                            >
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        Verified only
                    </span>
                </label>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sort:</span>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold bg-gray-50 border border-gray-200 rounded-lg hover:bg-white hover:border-blue-300 transition-all shadow-sm">
                        Featured
                        <ChevronDown size={14} className="text-gray-400" />
                    </button>
                </div>

                {/* View Toggle Group */}
                <div className="flex items-center p-1 bg-gray-100 rounded-lg border border-gray-200">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'grid'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'list'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <List size={18} />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default FilterBar;