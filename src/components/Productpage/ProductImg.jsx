import { Check, Share2, ShoppingCart, Zap, RotateCcw, Lock, Truck, Minus, Plus, ChevronUp, ChevronDown, Ruler, Trophy, Wrench, Heart, X, MapPin, ArrowRight, Shield, Gift, Bell, CreditCard, Sparkles, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import StarRating from "../common/Rating/StarRating"
import { useCart } from "../../context/CartContext/CartContext"
import WishListIcon from "../common/WishListIcon/WishListIcon"
import { useProduct } from "../../context/admin/ProductContext"


const UNIQUE_BENEFITS = [
    {
        icon: <Bell size={15} className="text-amber-500" />,
        bg: "bg-amber-50 border-amber-100",
        label: "Price Drop Alerts",
        sub: "We notify you if price falls after purchase"
    },
    {
        icon: <Shield size={15} className="text-violet-500" />,
        bg: "bg-violet-50 border-violet-100",
        label: "Lifetime Authenticity",
        sub: "100% genuine or full refund, no questions"
    },
    {
        icon: <Gift size={15} className="text-pink-500" />,
        bg: "bg-pink-50 border-pink-100",
        label: "Free Gift Wrap",
        sub: "Premium packaging on every order"
    },
    {
        icon: <CreditCard size={15} className="text-emerald-500" />,
        bg: "bg-emerald-50 border-emerald-100",
        label: "Zero Cost EMI",
        sub: "Split into 3–12 months, zero interest"
    },
]

const ProductImg = () => {
    const { id } = useParams()
    const { products } = useProduct()
    const { addToCart, isInCart } = useCart()
    const navigate = useNavigate()

    const product = products.find(p => p.id === id)

    const [activeImg, setActiveImg] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [imgHovered, setImgHovered] = useState(false)
    const [pincode, setPincode] = useState('')
    const [pincodeStatus, setPincodeStatus] = useState(null)

    if (!product) {
        return <div className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-sm">Loading Product...</div>
    }

    const handleCartClick = () => {
        if (isInCart(product.id)) navigate('/cart')
        else addToCart(product)
    }

    const handlePincodeCheck = () => {
        if (pincode.length !== 6) return
        setPincodeStatus('checking')
        setTimeout(() => {
            const valid = parseInt(pincode) % 2 === 0
            setPincodeStatus(valid ? 'valid' : 'invalid')
        }, 800)
    }

    const inCart = isInCart(product.id)

    // Data Mapping for Supabase Structure
    const variant = product.variants?.[0]

    const price = variant?.price || 0
    const discountPrice = variant?.discount_price
    const hasDiscount = discountPrice && discountPrice < price
    const salesPrice = hasDiscount ? discountPrice : price
    const discountPercentage = hasDiscount ? Math.round(((price - discountPrice) / price) * 100) : 0
    
    const inStock = variant ? variant?.stock > 0 : true
    const rating = product.rating || 0
    // If product.reviews is populated with foreign key objects, safely measure length instead of blindly interpolating
    const reviewsCount = Array.isArray(product.reviews) ? product.reviews.length : (product.reviews || 0)
    const images = product.image_urls?.length ? product.image_urls : ['https://via.placeholder.com/400']
    
    const currentImg = activeImg || images[0]
    
    // Extract unique sizes from variants
    const availableSizes = product.variants ? [...new Set(product.variants.map(v => v.size).filter(Boolean))] : [];
   
    // Extract unique colors from variants
    const availableColors = product.variants ? [...new Set(product.variants.map(v => v.color).filter(Boolean))]:[];

    return (
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
            <div className="max-w-8xl mx-auto px-6 py-8 lg:py-10">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">

                    {/* ── LEFT: Image Gallery ── */}
                    <div className="w-full lg:w-[50%] lg:shrink-0 flex sm:flex-row flex-col gap-3">

                        {/* Vertical thumbnail strip */}
                        <div className="hidden sm:flex flex-col gap-2 pt-1 ">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImg(img)}
                                    className={`w-16 h-16 rounded-xl overflow-hidden p-1.5 bg-gray-50 transition-all duration-200 shrink-0 ${currentImg === img
                                        ? 'ring-2 ring-blue-500 ring-offset-1 shadow-md shadow-blue-100'
                                        : 'ring-1 ring-gray-200 hover:ring-blue-300 opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <img src={img} alt={`thumb-${i}`} className="w-full h-full object-contain mix-blend-multiply" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div
                            className="relative flex-1 rounded-2xl overflow-hidden bg-gray-50 aspect-square cursor-zoom-in"
                            onMouseEnter={() => setImgHovered(true)}
                            onMouseLeave={() => setImgHovered(false)}
                        >
                            {/* Stock badge */}
                            <div className="absolute top-3 left-3 z-20">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${inStock ? 'bg-emerald-500 text-white shadow-emerald-500/20 shadow-md' : 'bg-red-500 text-white shadow-red-500/20 shadow-md'}`}>
                                    {inStock ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                                    {inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            {/* Wishlist + Share */}
                            <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5">
                                <div className="sm:hidden bg-white/90 backdrop-blur-sm rounded-full shadow hover:scale-110 transition-all duration-200">
                                    <WishListIcon product={product} />
                                </div>
                                <button className="h-10 w-10  bg-white/90 backdrop-blur-sm shadow border border-slate-100 rounded-full hover:scale-110 transition-all duration-200 flex items-center justify-center">
                                    <Share2 size={16} className="text-gray-500" />
                                </button>
                            </div>

                            {/* Product Image */}
                            <img
                                src={currentImg}
                                alt={product.name}
                                className={`w-full h-full object-contain p-6 mix-blend-multiply transition-transform duration-500 ease-out ${imgHovered ? 'scale-110' : 'scale-100'}`}
                            />
                        </div>

                        {/* Mobile thumbnails — horizontal strip below */}
                        <div className="sm:hidden flex gap-2 p-1 overflow-x-auto no-scrollbar">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImg(img)}
                                    className={`shrink-0 w-14 h-14 rounded-xl overflow-hidden p-1 bg-gray-50 transition-all duration-200 ${currentImg === img ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-200'}`}
                                >
                                    <img src={img} alt={`thumb-${i}`} className="w-full h-full object-contain mix-blend-multiply" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: Product Details ── */}
                    <div className="w-full flex flex-col gap-5">

                        {/* Title */}
                        <h1 className="text-3xl lg:text-[2.4rem] font-extrabold tracking-tight text-gray-900 leading-[1.08]">
                            {product.name}
                        </h1>

                        {/* Stars */}
                        <div className="flex flex-wrap items-center gap-2.5">
                            <StarRating value={rating} precision={0.5} readOnly size="small" />
                            <span className="text-sm font-bold text-gray-900">{rating.toFixed(1)}/5</span>
                            <span className="text-sm text-gray-400">({reviewsCount} Reviews)</span>
                        </div>

                        {/* Pricing */}
                        <div className="flex items-baseline gap-3 flex-wrap">
                            <span className="text-4xl font-black text-gray-900">
                                ₹{salesPrice.toLocaleString()}
                            </span>
                            {hasDiscount && (
                                <>
                                    <span className="text-xl text-gray-400 line-through font-normal">
                                        ₹{price.toLocaleString()}
                                    </span>
                                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md tracking-widest uppercase shadow-sm">
                                        {discountPercentage}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        <div className="h-px bg-slate-100" />

                        {/* Size Selector */}
                        <div className="space-y-3">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Select Size</p>
                            <div className="flex flex-wrap gap-2.5">
                                {availableSizes.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedSize(s)}
                                        className={`w-14 py-2.5 rounded-xl text-sm font-black border-2 transition-all duration-200 ${selectedSize === s
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-300/60 scale-105'
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:scale-105'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selector */}
                        {availableColors.length > 0 && (
                            <div className="space-y-3 mt-5">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Select Color</p>
                                <div className="flex flex-wrap gap-3">
                                    {availableColors.map(c => {
                                        // A simple helper to ensure a valid background color regardless of casing or named value
                                        const bgColor = c.toLowerCase()
                                        return (
                                            <button
                                                key={c}
                                                onClick={() => setSelectedColor(c)}
                                                className={`relative w-10 h-10 rounded-full shadow-sm transition-all duration-200 ${
                                                    selectedColor === c
                                                        ? 'scale-110 ring-2 ring-blue-600 ring-offset-2 border-2 border-white'
                                                        : 'border-2 border-gray-100 hover:scale-105 hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
                                                }`}
                                                style={{ backgroundColor: bgColor }}
                                                title={c}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Stock indicator */}
                        {inStock && (
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.2)]" />
                                <span className="text-sm text-gray-600 font-medium tracking-wide">In stock · Dispatch within 24h</span>
                            </div>
                        )}

                        {/* Qty + CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-3">

                            {/* Quantity */}
                            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-[14px] px-3.5 py-2.5 shadow-[0_4px_16px_rgb(0,0,0,0.03)]">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-all font-bold"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="w-6 text-center font-black text-gray-900 text-sm select-none">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-all font-bold"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>

                            {/* Add to Cart — solid blue */}
                            {!inCart ? (
                                <button
                                    onClick={handleCartClick}
                                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-black uppercase tracking-wider text-[11px] rounded-[14px] px-7 py-4 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 border-b-[3px] border-blue-800"
                                >
                                    <ShoppingCart size={15} strokeWidth={2.5} />
                                    Add to Cart
                                </button>
                            ) : (
                                /* Go to Cart — distinct green outline style */
                                <button
                                    onClick={handleCartClick}
                                    className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-black uppercase tracking-wider text-[11px] rounded-[14px] px-7 py-4 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-200 border-b-[3px] border-emerald-700"
                                >
                                    <ArrowRight size={15} strokeWidth={2.5} />
                                    Go to Cart
                                </button>
                            )}

                            {/* Wishlist */}
                            <button className="hidden w-[52px] h-[52px] sm:flex items-center justify-center rounded-[14px] border border-slate-200 bg-white hover:border-red-200 hover:bg-red-50 hover:-translate-y-0.5 shadow-sm transition-all duration-200 shrink-0">
                                <WishListIcon product={product} />
                            </button>
                        </div>

                        <div className="h-px bg-slate-100 mt-2" />

                        {/* ── Pincode Checker ── */}
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                                <MapPin size={12} className="text-blue-500" />
                                Check Delivery
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1 max-w-55">
                                    <input
                                        type="text"
                                        maxLength={6}
                                        inputMode="numeric"
                                        value={pincode}
                                        onChange={e => {
                                            setPincode(e.target.value.replace(/\D/g, ''))
                                            setPincodeStatus(null)
                                        }}
                                        placeholder="Enter 6-digit pincode"
                                        className="w-full text-sm font-semibold border border-slate-200 focus:border-blue-400 bg-slate-50/50 rounded-xl px-4 py-2.5 outline-none transition-all duration-200 pr-10 placeholder:text-gray-400"
                                    />
                                    {pincode.length === 6 && (
                                        <MapPin size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-500" />
                                    )}
                                </div>
                                <button
                                    onClick={handlePincodeCheck}
                                    disabled={pincode.length !== 6 || pincodeStatus === 'checking'}
                                    className="text-[11px] uppercase tracking-wider font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg px-4 disabled:bg-slate-100 disabled:text-gray-300 transition-colors py-3 disabled:cursor-not-allowed"
                                >
                                    {pincodeStatus === 'checking' ? 'Checking…' : 'Check'}
                                </button>
                            </div>

                            {/* Pincode result */}
                            {pincodeStatus === 'valid' && (
                                <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 pl-1">
                                    <Check size={13} />
                                    Delivery available · Estimated in 2–3 days
                                </p>
                            )}
                            {pincodeStatus === 'invalid' && (
                                <p className="text-xs font-semibold text-red-500 flex items-center gap-1.5 pl-1">
                                    <X size={13} />
                                    Sorry, we don't deliver to this pincode yet
                                </p>
                            )}
                        </div>

                        <div className="h-px bg-slate-100" />

                        {/* ── Trust Badges ── */}
                        <div className="grid grid-cols-3 gap-2.5 mt-2">
                            {[
                                { icon: <Truck size={16} className="text-blue-500" />, bg: 'bg-white', label: 'Free Delivery', sub: '2–3 Days' },
                                { icon: <RotateCcw size={16} className="text-emerald-500" />, bg: 'bg-white', label: 'Easy Returns', sub: '7 Days' },
                                { icon: <Shield size={16} className="text-violet-500" />, bg: 'bg-white', label: 'Secure Pay', sub: '100% Safe' },
                            ].map(({ icon, bg, label, sub }) => (
                                <div key={label} className="flex flex-col items-center text-center p-3 sm:p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all">
                                    <div className={`${bg} p-2 rounded-xl mb-2 shadow-sm border border-slate-100`}>{icon}</div>
                                    <p className="text-[11px] font-black tracking-wide text-slate-800 uppercase">{label}</p>
                                    <p className="text-[10px] font-medium text-slate-400 mt-0.5">{sub}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductImg