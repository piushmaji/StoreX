import { Trash2, ShoppingBag, Heart, ShoppingCart } from "lucide-react"
import { useWishList } from "../../context/WishListContext/WishListContext"
import { useCart } from '../../context/CartContext/CartContext'

const WishList = () => {
    const { wishList, removeWishListItem } = useWishList()
    const { addToCart } = useCart()

    const handleMove = (item) => {
        addToCart(item)
        removeWishListItem(item.id)
    }

    return (
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8">

            {/* ── Header ── */}
            <div className="flex items-center gap-2 mb-6">
                <Heart size={16} className="text-rose-400 fill-rose-400" />
                <h1 className="text-xl font-black text-gray-900 tracking-tight">My Wishlist</h1>
                <span className="text-sm font-bold text-gray-400">({wishList.length})</span>
            </div>

            {/* ── Grid ── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {wishList.map((item) => {
                    const sale = item.pricing?.salePrice
                    const original = item.pricing?.originalPrice
                    const off = item.pricing?.discountPercentage

                    return (
                        <div
                            key={item.id}
                            className="group bg-white rounded-2xl border border-gray-100 hover:border-rose-100 hover:shadow-xl hover:shadow-rose-50/60 transition-all duration-300 overflow-hidden flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative bg-gray-50 aspect-square flex items-center justify-center overflow-hidden p-3">
                                <img
                                    src={item.images?.[0]}
                                    alt={item.title}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Discount pill */}
                                {off && (
                                    <span className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-lg leading-none">
                                        -{off}%
                                    </span>
                                )}

                                {/* Remove button */}
                                <button
                                    onClick={() => removeWishListItem(item.id)}
                                    className="absolute top-2 right-2 w-6 h-6 bg-white hover:bg-red-50 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:text-red-500"
                                >
                                    <Trash2 size={11} className="text-gray-400 hover:text-red-500 transition-colors" />
                                </button>
                            </div>

                            {/* Info */}
                            <div className="flex flex-col gap-2 p-3 flex-1">
                                <p className="text-[11px] sm:text-xs font-semibold text-gray-700 line-clamp-2 leading-snug">
                                    {item.title}
                                </p>

                                {/* Pricing */}
                                <div className="flex items-baseline gap-1 flex-wrap mt-auto">
                                    <span className="text-sm font-black text-gray-900">₹{sale?.toLocaleString()}</span>
                                    {original && (
                                        <span className="text-[10px] text-gray-400 line-through">₹{original?.toLocaleString()}</span>
                                    )}
                                </div>

                                {/* Move to Cart CTA */}
                                <button
                                    onClick={() => handleMove(item)}
                                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 active:scale-95 text-white text-[10px] sm:text-[11px] font-extrabold transition-all duration-200 shadow-sm mt-1"
                                >
                                    <ShoppingCart size={11} />
                                    Move to Cart
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default WishList