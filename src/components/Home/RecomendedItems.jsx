import { useState } from "react";
import { Heart, ShoppingCart, Star, ArrowRight } from "lucide-react";
import WishListIcon from "../common/WishListIcon/WishListIcon";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";
import { useCart } from "../../context/CartContext/CartContext";
import toast from "react-hot-toast";

const FILTERS = ["All", "Men", "Women", "Accessories"];

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={10}
          className={
            star <= Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-gray-200 fill-gray-200"
          }
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

const RecomendedItems = ({ products = [] }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { handleAddToCart: addToCartCtx, isInCart } = useCart();
  const [activeFilter, setActiveFilter] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);

  // Map Supabase product model to UI model
  const displayProducts = (products || []).map((p) => {
    const variant = p.variants?.[0] || {};
    const price = variant.discount_price || variant.price || 0;
    const originalPrice = variant.price || price;
    return {
      id: p.id,
      slug: p.slug,
      title: p.name,
      price: price,
      originalPrice: originalPrice,
      description: p.description,
      img:
        p.image_urls?.[0] ||
        "https://via.placeholder.com/800x1200?text=No+Image",
      rating: p.rating || 0,
      reviews: p.reviews || 0,
      badge: p.is_featured ? "Bestseller" : null,
      category: p.category?.name || "Uncategorized",
      gender: p.gender || "Unisex",
      variantId: variant.id,
    };
  });

  const filtered =
    activeFilter === "All"
      ? displayProducts
      : activeFilter === "Men"
        ? displayProducts.filter(
            (p) =>
              p.gender?.toLowerCase() === "men" ||
              p.category?.toLowerCase() === "men",
          )
        : activeFilter === "Women"
          ? displayProducts.filter(
              (p) =>
                p.gender?.toLowerCase() === "women" ||
                p.category?.toLowerCase() === "women",
            )
          : displayProducts.filter(
              (p) =>
                p.category?.toLowerCase() === activeFilter.toLowerCase() ||
                p.gender?.toLowerCase() === activeFilter.toLowerCase(),
            );

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleAddToCart = async (product) => {
    if (!user) {
      toast.error("Please login to add to cart");
      return;
    }

    // Visual feedback
    setAddedToCart((prev) => [...prev, product.id]);

    try {
      await addToCartCtx(user.id, product.id, product.variantId, 1);
      // Wait a bit before clearing visual feedback
      setTimeout(() => {
        setAddedToCart((prev) => prev.filter((i) => i !== product.id));
      }, 1800);
    } catch (err) {
      console.error("Cart error:", err);
      setAddedToCart((prev) => prev.filter((i) => i !== product.id));
    }
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
          View Selection{" "}
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>

      {/* ── Filter Pills ───────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide px-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`shrink-0 text-xs font-bold tracking-widest px-6 py-2.5 rounded-full transition-all duration-300
                            ${
                              activeFilter === filter
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
          const isAdded = addedToCart.includes(product.id) || isInCart(product.id);
          const disc = discount(product.originalPrice, product.price);

          return (
            <div
              key={product.id}
              onClick={() => navigate(`/products/${product.slug || product.id}`)}
              className="group relative flex flex-col bg-white rounded-[2rem] overflow-hidden border border-gray-100/50 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-700 cursor-pointer premium-shadow"
            >
              {/* ── Image Zone ─────────────────────────────── */}
              <div
                className="relative bg-[#F9FAFB] overflow-hidden"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Badge */}
                {product.badge && (
                  <span
                    className={`absolute top-4 left-4 text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full border ${badgeStyles[product.badge] || badgeStyles["New"]}`}
                  >
                    {product.badge}
                  </span>
                )}

                {/* Discount pill */}
                {disc > 0 && (
                  <span className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1 rounded-full pointer-events-none tracking-widest">
                    -{disc}%
                  </span>
                )}
              </div>

              {/* ── Info Zone ──────────────────────────────── */}
              <div className="flex flex-col gap-2.5 p-5 flex-1 relative z-10 bg-white">
                {/* Rating & Wishlist Row */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={product.rating} />
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                      ({product.reviews})
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`transition-colors duration-300
                                            ${
                                              isWishlisted
                                                ? "text-red-500 hover:text-red-600 scale-110"
                                                : "text-gray-300 hover:text-red-500"
                                            }`}
                  >
                    <Heart
                      size={16}
                      className={isWishlisted ? "fill-red-500" : ""}
                    />
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-bold text-gray-900 leading-snug line-clamp-1">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 hidden sm:block h-8">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-auto pt-3">
                  <span className="text-xl font-black text-gray-900 tracking-tighter">
                    ₹{product.price}
                  </span>
                  {disc > 0 && (
                    <span className="text-[11px] text-gray-400 line-through font-bold tracking-tight">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className={`w-full flex items-center justify-center gap-2 text-[10px] font-black tracking-[0.15em] uppercase py-4 rounded-2xl transition-all duration-500 mt-3
                                        ${
                                          isAdded
                                            ? "bg-green-50 text-green-600 border border-green-100"
                                            : "bg-gray-900 text-white hover:bg-blue-600 shadow-lg shadow-gray-200"
                                        }`}
                >
                  {isAdded ? (
                    <>✓ Added</>
                  ) : (
                    <>
                      <ShoppingCart size={13} strokeWidth={2.5} />
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
