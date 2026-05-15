import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsByCategory } from "../../services/productService";
import { useCart } from "../../context/CartContext/CartContext";
import { useAuth } from "../../context/Auth/AuthContext";
import toast from "react-hot-toast";
import { ShoppingBag, Heart, Star, SlidersHorizontal, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Category = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCartCtx } = useCart();
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const data = await getProductsByCategory(slug);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [slug]);

  const handleAddToCart = async (product) => {
    if (!user) {
      toast.error("Please login to add to cart");
      return;
    }
    try {
      const variantId = product.variants?.[0]?.id;
      if (!variantId) {
        toast.error("Product variant not found");
        return;
      }
      await addToCartCtx(user.id, product.id, variantId, 1);
      toast.success("Added to bag");
    } catch (err) {
      toast.error("Failed to add to bag");
    }
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    const isAdding = !wishlist.includes(id);
    toast.success(isAdding ? "Added to wishlist" : "Removed from wishlist");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="relative">
          <div className="h-16 w-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="mt-4 text-xs font-black tracking-widest text-blue-600 uppercase">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── Category Header ─────────────────────────────────────── */}
      <div className="relative h-[35vh] min-h-[280px] bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        
        <div className="relative z-10 text-center px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
            {slug} <span className="text-blue-500">.</span>
          </h1>
          <p className="text-white/60 text-xs md:text-sm tracking-[0.1em] font-medium max-w-lg mx-auto">
            Discover our curated selection of premium {slug} essentials, designed for the modern lifestyle.
          </p>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-12">
        {/* ── Filter Bar ────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-200">
              <SlidersHorizontal size={14} className="text-gray-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">Filters</span>
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Showing {products.length} Products
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select className="text-[10px] font-black uppercase tracking-widest text-gray-700 bg-white border-0 focus:ring-0 cursor-pointer">
              <option>Sort by: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Bestsellers</option>
            </select>
          </div>
        </div>

        {/* ── Product Grid ────────────────────────────────────────── */}
        {products.length === 0 ? (
          <div className="py-24 text-center">
            <ShoppingBag size={48} className="mx-auto text-gray-200 mb-6" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 text-sm mb-8">We couldn't find any products in this category.</p>
            <Link to="/product" className="inline-flex h-12 items-center px-8 bg-black text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-blue-600 transition-colors">
              Explore Store
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
            {products.map((product) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-gray-100 rounded-2xl">
                  <Link to={`/products/${product.slug}`}>
                    <img 
                      src={product.image_urls?.[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-md text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm">
                      {product.badge}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <button 
                      onClick={() => toggleWishlist(product.id)}
                      className={`h-10 w-10 flex items-center justify-center rounded-full backdrop-blur-md border transition-all ${
                        wishlist.includes(product.id) 
                          ? "bg-red-500 border-red-500 text-white" 
                          : "bg-white/80 border-white/20 text-gray-900 hover:bg-white"
                      }`}
                    >
                      <Heart size={16} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-600 border border-blue-600 text-white hover:bg-blue-700 transition-all"
                    >
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{product.category?.name}</span>
                    <div className="flex items-center gap-1">
                      <Star size={10} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-[10px] font-bold text-gray-500">{product.rating}</span>
                    </div>
                  </div>
                  <Link to={`/products/${product.slug}`}>
                    <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm font-black text-gray-900">
                    ₹{product.variants?.[0]?.price?.toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
