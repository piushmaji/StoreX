import { ShoppingCart, X, Heart } from 'lucide-react'
import { useState } from 'react'

const MOCK_SAVED = [
    {
        id: 1,
        title: "GoPro HERO6 4K Action Camera",
        price: 6499,
        originalPrice: 8999,
        image: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/r/8/1/-original-imahfz2tenzpsd3p.jpeg?q=70&crop=false",
    },
    {
        id: 2,
        title: "Apple AirPods Pro (2nd Gen)",
        price: 19999,
        originalPrice: 24999,
        image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300&q=80",
    },
    {
        id: 3,
        title: "Nike Air Max Sneakers",
        price: 3999,
        originalPrice: 5499,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
    },
]

const SaveForLater = ({ onMoveToCart }) => {
    const [items, setItems] = useState(MOCK_SAVED)

    const remove = (id) => setItems(p => p.filter(i => i.id !== id))
    const moveToCart = (item) => {
        onMoveToCart?.(item)
        remove(item.id)
    }

    if (items.length === 0) return null

    return (
        <section className="py-4">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
                <Heart size={14} className="text-rose-400 fill-rose-400" />
                <h2 className="text-sm font-extrabold text-gray-800">Saved for Later</h2>
                <span className="text-xs font-bold text-gray-400">({items.length})</span>
            </div>

            {/* Horizontal scroll */}
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {items.map(item => {
                    const off = Math.round((1 - item.price / item.originalPrice) * 100)
                    return (
                        <div
                            key={item.id}
                            className="shrink-0 w-40 sm:w-44 bg-white rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:shadow-slate-100 transition-all duration-200 overflow-hidden group flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative bg-gray-50 h-36 flex items-center justify-center overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* Discount badge */}
                                <span className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-lg">
                                    -{off}%
                                </span>
                                {/* Remove */}
                                <button
                                    onClick={() => remove(item.id)}
                                    className="absolute top-2 right-2 w-6 h-6 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
                                >
                                    <X size={11} className="text-gray-500" />
                                </button>
                            </div>

                            {/* Info */}
                            <div className="p-3 flex flex-col gap-2 flex-1">
                                <p className="text-[11px] text-gray-500 font-medium line-clamp-2 leading-tight">{item.title}</p>
                                <div className="flex items-baseline gap-1.5 mt-auto">
                                    <span className="text-sm font-extrabold text-gray-900">₹{item.price.toLocaleString()}</span>
                                    <span className="text-[10px] text-gray-400 line-through">₹{item.originalPrice.toLocaleString()}</span>
                                </div>

                                {/* Add to cart */}
                                <button
                                    onClick={() => moveToCart(item)}
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