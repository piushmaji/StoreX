import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import {
  Upload, X, ChevronDown, Save, ArrowLeft,
  Package, Tag, DollarSign, Layers, FileText,
  ToggleLeft, ToggleRight, CheckCircle2, AlertCircle,
  Image as ImageIcon, Plus, Trash2, Star, RefreshCw,
  History, Eye, EyeOff, AlertTriangle
} from "lucide-react"
import { useProduct } from "../../context/admin/ProductContext"

// ─── Helpers ──────────────────────────────────────────────────
const inputCls = (hasError) =>
  `w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-700 placeholder-slate-400
     focus:outline-none focus:bg-white transition-all duration-200
     ${hasError
    ? "border-red-300 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.08)]"
    : "border-slate-200 focus:border-blue-300 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"}`

const FIELD_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.28, ease: [0.22, 1, 0.36, 1] } })
}

// ─── Field Wrapper ────────────────────────────────────────────
const Field = ({ label, icon: Icon, error, children, index = 0, required, changed }) => (
  <motion.div custom={index} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="space-y-1.5">
    <div className="flex items-center justify-between">
      <label className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">
        {Icon && <Icon size={10} className="text-blue-400" />}
        {label}
        {required && <span className="text-blue-500">*</span>}
      </label>
      <AnimatePresence>
        {changed && (
          <motion.span initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            className="text-[9px] font-bold text-amber-500 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-md">
            Modified
          </motion.span>
        )}
      </AnimatePresence>
    </div>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="flex items-center gap-1 text-[11px] text-red-500 font-medium">
          <AlertCircle size={10} /> {error}
        </motion.p>
      )}
    </AnimatePresence>
  </motion.div>
)

// ─── Image Manager ────────────────────────────────────────────
const ImageManager = ({ images, onAdd, onRemove, onSetMain, error }) => {
  const inputRef = useRef()

  const processFiles = (files) => {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith("image/")) return
      const url = URL.createObjectURL(file)
      onAdd({ file, preview: url, name: file.name, isNew: true })
    })
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {images.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-3 gap-2.5">
            {images.map((img, i) => (
              <motion.div key={img.preview || img.url}
                initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }} transition={{ duration: 0.18 }}
                onClick={() => onSetMain(i)}
                className={`relative group aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200
                  ${i === 0 ? "border-blue-500 shadow-md shadow-blue-500/20" : "border-slate-200 hover:border-blue-300"}`}
              >
                <img src={img.preview || img.url} alt="" className="w-full h-full object-cover" />

                {i === 0 && (
                  <div className="absolute top-1.5 left-1.5 bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                    <Star size={7} fill="white" /> Main
                  </div>
                )}

                {img.isNew && (
                  <div className="absolute top-1.5 right-6 bg-emerald-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md">New</div>
                )}

                <button onClick={e => { e.stopPropagation(); onRemove(i) }}
                  className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-500 text-white rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md">
                  <X size={9} strokeWidth={3} />
                </button>

                {i !== 0 && (
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-all flex items-end justify-center pb-1.5 rounded-xl">
                    <span className="text-[8px] font-bold text-blue-600 bg-white/90 px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-all">
                      Set as main
                    </span>
                  </div>
                )}
              </motion.div>
            ))}

            <motion.div onClick={() => inputRef.current?.click()}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="aspect-square rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 bg-slate-50 hover:bg-blue-50/40 flex flex-col items-center justify-center cursor-pointer transition-all gap-1">
              <Plus size={16} className="text-slate-300" />
              <span className="text-[9px] text-slate-400 font-semibold">Add</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {images.length === 0 && (
        <div onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200
            ${error ? "border-red-300 bg-red-50/30" : "border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:bg-blue-50/40"}`}
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 mx-auto mb-2 flex items-center justify-center">
            <Upload size={16} className="text-slate-400" />
          </div>
          <p className="text-xs font-bold text-slate-500">Click to upload images</p>
          <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, WEBP · Max 5MB each</p>
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => processFiles(e.target.files)} />

      {error && <p className="flex items-center gap-1 text-[11px] text-red-500 font-medium"><AlertCircle size={10} />{error}</p>}
      {images.length > 0 && (
        <p className="text-[10px] text-slate-400">
          Click any image to <span className="text-blue-500 font-semibold">set as main</span>. Drag to reorder coming soon.
        </p>
      )}
    </div>
  )
}

// ─── Discard Confirm Modal ────────────────────────────────────
const DiscardModal = ({ onConfirm, onClose }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onClick={e => e.stopPropagation()}
      className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
        <AlertTriangle size={20} className="text-amber-500" />
      </div>
      <h3 className="text-lg font-black text-slate-800">Discard Changes?</h3>
      <p className="text-sm text-slate-400 mt-1 mb-5">All unsaved edits will be lost. This action cannot be undone.</p>
      <div className="flex gap-2">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-all">
          Keep Editing
        </button>
        <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-all shadow-md shadow-amber-500/25">
          Discard
        </button>
      </div>
    </motion.div>
  </motion.div>
)

// ─── Success Toast ────────────────────────────────────────────
const SuccessToast = ({ onClose }) => (
  <motion.div initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 12, scale: 0.95 }}
    className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-emerald-200 px-5 py-4 rounded-2xl shadow-xl shadow-emerald-500/10"
    style={{ fontFamily: "'Sora', sans-serif" }}
  >
    <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
      <CheckCircle2 size={18} className="text-emerald-500" />
    </div>
    <div>
      <p className="text-sm font-bold text-slate-800">Changes Saved!</p>
      <p className="text-xs text-slate-400">Product updated successfully.</p>
    </div>
    <button onClick={onClose} className="ml-2 text-slate-300 hover:text-slate-500 transition-colors"><X size={14} /></button>
  </motion.div>
)

// ─── Main Page ────────────────────────────────────────────────
const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, categories, updateProduct } = useProduct()

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showDiscard, setShowDiscard] = useState(false)
  const [images, setImages] = useState([])   // { url?, preview, file?, name?, isNew }
  const [original, setOriginal] = useState(null)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    name: "", description: "", price: "",
    category_id: "", stock: "", is_visible: true,
  })

  // ── Resolve product from context (no extra fetch needed) ──
  useEffect(() => {
    if (products.length === 0) return  // still loading from context

    const data = products.find(p => p.id === id)
    if (!data) {
      navigate("/admin/products")
      return
    }

    const loaded = {
      name: data.name || "",
      description: data.description || "",
      price: String(data.price || ""),
      category_id: data.category_id || "",
      stock: String(data.stock || ""),
      is_visible: data.is_visible ?? true,
    }

    setForm(loaded)
    setOriginal(loaded)

    // Convert existing image_urls array → image objects
    if (data.image_urls?.length) {
      setImages(data.image_urls.map(url => ({ url, preview: url, isNew: false })))
    }

    setFetching(false)
  }, [id, products])

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: "" }))
  }

  const isChanged = (key) => original && form[key] !== original[key]
  const hasAnyChange = original && (
    Object.keys(form).some(k => form[k] !== original[k]) ||
    images.some(img => img.isNew) ||
    // also detect removed images
    images.filter(i => !i.isNew).length !== (original ? products.find(p => p.id === id)?.image_urls?.length ?? 0 : 0)
  )

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = "Product name is required"
    if (!form.description.trim()) e.description = "Description is required"
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = "Enter a valid price"
    if (!form.category_id) e.category_id = "Please select a category"
    if (form.stock === "" || isNaN(form.stock) || Number(form.stock) < 0) e.stock = "Enter valid stock quantity"
    if (images.length === 0) e.images = "At least one product image is required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      // Separate kept existing URLs from new files
      const keptUrls = images.filter(img => !img.isNew).map(img => img.url)
      const newFiles = images.filter(img => img.isNew).map(img => img.file)

      await updateProduct(id, {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        category_id: form.category_id,
        stock: Number(form.stock),
        is_visible: form.is_visible,
        image_urls: keptUrls,   // context merges new uploads on top
      }, newFiles)

      setOriginal({ ...form })
      setImages(prev => prev.map(img => ({ ...img, isNew: false })))
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (err) {
      setErrors(e => ({ ...e, submit: err.message }))
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    if (!original) return
    setForm({ ...original })
    setErrors({})
    // Remove newly added images, keep originals
    setImages(prev => prev.filter(img => !img.isNew))
  }

  const handleBack = () => {
    if (hasAnyChange) setShowDiscard(true)
    else navigate("/admin/products")
  }

  // ── Loading skeleton ──
  if (fetching) return (
    <div className="min-h-screen bg-slate-50/50 p-6 flex items-center justify-center" style={{ fontFamily: "'Sora', sans-serif" }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm font-semibold">Loading product...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50/50 p-6" style={{ fontFamily: "'Sora', sans-serif" }}>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={handleBack}
              className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:border-blue-300 text-slate-500 hover:text-blue-600 flex items-center justify-center shadow-sm transition-all shrink-0">
              <ArrowLeft size={16} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Edit Product</h1>
                <AnimatePresence>
                  {hasAnyChange && (
                    <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="text-[9px] font-extrabold bg-amber-100 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Unsaved
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <p className="text-slate-400 text-sm mt-0.5 truncate max-w-xs">{original?.name || `Product #${id}`}</p>
            </div>
          </div>

          {/* Visibility toggle — desktop */}
          <div className="hidden sm:flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-sm shrink-0">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5 justify-end">
                {form.is_visible ? <Eye size={12} className="text-emerald-500" /> : <EyeOff size={12} className="text-slate-400" />}
                {form.is_visible ? "Visible" : "Hidden"}
              </p>
              <p className="text-[10px] text-slate-400">{form.is_visible ? "Shown in store" : "Not visible"}</p>
            </div>
            <button onClick={() => set("is_visible", !form.is_visible)} className="transition-all shrink-0">
              {form.is_visible
                ? <ToggleRight size={30} className="text-blue-600" />
                : <ToggleLeft size={30} className="text-slate-300" />
              }
            </button>
          </div>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Left: Images + Status ── */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-4">

            {/* Image card */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
              <div className="h-[2.5px] w-full bg-gradient-to-r from-blue-600 via-blue-400 to-sky-300 rounded-full mb-5" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                    <ImageIcon size={13} className="text-blue-600" />
                  </div>
                  <h2 className="text-sm font-extrabold text-slate-700">Product Images</h2>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg">
                  {images.length} photo{images.length !== 1 ? "s" : ""}
                </span>
              </div>

              <ImageManager
                images={images}
                onAdd={(img) => setImages(prev => [...prev, img])}
                onRemove={(i) => setImages(prev => prev.filter((_, idx) => idx !== i))}
                onSetMain={(i) => setImages(prev => {
                  const arr = [...prev]
                  const [item] = arr.splice(i, 1)
                  arr.unshift(item)
                  return arr
                })}
                error={errors.images}
              />
            </div>

            {/* Visibility — mobile */}
            <div className="sm:hidden bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-700">Store Visibility</p>
                <p className="text-xs text-slate-400">{form.is_visible ? "Visible to customers" : "Hidden from store"}</p>
              </div>
              <button onClick={() => set("is_visible", !form.is_visible)}>
                {form.is_visible
                  ? <ToggleRight size={28} className="text-blue-600" />
                  : <ToggleLeft size={28} className="text-slate-300" />
                }
              </button>
            </div>

            {/* Unsaved change summary */}
            <AnimatePresence>
              {hasAnyChange && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <History size={13} className="text-amber-500" />
                    <p className="text-[10px] font-extrabold text-amber-600 uppercase tracking-widest">Unsaved Changes</p>
                  </div>
                  <ul className="space-y-1">
                    {Object.keys(form).filter(k => isChanged(k)).map(k => (
                      <li key={k} className="text-[11px] text-amber-700 font-medium capitalize flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                        {k === "category_id" ? "category" : k === "is_visible" ? "visibility" : k} updated
                      </li>
                    ))}
                    {images.some(i => i.isNew) && (
                      <li className="text-[11px] text-amber-700 font-medium flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                        New images added
                      </li>
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3">

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 space-y-5">
              <div className="h-[2.5px] w-full bg-gradient-to-r from-blue-600 via-blue-400 to-sky-300 rounded-full" />

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Package size={13} className="text-blue-600" />
                </div>
                <h2 className="text-sm font-extrabold text-slate-700">Product Details</h2>
              </div>

              {/* Name */}
              <Field label="Product Name" icon={Package} error={errors.name} index={0} required changed={isChanged("name")}>
                <input value={form.name} onChange={e => set("name", e.target.value)}
                  placeholder="e.g. Nike Air Max 270" className={inputCls(errors.name)} />
              </Field>

              {/* Description */}
              <Field label="Description" icon={FileText} error={errors.description} index={1} required changed={isChanged("description")}>
                <textarea value={form.description} onChange={e => set("description", e.target.value)}
                  placeholder="Describe the product — features, material, use cases..."
                  rows={4} className={inputCls(errors.description) + " resize-none leading-relaxed"} />
                <p className="text-right text-[10px] text-slate-300 font-medium">{form.description.length} chars</p>
              </Field>

              {/* Price + Stock */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Price (₹)" icon={DollarSign} error={errors.price} index={2} required changed={isChanged("price")}>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">₹</span>
                    <input type="number" value={form.price} onChange={e => set("price", e.target.value)}
                      placeholder="0.00" className={inputCls(errors.price) + " pl-8"} />
                  </div>
                </Field>

                <Field label="Stock Qty" icon={Layers} error={errors.stock} index={3} required changed={isChanged("stock")}>
                  <input type="number" value={form.stock} onChange={e => set("stock", e.target.value)}
                    placeholder="0" className={inputCls(errors.stock)} />
                  {form.stock !== "" && !isNaN(form.stock) && (
                    <div className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border mt-1
                      ${Number(form.stock) === 0 ? "bg-red-50 text-red-500 border-red-200"
                        : Number(form.stock) <= 10 ? "bg-amber-50 text-amber-600 border-amber-200"
                          : "bg-emerald-50 text-emerald-600 border-emerald-200"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full
                        ${Number(form.stock) === 0 ? "bg-red-400"
                          : Number(form.stock) <= 10 ? "bg-amber-400" : "bg-emerald-500"}`} />
                      {Number(form.stock) === 0 ? "Out of Stock" : Number(form.stock) <= 10 ? "Low Stock" : "In Stock"}
                    </div>
                  )}
                </Field>
              </div>

              {/* Category — dropdown */}
              <Field label="Category" icon={Tag} error={errors.category_id} index={4} required changed={isChanged("category_id")}>
                <div className="relative">
                  <select value={form.category_id} onChange={e => set("category_id", e.target.value)}
                    className={inputCls(errors.category_id) + " appearance-none pr-10"}>
                    <option value="">Select a category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </Field>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2 -mt-2">
                {categories.map(c => (
                  <button key={c.id} type="button" onClick={() => set("category_id", c.id)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all duration-150
                      ${form.category_id === c.id
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-200 hover:text-blue-600"
                      }`}>
                    {c.name}
                  </button>
                ))}
              </div>

              {/* Submit error */}
              <AnimatePresence>
                {errors.submit && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-4 py-3 rounded-xl">
                    <AlertCircle size={14} /> {errors.submit}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Before → After comparison */}
              <AnimatePresence>
                {hasAnyChange && original && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 rounded-2xl p-4">
                      <p className="text-[9px] font-extrabold text-blue-400 uppercase tracking-widest mb-3">Before → After</p>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        {[
                          { key: "name", label: "Name" },
                          { key: "price", label: "Price", prefix: "₹" },
                          { key: "stock", label: "Stock" },
                          {
                            key: "category_id", label: "Category",
                            display: (val) => categories.find(c => c.id === val)?.name || val
                          },
                        ].filter(({ key }) => isChanged(key)).map(({ key, label, prefix = "", display }) => (
                          <div key={key} className="bg-white rounded-xl p-2.5 border border-blue-100">
                            <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
                            <p className="text-slate-400 line-through text-[11px]">
                              {prefix}{display ? display(original[key]) : original[key]}
                            </p>
                            <p className="text-blue-600 font-bold text-[11px]">
                              {prefix}{display ? display(form[key]) : form[key]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action buttons */}
              <div className="flex gap-3 pt-1">
                <button onClick={handleReset} disabled={!hasAnyChange}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-500 text-sm font-semibold hover:border-amber-200 hover:text-amber-500 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  <RefreshCw size={14} /> Revert
                </button>

                <motion.button onClick={handleSave} disabled={loading || !hasAnyChange}
                  whileHover={{ scale: (loading || !hasAnyChange) ? 1 : 1.01 }}
                  whileTap={{ scale: (loading || !hasAnyChange) ? 1 : 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold transition-all shadow-lg shadow-blue-500/25">
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                  ) : (
                    <><Save size={15} /> Save Changes</>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Modals & Toasts ── */}
      <AnimatePresence>
        {showDiscard && <DiscardModal onClose={() => setShowDiscard(false)} onConfirm={() => navigate("/admin/products")} />}
      </AnimatePresence>
      <AnimatePresence>
        {showSuccess && <SuccessToast onClose={() => setShowSuccess(false)} />}
      </AnimatePresence>
    </div>
  )
}

export default EditProduct