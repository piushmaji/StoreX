import { ArrowLeft, Trash2, Heart, Tag, ShoppingBag, ChevronRight, Shield, RotateCcw, Truck, Minus, Plus } from 'lucide-react'
import { useCart } from '../../context/CartContext/CartContext'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useSaveForLater } from '../../context/SaveForLater/SaveForLater'

const MyCart = () => {
    const { cartItem, updateQty, totalPrice, removeItem } = useCart()
    const { addToSaved } = useSaveForLater()

    const [coupon, setCoupon] = useState('')
    const [couponApplied, setCouponApplied] = useState(false)

    const discount = couponApplied ? Math.round(totalPrice * 0.1) : 0
    const finalTotal = totalPrice - discount

    const handleMoveToLater = (item) => {

        addToSaved(item)
        removeItem(item.id)
    }

    // ── Empty state ───────────────────────────────────────────────────────────
    if (cartItem.length === 0) return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
            <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center">
                <ShoppingBag size={30} className="text-gray-400" />
            </div>
            <div>
                <p className="text-lg font-extrabold text-gray-900">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-1">Add something you love!</p>
            </div>
            <Link to="/product">
                <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-200">
                    Browse Products
                </button>
            </Link>
        </div>
    )

    return (
        <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:pb-8 flex flex-col gap-6">

            {/* ── Header ── */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">My Cart
                        <span className="ml-2 text-sm font-bold text-gray-400 align-middle">({cartItem.length})</span>
                    </h1>
                </div>
                <Link to="/product" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors">
                    <ArrowLeft size={14} /> Continue Shopping
                </Link>
            </div>

            {/* ── Layout ── */}
            <div className="flex flex-col lg:flex-row gap-4 items-start">

                {/* ── Cart Items ── */}
                <div className="flex-1 w-full flex flex-col gap-3">
                    {cartItem.map((item) => (
                        <div key={item.id} className="bg-white rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:shadow-slate-100 transition-all duration-200 p-3 sm:p-4 flex gap-3 sm:gap-4 group">

                            {/* Product image */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden">
                                <img
                                    src={item.images[0]}
                                    alt={item.title}
                                    className="w-full h-full object-contain p-1.5 group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between gap-1.5">

                                {/* Title + price */}
                                <div className="flex items-start justify-between gap-2">
                                    <h2 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug flex-1">
                                        {item.title}
                                    </h2>
                                    <span className="text-base font-black text-gray-900 shrink-0 whitespace-nowrap">
                                        ₹{item.pricing.salePrice.toLocaleString()}
                                    </span>
                                </div>

                                {/* Specs */}
                                <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                                    {[`${item.specs?.size}`, `${item.specs?.color}`, `${item.seller?.name}`].filter(Boolean).map((t, i) => (
                                        <span key={i} className="text-[11px] text-gray-400">{t}</span>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1.5 flex-wrap mt-0.5">

                                    {/* Qty stepper */}
                                    <div className="flex items-center bg-gray-100 rounded-xl h-8 overflow-hidden">
                                        <button
                                            onClick={() => item.quantity > 1 && updateQty(item.id, item.quantity - 1)}
                                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="w-7 text-center text-xs font-bold text-gray-800 select-none">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQty(item.id, item.quantity + 1)}
                                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>

                                    <div className="w-px h-4 bg-gray-200" />

                                    <button
                                        onClick={() => handleMoveToLater(item)}
                                        className="inline-flex items-center gap-1 text-xs font-semibold transition-colors text-gray-500 hover:text-rose-500"
                                    >
                                        <Heart size={12} />
                                        Save For Later
                                    </button>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors ml-auto"
                                    >
                                        <Trash2 size={12} /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Order Summary ── */}
                <div className="w-full lg:w-75 xl:w-[320px] shrink-0 flex flex-col gap-3 lg:sticky lg:top-6">

                    {/* Coupon */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-3">
                        <div className="flex items-center gap-1.5">
                            <Tag size={13} className="text-blue-500" />
                            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Coupon Code</p>
                        </div>
                        <div className="flex gap-2 items-center bg-gray-100 rounded-xl p-1 pl-3">
                            <input
                                value={coupon}
                                onChange={e => { setCoupon(e.target.value); setCouponApplied(false) }}
                                placeholder="Enter code"
                                className="flex-1 text-sm bg-transparent outline-none placeholder:text-gray-400 font-medium"
                            />
                            <button
                                onClick={() => coupon.trim() && setCouponApplied(true)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-lg transition-all active:scale-95"
                            >
                                Apply
                            </button>
                        </div>
                        {couponApplied && (
                            <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-100">
                                🎉 10% off applied!
                            </p>
                        )}
                    </div>

                    {/* Bill summary */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-4">
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Order Summary</p>

                        <div className="flex flex-col gap-2.5">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Subtotal <span className="text-gray-400 text-xs">({cartItem.length} items)</span></span>
                                <span className="text-sm font-bold text-gray-900">₹{totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Platform fee</span>
                                <span className="text-sm font-bold text-gray-400">₹0</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Delivery</span>
                                <span className="text-sm font-extrabold text-emerald-500">FREE</span>
                            </div>
                            {couponApplied && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-emerald-600">Coupon (10%)</span>
                                    <span className="text-sm font-extrabold text-emerald-600">−₹{discount.toLocaleString()}</span>
                                </div>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-100" />

                        <div className="flex justify-between items-center">
                            <span className="text-sm font-extrabold text-gray-900">Total</span>
                            <div className="text-right">
                                <span className="text-2xl font-black text-gray-900">₹{finalTotal.toLocaleString()}</span>
                                {couponApplied && <p className="text-[10px] text-emerald-500 font-bold">You save ₹{discount.toLocaleString()}</p>}
                            </div>
                        </div>

                        {/* Checkout CTA */}
                        <button className="w-full h-12 bg-gray-900 hover:bg-black active:scale-[0.98] text-white font-extrabold text-sm rounded-2xl transition-all shadow-xl shadow-gray-900/20 flex items-center justify-center gap-2">
                            Proceed to Checkout <ChevronRight size={16} />
                        </button>

                        <div className="flex items-center justify-center gap-1.5">
                            <Shield size={11} className="text-gray-400" />
                            <p className="text-[10px] text-gray-400 text-center">Secure checkout · 100% payment protection</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MyCart