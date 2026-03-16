import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
    Upload, X, ChevronDown, Save, ArrowLeft,
    Package, Tag, DollarSign, Layers, FileText,
    ToggleLeft, ToggleRight, CheckCircle2, AlertCircle,
    Image as ImageIcon, Plus, Trash2, Star
} from "lucide-react"
import supabase from "../../lib/Supabase/Supabase"

const CATEGORIES = ["Electronics", "Clothing", "Footwear", "Accessories", "Home & Living", "Sports"]

const FIELD_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] } })
}

// ─── Input Component ──────────────────────────────────────────
const Field = ({ label, icon: Icon, error, children, index = 0, required }) => (
    <motion.div custom={index} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">
            {Icon && <Icon size={10} className="text-blue-400" />}
            {label}
            {required && <span className="text-blue-500">*</span>}
        </label>
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

const inputCls = (hasError) =>
    `w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-700 placeholder-slate-400
     focus:outline-none focus:bg-white transition-all duration-200
     ${hasError ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-blue-300 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"}`

// ─── Image Upload Zone ────────────────────────────────────────
const ImageUploader = ({ images, onAdd, onRemove, error }) => {
    const inputRef = useRef()
    const [dragging, setDragging] = useState(false)

    const processFiles = (files) => {
        Array.from(files).forEach(file => {
            if (!file.type.startsWith("image/")) return
            const url = URL.createObjectURL(file)
            onAdd({ file, preview: url, name: file.name })
        })
    }

    return (
        <div className="space-y-3">
            {/* Drop Zone */}
            <div
                onDragOver={e => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); processFiles(e.dataTransfer.files) }}
                onClick={() => inputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200
                    ${dragging ? "border-blue-400 bg-blue-50 scale-[1.01]" : error ? "border-red-300 bg-red-50/30" : "border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:bg-blue-50/40"}`}
            >
                <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => processFiles(e.target.files)} />
                <div className={`w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-colors ${dragging ? "bg-blue-100" : "bg-slate-100"}`}>
                    <Upload size={20} className={dragging ? "text-blue-600" : "text-slate-400"} />
                </div>
                <p className="text-sm font-bold text-slate-600">
                    {dragging ? "Drop to upload" : "Drag & drop images here"}
                </p>
                <p className="text-xs text-slate-400 mt-1">or <span className="text-blue-500 font-semibold">click to browse</span> · PNG, JPG, WEBP up to 5MB each</p>
            </div>

            {/* Previews */}
            <AnimatePresence>
                {images.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {images.map((img, i) => (
                            <motion.div key={img.preview} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.18 }}
                                className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 shadow-sm"
                            >
                                <img src={img.preview} alt={img.name} className="w-full h-full object-cover" />
                                {i === 0 && (
                                    <div className="absolute top-1.5 left-1.5 bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                                        <Star size={7} fill="white" /> Main
                                    </div>
                                )}
                                <button
                                    onClick={e => { e.stopPropagation(); onRemove(i) }}
                                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md"
                                >
                                    <X size={10} strokeWidth={2.5} />
                                </button>
                                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-all rounded-xl" />
                            </motion.div>
                        ))}
                        {/* Add more */}
                        <motion.div onClick={() => inputRef.current?.click()}
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            className="aspect-square rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 bg-slate-50 hover:bg-blue-50/40 flex items-center justify-center cursor-pointer transition-all"
                        >
                            <Plus size={18} className="text-slate-300" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <p className="flex items-center gap-1 text-[11px] text-red-500 font-medium">
                    <AlertCircle size={10} /> {error}
                </p>
            )}
        </div>
    )
}

// ─── Success Toast ────────────────────────────────────────────
const SuccessToast = ({ onClose }) => (
    <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-emerald-200 text-slate-700 px-5 py-4 rounded-2xl shadow-xl shadow-emerald-500/10"
        style={{ fontFamily: "'Sora', sans-serif" }}
    >
        <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
            <CheckCircle2 size={18} className="text-emerald-500" />
        </div>
        <div>
            <p className="text-sm font-bold text-slate-800">Product Added!</p>
            <p className="text-xs text-slate-400">Successfully saved to your store.</p>
        </div>
        <button onClick={onClose} className="ml-2 text-slate-300 hover:text-slate-500 transition-colors">
            <X size={14} />
        </button>
    </motion.div>
)

// ─── Main Page ────────────────────────────────────────────────
const AddProduct = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [images, setImages] = useState([])

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        visible: true,
    })

    const [errors, setErrors] = useState({})

    const set = (key, val) => {
        setForm(f => ({ ...f, [key]: val }))
        if (errors[key]) setErrors(e => ({ ...e, [key]: "" }))
    }

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = "Product name is required"
        if (!form.description.trim()) e.description = "Description is required"
        if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = "Enter a valid price"
        if (!form.category) e.category = "Please select a category"
        if (form.stock === "" || isNaN(form.stock) || Number(form.stock) < 0) e.stock = "Enter valid stock quantity"
        if (images.length === 0) e.images = "Upload at least one product image"
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const uploadImages = async () => {
        const urls = []
        for (const img of images) {
            const fileName = `products/${Date.now()}-${img.name}`
            const { data, error } = await supabase.storage
                .from("product-images")
                .upload(fileName, img.file)
            if (error) throw new Error(error.message)
            const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName)
            urls.push(urlData.publicUrl)
        }
        return urls
    }

    const handleSubmit = async () => {
        if (!validate()) return
        setLoading(true)
        try {
            const imageUrls = await uploadImages()
            const { error } = await supabase.from("products").insert([{
                name: form.name.trim(),
                description: form.description.trim(),
                price: Number(form.price),
                category: form.category,
                stock: Number(form.stock),
                visible: form.visible,
                images: imageUrls,
                created_at: new Date().toISOString(),
            }])
            if (error) throw new Error(error.message)
            setShowSuccess(true)
            setTimeout(() => {
                setShowSuccess(false)
                navigate("/admin/products")
            }, 2000)
        } catch (err) {
            setErrors(e => ({ ...e, submit: err.message }))
        } finally {
            setLoading(false)
        }
    }

    const handleReset = () => {
        setForm({ name: "", description: "", price: "", category: "", stock: "", visible: true })
        setImages([])
        setErrors({})
    }

    return (
        <div className="min-h-screen bg-slate-50/50 p-6" style={{ fontFamily: "'Sora', sans-serif" }}>
            <div className="max-w-4xl mx-auto space-y-6">

                {/* ── Page Header ── */}
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate("/admin/products")}
                            className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:border-blue-300 text-slate-500 hover:text-blue-600 flex items-center justify-center shadow-sm transition-all">
                            <ArrowLeft size={16} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Add New Product</h1>
                            <p className="text-slate-400 text-sm mt-0.5">Fill in the details to list a product in your store</p>
                        </div>
                    </div>

                    {/* Visibility toggle — top right */}
                    <div className="hidden sm:flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-sm">
                        <div className="text-right">
                            <p className="text-xs font-bold text-slate-700">{form.visible ? "Visible" : "Hidden"}</p>
                            <p className="text-[10px] text-slate-400">{form.visible ? "Showing in store" : "Not shown"}</p>
                        </div>
                        <button onClick={() => set("visible", !form.visible)} className="transition-all shrink-0">
                            {form.visible
                                ? <ToggleRight size={30} className="text-blue-600" />
                                : <ToggleLeft size={30} className="text-slate-300" />
                            }
                        </button>
                    </div>
                </motion.div>

                {/* ── Main Grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                    {/* ── Left: Image Upload ── */}
                    <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-2 space-y-4">

                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
                            {/* Top accent */}
                            <div className="h-[2.5px] w-full bg-gradient-to-r from-blue-600 via-blue-400 to-sky-300 rounded-full mb-5" />

                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <ImageIcon size={13} className="text-blue-600" />
                                </div>
                                <h2 className="text-sm font-extrabold text-slate-700">Product Images</h2>
                            </div>

                            <ImageUploader
                                images={images}
                                onAdd={(img) => setImages(prev => [...prev, img])}
                                onRemove={(i) => setImages(prev => prev.filter((_, idx) => idx !== i))}
                                error={errors.images}
                            />

                            <p className="text-[10px] text-slate-400 mt-3 leading-relaxed">
                                First image will be used as the <span className="text-blue-500 font-semibold">main cover</span>. Upload multiple for a gallery.
                            </p>
                        </div>

                        {/* Visibility card (mobile) */}
                        <div className="sm:hidden bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-slate-700">Store Visibility</p>
                                <p className="text-xs text-slate-400">{form.visible ? "Visible to customers" : "Hidden from store"}</p>
                            </div>
                            <button onClick={() => set("visible", !form.visible)}>
                                {form.visible
                                    ? <ToggleRight size={28} className="text-blue-600" />
                                    : <ToggleLeft size={28} className="text-slate-300" />
                                }
                            </button>
                        </div>

                        {/* Tips card */}
                        <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4">
                            <p className="text-[10px] font-extrabold text-blue-500 uppercase tracking-widest mb-2">💡 Tips</p>
                            <ul className="space-y-1.5">
                                {[
                                    "Use square images (1:1) for best results",
                                    "White background photos look cleaner",
                                    "Add 3–5 images for higher conversions",
                                    "Keep description under 200 words",
                                ].map(tip => (
                                    <li key={tip} className="flex items-start gap-1.5 text-[11px] text-blue-600/80 font-medium">
                                        <span className="mt-0.5 shrink-0">•</span> {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* ── Right: Form Fields ── */}
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
                            <Field label="Product Name" icon={Package} error={errors.name} index={0} required>
                                <input
                                    value={form.name}
                                    onChange={e => set("name", e.target.value)}
                                    placeholder="e.g. Nike Air Max 270"
                                    className={inputCls(errors.name)}
                                />
                            </Field>

                            {/* Description */}
                            <Field label="Description" icon={FileText} error={errors.description} index={1} required>
                                <textarea
                                    value={form.description}
                                    onChange={e => set("description", e.target.value)}
                                    placeholder="Describe your product — features, material, use cases..."
                                    rows={4}
                                    className={inputCls(errors.description) + " resize-none leading-relaxed"}
                                />
                                <p className="text-right text-[10px] text-slate-300 font-medium">{form.description.length} / 500</p>
                            </Field>

                            {/* Price + Stock row */}
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Price (₹)" icon={DollarSign} error={errors.price} index={2} required>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">₹</span>
                                        <input
                                            type="number"
                                            value={form.price}
                                            onChange={e => set("price", e.target.value)}
                                            placeholder="0.00"
                                            className={inputCls(errors.price) + " pl-8"}
                                        />
                                    </div>
                                </Field>

                                <Field label="Stock Qty" icon={Layers} error={errors.stock} index={3} required>
                                    <input
                                        type="number"
                                        value={form.stock}
                                        onChange={e => set("stock", e.target.value)}
                                        placeholder="0"
                                        className={inputCls(errors.stock)}
                                    />
                                </Field>
                            </div>

                            {/* Category */}
                            <Field label="Category" icon={Tag} error={errors.category} index={4} required>
                                <div className="relative">
                                    <select
                                        value={form.category}
                                        onChange={e => set("category", e.target.value)}
                                        className={inputCls(errors.category) + " appearance-none pr-10"}
                                    >
                                        <option value="">Select a category</option>
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </Field>

                            {/* Category quick-select pills */}
                            <div className="flex flex-wrap gap-2 -mt-2">
                                {CATEGORIES.map(c => (
                                    <button key={c} type="button"
                                        onClick={() => set("category", c)}
                                        className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all duration-150
                                            ${form.category === c
                                                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                                : "bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-200 hover:text-blue-600"
                                            }`}
                                    >
                                        {c}
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

                            {/* Live preview strip */}
                            <AnimatePresence>
                                {(form.name || form.price || form.category) && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden">
                                        <div className="bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 rounded-2xl p-4">
                                            <p className="text-[9px] font-extrabold text-blue-400 uppercase tracking-widest mb-2">Live Preview</p>
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-blue-100 overflow-hidden shrink-0 flex items-center justify-center">
                                                    {images[0]
                                                        ? <img src={images[0].preview} className="w-full h-full object-cover" />
                                                        : <Package size={16} className="text-blue-300" />
                                                    }
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-slate-800 truncate">{form.name || "Product Name"}</p>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        {form.category && <span className="text-[9px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-md">{form.category}</span>}
                                                        {form.stock && <span className="text-[9px] font-semibold text-slate-400">{form.stock} in stock</span>}
                                                    </div>
                                                </div>
                                                {form.price && (
                                                    <p className="text-base font-black text-blue-600 shrink-0">₹{Number(form.price).toLocaleString()}</p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-1">
                                <button
                                    onClick={handleReset}
                                    className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-500 text-sm font-semibold hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all"
                                >
                                    <Trash2 size={14} /> Reset
                                </button>

                                <motion.button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    whileHover={{ scale: loading ? 1 : 1.01 }}
                                    whileTap={{ scale: loading ? 1 : 0.98 }}
                                    className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold transition-all shadow-lg shadow-blue-500/25"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Saving Product...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={15} />
                                            Add Product to Store
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── Success Toast ── */}
            <AnimatePresence>
                {showSuccess && <SuccessToast onClose={() => setShowSuccess(false)} />}
            </AnimatePresence>
        </div>
    )
}

export default AddProduct