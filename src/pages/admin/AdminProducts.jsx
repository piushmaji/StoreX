import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, Filter, Plus, Edit2, Trash2, Eye, EyeOff,
  ChevronLeft, ChevronRight, ArrowUpDown, ChevronDown, ChevronUp,
  X, Package,  Image as ImageIcon,Grid, List,Upload, Save, 
} from "lucide-react"
import { useProduct } from "../../context/admin/ProductContext"
import { useNavigate } from "react-router-dom"

let PAGE_SIZE = 10

// ─── Stock Status Helper ──────────────────────────────────────
const STOCK_STATUS = (stock) => {
  if (stock === 0) return { bg: "bg-red-50", text: "text-red-500", border: "border-red-200", dot: "bg-red-400" }
  if (stock <= 10) return { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", dot: "bg-amber-400" }
  return { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", dot: "bg-emerald-400" }
}

// ─── Delete Confirm Modal ─────────────────────────────────────
const DeleteModal = ({ product, onConfirm, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onClick={e => e.stopPropagation()}
      className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl"
    >
      <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
        <Trash2 size={20} className="text-red-500" />
      </div>
      <h3 className="text-lg font-black text-slate-800">Delete Product?</h3>
      <p className="text-sm text-slate-400 mt-1 mb-5">
        <span className="font-semibold text-slate-600">"{product?.name}"</span> will be permanently removed from your store.
      </p>
      <div className="flex gap-2">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-all">
          Cancel
        </button>
        <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all shadow-md shadow-red-500/25">
          Delete
        </button>
      </div>
    </motion.div>
  </motion.div>
)

// ─── Add / Edit Modal ─────────────────────────────────────────
const ProductModal = ({ product, categories, onClose, onSave }) => {
  const isEdit = !!product?.id
  const [form, setForm] = useState(product || {
    name: "", category_id: categories[0]?.id || "", price: "", stock: "",
    description: "", image_urls: [], is_visible: true
  })
  const [files, setFiles] = useState([])
  const [imgPreviews, setImgPreviews] = useState(form.image_urls || [])
  const [loading, setLoading] = useState(false)

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files || [])
    if (!selected.length) return
    setFiles(selected)
    const previews = selected.map(f => URL.createObjectURL(f))
    setImgPreviews(previews)
  }

  const handleSubmit = async () => {
    if (!form.name || !form.price) return
    setLoading(true)
    try {
      await onSave(form, files)
    } finally {
      setLoading(false)
    }
  }
}

// ─── Product Card (Grid View) ─────────────────────────────────
const ProductCard = ({ product, categoryName, onEdit, onDelete, onToggleVisibility }) => {
  const stock = STOCK_STATUS(product.stock)
  const firstImage = product.image_urls?.[0] || null

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-md hover:border-blue-100 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative h-44 bg-slate-50 overflow-hidden">
        {firstImage
          ? <img src={firstImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          : <div className="w-full h-full flex items-center justify-center"><Package size={32} className="text-slate-200" /></div>
        }
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2">
          <button onClick={() => onEdit(product)} className="w-9 h-9 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-md hover:bg-blue-50 transition-colors">
            <Edit2 size={14} />
          </button>
          <button onClick={() => onDelete(product)} className="w-9 h-9 rounded-xl bg-white text-red-500 flex items-center justify-center shadow-md hover:bg-red-50 transition-colors">
            <Trash2 size={14} />
          </button>
          <button onClick={() => onToggleVisibility(product.id, product.is_visible)} className="w-9 h-9 rounded-xl bg-white text-slate-600 flex items-center justify-center shadow-md hover:bg-slate-50 transition-colors">
            {product.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>
        </div>

        {/* Visibility badge */}
        {!product.is_visible && (
          <div className="absolute top-2.5 left-2.5 bg-slate-800/70 text-white text-[9px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 backdrop-blur-sm">
            <EyeOff size={9} /> Hidden
          </div>
        )}

        {/* Category */}
        {categoryName && (
          <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm text-blue-600 text-[9px] font-extrabold px-2 py-1 rounded-lg border border-blue-100">
            {categoryName}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="font-bold text-slate-800 text-sm truncate">{product.name}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-base font-black text-blue-600">₹{Number(product.price).toLocaleString()}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${stock.bg} ${stock.text} ${stock.border} flex items-center gap-1`}>
            <span className={`w-1.5 h-1.5 rounded-full ${stock.dot}`} />
            {product.stock > 0 ? `${product.stock} left` : "Out"}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
          <span className="text-[10px] text-slate-400 font-medium">{product.sales ?? 0} sold</span>
          <span className="text-[10px] text-amber-500 font-bold">★ {product.rating ?? "—"}</span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────
const AdminProducts = () => {
  const { products, categories, addProduct, deleteProduct, toggleVisibility } = useProduct()

  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")
  const [visibilityFilter, setVisibilityFilter] = useState("all")
  const [sortField, setSortField] = useState("created_at")
  const [sortDir, setSortDir] = useState("desc")
  const [page, setPage] = useState(1)
  const [viewMode, setViewMode] = useState("grid")
  const [filterOpen, setFilterOpen] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const navigate = useNavigate()

  // Map category id → name
  const categoryMap = useMemo(() => {
    const m = {}
    categories.forEach(c => { m[c.id] = c.name })
    return m
  }, [categories])

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc")
    else { setSortField(field); setSortDir("desc") }
  }

  const handleSave = async (form, files) => {
    if (form.id) {
      // edit — extend as needed via context
      // For now just close (add updateProduct to context if needed)
    } else {
      await addProduct(
        {
          name: form.name,
          category_id: form.category_id,
          price: Number(form.price),
          stock: Number(form.stock),
          description: form.description,
          is_visible: form.is_visible,
        },
        files
      )
    }
    setEditProduct(null)
  }

  const handleDelete = async () => {
    await deleteProduct(deleteTarget.id)
    setDeleteTarget(null)
  }

  const filtered = useMemo(() => {
    let data = [...products]
    if (search) data = data.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (categoryMap[p.category_id] || "").toLowerCase().includes(search.toLowerCase())
    )
    if (categoryFilter !== "all") data = data.filter(p => p.category_id === categoryFilter)
    if (stockFilter === "out") data = data.filter(p => p.stock === 0)
    if (stockFilter === "low") data = data.filter(p => p.stock > 0 && p.stock <= 10)
    if (stockFilter === "in") data = data.filter(p => p.stock > 10)
    if (visibilityFilter === "visible") data = data.filter(p => p.is_visible)
    if (visibilityFilter === "hidden") data = data.filter(p => !p.is_visible)
    data.sort((a, b) => {
      let va = a[sortField], vb = b[sortField]
      if (typeof va === "string") { va = va.toLowerCase(); vb = (vb || "").toLowerCase() }
      if (va < vb) return sortDir === "asc" ? -1 : 1
      if (va > vb) return sortDir === "asc" ? 1 : -1
      return 0
    })
    return data
  }, [products, search, categoryFilter, stockFilter, visibilityFilter, sortField, sortDir, categoryMap])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const SortIcon = ({ field }) => (
    <span className={`ml-1 ${sortField === field ? "text-blue-600" : "text-slate-300"}`}>
      {sortField === field ? sortDir === "asc" ? <ChevronUp size={13} /> : <ChevronDown size={13} /> : <ArrowUpDown size={12} />}
    </span>
  )

  const activeFilters = [categoryFilter !== "all", stockFilter !== "all", visibilityFilter !== "all"].filter(Boolean).length

  return (
    <div className="p-6 space-y-5">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Products</h1>
          <p className="text-slate-400 text-sm mt-0.5">{filtered.length} products in store</p>
        </div>
        <button
          onClick={() => setEditProduct({})}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-blue-500/25"
        >
          <Plus size={15} /> Add Product
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Products", value: products.length, sub: "in store", color: "from-blue-600 to-blue-500" },
          { label: "In Stock", value: products.filter(p => p.stock > 10).length, sub: "available", color: "from-emerald-500 to-emerald-400" },
          { label: "Low Stock", value: products.filter(p => p.stock > 0 && p.stock <= 10).length, sub: "need restock", color: "from-amber-500 to-amber-400" },
          { label: "Out of Stock", value: products.filter(p => p.stock === 0).length, sub: "unavailable", color: "from-red-500 to-red-400" },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <p className="text-xs font-semibold text-slate-400">{stat.label}</p>
            <p className="text-2xl font-black text-slate-800 mt-0.5">{stat.value}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{stat.sub}</p>
            <div
              className={`mt-2 h-1 rounded-full bg-linear-to-r ${stat.color} opacity-60`}
              style={{ width: products.length > 0 ? `${(stat.value / products.length) * 100}%` : "0%" }}
            />
          </div>
        ))}
      </div>

      {/* ── Search + Filter + View Toggle ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search by product name or category..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-300 focus:bg-white transition-all"
            />
          </div>

          <div className="flex gap-2 shrink-0">
            {/* Filter */}
            <button
              onClick={() => setFilterOpen(o => !o)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${filterOpen ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300"}`}
            >
              <Filter size={14} />
              Filters
              {activeFilters > 0 && <span className="w-4 h-4 rounded-full bg-blue-400 text-white text-[9px] font-black flex items-center justify-center">{activeFilters}</span>}
            </button>

            {/* View toggle */}
            <div className="flex rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
              <button onClick={() => setViewMode("grid")} className={`w-10 h-10 flex items-center justify-center transition-all ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-blue-600"}`}>
                <Grid size={14} />
              </button>
              <button onClick={() => setViewMode("table")} className={`w-10 h-10 flex items-center justify-center transition-all ${viewMode === "table" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-blue-600"}`}>
                <List size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Filters expanded */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-1 space-y-3">
                {/* Category */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest w-16 shrink-0">Category</span>
                  <button
                    onClick={() => { setCategoryFilter("all"); setPage(1) }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${categoryFilter === "all" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-200"}`}
                  >All</button>
                  {categories.map(c => (
                    <button key={c.id} onClick={() => { setCategoryFilter(c.id); setPage(1) }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${categoryFilter === c.id ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-200"}`}>
                      {c.name}
                    </button>
                  ))}
                </div>

                {/* Stock */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest w-16 shrink-0">Stock</span>
                  {[
                    { v: "all", l: "All" },
                    { v: "in", l: "In Stock" },
                    { v: "low", l: "Low Stock" },
                    { v: "out", l: "Out of Stock" },
                  ].map(({ v, l }) => (
                    <button key={v} onClick={() => { setStockFilter(v); setPage(1) }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${stockFilter === v ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-200"}`}>
                      {l}
                    </button>
                  ))}
                </div>

                {/* Visibility */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest w-16 shrink-0">Visible</span>
                  {[{ v: "all", l: "All" }, { v: "visible", l: "Visible" }, { v: "hidden", l: "Hidden" }].map(({ v, l }) => (
                    <button key={v} onClick={() => { setVisibilityFilter(v); setPage(1) }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${visibilityFilter === v ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-200"}`}>
                      {l}
                    </button>
                  ))}
                </div>

                {activeFilters > 0 && (
                  <button onClick={() => { setCategoryFilter("all"); setStockFilter("all"); setVisibilityFilter("all"); setPage(1) }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-500 bg-red-50 border border-red-200 hover:bg-red-100 transition-all">
                    <X size={11} /> Clear all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Grid View ── */}
      {viewMode === "grid" && (
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {paginated.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <Package size={36} className="text-slate-200 mx-auto mb-3" />
                <p className="text-slate-400 font-semibold">No products found</p>
              </div>
            ) : paginated.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                categoryName={categoryMap[product.category_id]}
                onEdit={(product) => navigate(`/admin/edit-product/${product.id}`)}
                onDelete={setDeleteTarget}
                onToggleVisibility={toggleVisibility}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── Table View ── */}
      {viewMode === "table" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  {[
                    { label: "Product", field: "name" },
                    { label: "Category", field: "category_id" },
                    { label: "Price", field: "price" },
                    { label: "Stock", field: "stock" },
                    { label: "Sales", field: "sales" },
                    { label: "Visibility", field: "is_visible" },
                    { label: "Actions", field: null },
                  ].map(col => (
                    <th key={col.label}
                      onClick={() => col.field && handleSort(col.field)}
                      className={`px-4 py-3.5 text-left text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.15em] whitespace-nowrap ${col.field ? "cursor-pointer hover:text-blue-600 transition-colors select-none" : ""}`}
                    >
                      <span className="flex items-center">{col.label}{col.field && <SortIcon field={col.field} />}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence mode="popLayout">
                  {paginated.length === 0 ? (
                    <tr><td colSpan={7} className="py-16 text-center">
                      <Package size={32} className="text-slate-200 mx-auto mb-3" />
                      <p className="text-slate-400 font-semibold text-sm">No products found</p>
                    </td></tr>
                  ) : paginated.map((product, idx) => {
                    const stock = STOCK_STATUS(product.stock)
                    const firstImage = product.image_urls?.[0] || null
                    return (
                      <motion.tr key={product.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="group hover:bg-blue-50/30 transition-colors duration-150"
                      >
                        {/* Product */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                              {firstImage
                                ? <img src={firstImage} className="w-full h-full object-cover" alt={product.name} />
                                : <div className="w-full h-full flex items-center justify-center"><Package size={14} className="text-slate-300" /></div>
                              }
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-700 whitespace-nowrap">{product.name}</p>
                              <p className="text-[10px] text-slate-400">{product.id?.slice(0, 8)}…</p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-3.5">
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                            {categoryMap[product.category_id] || "—"}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="px-4 py-3.5">
                          <span className="text-sm font-black text-slate-800">₹{Number(product.price).toLocaleString()}</span>
                        </td>

                        {/* Stock */}
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${stock.bg} ${stock.text} ${stock.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${stock.dot}`} />
                            {product.stock === 0 ? "Out" : product.stock}
                          </span>
                        </td>

                        {/* Sales */}
                        <td className="px-4 py-3.5">
                          <span className="text-sm font-semibold text-slate-600">{product.sales ?? 0}</span>
                        </td>

                        {/* Visibility */}
                        <td className="px-4 py-3.5">
                          <button onClick={() => toggleVisibility(product.id, product.is_visible)} className="transition-all">
                            {product.is_visible
                              ? <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200"><Eye size={11} /> Visible</span>
                              : <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-400 border border-slate-200"><EyeOff size={11} /> Hidden</span>
                            }
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => navigate(`/admin/edit-product/${product.id}`)} className="w-8 h-8 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-colors">
                              <Edit2 size={13} />
                            </button>
                            <button onClick={() => setDeleteTarget(product)} className="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400 font-medium">
            Showing <span className="font-bold text-slate-600">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}</span> of <span className="font-bold text-slate-600">{filtered.length}</span>
          </p>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="w-8 h-8 rounded-xl border border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:text-blue-600 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce((acc, p, i, arr) => { if (i > 0 && p - arr[i - 1] > 1) acc.push("..."); acc.push(p); return acc }, [])
              .map((p, i) => p === "..." ? (
                <span key={`e-${i}`} className="w-8 text-center text-slate-400 text-xs">…</span>
              ) : (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${page === p ? "bg-blue-600 text-white shadow-md shadow-blue-500/25" : "border border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:text-blue-600"}`}>
                  {p}
                </button>
              ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="w-8 h-8 rounded-xl border border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:text-blue-600 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ── Modals ── */}
      <AnimatePresence>
        {editProduct !== null && (
          <ProductModal
            product={Object.keys(editProduct).length === 0 ? null : editProduct}
            categories={categories}
            onClose={() => setEditProduct(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {deleteTarget && (
          <DeleteModal product={deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminProducts