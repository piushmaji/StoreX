import { useState, useEffect } from "react";
import { SlidersHorizontal, X, Check, ChevronDown, Sparkles, Loader2 } from "lucide-react";
import { fetchFilterOptions } from "../../services/filterService";

const Section = ({ title, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="py-4 border-b border-blue-50 last:border-0">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full mb-1 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                aria-expanded={open}
            >
                <span className="text-[11px] font-bold tracking-[0.15em] text-blue-400 uppercase">
                    {title}
                </span>
                <ChevronDown
                    className={`w-3.5 h-3.5 text-blue-300 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100 mt-3 overflow-y-auto custom-scrollbar" : "max-h-0 opacity-0"}`}>
                {children}
            </div>
        </div>
    );
};

const Stars = ({ count, filled }) => (
    <div className="flex gap-0.5 items-center">
        {[...Array(5)].map((_, i) => (
            <svg
                key={i}
                className={`w-3 h-3 transition-colors ${i < count ? (filled ? "text-amber-400" : "text-amber-300") : "text-gray-200"}`}
                fill="currentColor" viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
        <span className="text-[11px] text-gray-400 ml-1 font-medium">{count}.0 & up</span>
    </div>
);

/**
 * FilteredCategory Component
 * 
 * Production Architecture Notes:
 * 1. Lifted State: This component maintains a `localFilters` state. It only affects the global 
 *    application state when the user explicitly clicks "Apply Filters" (triggering `onApplyFilters`).
 *    This prevents excessive API calls during filter selection.
 * 2. Dynamic Filtering: We fetch real available options directly from our Supabase tables 
 *    (Categories, Products, Product Variants) to ensure filters match active inventory.
 */
const FilteredCategory = ({ activeFilters, onApplyFilters }) => {
    // 1. Dynamic Filter Options State
    const [options, setOptions] = useState({
        categories: [], brands: [], materials: [], styles: [], sizes: [], colors: []
    });
    const [isLoading, setIsLoading] = useState(true);

    // 2. Local Filter State (initialized from lifted parent state)
    const [localFilters, setLocalFilters] = useState({
        categoryId: activeFilters?.categoryId || "",
        brands: activeFilters?.brands || [],
        materials: activeFilters?.materials || [],
        styles: activeFilters?.styles || [],
        sizes: activeFilters?.sizes || [],
        colors: activeFilters?.colors || [],
        minPrice: activeFilters?.minPrice || 0,
        maxPrice: activeFilters?.maxPrice || 10000,
        rating: activeFilters?.rating || null,
    });

    // Fetch dynamic filter options on mount
    useEffect(() => {
        const loadOptions = async () => {
            setIsLoading(true);
            const fetchedOptions = await fetchFilterOptions();
            setOptions(fetchedOptions);
            setIsLoading(false);
        };
        loadOptions();
    }, []);

    // Sync local state if parent state resets/changes externally
    useEffect(() => {
        if (activeFilters) {
            setLocalFilters(activeFilters);
        }
    }, [activeFilters]);

    // Generic toggle helper for array-based filter fields
    const toggleArrayFilter = (field, item) => {
        setLocalFilters(prev => {
            const currentArray = prev[field];
            const newArray = currentArray.includes(item) 
                ? currentArray.filter(i => i !== item) 
                : [...currentArray, item];
            return { ...prev, [field]: newArray };
        });
    };

    // Generic setter for single-value filter fields
    const setSingleFilter = (field, value) => {
        setLocalFilters(prev => ({ ...prev, [field]: value }));
    };

    // Calculate active filter count
    const activeCount = [
        localFilters.categoryId ? 1 : 0,
        localFilters.brands.length,
        localFilters.materials.length,
        localFilters.styles.length,
        localFilters.sizes.length,
        localFilters.colors.length,
        localFilters.rating ? 1 : 0,
        (localFilters.minPrice > 0 || localFilters.maxPrice < 10000) ? 1 : 0
    ].reduce((a, b) => a + b, 0);

    const clearAll = () => {
        const clearedState = {
            categoryId: "", brands: [], materials: [], styles: [], sizes: [], colors: [],
            minPrice: 0, maxPrice: 10000, rating: null
        };
        setLocalFilters(clearedState);
        onApplyFilters(clearedState); // Apply clearance immediately
    };

    const handleApply = () => {
        if (onApplyFilters) {
            onApplyFilters(localFilters);
        }
    };

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(37,99,235,0.08)] border border-blue-100/60 w-full flex flex-col max-h-[85vh]">
            
            {/* Header */}
            <div className="relative px-5 py-4 overflow-hidden shrink-0">
                {/* Background glow */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-blue-500 to-blue-700" />
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-400/20 rounded-full blur-lg" />

                <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="bg-white/15 backdrop-blur-sm p-1.5 rounded-lg">
                            <SlidersHorizontal className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="font-bold text-white text-sm tracking-widest uppercase">Filters</span>
                        {activeCount > 0 && (
                            <span className="bg-white text-blue-600 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                                {activeCount}
                            </span>
                        )}
                    </div>
                    {activeCount > 0 && (
                        <button
                            onClick={clearAll}
                            className="flex items-center gap-1 text-blue-100 hover:text-white text-[11px] font-semibold transition-colors bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                            aria-label="Clear all filters"
                        >
                            <X className="w-3 h-3" /> Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Filter Body - Scrollable */}
            <div className="px-5 overflow-y-auto custom-scrollbar flex-1 pb-4">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12 text-blue-400">
                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                        <span className="text-xs font-semibold uppercase tracking-widest">Loading Filters...</span>
                    </div>
                ) : (
                    <>
                        {/* Categories */}
                        {options.categories.length > 0 && (
                            <Section title="Category">
                                <div className="space-y-1.5">
                                    {options.categories.map(cat => {
                                        const active = localFilters.categoryId === cat.id;
                                        return (
                                            <button
                                                key={cat.id}
                                                onClick={() => setSingleFilter("categoryId", active ? "" : cat.id)}
                                                className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-all duration-200 group ${active ? "bg-blue-50" : "hover:bg-gray-50"}`}
                                            >
                                                <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${active ? "bg-blue-600 border-blue-600 shadow-[0_2px_8px_rgba(37,99,235,0.3)]" : "border-gray-200 group-hover:border-blue-300"}`}>
                                                    {active && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                                                </div>
                                                <span className={`text-sm transition-colors text-left ${active ? "text-blue-700 font-semibold" : "text-gray-600"}`}>
                                                    {cat.name}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </Section>
                        )}

                        {/* Brands */}
                        {options.brands.length > 0 && (
                            <Section title="Brand">
                                <div className="flex flex-wrap gap-1.5">
                                    {options.brands.map(brand => {
                                        const active = localFilters.brands.includes(brand);
                                        return (
                                            <button
                                                key={brand}
                                                onClick={() => toggleArrayFilter("brands", brand)}
                                                className={`relative px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${active
                                                    ? "bg-blue-600 text-white shadow-[0_2px_12px_rgba(37,99,235,0.35)] scale-105"
                                                    : "bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 border border-gray-100 hover:border-blue-200"
                                                    }`}
                                            >
                                                {brand}
                                            </button>
                                        );
                                    })}
                                </div>
                            </Section>
                        )}

                        {/* Sizes */}
                        {options.sizes.length > 0 && (
                            <Section title="Size">
                                <div className="flex flex-wrap gap-1.5">
                                    {options.sizes.map(size => {
                                        const active = localFilters.sizes.includes(size);
                                        return (
                                            <button
                                                key={size}
                                                onClick={() => toggleArrayFilter("sizes", size)}
                                                className={`w-10 h-10 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center ${active
                                                    ? "bg-blue-600 text-white shadow-[0_2px_12px_rgba(37,99,235,0.35)] scale-105"
                                                    : "bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 border border-gray-100 hover:border-blue-200"
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        );
                                    })}
                                </div>
                            </Section>
                        )}

                        {/* Price Range */}
                        <Section title="Price Range">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">₹</span>
                                        <input
                                            type="number"
                                            value={localFilters.minPrice}
                                            onChange={e => setSingleFilter("minPrice", +e.target.value)}
                                            className="w-full pl-6 pr-2 py-2 text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                                            aria-label="Minimum Price"
                                        />
                                    </div>
                                    <div className="w-4 h-px bg-gray-300 shrink-0" />
                                    <div className="flex-1 relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">₹</span>
                                        <input
                                            type="number"
                                            value={localFilters.maxPrice}
                                            onChange={e => setSingleFilter("maxPrice", +e.target.value)}
                                            className="w-full pl-6 pr-2 py-2 text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                                            aria-label="Maximum Price"
                                        />
                                    </div>
                                </div>
                                <div className="relative pt-1">
                                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-linear-to-r from-blue-400 to-blue-600 rounded-full transition-all"
                                            style={{ width: `${(localFilters.maxPrice / 10000) * 100}%` }}
                                        />
                                    </div>
                                    <input
                                        type="range" min={0} max={10000} step={100}
                                        value={localFilters.maxPrice}
                                        onChange={e => setSingleFilter("maxPrice", +e.target.value)}
                                        className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                                        aria-label="Price range slider"
                                    />
                                </div>
                            </div>
                        </Section>

                        {/* Colors */}
                        {options.colors.length > 0 && (
                            <Section title="Color" defaultOpen={false}>
                                <div className="flex flex-wrap gap-2">
                                    {options.colors.map(color => {
                                        const active = localFilters.colors.includes(color);
                                        return (
                                            <button
                                                key={color}
                                                title={color}
                                                onClick={() => toggleArrayFilter("colors", color)}
                                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border flex items-center gap-1.5 ${active
                                                    ? "bg-blue-50 border-blue-400 text-blue-700"
                                                    : "bg-white border-gray-200 hover:border-blue-300 text-gray-600 hover:bg-gray-50"
                                                }`}
                                            >
                                                {/* Render a tiny color swatch block next to the name if you wanted, but for now just name */}
                                                <div className="w-2.5 h-2.5 rounded-full border border-gray-300 shadow-xs" style={{ backgroundColor: color.toLowerCase() }} />
                                                {color}
                                            </button>
                                        );
                                    })}
                                </div>
                            </Section>
                        )}

                        {/* Materials */}
                        {options.materials.length > 0 && (
                            <Section title="Material" defaultOpen={false}>
                                <div className="space-y-1.5">
                                    {options.materials.map(material => {
                                        const active = localFilters.materials.includes(material);
                                        return (
                                            <button
                                                key={material}
                                                onClick={() => toggleArrayFilter("materials", material)}
                                                className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-all duration-200 group ${active ? "bg-blue-50" : "hover:bg-gray-50"}`}
                                            >
                                                <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${active ? "bg-blue-600 border-blue-600 shadow-[0_2px_8px_rgba(37,99,235,0.3)]" : "border-gray-200 group-hover:border-blue-300"}`}>
                                                    {active && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                                                </div>
                                                <span className={`text-sm transition-colors text-left ${active ? "text-blue-700 font-semibold" : "text-gray-600"}`}>
                                                    {material}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </Section>
                        )}

                        {/* Styles */}
                        {options.styles.length > 0 && (
                            <Section title="Style" defaultOpen={false}>
                                <div className="space-y-1.5">
                                    {options.styles.map(style => {
                                        const active = localFilters.styles.includes(style);
                                        return (
                                            <button
                                                key={style}
                                                onClick={() => toggleArrayFilter("styles", style)}
                                                className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-all duration-200 group ${active ? "bg-blue-50" : "hover:bg-gray-50"}`}
                                            >
                                                <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${active ? "bg-blue-600 border-blue-600 shadow-[0_2px_8px_rgba(37,99,235,0.3)]" : "border-gray-200 group-hover:border-blue-300"}`}>
                                                    {active && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                                                </div>
                                                <span className={`text-sm transition-colors text-left ${active ? "text-blue-700 font-semibold" : "text-gray-600"}`}>
                                                    {style}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </Section>
                        )}

                        {/* Rating */}
                        <Section title="Rating" defaultOpen={false}>
                            <div className="space-y-1">
                                {[5, 4, 3, 2].map(r => (
                                    <button
                                        key={r}
                                        onClick={() => setSingleFilter("rating", localFilters.rating === r ? null : r)}
                                        className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-all duration-200 ${localFilters.rating === r
                                            ? "bg-amber-50 border border-amber-200"
                                            : "hover:bg-gray-50 border border-transparent"
                                            }`}
                                    >
                                        <Stars count={r} filled={localFilters.rating === r} />
                                        {localFilters.rating === r && (
                                            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </Section>
                    </>
                )}
            </div>

            {/* Apply Button */}
            <div className="px-5 py-4 border-t border-blue-50 bg-white shrink-0">
                <button 
                    onClick={handleApply}
                    className="w-full relative overflow-hidden group bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 rounded-xl transition-all duration-200 shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        Apply Filters
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
            </div>
        </div>
    );
};

export default FilteredCategory;