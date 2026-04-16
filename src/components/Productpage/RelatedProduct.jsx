import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { ShoppingCart, TrendingUp } from 'lucide-react'
import WishListIcon from "../common/WishListIcon/WishListIcon"
import { useCart } from "../../context/CartContext/CartContext"
import { useProduct } from "../../context/admin/ProductContext"

const RelatedProduct = () => {
    const { id } = useParams()
    const { products } = useProduct()
    const [featured, setFeatured] = useState([])
    const { addToCart, isInCart } = useCart()

    useEffect(() => {
        if (!products.length) return
        const others = products.filter(p => p.id !== id)
        const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, 8)
        setFeatured(shuffled)
    }, [products, id])

    return (
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5 lg:p-6 mb-5">

            {/* Header */}
            <div className="flex items-center gap-2.5 mb-5">
                <div className="w-1 h-6 bg-blue-600 rounded-full" />
                <h2 className="text-lg font-bold text-gray-900">Related Products</h2>
                <div className="ml-auto flex items-center gap-1.5 text-xs text-blue-500 font-semibold bg-blue-50 px-3 py-1.5 rounded-full">
                    <TrendingUp size={13} />
                    Trending
                </div>
            </div>

            {/* Scrollable Row */}
            <div className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-1">
                {featured.map((item) => {
                    const variant = item.variants?.[0]
                    const price = variant?.price || 0
                    const discountPrice = variant?.discount_price
                    const hasDiscount = discountPrice && discountPrice < price
                    const salesPrice = hasDiscount ? discountPrice : price
                    const img = item.image_urls?.[0] || 'https://via.placeholder.com/300'

                    return (
                        <div
                            key={item.id}
                            className="shrink-0 w-44 sm:w-48 flex flex-col bg-white rounded-2xl border border-blue-100 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 group overflow-hidden"
                        >
                            {/* Image */}
                            <Link to={`/product/${item.id}`} target="_blank" className="relative">
                                <div className="relative h-44 w-full bg-linear-to-br from-blue-50 to-slate-50 flex items-center justify-center p-4 overflow-hidden">
                                    <img
                                        className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                                        src={img}
                                        alt={item.name}
                                    />
                                    {/* Wishlist */}
                                    <div className="absolute top-2.5 right-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-200">
                                        <WishListIcon product={item} />
                                    </div>
                                </div>
                            </Link>

                            {/* Info */}
                            <div className="flex flex-col gap-3 p-3.5 flex-1">
                                <Link to={`/product/${item.id}`} target="_blank" className="flex-1">
                                    <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {item.name}
                                    </p>
                                </Link>

                                <p className="text-sm font-bold text-gray-900 mt-auto">
                                    ₹{salesPrice.toLocaleString()}
                                    {hasDiscount && (
                                        <span className="ml-1.5 text-xs text-gray-400 font-normal line-through">
                                            ₹{price.toLocaleString()}
                                        </span>
                                    )}
                                </p>

                                {/* Add to Cart */}
                                <button
                                    onClick={() => addToCart(item)}
                                    className="flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white text-xs font-semibold rounded-xl px-3 py-2.5 transition-all duration-200 hover:shadow-md hover:shadow-blue-200 active:scale-95"
                                >
                                    <ShoppingCart size={14} />
                                    {isInCart(item.id) ? 'In Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RelatedProduct