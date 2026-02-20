import { Check, Star, Package, Truck, User, FileText } from 'lucide-react'
import products from "../../data/Products"
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const TABS = [
    { label: 'Description', icon: <FileText size={15} /> },
    { label: 'Reviews', icon: <Star size={15} /> },
    { label: 'Shipping', icon: <Truck size={15} /> },
    { label: 'About Seller', icon: <User size={15} /> },
]

const ProductDesc = () => {
    const { id } = useParams()
    const product = products[id]
    const relatedProducts = Object.values(products)
    const [featured, setFeatured] = useState([])
    const [activeTab, setActiveTab] = useState('Description')

    useEffect(() => {
        const shuffled = [...relatedProducts].sort(() => Math.random() - 0.5).slice(0, 5)
        setFeatured(shuffled)
    }, [])

    return (
        <div className="grid grid-cols-8 gap-5">

            {/* ── Main Panel ── */}
            <div className="lg:col-span-6 col-span-8 bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">

                {/* Tab Bar */}
                <div className="flex border-b border-blue-100 px-2 overflow-x-auto no-scrollbar">
                    {TABS.map(({ label, icon }) => (
                        <button
                            key={label}
                            onClick={() => setActiveTab(label)}
                            className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all duration-200 border-b-2 -mb-px
                                ${activeTab === label
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-200'
                                }`}
                        >
                            <span className={activeTab === label ? 'text-blue-500' : 'text-gray-300'}>
                                {icon}
                            </span>
                            {label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-6 lg:p-8">

                    {activeTab === 'Description' && (
                        <div className="flex flex-col gap-7">

                            {/* Description Text */}
                            <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
                                <p className="text-sm text-gray-600 leading-relaxed text-justify">
                                    {product.description}
                                </p>
                            </div>

                            {/* Specs Table */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-3">Specifications</h3>
                                <div className="rounded-xl overflow-hidden border border-blue-100">
                                    <table className="w-full lg:w-[70%]">
                                        <tbody>
                                            {Object.entries(product.specs).map(([key, value], i) => (
                                                <tr
                                                    key={key}
                                                    className={`border-b border-blue-50 last:border-0 transition-colors hover:bg-blue-50/40 ${i % 2 === 0 ? 'bg-white' : 'bg-blue-50/20'}`}
                                                >
                                                    <td className="px-5 py-3.5 text-xs font-bold text-gray-400 uppercase tracking-wide w-40">
                                                        {key}
                                                    </td>
                                                    <td className="px-5 py-3.5 text-sm text-gray-700 font-medium">
                                                        {value}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Features */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-3">Key Features</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {product.features.map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 bg-white border border-blue-100 rounded-xl px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all duration-200"
                                        >
                                            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                                                <Check size={11} className="text-white" strokeWidth={3} />
                                            </div>
                                            <span className="text-sm text-gray-600">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Reviews' && (
                        <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                                <Star size={24} className="text-blue-400" />
                            </div>
                            <p className="text-gray-400 text-sm">No reviews yet. Be the first to review!</p>
                        </div>
                    )}

                    {activeTab === 'Shipping' && (
                        <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                                <Truck size={24} className="text-blue-400" />
                            </div>
                            <p className="text-gray-400 text-sm">Free delivery in 2–3 business days.</p>
                        </div>
                    )}

                    {activeTab === 'About Seller' && (
                        <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                                <User size={24} className="text-blue-400" />
                            </div>
                            <p className="text-gray-400 text-sm">Seller information coming soon.</p>
                        </div>
                    )}

                </div>
            </div>

            {/* ── You May Like ── */}
            <div className="lg:col-span-2 col-span-8">
                <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5">

                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-1 h-5 bg-blue-600 rounded-full" />
                        <h2 className="text-base font-bold text-gray-900">You may like</h2>
                    </div>

                    <div className="flex flex-col gap-3">
                        {featured.map((item) => (
                            <Link key={item.id} to={`/product/${item.id}`} target="_blank">
                                <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all duration-200 group">

                                    {/* Image */}
                                    <div className="w-16 h-16 shrink-0 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={item.images[0]}
                                            alt={item.title}
                                            className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-gray-800 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {item.title}
                                        </p>
                                        <p className="text-xs text-blue-500 font-bold mt-1">
                                            ₹{item.pricing?.retail?.salePrice ?? '—'}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ProductDesc