import { ShoppingCart, X, Heart } from 'lucide-react'
import { useSaveForLater } from '../../context/SaveForLater/SaveForLater'
import { useCart } from '../../context/CartContext/CartContext'

const SaveForLater = ({ onMoveToCart }) => {

    const { removeToSaved, savedItem } = useSaveForLater()

    const { addToCart, removeItem } = useCart()

    if (savedItem.length === 0) return null

    const handleMoveToCart = (item) => {
        addToCart(item)
        removeToSaved(item.id)
    }

    return (
        <section className="py-4">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
                <Heart size={14} className="text-rose-400 fill-rose-400" />
                <h2 className="text-sm font-extrabold text-gray-800">Saved for Later</h2>
                <span className="text-xs font-bold text-gray-400">({savedItem.length})</span>
            </div>

            {/* Horizontal scroll */}
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {savedItem.map(item => {
                    const off = Math.round((1 - item.pricing.retail.salePrice / item.pricing.retail.originalPrice) * 100)
                    return (
                        <div
                            key={item.id}
                            className="shrink-0 w-40 sm:w-44 bg-white rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:shadow-slate-100 transition-all duration-200 overflow-hidden group flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative bg-gray-50 h-36 flex items-center justify-center overflow-hidden">
                                <img
                                    src={item.images[0]}
                                    alt={item.title}
                                    className="h-full w-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* Discount badge */}
                                <span className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-lg">
                                    -{off}%
                                </span>
                                {/* Remove */}
                                <button
                                    onClick={() => ""}
                                    className="absolute top-2 right-2 w-6 h-6 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
                                >
                                    <X size={11} className="text-gray-500" />
                                </button>
                            </div>

                            {/* Info */}
                            <div className="p-3 flex flex-col gap-2 flex-1">
                                <p className="text-[11px] text-gray-500 font-medium line-clamp-2 leading-tight">{item.title}</p>
                                <div className="flex items-baseline gap-1.5 mt-auto">
                                    <span className="text-sm font-extrabold text-gray-900">₹{item.pricing.retail.salePrice.toLocaleString()}</span>
                                    <span className="text-[10px] text-gray-400 line-through">₹{item.pricing.retail.originalPrice.toLocaleString()}</span>
                                </div>

                                {/* Add to cart */}
                                <button
                                    onClick={() => handleMoveToCart(item)}
                                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-[11px] font-extrabold transition-all duration-200 shadow-sm shadow-blue-200"
                                >
                                    <ShoppingCart size={12} /> Add to Cart
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default SaveForLater