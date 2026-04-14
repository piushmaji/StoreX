import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
    ArrowLeft, Type, AlignLeft, IndianRupee,
    Tag, Percent, Layers, Eye, EyeOff, ChevronDown,
    Plus, X, Image as ImageIcon, Sparkles, Upload, Star,
    AlertCircle, CheckCircle2
} from "lucide-react"
import { useProduct } from "../../context/admin/ProductContext"

// ─── Reusable label ───────────────────────────────────────────
const Label = ({ icon: Icon, text, required }) => (
    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.22em] flex items-center gap-1.5">
        {Icon && <Icon size={9} className="text-blue-400" />}
        {text}
        {required && <span className="text-blue-500">*</span>}
    </label>
)

const inputCls = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-[13.5px] text-slate-700 placeholder-slate-300 focus:outline-none focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all duration-200"

// ─── Main ─────────────────────────────────────────────────────
const AddProduct = () => {
    const navigate = useNavigate()
    const { addProduct,categories } = useProduct()
    const fileInputRef = useRef()

    // ── form state ──
    const [visible, setVisible] = useState(true)
    const [category, setCategory] = useState("")
    const [files, setFiles] = useState([])         // File objects
    const [previews, setPreviews] = useState([])   // blob URLs for preview
    const [dragging, setDragging] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState({})

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        discount: "",
        stock: "",
    })

    const set = (key, val) => {
        setForm(f => ({ ...f, [key]: val }))
        if (errors[key]) setErrors(e => ({ ...e, [key]: "" }))
    }

    // ── image handlers ──
    const addFiles = (incoming) => {
        const imageFiles = Array.from(incoming).filter(f => f.type.startsWith("image/"))
        setFiles(prev => [...prev, ...imageFiles])
        setPreviews(prev => [...prev, ...imageFiles.map(f => URL.createObjectURL(f))])
        if (errors.images) setErrors(e => ({ ...e, images: "" }))
    }

    const removeImage = (i) => {
        URL.revokeObjectURL(previews[i])
        setFiles(prev => prev.filter((_, idx) => idx !== i))
        setPreviews(prev => prev.filter((_, idx) => idx !== i))
    }

    const setMain = (i) => {
        setFiles(prev => { const a = [...prev]; const [x] = a.splice(i, 1); a.unshift(x); return a })
        setPreviews(prev => { const a = [...prev]; const [x] = a.splice(i, 1); a.unshift(x); return a })
    }

    // ── validation ──
    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = "Product name is required"
        if (!form.description.trim()) e.description = "Description is required"
        if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = "Enter a valid price"
        if (!category) e.category = "Please select a category"
        if (form.stock === "" || isNaN(form.stock) || Number(form.stock) < 0) e.stock = "Enter a valid stock quantity"
        if (files.length === 0) e.images = "Upload at least one product image"
        if (form.discount && (isNaN(form.discount) || Number(form.discount) >= Number(form.price)))
            e.discount = "Discount price must be less than original price"
        setErrors(e)
        return Object.keys(e).length === 0
    }

    // ── submit ──
    const handleSubmit = async () => {
        if (!validate()) return
        setLoading(true)
        try {
            await addProduct(
                {
                    name: form.name.trim(),
                    description: form.description.trim(),
                    price: Number(form.price),
                    discount_price: form.discount ? Number(form.discount) : null,
                    stock: Number(form.stock),
                    category_id: category,
                    is_visible: visible,
                },
                files   // File[] — ProductContext uploads these to Supabase Storage
            )
            setSuccess(true)
            setTimeout(() => navigate("/admin/products"), 1800)
        } catch (err) {
            setErrors(e => ({ ...e, submit: err.message || "Something went wrong" }))
        } finally {
            setLoading(false)
        }
    }

    const handleReset = () => {
        previews.forEach(url => URL.revokeObjectURL(url))
        setForm({ name: "", description: "", price: "", discount: "", stock: "" })
        setCategory("")
        setFiles([])
        setPreviews([])
        setVisible(true)
        setErrors({})
    }

    return (
        <div
            className="min-h-screen bg-[#f8faff] p-5 md:p-8"
            style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}
        >
            {/* Grid background */}
            <div className="fixed inset-0 pointer-events-none"
                style={{
                    backgroundImage: "radial-linear(circle at 1px 1px, #dbeafe 1px, transparent 0)",
                    backgroundSize: "32px 32px", opacity: 0.45
                }}
            />

            <div className="relative max-w-5xl mx-auto space-y-6">

                {/* ══ HEADER ══ */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center justify-between"
                >
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate("/admin/products")}
                            className="w-10 h-10 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-500 flex items-center justify-center shadow-sm transition-all duration-200 group">
                            <ArrowLeft size={17} className="group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <div>
                            <div className="flex items-center gap-2.5">
                                <h1 className="text-[22px] font-black text-slate-900 tracking-tight">New Product</h1>
                                <div className="flex items-center gap-1 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                                    <Sparkles size={9} className="fill-blue-500" />
                                    <span className="text-[9px] font-extrabold tracking-widest uppercase">Draft</span>
                                </div>
                            </div>
                            <p className="text-slate-400 text-[13px] mt-0.5">Fill in the details below and publish to your store</p>
                        </div>
                    </div>

                    {/* Visibility pill — desktop */}
                    <button onClick={() => setVisible(v => !v)}
                        className={`hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border-2 font-bold text-sm transition-all duration-300
                            ${visible ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-slate-100 border-slate-200 text-slate-500"}`}>
                        <div className={`w-8 h-4 rounded-full relative transition-all duration-300 ${visible ? "bg-emerald-500" : "bg-slate-300"}`}>
                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-all duration-300 ${visible ? "left-4" : "left-0.5"}`} />
                        </div>
                        {visible ? <Eye size={14} /> : <EyeOff size={14} />}
                        {visible ? "Visible" : "Hidden"}
                    </button>
                </motion.div>

                {/* ══ BODY ══ */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* ── LEFT (2/3) ── */}
                    <div className="lg:col-span-2 space-y-5">

                        {/* Card: Basic Info */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] overflow-hidden">
                            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-50">
                                <div className="w-7 h-7 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/30">
                                    <Type size={13} className="text-white" />
                                </div>
                                <span className="text-[13px] font-extrabold text-slate-700">Basic Information</span>
                            </div>

                            <div className="p-6 space-y-5">
                                {/* Name */}
                                <div className="space-y-2">
                                    <Label icon={Type} text="Product Name" required />
                                    <input
                                        value={form.name}
                                        onChange={e => set("name", e.target.value)}
                                        placeholder="e.g. Oversized Cotton Hoodie"
                                        className={`${inputCls} ${errors.name ? "border-red-300 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.08)]" : ""}`}
                                    />
                                    {errors.name && <p className="flex items-center gap-1 text-[11px] text-red-500 font-medium"><AlertCircle size={10} />{errors.name}</p>}
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label icon={AlignLeft} text="Description" required />
                                    <textarea
                                        value={form.description}
                                        onChange={e => set("description", e.target.value)}
                                        placeholder="Describe the product — fabric, fit, styling tips, what makes it special..."
                                        rows={5}
                                        className={`${inputCls} resize-none leading-relaxed ${errors.description ? "border-red-300" : ""}`}
                                    />
                                    <div className="flex items-center justify-between">
                                        {errors.description
                                            ? <p className="flex items-center gap-1 text-[11px] text-red-500 font-medium"><AlertCircle size={10} />{errors.description}</p>
                                            : <span />
                                        }
                                        <p className="text-[10px] text-slate-300 font-semibold">{form.description.length} / 1000</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card: Pricing */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] overflow-hidden">
                            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-50">
                                <div className="w-7 h-7 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/30">
                                    <IndianRupee size={13} className="text-white" />
                                </div>
                                <span className="text-[13px] font-extrabold text-slate-700">Pricing</span>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Original Price */}
                                    <div className="space-y-2">
                                        <Label icon={IndianRupee} text="Original Price" required />
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-black text-slate-400">₹</span>
                                            <input
                                                type="number" min="0"
                                                value={form.price}
                                                onChange={e => set("price", e.target.value)}
                                                placeholder="0.00"
                                                className={`${inputCls} pl-8 ${errors.price ? "border-red-300" : ""}`}
                                            />
                                        </div>
                                        {errors.price && <p className="flex items-center gap-1 text-[11px] text-red-500 font-medium"><AlertCircle size={10} />{errors.price}</p>}
                                    </div>

                                    {/* Discount Price */}
                                    <div className="space-y-2">
                                        <Label icon={Percent} text="Discount Price" />
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-black text-slate-400">₹</span>
                                            <input
                                                type="number" min="0"
                                                value={form.discount}
                                                onChange={e => set("discount", e.target.value)}
                                                placeholder="0.00"
                                                className={`${inputCls} pl-8 ${errors.discount ? "border-red-300" : ""}`}
                                            />
                                        </div>
                                        {errors.discount && <p className="flex items-center gap-1 text-[11px] text-red-500 font-medium"><AlertCircle size={10} />{errors.discount}</p>}
                                    </div>
                                </div>

                                {/* Live discount % badge */}
                                {form.price && form.discount && !isNaN(form.price) && !isNaN(form.discount) && Number(form.discount) < Number(form.price) && (
                                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-2.5">
                                        <span className="text-sm font-black text-emerald-600">
                                            {Math.round((1 - Number(form.discount) / Number(form.price)) * 100)}% OFF
                                        </span>
                                        <span className="text-[11px] text-emerald-500 font-semibold">
                                            Customer saves ₹{(Number(form.price) - Number(form.discount)).toLocaleString()}
                                        </span>
                                    </motion.div>
                                )}

                                <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3">
                                    <Percent size={13} className="text-blue-500 shrink-0" />
                                    <p className="text-[11px] text-blue-600 font-semibold">
                                        Leave Discount Price empty if no sale is active.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card: Images */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/30">
                                        <ImageIcon size={13} className="text-white" />
                                    </div>
                                    <span className="text-[13px] font-extrabold text-slate-700">Product Images</span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                                    {files.length} / 8 uploaded
                                </span>
                            </div>

                            <div className="p-6 space-y-4">
                                {/* Hidden file input */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={e => addFiles(e.target.files)}
                                />

                                {/* Drop zone */}
                                <div
                                    onDragOver={e => { e.preventDefault(); setDragging(true) }}
                                    onDragLeave={() => setDragging(false)}
                                    onDrop={e => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200
                                        ${dragging ? "border-blue-400 bg-blue-50 scale-[1.01]"
                                            : errors.images ? "border-red-300 bg-red-50/30"
                                            : "border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:bg-blue-50/40"}`}
                                >
                                    <div className={`w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-colors ${dragging ? "bg-blue-100" : "bg-slate-100"}`}>
                                        <Upload size={20} className={dragging ? "text-blue-600" : "text-slate-400"} />
                                    </div>
                                    <p className="text-sm font-bold text-slate-600">
                                        {dragging ? "Drop images here" : "Drag & drop or click to upload"}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">
                                        PNG, JPG, WEBP · Max 5MB each · <span className="text-blue-500 font-semibold">Browse files</span>
                                    </p>
                                </div>

                                {errors.images && (
                                    <p className="flex items-center gap-1 text-[11px] text-red-500 font-medium">
                                        <AlertCircle size={10} />{errors.images}
                                    </p>
                                )}

                                {/* Image previews grid */}
                                <AnimatePresence>
                                    {previews.length > 0 && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                            className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                                            {previews.map((src, i) => (
                                                <motion.div key={src}
                                                    initial={{ opacity: 0, scale: 0.88 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.85 }}
                                                    transition={{ duration: 0.18 }}
                                                    className={`relative group aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all
                                                        ${i === 0 ? "border-blue-500 shadow-md shadow-blue-500/20" : "border-slate-200 hover:border-blue-300"}`}
                                                    onClick={() => setMain(i)}
                                                >
                                                    <img src={src} alt="" className="w-full h-full object-cover" />

                                                    {/* Cover badge */}
                                                    {i === 0 && (
                                                        <div className="absolute top-1 left-1 bg-blue-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                                                            <Star size={6} fill="white" /> Cover
                                                        </div>
                                                    )}

                                                    {/* Hover overlay */}
                                                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5">
                                                        {i !== 0 && (
                                                            <span className="text-[8px] font-bold text-white bg-blue-600 px-1.5 py-0.5 rounded-md">Set cover</span>
                                                        )}
                                                    </div>

                                                    {/* Remove */}
                                                    <button
                                                        onClick={e => { e.stopPropagation(); removeImage(i) }}
                                                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        <X size={9} strokeWidth={3} />
                                                    </button>
                                                </motion.div>
                                            ))}

                                            {/* Add more tile */}
                                            <motion.div
                                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                                onClick={() => fileInputRef.current?.click()}
                                                className="aspect-square rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 bg-slate-50 hover:bg-blue-50/40 flex flex-col items-center justify-center cursor-pointer transition-all gap-1"
                                            >
                                                <Plus size={16} className="text-slate-300" />
                                                <span className="text-[8px] font-bold text-slate-300">Add</span>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {previews.length > 0 && (
                                    <p className="text-[11px] text-slate-400">
                                        Click any image to set it as <span className="text-blue-500 font-semibold">cover photo</span>. Images are uploaded to Supabase Storage on publish.
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* ── RIGHT (1/3) ── */}
                    <div className="space-y-5">

                        {/* Card: Publish */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] overflow-hidden">
                            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-50">
                                <div className="w-7 h-7 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/30">
                                    {visible ? <Eye size={13} className="text-white" /> : <EyeOff size={13} className="text-white" />}
                                </div>
                                <span className="text-[13px] font-extrabold text-slate-700">Publish</span>
                            </div>

                            <div className="p-5 space-y-4">
                                {/* Visibility toggle */}
                                <div
                                    onClick={() => setVisible(v => !v)}
                                    className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300
                                        ${visible ? "border-emerald-200 bg-emerald-50/60" : "border-slate-200 bg-slate-50"}`}
                                >
                                    <div>
                                        <p className={`text-sm font-bold transition-colors ${visible ? "text-emerald-700" : "text-slate-500"}`}>
                                            {visible ? "Live in Store" : "Hidden"}
                                        </p>
                                        <p className="text-[11px] text-slate-400 mt-0.5">
                                            {visible ? "Customers can discover this" : "Only you can see this"}
                                        </p>
                                    </div>
                                    <div className={`w-11 h-6 rounded-full relative transition-all duration-300 ${visible ? "bg-emerald-500" : "bg-slate-300"}`}>
                                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${visible ? "left-5" : "left-0.5"}`} />
                                    </div>
                                </div>

                                {/* Submit error */}
                                <AnimatePresence>
                                    {errors.submit && (
                                        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                            className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-[11px] font-semibold px-3 py-2.5 rounded-xl">
                                            <AlertCircle size={13} className="shrink-0 mt-0.5" /> {errors.submit}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Success state */}
                                <AnimatePresence>
                                    {success && (
                                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                            className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold px-3 py-2.5 rounded-xl">
                                            <CheckCircle2 size={14} className="text-emerald-500" /> Product published! Redirecting...
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Publish button */}
                                <motion.button
                                    onClick={handleSubmit}
                                    disabled={loading || success}
                                    whileHover={{ scale: (loading || success) ? 1 : 1.01 }}
                                    whileTap={{ scale: (loading || success) ? 1 : 0.98 }}
                                    className="w-full py-3.5 rounded-2xl bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-black tracking-wide transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Uploading & Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={14} className="fill-white/40" />
                                            Publish Product
                                        </>
                                    )}
                                </motion.button>

                                <button
                                    onClick={handleReset}
                                    className="w-full py-2.5 rounded-2xl border border-slate-200 text-slate-400 text-[12.5px] font-semibold hover:bg-red-50 hover:text-red-400 hover:border-red-200 transition-all"
                                >
                                    Reset Form
                                </button>
                            </div>
                        </motion.div>
{/* Card: Category */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.12, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] overflow-hidden">
                            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-50">
                                <div className="w-7 h-7 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/30">
                                    <Tag size={13} className="text-white" />
                                </div>
                                <span className="text-[13px] font-extrabold text-slate-700">Category</span>
                                <span className="text-blue-500 text-xs ml-auto">*</span>
                            </div>

                            <div className="p-5 space-y-4">
                                {/* The Dropdown */}
                                <div className="relative">
                                    <select
                                        value={category}
                                        onChange={e => {
                                            setCategory(e.target.value)
                                            if (errors.category) setErrors(er => ({ ...er, category: "" }))
                                        }}
                                        className={`w-full px-4 py-3 bg-slate-50 border rounded-2xl text-[13px] text-slate-600 appearance-none
                                            ${errors.category ? "border-red-300" : "border-slate-200 focus:border-blue-400 focus:bg-white"}`}
                                    >
                                        <option value="">Select category…</option>
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>

                                {errors.category && (
                                    <p className="flex items-center gap-1 text-[11px] text-red-500 font-medium">
                                        <AlertCircle size={10} />{errors.category}
                                    </p>
                                )}

                                {/* Dynamic Quick-Select Buttons */}
                                <div>
                                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Quick Select</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {categories.map(c => (
                                            <button 
                                                key={c.id} 
                                                onClick={() => { 
                                                    setCategory(c.id); 
                                                    if (errors.category) setErrors(er => ({ ...er, category: "" })) 
                                                }}
                                                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all duration-200
                                                    ${category === c.id
                                                        ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/25"
                                                        : "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                                                    }`}>
                                                {c.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card: Inventory */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.16, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] overflow-hidden">
                            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-50">
                                <div className="w-7 h-7 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/30">
                                    <Layers size={13} className="text-white" />
                                </div>
                                <span className="text-[13px] font-extrabold text-slate-700">Inventory</span>
                            </div>

                            <div className="p-5 space-y-2">
                                <Label icon={Layers} text="Stock Quantity" required />
                                <input
                                    type="number" min="0"
                                    value={form.stock}
                                    onChange={e => set("stock", e.target.value)}
                                    placeholder="0"
                                    className={`${inputCls} ${errors.stock ? "border-red-300" : ""}`}
                                />
                                {errors.stock
                                    ? <p className="flex items-center gap-1 text-[11px] text-red-500 font-medium"><AlertCircle size={10} />{errors.stock}</p>
                                    : <p className="text-[11px] text-slate-400 font-medium pt-0.5">Set to <span className="font-bold text-slate-600">0</span> to mark as out of stock</p>
                                }

                                {/* Live stock status */}
                                {form.stock !== "" && !errors.stock && (
                                    <div className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-lg border mt-1
                                        ${Number(form.stock) === 0 ? "bg-red-50 text-red-500 border-red-200"
                                        : Number(form.stock) <= 10 ? "bg-amber-50 text-amber-600 border-amber-200"
                                        : "bg-emerald-50 text-emerald-600 border-emerald-200"}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${Number(form.stock) === 0 ? "bg-red-400" : Number(form.stock) <= 10 ? "bg-amber-400" : "bg-emerald-500"}`} />
                                        {Number(form.stock) === 0 ? "Out of Stock" : Number(form.stock) <= 10 ? "Low Stock" : "In Stock"}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct