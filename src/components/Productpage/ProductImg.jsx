import { Check, Share2, ShoppingCart, Zap, RotateCcw, Lock, Truck, Minus, Plus, ChevronUp, ChevronDown, Ruler, Trophy, Wrench, Heart, X } from "lucide-react"
import { useEffect, useState } from "react"
import products from "../../data/Products"
import { useNavigate, useParams } from 'react-router-dom'
import StarRating from "../common/Rating/StarRating"
import { useCart } from "../../context/CartContext/CartContext"
import WishListIcon from "../common/WishListIcon/WishListIcon"

const SIZES = ['S', 'M', 'L', 'XL', 'XXL']

const ProductImg = () => {
    const { id } = useParams()
    const product = products[id]
    const { addToCart, isInCart } = useCart()
    const navigate = useNavigate()

    const [activeImg, setActiveImg] = useState(product.images[0])
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState('XL')
    const [descOpen, setDescOpen] = useState(true)
    const [detailsOpen, setDetailsOpen] = useState(true)
    const [imgHovered, setImgHovered] = useState(false)

    useEffect(() => {
        if (product?.images?.length) setActiveImg(product.images[0])
    }, [product])

    const handleCartClick = () => {
        if (isInCart(product.id)) navigate('/cart')
        else addToCart(product)
    }

    const detailItems = [
        { icon: <Truck size={18} className="text-blue-600" />, bg: "bg-blue-100", label: "Delivery", sub: "Quick Shipping" },
        { icon: <Ruler size={18} className="text-blue-500" />, bg: "bg-blue-50", label: "Size Table", sub: "Accurate sizing" },
        { icon: <Trophy size={18} className="text-blue-700" />, bg: "bg-blue-100", label: "Champion", sub: "Elite spirit" },
        { icon: <Wrench size={18} className="text-gray-500" />, bg: "bg-gray-100", label: "Maintenance", sub: "Proper upkeep" },
    ]

    return (
        <div className="min-h-screen bg-white shadow-lg rounded-xl">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-start">

                    {/* ── LEFT: Image Gallery ── */}
                    <div className="w-full lg:w-115 lg:shrink-0 flex flex-col gap-4 p-4 rounded-4xl bg-white shadow-2xl">

                        {/* Main Image */}
                        <div
                            className="relative rounded-4xl overflow-hidden bg-blue-50 shadow-2xl shadow-blue-200/50 aspect-square cursor-zoom-in"
                            onMouseEnter={() => setImgHovered(true)}
                            onMouseLeave={() => setImgHovered(false)}
                        >
                            {/* Inner glow ring */}
                            <div className="absolute inset-0 rounded-4xl ring-1 ring-inset ring-blue-300/30 z-10 pointer-events-none" />

                            {/* Soft radial highlight */}
                            <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-white/30 rounded-full blur-3xl pointer-events-none z-0" />

                            {/* Stock badge */}
                            <div className="absolute top-4 left-4 z-20">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${product.inStock ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                                    {product.inStock ? <Check size={12} /> : <X size={12} />}
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            {/* Wishlist + Share */}
                            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                                <div className="md:hidden bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 transition-all duration-200">
                                    <WishListIcon product={product} />
                                </div>
                                <button className="p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 transition-all duration-200">
                                    <Share2 size={16} className="text-gray-500" />
                                </button>
                            </div>

                            {/* Image */}
                            <div className="relative z-5 w-full h-full flex items-center justify-center p-10">
                                <img
                                    src={activeImg}
                                    alt={product.title}
                                    className={`w-full h-full object-contain transition-transform duration-500 ease-out ${imgHovered ? 'scale-110' : 'scale-100'}`}
                                />
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-3 overflow-x-auto p-4">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImg(img)}
                                    className={`shrink-0 w-20 h-20 rounded-2xl overflow-hidden p-2 bg-white transition-all duration-200 ${activeImg === img
                                        ? 'ring-2 ring-blue-500 ring-offset-2 scale-105 shadow-lg shadow-blue-200'
                                        : 'ring-1 ring-gray-200 hover:ring-blue-300 hover:scale-105 hover:shadow-md'
                                        }`}
                                >
                                    <img src={img} alt={`thumb-${i}`} className="w-full h-full object-contain" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: Product Details ── */}
                    <div className="flex-1 min-w-0 flex flex-col gap-5">

                        {/* Title */}
                        <h1 className="text-4xl lg:text-[2.8rem] font-extrabold tracking-tight text-gray-900 leading-[1.05]">
                            {product.title}
                        </h1>

                        {/* Stars */}
                        <div className="flex flex-wrap items-center gap-2.5">
                            <StarRating value={product.rating.stars} precision={0.5} readOnly size="small" />
                            <span className="text-sm font-bold text-gray-900">{product.rating.score}/5</span>
                            <span className="text-sm text-gray-400">({product.rating.reviews} Reviews)</span>
                        </div>

                        {/* Pricing */}
                        <div className="flex items-baseline gap-3 flex-wrap">
                            <span className="text-4xl font-black text-gray-900">
                                ₹{product.pricing.retail.salePrice}
                            </span>
                            <span className="text-xl text-gray-400 line-through font-normal">
                                ₹{product.pricing.retail.originalPrice}
                            </span>
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full tracking-wide">
                                {product.pricing.retail.discountPercentage}% OFF
                            </span>
                        </div>

                        <div className="h-px bg-linear-to-r from-blue-200 via-blue-100 to-transparent" />

                        {/* Size Selector */}
                        <div className="space-y-3">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Select Size</p>
                            <div className="flex flex-wrap gap-2.5">
                                {SIZES.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedSize(s)}
                                        className={`w-14 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${selectedSize === s
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-300/60 scale-105'
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:scale-105'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Stock indicator */}
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.2)]" />
                            <span className="text-sm text-gray-600 font-medium">In stock (can be backordered)</span>
                        </div>

                        {/* Qty + CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-3">

                            {/* Quantity */}
                            <div className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-full px-4 py-2.5 shadow-sm">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-blue-100 hover:text-blue-600 text-gray-400 transition-all"
                                >
                                    <Minus size={13} />
                                </button>
                                <span className="w-5 text-center font-bold text-gray-900 text-sm select-none">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-blue-100 hover:text-blue-600 text-gray-400 transition-all"
                                >
                                    <Plus size={13} />
                                </button>
                            </div>

                            {/* Add to Cart */}
                            <button
                                onClick={handleCartClick}
                                className="flex-1 min-w-[150px] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.97] text-white font-bold text-sm rounded-full px-7 py-3.5 shadow-lg shadow-blue-400/40 hover:shadow-xl hover:shadow-blue-400/50 transition-all duration-200"
                            >
                                <ShoppingCart size={17} />
                                {isInCart(product.id) ? 'Go To Cart' : 'Add to cart'}
                            </button>

                            {/* Buy Now */}
                            <button className="flex items-center gap-2 bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 text-blue-700 font-bold text-sm rounded-full px-5 py-3.5 transition-all duration-200 hover:shadow-md">
                                <Zap size={16} className="text-blue-500" />
                                Buy Now
                            </button>

                            {/* Wishlist heart */}
                            <button className="hidden w-12 h-12 md:flex items-center justify-center rounded-full border-2 border-gray-200 bg-white hover:border-red-300 hover:bg-red-50 transition-all duration-200 shrink-0 group">
                                <WishListIcon product={product} />
                            </button>
                        </div>

                        <div className="h-px bg-linear-to-r from-blue-200 via-blue-100 to-transparent" />

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { icon: <Truck size={16} className="text-white" />, bg: 'bg-blue-500', label: 'Free Delivery', sub: '2–3 Days' },
                                { icon: <RotateCcw size={16} className="text-white" />, bg: 'bg-blue-600', label: 'Easy Returns', sub: '7 Days' },
                                { icon: <Lock size={16} className="text-white" />, bg: 'bg-blue-700', label: 'Secure Pay', sub: '100% Safe' },
                            ].map(({ icon, bg, label, sub }) => (
                                <div key={label} className="flex flex-col items-center text-center p-3.5 bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-200">
                                    <div className={`${bg} p-2 rounded-xl mb-2 shadow-sm`}>{icon}</div>
                                    <p className="text-xs font-bold text-gray-800">{label}</p>
                                    <p className="text-xs text-gray-400">{sub}</p>
                                </div>
                            ))}
                        </div>

                        {/* Description Accordion */}
                        <div className="rounded-2xl border border-blue-100 bg-white shadow-sm overflow-hidden">
                            <button
                                onClick={() => setDescOpen(o => !o)}
                                className="w-full flex items-center justify-between px-5 py-4 hover:bg-blue-50/60 transition-colors text-left"
                            >
                                <span className="font-bold text-gray-900">Description</span>
                                {descOpen
                                    ? <ChevronUp size={18} className="text-blue-500 shrink-0" />
                                    : <ChevronDown size={18} className="text-gray-400 shrink-0" />
                                }
                            </button>
                            {descOpen && (
                                <div className="px-5 pb-5 border-t border-blue-50 pt-4">
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {product.description || 'Premium quality product with exceptional craftsmanship. Designed for performance, comfort, and durability — built for every adventure, engineered to last.'}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Product Details Accordion */}
                        <div className="rounded-2xl border border-blue-100 bg-white shadow-sm overflow-hidden">
                            <button
                                onClick={() => setDetailsOpen(o => !o)}
                                className="w-full flex items-center justify-between px-5 py-4 hover:bg-blue-50/60 transition-colors text-left"
                            >
                                <span className="font-bold text-gray-900">Product Details</span>
                                {detailsOpen
                                    ? <ChevronUp size={18} className="text-blue-500 shrink-0" />
                                    : <ChevronDown size={18} className="text-gray-400 shrink-0" />
                                }
                            </button>
                            {detailsOpen && (
                                <div className="grid grid-cols-2 gap-3 px-4 pb-4 border-t border-blue-50 pt-4">
                                    {detailItems.map(({ icon, bg, label, sub }) => (
                                        <div
                                            key={label}
                                            className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100/80 hover:bg-blue-50 hover:border-blue-200 hover:shadow-sm transition-all duration-200"
                                        >
                                            <div className={`${bg} w-9 h-9 rounded-xl flex items-center justify-center shrink-0`}>
                                                {icon}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-bold text-gray-800 truncate">{label}</p>
                                                <p className="text-xs text-gray-400">{sub}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductImg