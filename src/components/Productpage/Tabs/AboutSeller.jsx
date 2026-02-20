import { useState } from 'react'
import { Star, ShieldCheck, Package, Truck, MessageCircle, ThumbsUp, Award, MapPin, Clock, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

const SELLER = {
    name: 'StyleHub Official',
    avatar: 'SH',
    verified: true,
    since: '2019',
    location: 'Mumbai, Maharashtra',
    responseTime: 'Within 2 hours',
    rating: 4.8,
    totalReviews: 12480,
    totalSales: '50K+',
    onTime: 97,
    returnRate: 2.1,
    satisfaction: 98,
}

const SELLER_PRODUCTS = [
    { id: 1, title: 'Classic Cotton Polo', price: '₹799', img: 'https://via.placeholder.com/80' },
    { id: 2, title: 'Slim Fit Chinos',     price: '₹1299', img: 'https://via.placeholder.com/80' },
    { id: 3, title: 'Casual Linen Shirt',  price: '₹999', img: 'https://via.placeholder.com/80' },
    { id: 4, title: 'Sports Track Pants',  price: '₹649', img: 'https://via.placeholder.com/80' },
]

const SELLER_REVIEWS = [
    { name: 'Aditya K.', rating: 5, text: 'Super fast shipping and great quality. Will buy again!' },
    { name: 'Meera S.', rating: 5, text: 'Seller was very responsive and product was exactly as described.' },
    { name: 'Ravi T.',  rating: 4, text: 'Good experience overall. Minor delay in shipping but quality was top notch.' },
]

const StarRow = ({ value, size = 13 }) => (
    <div className="flex items-center gap-0.5">
        {[1,2,3,4,5].map(s => (
            <Star key={s} size={size} className={s <= value ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
        ))}
    </div>
)

const AboutSeller = ({ product }) => {
    const [msgOpen, setMsgOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [sent, setSent] = useState(false)

    const handleSend = () => {
        if (message.trim()) { setSent(true); setMessage('') }
    }

    return (
        <div className="flex flex-col gap-8">

            {/* ── Seller Profile Card ── */}
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl border border-blue-100 p-6">
                <div className="flex items-start gap-5">

                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-blue-300">
                            {SELLER.avatar}
                        </div>
                        {SELLER.verified && (
                            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                                <ShieldCheck size={13} className="text-white" />
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h2 className="text-lg font-black text-gray-900">{SELLER.name}</h2>
                            {SELLER.verified && (
                                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                                    ✓ Verified Seller
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <StarRow value={5} />
                            <span className="text-sm font-bold text-gray-900">{SELLER.rating}</span>
                            <span className="text-xs text-gray-400">({SELLER.totalReviews.toLocaleString()} ratings)</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <MapPin size={12} className="text-blue-400" />
                                {SELLER.location}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <Clock size={12} className="text-blue-400" />
                                Since {SELLER.since}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <MessageCircle size={12} className="text-blue-400" />
                                Responds {SELLER.responseTime}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Stats Grid ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { icon: <Package size={18} className="text-blue-600" />,   bg: 'bg-blue-50',    value: SELLER.totalSales, label: 'Total Sales' },
                    { icon: <Truck size={18} className="text-indigo-600" />,   bg: 'bg-indigo-50',  value: `${SELLER.onTime}%`, label: 'On-Time Delivery' },
                    { icon: <ThumbsUp size={18} className="text-emerald-600" />, bg: 'bg-emerald-50', value: `${SELLER.satisfaction}%`, label: 'Satisfaction' },
                    { icon: <Award size={18} className="text-amber-500" />,    bg: 'bg-amber-50',   value: `${SELLER.returnRate}%`, label: 'Return Rate' },
                ].map(({ icon, bg, value, label }) => (
                    <div key={label} className={`flex flex-col items-center text-center gap-2 p-4 ${bg} rounded-2xl border border-blue-100 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200`}>
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            {icon}
                        </div>
                        <p className="text-lg font-black text-gray-900">{value}</p>
                        <p className="text-xs text-gray-400">{label}</p>
                    </div>
                ))}
            </div>

            <div className="h-px bg-gradient-to-r from-blue-200 via-blue-100 to-transparent" />

            {/* ── More from Seller ── */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 bg-blue-600 rounded-full" />
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">More from this Seller</h3>
                    <button className="ml-auto flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline">
                        View All <ExternalLink size={12} />
                    </button>
                </div>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                    {SELLER_PRODUCTS.map(({ id, title, price, img }) => (
                        <div key={id} className="flex-shrink-0 w-36 bg-white rounded-2xl border border-blue-100 hover:border-blue-300 hover:shadow-md hover:shadow-blue-100 transition-all duration-200 overflow-hidden group cursor-pointer">
                            <div className="h-32 bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center p-3">
                                <img src={img} alt={title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <div className="p-3">
                                <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{title}</p>
                                <p className="text-xs font-bold text-blue-600 mt-1">{price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-px bg-gradient-to-r from-blue-200 via-blue-100 to-transparent" />

            {/* ── Seller Reviews ── */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 bg-blue-600 rounded-full" />
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Seller Reviews</h3>
                </div>
                <div className="flex flex-col gap-3">
                    {SELLER_REVIEWS.map(({ name, rating, text }) => (
                        <div key={name} className="flex items-start gap-3 bg-white border border-blue-100 rounded-2xl p-4 hover:border-blue-200 hover:shadow-sm transition-all duration-200">
                            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                {name[0]}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="text-xs font-bold text-gray-900">{name}</p>
                                    <StarRow value={rating} size={11} />
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed">{text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-px bg-gradient-to-r from-blue-200 via-blue-100 to-transparent" />

            {/* ── Contact Seller ── */}
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl border border-blue-100 p-5">
                <button
                    onClick={() => setMsgOpen(o => !o)}
                    className="w-full flex items-center justify-between"
                >
                    <div className="flex items-center gap-2">
                        <MessageCircle size={16} className="text-blue-600" />
                        <p className="text-sm font-bold text-gray-800">Contact Seller</p>
                    </div>
                    {msgOpen ? <ChevronUp size={16} className="text-blue-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>

                {msgOpen && (
                    <div className="mt-4 flex flex-col gap-3">
                        {sent ? (
                            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                                <ShieldCheck size={15} />
                                <span className="text-xs font-semibold">Message sent! Seller typically replies within 2 hours.</span>
                            </div>
                        ) : (
                            <>
                                <textarea
                                    rows={3}
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    placeholder="Ask the seller about this product..."
                                    className="w-full text-sm bg-white border-2 border-blue-100 focus:border-blue-400 outline-none rounded-xl px-4 py-3 text-gray-700 placeholder-gray-300 transition-colors resize-none"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!message.trim()}
                                    className="self-end bg-blue-600 hover:bg-blue-700 disabled:bg-blue-200 disabled:cursor-not-allowed text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-sm shadow-blue-200 transition-all duration-200 active:scale-95"
                                >
                                    Send Message
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>

        </div>
    )
}

export default AboutSeller