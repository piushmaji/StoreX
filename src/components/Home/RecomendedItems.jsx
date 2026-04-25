import { useState } from 'react';
import { Heart, ShoppingCart, Star, ArrowRight } from 'lucide-react';
import WishListIcon from '../common/WishListIcon/WishListIcon';

const products = [
    { id: 1, title: "Cashmere Turtleneck", price: 249.99, originalPrice: 299.00, description: "Ultra-soft 100% cashmere sweater for cold days.", img: "https://images.unsplash.com/photo-1574824874457-3aedfcbcbd3a?q=80&w=800&auto=format&fit=crop", rating: 4.8, reviews: 128, badge: "Bestseller", category: "Women" },
    { id: 2, title: "Wool Overcoat", price: 599.00, originalPrice: 650.00, description: "Classic tailored overcoat with premium wool blend.", img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop", rating: 4.9, reviews: 95, badge: "New", category: "Women" },
    { id: 3, title: "Linen Blazer", price: 189.50, originalPrice: 189.50, description: "Lightweight linen blazer perfect for summer.", img: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=800&auto=format&fit=crop", rating: 4.3, reviews: 62, badge: null, category: "Men" },
    { id: 4, title: "Classic Leather Belt", price: 54.00, originalPrice: 75.00, description: "Full-grain Italian leather belt.", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop", rating: 4.6, reviews: 210, badge: "Sale", category: "Accessories" },
    { id: 5, title: "Everyday Tote Bag", price: 129.00, originalPrice: 150.00, description: "Spacious and durable tote for daily carry.", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop", rating: 4.7, reviews: 183, badge: "Sale", category: "Accessories" },
    { id: 6, title: "Straight Leg Denim", price: 89.99, originalPrice: 89.99, description: "Vintage wash denim with a relaxed fit.", img: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=800&auto=format&fit=crop", rating: 4.1, reviews: 77, badge: null, category: "Men" },
    { id: 7, title: "Gold Plated Necklace", price: 45.99, originalPrice: 60.00, description: "Minimalist link chain necklace.", img: "https://images.unsplash.com/photo-1599643478514-4a4e0a4f5f5c?q=80&w=800&auto=format&fit=crop", rating: 4.4, reviews: 54, badge: "Sale", category: "Accessories" },
    { id: 8, title: "Cotton Chinos", price: 79.50, originalPrice: 79.50, description: "Comfortable smart-casual chinos.", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop", rating: 4.5, reviews: 38, badge: null, category: "Men" },
    { id: 9, title: "Silk Evening Dress", price: 280.00, originalPrice: 320.00, description: "Elegant drape silk dress.", img: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=800&auto=format&fit=crop", rating: 4.9, reviews: 149, badge: "New", category: "Women" },
    { id: 10, title: "Suede Loafers", price: 149.00, originalPrice: 175.00, description: "Handcrafted Italian suede loafers.", img: "https://images.unsplash.com/photo-1614252339460-e171b1e60055?q=80&w=800&auto=format&fit=crop", rating: 4.6, reviews: 92, badge: "New", category: "Accessories" },
];

const FILTERS = ["All", "Men", "Women", "Accessories", "New"];

const StarRating = ({ rating }) => {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={10}
                    className={star <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
                />
            ))}
        </div>
    );
};

const badgeStyles = {
    Bestseller: "bg-amber-100 text-amber-700 border-amber-200",
    New: "bg-green-100 text-green-700 border-green-200",
    Sale: "bg-blue-100 text-blue-700 border-blue-200",
};

const RecomendedItems = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [wishlist, setWishlist] = useState([]);
    const [addedToCart, setAddedToCart] = useState([]);

    const filtered = activeFilter === "All"
        ? products
        : activeFilter === "New"
        ? products.filter(p => p.badge === "New")
        : products.filter(p => p.category === activeFilter);

    const toggleWishlist = (id) => {
        setWishlist(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleAddToCart = (product) => {
        // Visual feedback only — these are demo products, not real Supabase items
        setAddedToCart(prev => [...prev, product.id]);
        setTimeout(() => {
            setAddedToCart(prev => prev.filter(i => i !== product.id));
        }, 1800);
    };

    const discount = (orig, price) =>
        orig > price ? Math.round(((orig - price) / orig) * 100) : null;

    return (
        <div className="py-6">

            {/* ── Section Header ─────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 px-2">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">
                        Recommended Pieces
                    </h2>
                    <p className="text-xs tracking-[0.2em] text-blue-600 font-bold uppercase">
                        Curated Exactly For You
                    </p>
                </div>
                <a
                    href="#"
                    className="hidden sm:flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-gray-400 hover:text-gray-900 uppercase transition-colors duration-200 group"
                >
                    View Selection <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
            </div>

            {/* ── Filter Pills ───────────────────────────────────────── */}
            <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide px-2">
                {FILTERS.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`shrink-0 text-xs font-bold tracking-widest px-6 py-2.5 rounded-full transition-all duration-300
                            ${activeFilter === filter
                                ? "bg-gray-900 text-white shadow-lg scale-105"
                                : "bg-gray-50 text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* ── Product Grid ───────────────────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {filtered.map((product) => {
                    const isWishlisted = wishlist.includes(product.id);
                    const isAdded = addedToCart.includes(product.id);
                    const disc = discount(product.originalPrice, product.price);

                    return (
                        <div
                            key={product.id}
                            className="group relative flex flex-col bg-white border border-gray-100 rounded-4xl overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 cursor-pointer"
                        >
                            {/* ── Image Zone ─────────────────────────────── */}
                            <div className="relative bg-gray-50 overflow-hidden" style={{ aspectRatio: "3/4" }}>
                                <img
                                    src={product.img}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                />

                                {/* Badge */}
                                {product.badge && (
                                    <span className={`absolute top-4 left-4 text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full border ${badgeStyles[product.badge]}`}>
                                        {product.badge}
                                    </span>
                                )}

                                {/* Discount pill */}
                                {disc && (
                                    <span className="absolute top-4 right-4 bg-red-500 shadow-sm shadow-red-500/30 text-white text-[10px] font-black px-2.5 py-1 rounded-full pointer-events-none">
                                        -{disc}%
                                    </span>
                                )}
                            </div>

                            {/* ── Info Zone ──────────────────────────────── */}
                            <div className="flex flex-col gap-3 p-5 flex-1 relative z-10 bg-white">

                                {/* Rating & Wishlist Row */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <StarRating rating={product.rating} />
                                        <span className="text-[10px] text-gray-400 font-medium">({product.reviews})</span>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                                        className={`transition-colors duration-300
                                            ${isWishlisted
                                                ? "text-red-500 hover:text-red-600 scale-110"
                                                : "text-gray-300 hover:text-red-500"
                                            }`}
                                    >
                                        <Heart size={16} className={isWishlisted ? "fill-red-500" : ""} />
                                    </button>
                                </div>

                                {/* Title */}
                                <h3 className="text-[15px] font-bold text-gray-900 leading-snug line-clamp-1">
                                    {product.title}
                                </h3>

                                {/* Description */}
                                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 hidden sm:block">
                                    {product.description}
                                </p>

                                {/* Price */}
                                <div className="flex items-end gap-2 mt-auto pt-2">
                                    <span className="text-[22px] font-black text-gray-900 leading-none">₹{product.price}</span>
                                    {disc && (
                                        <span className="text-xs text-gray-400 line-through font-medium mb-0.5">₹{product.originalPrice}</span>
                                    )}
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToCart(product);
                                    }}
                                    className={`w-full flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase py-3.5 rounded-xl transition-all duration-300 mt-2
                                        ${isAdded
                                            ? "bg-green-50 text-green-600 border border-green-200"
                                            : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
                                        }`}
                                >
                                    {isAdded ? (
                                        <>✓ Added</>
                                    ) : (
                                        <>
                                            <ShoppingCart size={14} />
                                            Add to Cart
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Mobile View All ────────────────────────────────────── */}
            <div className="flex sm:hidden justify-center mt-8">
                <a
                    href="#"
                    className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-900 uppercase bg-gray-100 px-6 py-3.5 rounded-full hover:bg-gray-200 transition-colors"
                >
                    View All Items <ArrowRight size={14} />
                </a>
            </div>
        </div>
    );
};

export default RecomendedItems;
