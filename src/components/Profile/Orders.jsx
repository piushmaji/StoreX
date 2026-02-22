import { CircleCheck, Clock, XCircle, Package, ChevronRight, MapPin, RotateCcw, Truck } from 'lucide-react'

// ── Demo orders data ───────────────────────────────────────────────────────────
const ORDERS = [
    {
        id: "#9822",
        date: "Feb 18, 2026",
        status: "delivered",
        title: "Gaming Laptop — ASUS ROG Strix G16",
        specs: "16\" · RTX 4060 · 16GB RAM",
        price: 89000,
        image: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/o/l/2/-original-imahgfmzvanpgncf.jpeg?q=70&crop=false",
        deliveredOn: "Feb 15, 2026",
    },
    {
        id: "#9751",
        date: "Feb 10, 2026",
        status: "shipped",
        title: "Sony WH-1000XM5 Headphones",
        specs: "Midnight Black · Wireless ANC",
        price: 24990,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
        eta: "Expected Feb 25",
    },
    {
        id: "#9630",
        date: "Jan 28, 2026",
        status: "cancelled",
        title: "Apple iPad Pro 12.9\" M2",
        specs: "256GB · Space Grey · Wi-Fi",
        price: 109900,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&q=80",
        cancelledOn: "Jan 29, 2026",
    },
]

const STATUS = {
    delivered: {
        icon: CircleCheck,
        label: "Delivered",
        chip: "bg-emerald-50 text-emerald-600 border-emerald-200",
        dot: "bg-emerald-500",
    },
    shipped: {
        icon: Truck,
        label: "Shipped",
        chip: "bg-blue-50 text-blue-600 border-blue-200",
        dot: "bg-blue-500",
    },
    cancelled: {
        icon: XCircle,
        label: "Cancelled",
        chip: "bg-red-50 text-red-500 border-red-200",
        dot: "bg-red-400",
    },
    processing: {
        icon: Clock,
        label: "Processing",
        chip: "bg-amber-50 text-amber-600 border-amber-200",
        dot: "bg-amber-400",
    },
}

const Orders = () => {
    return (
        <div className="flex flex-col gap-5">

            {/* ── Header ── */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-gray-900 tracking-tight">My Orders</h1>
                    <p className="text-xs text-gray-400 mt-0.5">{ORDERS.length} orders placed</p>
                </div>
                {/* Filter pills */}
                <div className="hidden sm:flex items-center gap-1.5">
                    {['All', 'Active', 'Delivered'].map((f, i) => (
                        <button key={f}
                            className={`px-3 py-1 rounded-full text-xs font-bold border-2 transition-all ${i === 0 ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 text-gray-400 hover:border-gray-400'}`}>
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Order Cards ── */}
            <div className="flex flex-col gap-3">
                {ORDERS.map((order) => {
                    const s = STATUS[order.status]
                    const Icon = s.icon

                    return (
                        <div key={order.id}
                            className="bg-white rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50/50 transition-all duration-200 overflow-hidden group">

                            {/* Top bar — order meta */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-extrabold text-gray-800">Order {order.id}</span>
                                    <span className="text-gray-300">·</span>
                                    <span className="text-xs text-gray-400 font-medium">{order.date}</span>
                                </div>
                                {/* Status chip */}
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${s.chip}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                                    {s.label}
                                </span>
                            </div>

                            {/* Card body */}
                            <div className="flex gap-4 p-4">
                                {/* Product image */}
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden p-2 group-hover:border-blue-100 transition-colors">
                                    <img
                                        src={order.image}
                                        alt={order.title}
                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
                                    <div>
                                        <h2 className="text-sm font-bold text-gray-900 line-clamp-1">{order.title}</h2>
                                        <p className="text-[11px] text-gray-400 font-medium mt-0.5">{order.specs}</p>
                                    </div>

                                    {/* Sub status line */}
                                    <div className="flex items-center gap-1.5">
                                        <Icon size={12} className={order.status === 'delivered' ? 'text-emerald-500' : order.status === 'shipped' ? 'text-blue-500' : 'text-red-400'} />
                                        <p className="text-[11px] text-gray-500 font-medium">
                                            {order.status === 'delivered' && `Delivered on ${order.deliveredOn}`}
                                            {order.status === 'shipped' && order.eta}
                                            {order.status === 'cancelled' && `Cancelled on ${order.cancelledOn}`}
                                        </p>
                                    </div>

                                    <p className="text-base font-black text-gray-900">₹{order.price.toLocaleString()}</p>
                                </div>

                                {/* Actions — right column */}
                                <div className="hidden sm:flex flex-col gap-2 justify-center shrink-0 w-32">
                                    {order.status === 'shipped' && (
                                        <button className="flex items-center justify-center gap-1.5 h-9 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl transition-all active:scale-95 shadow-sm shadow-blue-200">
                                            <MapPin size={11} /> Track
                                        </button>
                                    )}
                                    {order.status === 'delivered' && (
                                        <button className="flex items-center justify-center gap-1.5 h-9 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl transition-all active:scale-95 shadow-sm shadow-blue-200">
                                            <RotateCcw size={11} /> Reorder
                                        </button>
                                    )}
                                    <button className="flex items-center justify-center gap-1 h-9 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded-xl transition-all active:scale-95">
                                        Details <ChevronRight size={11} />
                                    </button>
                                </div>
                            </div>

                            {/* Mobile actions */}
                            <div className="flex gap-2 px-4 pb-4 sm:hidden">
                                {order.status === 'shipped' && (
                                    <button className="flex-1 h-9 bg-blue-600 text-white text-xs font-extrabold rounded-xl flex items-center justify-center gap-1.5">
                                        <MapPin size={11} /> Track Package
                                    </button>
                                )}
                                {order.status === 'delivered' && (
                                    <button className="flex-1 h-9 bg-blue-600 text-white text-xs font-extrabold rounded-xl flex items-center justify-center gap-1.5">
                                        <RotateCcw size={11} /> Reorder
                                    </button>
                                )}
                                <button className="flex-1 h-9 bg-gray-100 text-gray-600 text-xs font-bold rounded-xl flex items-center justify-center gap-1">
                                    View Details <ChevronRight size={11} />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Orders