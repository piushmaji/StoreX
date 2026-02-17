import { Check, Crown, Globe, Heart, MessageSquareText, Package, Share2, ShieldCheck, ShoppingCart, Star, Truck, X, Zap, Award, RotateCcw, Lock } from "lucide-react"
import { useEffect, useState } from "react"
import products from "../../data/Products"
import { useNavigate, useParams } from 'react-router-dom'
import StarRating from "../common/Rating/StarRating"
import { useCart } from "../../context/CartContext/CartContext"
import WishListIcon from "../common/WishListIcon/WishListIcon"


const ProductImg = () => {

    const { id } = useParams()
    const product = products[id]
    const { addToCart, isInCart } = useCart()
    const [activeImg, setActiveImg] = useState(product.images[0])
    const navigate = useNavigate();

    useEffect(() => {
        if (product?.images?.length) {
            setActiveImg(product.images[0])
        }
    }, [product])

    const handleClick = (product) => {
        if (isInCart(product.id)) {
            navigate('/cart')
        }
        else {
            addToCart(product)
        }
    }

    return (
        <div className="min-h-screen bg-[#fafafa]">
            <div className="max-w-[1400px] mx-auto px-4 py-6">

                <section className="bg-white rounded-3xl shadow-sm p-6 lg:p-8">

                    {/* Main Grid Layout */}
                    <section className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8'>

                        {/* LEFT COLUMN - Image Gallery (4 cols) */}
                        <section className="lg:col-span-4 space-y-4">

                            {/* Main Image Container */}
                            <div className="relative bg-linear-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden group">

                                {/* Top Badges */}
                                <div className="absolute top-4 left-4 z-10">
                                    <span className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-md ${product.inStock
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-red-500 text-white'
                                        }`}>
                                        {product.inStock ? <Check size={16} /> : <X size={16} />}
                                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>

                                {/* Wishlist & Share */}
                                <div className="absolute top-4 right-4 z-10 flex gap-2">
                                    <div className="bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200">
                                        <WishListIcon product={product} />
                                    </div>
                                    <button className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200">
                                        <Share2 size={18} className="text-gray-700" />
                                    </button>
                                </div>

                                {/* Main Product Image */}
                                <div className='aspect-square flex items-center justify-center p-8'>
                                    <img
                                        className='w-full h-full object-contain transition-transform duration-500 group-hover:scale-110'
                                        src={activeImg}
                                        alt={product.title}
                                    />
                                </div>
                            </div>

                            {/* Thumbnail Gallery */}
                            <div className='flex gap-3 overflow-x-auto pb-2'>
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImg(img)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden transition-all duration-200 ${activeImg === img
                                            ? 'ring-2 ring-blue-500 ring-offset-2 scale-105'
                                            : 'ring-1 ring-gray-200 hover:ring-blue-300 hover:scale-105'
                                            }`}
                                    >
                                        <img
                                            className="w-full h-full object-cover bg-gray-50 p-2"
                                            src={img}
                                            alt={`thumb-${i}`}
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleClick(product)}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3.5 font-semibold transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart size={20} />
                                    <span>{isInCart(product.id) ? 'Go To Cart' : 'Add To Cart'}</span>
                                </button>

                                <button className="flex-1 bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300 text-gray-900 rounded-xl px-6 py-3.5 font-semibold transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2">
                                    <Zap size={20} className="text-blue-600" />
                                    <span>Buy Now</span>
                                </button>
                            </div>

                        </section>

                        {/* MIDDLE COLUMN - Product Details (5 cols) */}
                        <section className="lg:col-span-5 space-y-5">

                            {/* Product Title & Rating */}
                            <div className="space-y-3">
                                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
                                    {product.title}
                                </h1>

                                {/* Rating Row */}
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <StarRating value={product.rating.stars} precision={0.5} readOnly size="small" />
                                        <span className="text-sm font-semibold text-gray-900">{product.rating.score}</span>
                                    </div>

                                    <div className="h-4 w-px bg-gray-300"></div>

                                    <div className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                                        <MessageSquareText size={16} />
                                        <span>{product.rating.reviews} reviews</span>
                                    </div>

                                    <div className="h-4 w-px bg-gray-300"></div>

                                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                        <Crown size={16} className="text-amber-500" />
                                        <span className="font-medium">{product.rating.sold} sold</span>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-5 border border-blue-100">
                                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                                    <span className="text-4xl font-bold text-gray-900">
                                        ₹{product.pricing.retail.salePrice}
                                    </span>
                                    <span className="text-lg text-gray-400 line-through">
                                        ₹{product.pricing.retail.originalPrice}
                                    </span>
                                    <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                                        {product.pricing.retail.discountPercentage}% off
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">Inclusive of all taxes</p>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="flex flex-col items-center text-center p-3 bg-green-50 rounded-xl border border-green-100">
                                    <div className="p-2 bg-green-500 rounded-lg mb-2">
                                        <Truck size={20} className="text-white" />
                                    </div>
                                    <p className="text-xs font-semibold text-gray-900">Free Delivery</p>
                                    <p className="text-xs text-gray-600">2-3 Days</p>
                                </div>

                                <div className="flex flex-col items-center text-center p-3 bg-blue-50 rounded-xl border border-blue-100">
                                    <div className="p-2 bg-blue-500 rounded-lg mb-2">
                                        <RotateCcw size={20} className="text-white" />
                                    </div>
                                    <p className="text-xs font-semibold text-gray-900">Easy Returns</p>
                                    <p className="text-xs text-gray-600">7 Days</p>
                                </div>

                                <div className="flex flex-col items-center text-center p-3 bg-purple-50 rounded-xl border border-purple-100">
                                    <div className="p-2 bg-purple-500 rounded-lg mb-2">
                                        <Lock size={20} className="text-white" />
                                    </div>
                                    <p className="text-xs font-semibold text-gray-900">Secure Pay</p>
                                    <p className="text-xs text-gray-600">100% Safe</p>
                                </div>
                            </div>

                            {/* Product Highlights */}
                            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Highlights</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="p-1 bg-green-100 rounded-full mt-0.5">
                                            <Check size={14} className="text-green-600" />
                                        </div>
                                        <span className="text-sm text-gray-700 flex-1">Premium quality materials with durable construction</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="p-1 bg-green-100 rounded-full mt-0.5">
                                            <Check size={14} className="text-green-600" />
                                        </div>
                                        <span className="text-sm text-gray-700 flex-1">Water-resistant fabric for all-weather protection</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="p-1 bg-green-100 rounded-full mt-0.5">
                                            <Check size={14} className="text-green-600" />
                                        </div>
                                        <span className="text-sm text-gray-700 flex-1">Multiple compartments for organized storage</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="p-1 bg-green-100 rounded-full mt-0.5">
                                            <Check size={14} className="text-green-600" />
                                        </div>
                                        <span className="text-sm text-gray-700 flex-1">Ergonomic design for maximum comfort</span>
                                    </li>
                                </ul>
                            </div>

                        </section>

                        {/* RIGHT COLUMN - Seller Card (3 cols) */}
                        <section className="lg:col-span-3">
                            <div className="bg-linear-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6 space-y-5 lg:sticky lg:top-6">

                                {/* Seller Header */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-14 w-14 flex items-center justify-center bg-linear-to-br from-blue-500 to-blue-600 rounded-xl text-white text-xl font-bold shadow-lg shrink-0">
                                            {product.seller.name.charAt(0)}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Supplier</p>
                                            <h3 className="font-semibold text-gray-900 truncate">{product.seller.name}</h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>

                                {/* Seller Details */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <img
                                            className="h-5 w-7 object-cover rounded shadow-sm shrink-0"
                                            src={product.seller.flag}
                                            alt="flag"
                                        />
                                        <span className="text-gray-700 font-medium">{product.seller.location}</span>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className={`p-1.5 rounded-lg ${product.seller.verified ? 'bg-emerald-100' : 'bg-gray-100'} shrink-0`}>
                                            <ShieldCheck size={18} className={product.seller.verified ? 'text-emerald-600' : 'text-gray-400'} />
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-semibold ${product.seller.verified ? 'text-emerald-600' : 'text-gray-600'}`}>
                                                {product.seller.verified ? 'Verified Seller' : 'Not Verified'}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5">Trusted by 10k+ buyers</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 text-sm">
                                        <div className="p-1.5 bg-blue-100 rounded-lg shrink-0">
                                            <Globe size={18} className="text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-700 font-medium">{product.seller.shipping}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">Ships within 24 hours</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Seller Stats */}
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div className="bg-white rounded-xl p-3 border border-gray-200 text-center">
                                        <p className="text-2xl font-bold text-gray-900">98%</p>
                                        <p className="text-xs text-gray-600 mt-1">Positive Rating</p>
                                    </div>
                                    <div className="bg-white rounded-xl p-3 border border-gray-200 text-center">
                                        <p className="text-2xl font-bold text-gray-900">2.5k</p>
                                        <p className="text-xs text-gray-600 mt-1">Products</p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-200 active:scale-[0.98] shadow-lg shadow-blue-600/20">
                                        Send Inquiry
                                    </button>
                                    <button className="w-full py-3.5 bg-white hover:bg-gray-50 rounded-xl text-blue-600 font-semibold border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 active:scale-[0.98]">
                                        View Profile
                                    </button>
                                </div>

                            </div>
                        </section>

                    </section>
                </section>

            </div>
        </div>
    )
}

export default ProductImg