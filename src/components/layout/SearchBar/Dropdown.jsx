// Dropdown.jsx
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, TrendingUp, Clock, ArrowUpRight, Tag } from 'lucide-react'

const TRENDING = [
    { label: "Jackets", icon: TrendingUp },
    { label: "Winter Wear", icon: TrendingUp },
    { label: "Hoodies", icon: TrendingUp },
    { label: "Base Layers", icon: TrendingUp },
]

const RECENT = [
    "Denim Trucker Jacket",
    "Fleece Pullover",
    "Thermal Base Layer",
]

const Dropdown = ({ data, query, close }) => {
    const showResults = query && data.length > 0
    const showEmpty = query && data.length === 0
    const showDefault = !query

    return (
        <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-2 z-50 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden"
        >
            {/* ── Search results ── */}
            {showResults && (
                <div className="py-2">
                    <p className="px-4 pt-2 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Results
                    </p>
                    {data.slice(0, 6).map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                        >
                            <Link
                                to={`/product/${item.id}`}
                                onClick={close}
                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors group"
                            >
                                {/* Thumbnail */}
                                <div className="w-9 h-9 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                    {item.image_urls?.[0] && (
                                        <img
                                            src={item.image_urls[0]}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate group-hover:text-blue-700 transition-colors">
                                        {/* Highlight matching query */}
                                        {item.name.split(new RegExp(`(${query})`, 'gi')).map((part, j) =>
                                            part.toLowerCase() === query.toLowerCase()
                                                ? <span key={j} className="text-blue-600 font-bold">{part}</span>
                                                : part
                                        )}
                                    </p>
                                    {(() => {
                                        const variant = item.variants?.[0]
                                        const price = variant?.discount_price || variant?.price
                                        return price ? (
                                            <p className="text-xs text-gray-400">₹{price.toLocaleString()}</p>
                                        ) : null
                                    })()}
                                </div>

                                <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0" />
                            </Link>
                        </motion.div>
                    ))}

                    {data.length > 6 && (
                        <Link
                            to={`/product?q=${query}`}
                            onClick={close}
                            className="flex items-center justify-center gap-1.5 mx-4 my-2 py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                        >
                            <Search className="w-3 h-3" />
                            See all {data.length} results for "{query}"
                        </Link>
                    )}
                </div>
            )}

            {/* ── No results ── */}
            {showEmpty && (
                <div className="px-4 py-8 text-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Search className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">No results for "{query}"</p>
                    <p className="text-xs text-gray-400 mt-1">Try a different keyword</p>
                </div>
            )}

            {/* ── Default (empty search bar focused) ── */}
            {showDefault && (
                <div className="py-3">
                    {/* Trending */}
                    <p className="px-4 pt-1 pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Trending
                    </p>
                    <div className="flex flex-wrap gap-2 px-4 pb-3 border-b border-gray-50">
                        {TRENDING.map(({ label }) => (
                            <Link
                                key={label}
                                to={`/product?q=${label}`}
                                onClick={close}
                                className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                            >
                                <TrendingUp className="w-3 h-3" />
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Recent searches */}
                    <p className="px-4 pt-3 pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Recent
                    </p>
                    {RECENT.map((label, i) => (
                        <Link
                            key={label}
                            to={`/product?q=${label}`}
                            onClick={close}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors group"
                        >
                            <Clock className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                            <span className="text-sm text-gray-600 group-hover:text-blue-600 flex-1 transition-colors">{label}</span>
                            <ArrowUpRight className="w-3 h-3 text-gray-200 group-hover:text-blue-400 transition-colors" />
                        </Link>
                    ))}

                    {/* Popular categories */}
                    <div className="mx-4 mt-3 mb-2 p-3 bg-linear-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-white text-xs font-black">Winter Collection</p>
                            <p className="text-blue-200 text-[10px] mt-0.5">Up to 30% off · Limited time</p>
                        </div>
                        <Link
                            to="/product"
                            onClick={close}
                            className="bg-white text-blue-600 text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors shrink-0"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            )}
        </motion.div>
    )
}

export default Dropdown