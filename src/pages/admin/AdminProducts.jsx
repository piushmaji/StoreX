import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  Search,  Filter,  Plus,  Edit3,  Trash2,  Eye,  EyeOff,  ChevronLeft,  ChevronRight,  ArrowUpDown,  ChevronDown,  X,  Package,  MoreHorizontal,  Star,  CheckCircle2,  AlertCircle,  Clock,  LayoutGrid,  List as ListIcon,  Sparkles,  Smartphone,  Globe,  ArrowRight,  ExternalLink,  Tag,  IndianRupee,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ─── Mock Data ────────────────────────────────────────────────
const MOCK_PRODUCTS = [
  {
    id: "STX-001",
    name: "Classic Denim Trucker Jacket",
    brand: "StoreX Essentials",
    category: "Streetwear",
    price: 4999,
    discountPrice: 3999,
    stock: 24,
    rating: 4.8,
    gender: "Men",
    isVisible: true,
    isFeatured: true,
    isOnSale: true,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
  },
  {
    id: "STX-002",
    name: "Premium Oversized Hoodie",
    brand: "StoreX Studio",
    category: "Luxury",
    price: 2999,
    discountPrice: null,
    stock: 12,
    rating: 4.9,
    gender: "Unisex",
    isVisible: true,
    isFeatured: false,
    isOnSale: false,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80",
  },
  {
    id: "STX-003",
    name: "Cotton Essential Tee",
    brand: "StoreX Basic",
    category: "Streetwear",
    price: 999,
    discountPrice: 799,
    stock: 156,
    rating: 4.5,
    gender: "Unisex",
    isVisible: true,
    isFeatured: false,
    isOnSale: true,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
  },
  {
    id: "STX-004",
    name: "Linen Summer Shirt",
    brand: "StoreX Studio",
    category: "Luxury",
    price: 2499,
    discountPrice: null,
    stock: 0,
    rating: 4.7,
    gender: "Men",
    isVisible: false,
    isFeatured: true,
    isOnSale: false,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80",
  },
  {
    id: "STX-005",
    name: "Silk Evening Dress",
    brand: "StoreX Premium",
    category: "Luxury",
    price: 8999,
    discountPrice: 7499,
    stock: 8,
    rating: 5.0,
    gender: "Women",
    isVisible: true,
    isFeatured: true,
    isOnSale: true,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80",
  },
  {
    id: "STX-006",
    name: "Cargo Utility Pants",
    brand: "StoreX Street",
    category: "Streetwear",
    price: 3499,
    discountPrice: null,
    stock: 42,
    rating: 4.6,
    gender: "Men",
    isVisible: true,
    isFeatured: false,
    isOnSale: false,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&q=80",
  },
];

const CATEGORIES = ["All", "Streetwear", "Luxury", "Accessories", "Essentials"];
const BRANDS = [
  "All",
  "StoreX Studio",
  "StoreX Basic",
  "StoreX Premium",
  "StoreX Street",
];

// ─── Helper Components ────────────────────────────────────────

const StatusBadge = ({ active, label, variant = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    red: "bg-red-50 text-red-600 border-red-100",
    slate: "bg-slate-50 text-slate-500 border-slate-100",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${colors[variant]}`}
    >
      {label}
    </span>
  );
};

const VisibilityToggle = ({ isVisible, onToggle }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    className={`w-10 h-6 rounded-full relative transition-colors duration-300 flex items-center ${isVisible ? "bg-blue-600" : "bg-slate-200"}`}
  >
    <motion.div
      animate={{ x: isVisible ? 18 : 2 }}
      className="w-4 h-4 bg-white rounded-full shadow-sm"
    />
  </button>
);

// ─── Main Section ─────────────────────────────────────────────

const AdminProducts = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulation loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesBrand = selectedBrand === "All" || p.brand === selectedBrand;
      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [searchQuery, selectedCategory, selectedBrand]);

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div className="h-10 w-48 bg-slate-100 rounded-xl animate-pulse" />
        <div className="h-64 w-full bg-slate-50 rounded-[32px] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-[1600px] mx-auto min-h-screen pb-20">
      {/* ── Page Actions ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white/50 backdrop-blur-sm p-4 rounded-[32px] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 px-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
            <Package size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">
                Catalog
              </span>
              <div className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full border border-blue-100">
                {MOCK_PRODUCTS.length} Items
              </div>
            </div>
            <p className="text-slate-500 font-bold text-xs tracking-tight">
              StoreX Management System • Updated just now
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
            className="w-11 h-11 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm transition-all bg-slate-50/50"
          >
            {viewMode === "table" ? (
              <LayoutGrid size={18} />
            ) : (
              <ListIcon size={18} />
            )}
          </button>
          <button
            onClick={() => navigate("/admin/add-product")}
            className="flex items-center gap-2 px-6 h-11 bg-blue-600 text-white text-sm font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95"
          >
            <Plus size={18} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* ── Search & Filters ── */}
      <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, SKU or brand..."
            className="w-full pl-12 pr-4 h-12 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <select
              className="pl-4 pr-10 h-12 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 appearance-none focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              size={14}
            />
          </div>

          <div className="relative group">
            <select
              className="pl-4 pr-10 h-12 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 appearance-none focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              {BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              size={14}
            />
          </div>

          <button className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* ── Bulk Actions ── */}
      <AnimatePresence>
        {selectedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center justify-between px-6 py-3 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-500/20"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold">
                {selectedProducts.length} items selected
              </span>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-all">
                  Update Visibility
                </button>
                <button className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-all">
                  Change Category
                </button>
              </div>
            </div>
            <button className="text-sm font-black text-white hover:underline flex items-center gap-2">
              <Trash2 size={16} /> Delete Selected
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Products Display ── */}
      {viewMode === "table" ? (
        /* TABLE VIEW */
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-6 py-5 w-12">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      checked={
                        selectedProducts.length === filteredProducts.length &&
                        filteredProducts.length > 0
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Product
                  </th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Pricing
                  </th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Inventory
                  </th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence>
                  {filteredProducts.map((p, idx) => (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          checked={selectedProducts.includes(p.id)}
                          onChange={() => toggleSelect(p.id)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden border border-slate-50">
                            <img
                              src={p.image}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              alt=""
                            />
                          </div>
                          <div>
                            <p className="text-[15px] font-bold text-slate-800 leading-tight mb-1">
                              {p.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                {p.brand}
                              </span>
                              <span className="text-[10px] font-bold text-blue-500 px-1.5 py-0.5 bg-blue-50 rounded uppercase">
                                {p.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-base font-black text-slate-900">
                            ₹{p.discountPrice || p.price}
                          </p>
                          {p.discountPrice && (
                            <p className="text-[11px] text-slate-400 line-through font-bold">
                              ₹{p.price}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${p.stock > 10 ? "bg-emerald-500" : p.stock > 0 ? "bg-amber-500" : "bg-red-500"}`}
                            />
                            <span className="text-[13px] font-bold text-slate-700">
                              {p.stock} units
                            </span>
                          </div>
                          <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${p.stock > 10 ? "bg-emerald-500" : p.stock > 0 ? "bg-amber-500" : "bg-red-500"}`}
                              style={{ width: `${Math.min(p.stock, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          <VisibilityToggle
                            isVisible={p.isVisible}
                            onToggle={() => {}}
                          />
                          {p.isFeatured && (
                            <StatusBadge label="Featured" variant="amber" />
                          )}
                          {p.isOnSale && (
                            <StatusBadge label="Sale" variant="emerald" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setPreviewProduct(p)}
                            className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center justify-center shadow-sm"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/admin/edit-product/${p.id}`)
                            }
                            className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center justify-center shadow-sm"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-red-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center shadow-sm">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="py-32 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-[32px] bg-slate-50 flex items-center justify-center text-slate-200 mb-6 border border-slate-100">
                <Package size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-black text-slate-800">
                No products found
              </h3>
              <p className="text-slate-400 text-sm max-w-xs mt-2 font-medium">
                We couldn't find any products matching your search or filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedBrand("All");
                }}
                className="mt-6 text-blue-600 text-sm font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination */}
          <div className="px-6 py-6 border-t border-slate-50 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Showing 1 to {filteredProducts.length} of{" "}
              {filteredProducts.length} results
            </p>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all">
                <ChevronLeft size={18} />
              </button>
              <button className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-lg shadow-blue-500/20">
                1
              </button>
              <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all text-xs font-bold">
                2
              </button>
              <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-[32px] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden group hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={p.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt=""
                  />
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                    <div className="flex flex-col gap-2">
                      {p.isFeatured && (
                        <StatusBadge label="Featured" variant="amber" />
                      )}
                      {p.isOnSale && (
                        <StatusBadge label="Sale" variant="emerald" />
                      )}
                    </div>
                    <div className="pointer-events-auto">
                      <VisibilityToggle
                        isVisible={p.isVisible}
                        onToggle={() => {}}
                      />
                    </div>
                  </div>

                  <div className="absolute inset-x-4 bottom-4 flex justify-center translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-xl flex items-center gap-1">
                      <button
                        onClick={() => setPreviewProduct(p)}
                        className="w-9 h-9 rounded-xl bg-white hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => navigate(`/admin/edit-product/${p.id}`)}
                        className="w-9 h-9 rounded-xl bg-white hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button className="w-9 h-9 rounded-xl bg-white hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-sm">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">
                      {p.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star
                        size={10}
                        className="fill-amber-400 text-amber-400"
                      />
                      <span className="text-[11px] font-bold text-slate-500">
                        {p.rating}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-black text-slate-800 leading-tight truncate">
                    {p.name}
                  </h3>

                  <div className="flex items-end justify-between pt-2">
                    <div>
                      <p className="text-xl font-black text-slate-900">
                        ₹{p.discountPrice || p.price}
                      </p>
                      {p.discountPrice && (
                        <p className="text-[11px] text-slate-400 line-through font-bold">
                          ₹{p.price}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-[10px] font-black uppercase tracking-wider ${p.stock > 0 ? "text-emerald-500" : "text-red-500"}`}
                      >
                        {p.stock > 0 ? `${p.stock} In Stock` : "Out of Stock"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ── Quick Preview Drawer ── */}
      <AnimatePresence>
        {previewProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewProduct(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl overflow-y-auto"
            >
              <div className="p-8 space-y-8">
                {/* Drawer Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Quick Preview
                  </h2>
                  <button
                    onClick={() => setPreviewProduct(null)}
                    className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Preview Image Carousel Placeholder */}
                <div className="aspect-[4/5] rounded-[40px] overflow-hidden border border-slate-100 shadow-lg relative group">
                  <img
                    src={previewProduct.image}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {previewProduct.isFeatured && (
                      <StatusBadge label="Featured" variant="amber" />
                    )}
                    {previewProduct.isOnSale && (
                      <StatusBadge label="Sale" variant="emerald" />
                    )}
                  </div>
                </div>

                {/* Product Core Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-blue-600 uppercase tracking-widest">
                      {previewProduct.brand}
                    </span>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-xl border border-slate-100">
                      <Star
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                      <span className="text-sm font-black text-slate-700">
                        {previewProduct.rating}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 leading-tight">
                    {previewProduct.name}
                  </h3>

                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-blue-50 rounded-2xl border border-blue-100">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-0.5">
                        Category
                      </p>
                      <p className="text-sm font-bold text-slate-800">
                        {previewProduct.category}
                      </p>
                    </div>
                    <div className="px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                        Gender
                      </p>
                      <p className="text-sm font-bold text-slate-800">
                        {previewProduct.gender}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Detailed Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                    <IndianRupee className="text-blue-500 mb-3" size={20} />
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Base Price
                    </p>
                    <p className="text-xl font-black text-slate-900">
                      ₹{previewProduct.price}
                    </p>
                  </div>
                  <div className="p-5 bg-emerald-50/50 rounded-3xl border border-emerald-100">
                    <Tag className="text-emerald-500 mb-3" size={20} />
                    <p className="text-[11px] font-black text-emerald-600 uppercase tracking-widest">
                      Stock Level
                    </p>
                    <p className="text-xl font-black text-emerald-900">
                      {previewProduct.stock} Units
                    </p>
                  </div>
                </div>

                {/* Status Toggles */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <Eye className="text-slate-400" size={18} />
                      <span className="text-sm font-bold text-slate-700">
                        Visibility Status
                      </span>
                    </div>
                    <VisibilityToggle
                      isVisible={previewProduct.isVisible}
                      onToggle={() => {}}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-4">
                  <button className="w-full h-14 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                    <Edit3 size={18} /> Full Product Edit
                  </button>
                  <button className="w-full h-14 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <ExternalLink size={18} /> View on Website
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;
