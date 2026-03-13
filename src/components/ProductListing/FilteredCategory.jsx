import { useState } from "react"
import { SlidersHorizontal, X, Check, ChevronDown, Sparkles } from "lucide-react"

const FILTERS = {
    brands: ["Samsung", "Apple", "Huawei", "Oppo", "OnePlus", "Xiaomi"],
    features: ["Metallic", "Plastic Cover", "8GB RAM", "Super Power", "Large Memory", "5G Ready"],
    conditions: ["Any", "Brand New", "Refurbished", "Old Items"],
    ratings: [5, 4, 3, 2],
}

const Section = ({ title, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen)
    return (
        <div className="py-4 border-b border-blue-50 last:border-0">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full mb-1 group"
            >
                <span className="text-[11px] font-bold tracking-[0.15em] text-blue-400 uppercase">
                    {title}
                </span>
                <ChevronDown
                    className={`w-3.5 h-3.5 text-blue-300 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                {children}
            </div>
        </div>
    )
}

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
)

const FilteredCategory = () => {
    const [selectedBrands, setSelectedBrands] = useState([])
    const [selectedFeatures, setSelectedFeatures] = useState([])
    const [selectedCondition, setSelectedCondition] = useState("Any")
    const [selectedRating, setSelectedRating] = useState(null)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1000)

    const toggle = (list, setList, item) =>
        setList(p => p.includes(item) ? p.filter(i => i !== item) : [...p, item])

    const activeCount =
        selectedBrands.length +
        selectedFeatures.length +
        (selectedCondition !== "Any" ? 1 : 0) +
        (selectedRating ? 1 : 0)

    const clearAll = () => {
        setSelectedBrands([])
        setSelectedFeatures([])
        setSelectedCondition("Any")
        setSelectedRating(null)
        setMinPrice(0)
        setMaxPrice(1000)
    }

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(37,99,235,0.08)] border border-blue-100/60">

            {/* Header */}
            <div className="relative px-5 py-4 overflow-hidden">
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
                            className="flex items-center gap-1 text-blue-100 hover:text-white text-[11px] font-semibold transition-colors bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full"
                        >
                            <X className="w-3 h-3" /> Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Filter Body */}
            <div className="px-5">

                {/* Brands */}
                <Section title="Brand">
                    <div className="flex flex-wrap gap-1.5">
                        {FILTERS.brands.map(brand => {
                            const active = selectedBrands.includes(brand)
                            return (
                                <button
                                    key={brand}
                                    onClick={() => toggle(selectedBrands, setSelectedBrands, brand)}
                                    className={`relative px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${active
                                        ? "bg-blue-600 text-white shadow-[0_2px_12px_rgba(37,99,235,0.35)] scale-105"
                                        : "bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 border border-gray-100 hover:border-blue-200"
                                        }`}
                                >
                                    {brand}
                                </button>
                            )
                        })}
                    </div>
                </Section>

                {/* Price Range */}
                <Section title="Price Range">
                    <div className="space-y-4">
                        {/* Dual display */}
                        <div className="flex items-center gap-2">
                            <div className="flex-1 relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">$</span>
                                <input
                                    type="number"
                                    value={minPrice}
                                    onChange={e => setMinPrice(+e.target.value)}
                                    className="w-full pl-6 pr-2 py-2 text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                                />
                            </div>
                            <div className="w-4 h-px bg-gray-300 shrink-0" />
                            <div className="flex-1 relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">$</span>
                                <input
                                    type="number"
                                    value={maxPrice}
                                    onChange={e => setMaxPrice(+e.target.value)}
                                    className="w-full pl-6 pr-2 py-2 text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                                />
                            </div>
                        </div>
                        {/* Slider */}
                        <div className="relative pt-1">
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-linear-to-r from-blue-400 to-blue-600 rounded-full transition-all"
                                    style={{ width: `${(maxPrice / 1000) * 100}%` }}
                                />
                            </div>
                            <input
                                type="range" min={0} max={1000}
                                value={maxPrice}
                                onChange={e => setMaxPrice(+e.target.value)}
                                className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                            />
                        </div>
                    </div>
                </Section>

                {/* Features */}
                <Section title="Features">
                    <div className="space-y-1.5">
                        {FILTERS.features.map(feature => {
                            const active = selectedFeatures.includes(feature)
                            return (
                                <button
                                    key={feature}
                                    onClick={() => toggle(selectedFeatures, setSelectedFeatures, feature)}
                                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-all duration-200 group ${active ? "bg-blue-50" : "hover:bg-gray-50"
                                        }`}
                                >
                                    <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${active
                                        ? "bg-blue-600 border-blue-600 shadow-[0_2px_8px_rgba(37,99,235,0.3)]"
                                        : "border-gray-200 group-hover:border-blue-300"
                                        }`}>
                                        {active && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                                    </div>
                                    <span className={`text-sm transition-colors ${active ? "text-blue-700 font-semibold" : "text-gray-600"}`}>
                                        {feature}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </Section>

                {/* Condition */}
                <Section title="Condition">
                    <div className="grid grid-cols-2 gap-1.5">
                        {FILTERS.conditions.map(c => (
                            <button
                                key={c}
                                onClick={() => setSelectedCondition(c)}
                                className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 ${selectedCondition === c
                                    ? "bg-blue-600 text-white shadow-[0_2px_12px_rgba(37,99,235,0.3)] scale-[1.02]"
                                    : "bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 border border-gray-100"
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </Section>

                {/* Rating */}
                <Section title="Rating" defaultOpen={false}>
                    <div className="space-y-1">
                        {FILTERS.ratings.map(r => (
                            <button
                                key={r}
                                onClick={() => setSelectedRating(selectedRating === r ? null : r)}
                                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-all duration-200 ${selectedRating === r
                                    ? "bg-amber-50 border border-amber-200"
                                    : "hover:bg-gray-50 border border-transparent"
                                    }`}
                            >
                                <Stars count={r} filled={selectedRating === r} />
                                {selectedRating === r && (
                                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </Section>

            </div>

            {/* Apply */}
            <div className="px-5 py-4">
                <button className="w-full relative overflow-hidden group bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 rounded-xl transition-all duration-200 shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] active:scale-[0.98]">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        Apply Filters
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
            </div>
        </div>
    )
}

export default FilteredCategory