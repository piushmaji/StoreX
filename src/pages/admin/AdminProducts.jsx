import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ChevronDown,
  X,
  Package,
  MoreHorizontal,
  Star,
  CheckCircle2,
  AlertCircle,
  Clock,
  LayoutGrid,
  List as ListIcon,
  Sparkles,
  Smartphone,
  Globe,
  ArrowRight,
  ExternalLink,
  Tag,
  IndianRupee,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  getProducts,
  updateProduct,
  deleteProduct,
  getCategories,
  getPaginatedProducts,
} from "../../services/productService";
import supabase from "../../lib/Supabase/Supabase";

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
  const [isActionLoading, setIsActionLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [dbCategories, setDbCategories] = useState([]);
  const [allBrands, setAllBrands] = useState(["All"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [cats, brandRes] = await Promise.all([
          getCategories(),
          supabase.from("products").select("brand"),
        ]);
        setDbCategories(cats || []);
        const brandsSet = new Set(
          brandRes.data?.map((p) => p.brand).filter(Boolean) || [],
        );
        setAllBrands(["All", ...Array.from(brandsSet)]);
      } catch (err) {
        console.error("Failed to load initial metadata:", err);
      }
    };
    fetchMetadata();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const catId =
        dbCategories.find((c) => c.name === selectedCategory)?.id || null;
      const { data, count } = await getPaginatedProducts({
        page: currentPage,
        limit: 10,
        filters: {
          search: searchQuery || null,
          categoryId: catId,
          brand: selectedBrand,
        },
      });
      setProducts(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      console.error("Failed to load products page:", err);
      toast.error("Failed to load products from server.");
      setProducts([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [currentPage, searchQuery, selectedCategory, selectedBrand, dbCategories]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedBrand]);

  const dbBrands = useMemo(() => {
    return allBrands;
  }, [allBrands]);

  const filteredProducts = useMemo(() => {
    return products;
  }, [products]);

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

  const handleToggleVisibility = async (productId, currentVisible) => {
    try {
      setIsActionLoading(true);
      const loadingToast = toast.loading("Updating visibility status...");
      await updateProduct({
        productId,
        productData: { is_visible: !currentVisible },
      });
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, is_visible: !currentVisible } : p,
        ),
      );
      toast.success("Product visibility updated!", { id: loadingToast });
    } catch (err) {
      console.error("Failed to toggle visibility:", err);
      toast.error("Failed to update status. Please try again.");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleToggleFeatured = async (productId, currentFeatured) => {
    try {
      setIsActionLoading(true);
      const loadingToast = toast.loading("Updating featured status...");
      await updateProduct({
        productId,
        productData: { is_featured: !currentFeatured },
      });
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, is_featured: !currentFeatured } : p,
        ),
      );
      toast.success("Product featured status updated!", { id: loadingToast });
    } catch (err) {
      console.error("Failed to toggle featured:", err);
      toast.error("Failed to update status. Please try again.");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleToggleSale = async (productId, currentSale) => {
    try {
      setIsActionLoading(true);
      const loadingToast = toast.loading("Updating sale status...");
      await updateProduct({
        productId,
        productData: { is_sale: !currentSale },
      });
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, is_sale: !currentSale } : p,
        ),
      );
      toast.success("Product sale status updated!", { id: loadingToast });
    } catch (err) {
      console.error("Failed to toggle sale:", err);
      toast.error("Failed to update status. Please try again.");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone.",
      )
    ) {
      return;
    }
    try {
      setIsActionLoading(true);
      const loadingToast = toast.loading("Deleting product...");
      await deleteProduct(productId);
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
      if (previewProduct && previewProduct.id === productId) {
        setPreviewProduct(null);
      }
      toast.success("Product deleted successfully!", { id: loadingToast });
      loadProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete all ${selectedProducts.length} selected products? This will delete them permanently.`,
      )
    ) {
      return;
    }
    try {
      setIsActionLoading(true);
      const loadingToast = toast.loading(
        `Deleting ${selectedProducts.length} products...`,
      );
      await Promise.all(selectedProducts.map((id) => deleteProduct(id)));
      setSelectedProducts([]);
      setPreviewProduct(null);
      toast.success("Selected products deleted successfully!", {
        id: loadingToast,
      });
      loadProducts();
    } catch (err) {
      console.error("Failed bulk deletion:", err);
      toast.error(
        "An error occurred during deletion. Some items may not have been deleted.",
      );
    } finally {
      setIsActionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div className="h-10 w-48 bg-slate-100 rounded-xl animate-pulse" />
        <div className="h-64 w-full bg-slate-50 rounded-[32px] animate-pulse" />
      </div>
    );
  }

  const totalPages = Math.ceil(totalCount / 10) || 1;

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
                {products.length} Items
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
              {["All", ...dbCategories.map((c) => c.name)].map((c) => (
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
              {dbBrands.map((b) => (
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
            <button
              onClick={handleBulkDelete}
              disabled={isActionLoading}
              className="text-sm font-black text-white hover:underline flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
            >
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
                  {filteredProducts.map((p, idx) => {
                    const price = p.variants?.[0]?.price || p.price || 0;
                    const discountPrice =
                      p.variants?.[0]?.discount_price ||
                      p.variants?.[0]?.discountPrice ||
                      p.discountPrice ||
                      null;
                    const totalStock =
                      p.variants?.reduce(
                        (acc, v) => acc + Number(v.stock || 0),
                        0,
                      ) ??
                      p.stock ??
                      0;
                    const categoryName =
                      p.category?.name || p.category_id || "Streetwear";
                    const imageUrl =
                      p.thumbnail ||
                      p.image_urls[0] ||
                      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80";

                    return (
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
                                src={imageUrl}
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
                                  {p.brand || "StoreX"}
                                </span>
                                <span className="text-[10px] font-bold text-blue-500 px-1.5 py-0.5 bg-blue-50 rounded uppercase">
                                  {categoryName}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-base font-black text-slate-900">
                              ₹{discountPrice || price}
                            </p>
                            {discountPrice && (
                              <p className="text-[11px] text-slate-400 line-through font-bold">
                                ₹{price}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${totalStock > 10 ? "bg-emerald-500" : totalStock > 0 ? "bg-amber-500" : "bg-red-500"}`}
                              />
                              <span className="text-[13px] font-bold text-slate-700">
                                {totalStock} units
                              </span>
                            </div>
                            <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${totalStock > 10 ? "bg-emerald-500" : totalStock > 0 ? "bg-amber-500" : "bg-red-500"}`}
                                style={{
                                  width: `${Math.min(totalStock, 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            <VisibilityToggle
                              isVisible={p.is_visible}
                              onToggle={() =>
                                handleToggleVisibility(p.id, p.is_visible)
                              }
                            />
                            {p.is_featured && (
                              <StatusBadge label="Featured" variant="amber" />
                            )}
                            {p.is_sale && (
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
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              disabled={isActionLoading}
                              className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-red-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center shadow-sm disabled:opacity-50 disabled:pointer-events-none"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
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
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map((p, idx) => {
              const price = p.variants?.[0]?.price || p.price || 0;
              const discountPrice =
                p.variants?.[0]?.discount_price ||
                p.variants?.[0]?.discountPrice ||
                p.discountPrice ||
                null;
              const totalStock =
                p.variants?.reduce((acc, v) => acc + Number(v.stock || 0), 0) ??
                p.stock ??
                0;
              const categoryName =
                p.category?.name || p.category_id || "Streetwear";
              const imageUrl =
                p.thumbnail ||
                p.image_urls[0] ||
                "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80";

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-[32px] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden group hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500"
                >
                  <div className="relative aspect-4/5 overflow-hidden">
                    <img
                      src={imageUrl}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt=""
                    />
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                      <div className="flex flex-col gap-2">
                        {p.is_featured && (
                          <StatusBadge label="Featured" variant="amber" />
                        )}
                        {p.is_sale && (
                          <StatusBadge label="Sale" variant="emerald" />
                        )}
                      </div>
                      <div className="pointer-events-auto">
                        <VisibilityToggle
                          isVisible={p.is_visible}
                          onToggle={() =>
                            handleToggleVisibility(p.id, p.is_visible)
                          }
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
                          onClick={() =>
                            navigate(`/admin/edit-product/${p.id}`)
                          }
                          className="w-9 h-9 rounded-xl bg-white hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          disabled={isActionLoading}
                          className="w-9 h-9 rounded-xl bg-white hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-sm disabled:opacity-50 disabled:pointer-events-none"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">
                        {categoryName}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star
                          size={10}
                          className="fill-amber-400 text-amber-400"
                        />
                        <span className="text-[11px] font-bold text-slate-500">
                          {p.rating || 0}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-black text-slate-800 leading-tight truncate">
                      {p.name}
                    </h3>

                    <div className="flex items-end justify-between pt-2">
                      <div>
                        <p className="text-xl font-black text-slate-900">
                          ₹{discountPrice || price}
                        </p>
                        {discountPrice && (
                          <p className="text-[11px] text-slate-400 line-through font-bold">
                            ₹{price}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-[10px] font-black uppercase tracking-wider ${totalStock > 0 ? "text-emerald-500" : "text-red-500"}`}
                        >
                          {totalStock > 0
                            ? `${totalStock} In Stock`
                            : "Out of Stock"}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Unified Pagination */}
      <div className="mt-8 px-6 py-6 bg-white rounded-[32px] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Showing {totalCount > 0 ? (currentPage - 1) * 10 + 1 : 0} to{" "}
          {Math.min(currentPage * 10, totalCount)} of {totalCount} results
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shadow-lg transition-all ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white shadow-blue-500/20"
                      : "border border-slate-200 text-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {pageNum}
                </button>
              ),
            )}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* ── Quick Preview Drawer ── */}
      <AnimatePresence>
        {previewProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewProduct(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-60"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-70 shadow-2xl overflow-y-auto"
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
                {(() => {
                  const price =
                    previewProduct.variants?.[0]?.price ||
                    previewProduct.price ||
                    0;
                  const discountPrice =
                    previewProduct.variants?.[0]?.discount_price ||
                    previewProduct.variants?.[0]?.discountPrice ||
                    previewProduct.discountPrice ||
                    null;
                  const totalStock =
                    previewProduct.variants?.reduce(
                      (acc, v) => acc + Number(v.stock || 0),
                      0,
                    ) ??
                    previewProduct.stock ??
                    0;
                  const categoryName =
                    previewProduct.category?.name ||
                    previewProduct.category_id ||
                    "Streetwear";
                  const imageUrl =
                    previewProduct.thumbnail ||
                    previewProduct.image_urls[0] ||
                    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80";

                  return (
                    <>
                      <div className="aspect-4/5 rounded-[40px] overflow-hidden border border-slate-100 shadow-lg relative group">
                        <img
                          src={imageUrl}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                          {previewProduct.is_featured && (
                            <StatusBadge label="Featured" variant="amber" />
                          )}
                          {previewProduct.is_sale && (
                            <StatusBadge label="Sale" variant="emerald" />
                          )}
                        </div>
                      </div>

                      {/* Product Core Info */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-blue-600 uppercase tracking-widest">
                            {previewProduct.brand || "StoreX"}
                          </span>
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-xl border border-slate-100">
                            <Star
                              size={14}
                              className="fill-amber-400 text-amber-400"
                            />
                            <span className="text-sm font-black text-slate-700">
                              {previewProduct.rating || 0}
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
                              {categoryName}
                            </p>
                          </div>
                          <div className="px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                              Gender
                            </p>
                            <p className="text-sm font-bold text-slate-800 capitalize">
                              {previewProduct.gender || "Unisex"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="h-px bg-slate-100" />

                      {/* Detailed Stats Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                          <IndianRupee
                            className="text-blue-500 mb-3"
                            size={20}
                          />
                          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                            Base Price
                          </p>
                          <p className="text-xl font-black text-slate-900">
                            ₹{discountPrice || price}
                          </p>
                          {discountPrice && (
                            <p className="text-[11px] text-slate-400 line-through font-bold">
                              ₹{price}
                            </p>
                          )}
                        </div>
                        <div className="p-5 bg-emerald-50/50 rounded-3xl border border-emerald-100">
                          <Tag className="text-emerald-500 mb-3" size={20} />
                          <p className="text-[11px] font-black text-emerald-600 uppercase tracking-widest">
                            Stock Level
                          </p>
                          <p className="text-xl font-black text-emerald-900">
                            {totalStock} Units
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
                            isVisible={previewProduct.is_visible}
                            onToggle={() =>
                              handleToggleVisibility(
                                previewProduct.id,
                                previewProduct.is_visible,
                              )
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-3">
                            <Star className="text-slate-400" size={18} />
                            <span className="text-sm font-bold text-slate-700">
                              Featured Product
                            </span>
                          </div>
                          <VisibilityToggle
                            isVisible={previewProduct.is_featured}
                            onToggle={() =>
                              handleToggleFeatured(
                                previewProduct.id,
                                previewProduct.is_featured,
                              )
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-3">
                            <Tag className="text-slate-400" size={18} />
                            <span className="text-sm font-bold text-slate-700">
                              On Sale Status
                            </span>
                          </div>
                          <VisibilityToggle
                            isVisible={previewProduct.is_sale}
                            onToggle={() =>
                              handleToggleSale(
                                previewProduct.id,
                                previewProduct.is_sale,
                              )
                            }
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3 pt-4">
                        <button
                          onClick={() => {
                            setPreviewProduct(null);
                            navigate(
                              `/admin/edit-product/${previewProduct.id}`,
                            );
                          }}
                          className="w-full h-14 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                        >
                          <Edit3 size={18} /> Full Product Edit
                        </button>
                        <button
                          onClick={() => {
                            setPreviewProduct(null);
                            navigate(
                              `/products/${previewProduct.slug || previewProduct.id}`,
                            );
                          }}
                          className="w-full h-14 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                          <ExternalLink size={18} /> View on Website
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;
