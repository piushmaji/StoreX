import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getProductById, getCategories } from "../../services/productService";
import supabase from "../../lib/Supabase/Supabase";
import {
  ArrowLeft,
  AlignLeft,
  Layers,
  Eye,
  EyeOff,
  ChevronDown,
  Plus,
  X,
  Image as ImageIcon,
  Sparkles,
  Upload,
  AlertCircle,
  Layout,
  Box,
  Trash2,
  Settings2,
  Globe,
} from "lucide-react";

const GENDERS = ["Men", "Women", "Unisex", "Kids"];

// ─── Visual Custom Controls ────────────────────────────────────

const Card = ({ children, title, icon: Icon, badge, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden ${className}`}
  >
    {(title || Icon) && (
      <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Icon size={18} />
            </div>
          )}
          <h3 className="text-[15px] font-bold text-slate-800">{title}</h3>
        </div>
        {badge && (
          <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider rounded-lg">
            {badge}
          </span>
        )}
      </div>
    )}
    <div className="p-6">{children}</div>
  </motion.div>
);

const Input = ({ label, icon: Icon, error, ...props }) => (
  <div className="space-y-2 flex-1">
    {label && (
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
        {Icon && <Icon size={12} className="text-blue-500/60" />}
        {label}
      </label>
    )}
    <div className="relative group">
      <input
        {...props}
        className={`w-full px-4 py-3.5 bg-slate-50 border ${error ? "border-red-200" : "border-slate-200"} rounded-2xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all duration-300`}
      />
      {error && (
        <p className="mt-1.5 text-[11px] font-medium text-red-500 flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  </div>
);

const Toggle = ({ active, onClick, label, sub }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
      active
        ? "bg-blue-50/50 border-blue-100"
        : "bg-white border-slate-100 hover:border-slate-200"
    }`}
  >
    <div>
      <p
        className={`text-sm font-bold ${active ? "text-blue-700" : "text-slate-700"}`}
      >
        {label}
      </p>
      <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>
    </div>
    <div
      className={`w-10 h-6 rounded-full relative transition-colors duration-300 ${active ? "bg-blue-600" : "bg-slate-200"}`}
    >
      <motion.div
        animate={{ x: active ? 18 : 2 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </div>
  </div>
);

// ─── Main Controller Page ──────────────────────────────────────

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef();

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [material, setMaterial] = useState("");
  const [style, setStyle] = useState("");
  const [gender, setGender] = useState("Unisex");
  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");

  // Loading & Action states
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [dbCategories, setDbCategories] = useState([]);
  const [dragging, setDragging] = useState(false);

  // Status Toggles
  const [status, setStatus] = useState({
    visible: true,
    featured: false,
    newArrival: false,
    onSale: false,
  });

  // Images state: contains { url, preview, file, isNew }
  const [images, setImages] = useState([]);

  // Variants state
  const [variants, setVariants] = useState([]);
  const [originalVariants, setOriginalVariants] = useState([]);

  // Load product metadata & attributes from Supabase on mount
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const [cats, prod] = await Promise.all([
          getCategories(),
          getProductById(id),
        ]);

        setDbCategories(cats || []);

        if (prod) {
          setName(prod.name || "");
          setDescription(prod.description || "");
          setBrand(prod.brand || "");
          setMaterial(prod.material || "");
          setStyle(prod.style || "");
          setCategory(prod.category_id || "");
          setGender(prod.gender || "Unisex");
          setSlug(prod.slug || "");

          setStatus({
            visible: prod.is_visible ?? true,
            featured: prod.is_featured ?? false,
            newArrival: prod.is_new ?? false,
            onSale: prod.is_sale ?? false,
          });

          // Preload existing images
          if (prod.image_urls && prod.image_urls.length > 0) {
            setImages(
              prod.image_urls.map((url) => ({
                url,
                preview: url,
                isNew: false,
              })),
            );
          }

          // Preload existing variants
          if (prod.variants && prod.variants.length > 0) {
            const mapped = prod.variants.map((v) => ({
              id: v.id,
              size: v.size || "M",
              color: v.color || "#000000",
              stock: v.stock ?? 10,
              price: v.price ?? 0,
              discountPrice: v.discount_price ?? v.discountPrice ?? "",
              isNew: false,
            }));
            setVariants(mapped);
            setOriginalVariants(mapped);
          } else {
            setVariants([
              {
                id: Date.now(),
                size: "M",
                color: "#000000",
                stock: 10,
                price: 1299,
                discountPrice: "",
                isNew: true,
              },
            ]);
          }
        } else {
          toast.error("Product not found.");
          navigate("/admin/products");
        }
      } catch (err) {
        console.error("Failed to load product edit details:", err);
        toast.error("Error retrieving product details.");
        navigate("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id, navigate]);

  // Handle Drag and Drop uploads
  const handleImageUpload = (files) => {
    const newFiles = Array.from(files);
    const newImages = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isNew: true,
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, 8));
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        id: Date.now(),
        size: "M",
        color: "#3B82F6",
        stock: 10,
        price: 1299,
        discountPrice: "",
        isNew: true,
      },
    ]);
  };

  const removeVariant = (variantId) => {
    if (variants.length > 1) {
      setVariants(variants.filter((v) => v.id !== variantId));
    } else {
      toast.error("At least one product variant is required.");
    }
  };

  const handleSlugRegenerate = () => {
    setSlug(
      name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
    );
    toast.success("Slug generated based on product name!");
  };

  // Perform database updating
  const handleSaveProduct = async () => {
    // Validation rules
    if (!name.trim()) {
      toast.error("Please enter a product name.");
      return;
    }
    if (!category) {
      toast.error("Please select a category.");
      return;
    }
    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    // Validate variants price/stock
    for (let i = 0; i < variants.length; i++) {
      const v = variants[i];
      if (!v.price || Number(v.price) <= 0) {
        toast.error(
          `Variant #${i + 1} must have a valid price greater than 0.`,
        );
        return;
      }
      if (v.stock === "" || Number(v.stock) < 0) {
        toast.error(`Variant #${i + 1} must have a valid stock of 0 or more.`);
        return;
      }
      if (!v.size) {
        toast.error(`Variant #${i + 1} size is required.`);
        return;
      }
    }

    setIsSaving(true);
    const loadingToast = toast.loading("Saving changes & uploading assets...");

    try {
      // 1. Upload newly added image files to Supabase storage bucket "products"
      const uploadedUrls = [];

      for (const img of images) {
        if (img.isNew) {
          const file = img.file;
          const fileName = `${Date.now()}-${file.name}`;

          const { error: uploadError } = await supabase.storage
            .from("products")
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const { data } = supabase.storage
            .from("products")
            .getPublicUrl(fileName);
          uploadedUrls.push(data.publicUrl);
        } else {
          // Keep existing URL
          uploadedUrls.push(img.url);
        }
      }

      // 2. Perform updates to parent product fields
      const productPayload = {
        name,
        description: description || null,
        category_id: category,
        brand: brand || null,
        material: material || null,
        style: style || null,
        gender,
        slug,
        is_visible: status.visible,
        is_featured: status.featured,
        is_new: status.newArrival,
        is_sale: status.onSale,
        image_urls: uploadedUrls,
        thumbnail: uploadedUrls[0] || null,
      };

      const { error: productError } = await supabase
        .from("products")
        .update(productPayload)
        .eq("id", id);

      if (productError) throw productError;

      // 3. Perform variant updates, additions, and deletions
      const currentVariantIds = variants
        .filter((v) => !v.isNew)
        .map((v) => v.id);
      const deletedVariantIds = originalVariants
        .map((ov) => ov.id)
        .filter((oid) => !currentVariantIds.includes(oid));

      // Execute Deletions
      if (deletedVariantIds.length > 0) {
        const { error: deleteError } = await supabase
          .from("product_variants")
          .delete()
          .in("id", deletedVariantIds);

        if (deleteError) throw deleteError;
      }

      // Execute Inserts / Updates
      for (const v of variants) {
        const variantPayload = {
          product_id: id,
          size: v.size,
          color: v.color,
          stock: Number(v.stock),
          price: Number(v.price),
          discount_price: v.discountPrice ? Number(v.discountPrice) : null,
        };

        if (v.isNew) {
          const { error: insertError } = await supabase
            .from("product_variants")
            .insert([variantPayload]);

          if (insertError) throw insertError;
        } else {
          const { error: updateError } = await supabase
            .from("product_variants")
            .update(variantPayload)
            .eq("id", v.id);

          if (updateError) throw updateError;
        }
      }

      toast.success("Product updated successfully!", { id: loadingToast });
      setIsSaving(false);
      navigate("/admin/products");
    } catch (err) {
      console.error("Error saving changes:", err);
      toast.error(err.message || "Failed to update product details.", {
        id: loadingToast,
      });
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-500 font-bold text-sm">
          Retrieving product specs...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* ── Action Toolbar ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex items-center justify-between border-b border-slate-100 mb-8 bg-white/50 backdrop-blur-sm rounded-b-[32px]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/products")}
            className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm transition-all shadow-sm"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block" />
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 bg-amber-50 text-amber-600 text-[10px] font-black rounded-lg border border-amber-100 uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Editing Mode
            </div>
            <p className="text-slate-400 font-bold text-[11px] tracking-tight hidden md:block">
              Product ID: #{id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/products")}
            className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Discard
          </button>
          <button
            onClick={handleSaveProduct}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-black rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles size={16} />
            )}
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 md:px-10 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN — Main Forms */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Product Information */}
            <Card title="Product Information" icon={Box}>
              <div className="space-y-6">
                <Input
                  label="Product Name"
                  placeholder="e.g. Classic Oversized Essential Hoodie"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <AlignLeft size={12} className="text-blue-500/60" />
                    Description
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell the story of this product..."
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all duration-300 resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Input
                    label="Brand"
                    placeholder="StoreX"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                  <Input
                    label="Material"
                    placeholder="100% Organic Cotton"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                  />
                  <Input
                    label="Style"
                    placeholder="Modern / Minimal"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 appearance-none focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Select Category</option>
                        {dbCategories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 appearance-none focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        {GENDERS.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Slug Generator UI */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
                    <span>URL Slug</span>
                    <button
                      type="button"
                      onClick={handleSlugRegenerate}
                      className="text-xs text-blue-600 hover:underline font-bold capitalize normal-case tracking-normal"
                    >
                      Sync with title
                    </button>
                  </label>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 bg-slate-50 px-4 py-3.5 rounded-2xl border border-slate-150">
                    <Globe size={12} className="text-blue-500 shrink-0" />
                    <span className="shrink-0">storex.com/product/</span>
                    <input
                      type="text"
                      className="bg-transparent text-blue-600 border-none outline-none focus:ring-0 p-0 m-0 w-full font-bold"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* 2. Product Images */}
            <Card
              title="Product Images"
              icon={ImageIcon}
              badge={`${images.length}/8`}
            >
              <div className="space-y-6">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    handleImageUpload(e.dataTransfer.files);
                  }}
                  onClick={() => fileInputRef.current.click()}
                  className={`relative h-52 rounded-[24px] border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${
                    dragging
                      ? "border-blue-400 bg-blue-50/50 scale-[1.01]"
                      : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-200"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleImageUpload(e.target.files)}
                  />
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-500 mb-3 border border-slate-100">
                    <Upload size={24} />
                  </div>
                  <p className="text-sm font-bold text-slate-700">
                    Drag & drop images here
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 font-medium">
                    PNG, JPG, WebP up to 10MB
                  </p>
                </div>

                {/* Preview Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <AnimatePresence>
                    {images.map((img, idx) => (
                      <motion.div
                        key={img.preview}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="group relative aspect-square rounded-[20px] overflow-hidden border border-slate-100 bg-white"
                      >
                        <img
                          src={img.preview}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          alt=""
                        />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          {idx !== 0 && (
                            <button
                              onClick={() => {
                                setImages((prev) => {
                                  const arr = [...prev];
                                  const [item] = arr.splice(idx, 1);
                                  arr.unshift(item);
                                  return arr;
                                });
                              }}
                              className="px-2 py-1 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-lg text-white text-[9px] font-black transition-all"
                            >
                              Set Main
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setImages((prev) =>
                                prev.filter((_, i) => i !== idx),
                              );
                            }}
                            className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md text-white hover:bg-red-500 transition-colors flex items-center justify-center"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        {idx === 0 && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-[8px] font-black uppercase rounded-md shadow-lg">
                            Main
                          </div>
                        )}
                        {img.isNew && (
                          <div className="absolute top-2 right-2 px-2 py-1 bg-emerald-500 text-white text-[8px] font-black uppercase rounded-md shadow-lg">
                            New
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {images.length < 8 && (
                    <div
                      onClick={() => fileInputRef.current.click()}
                      className="aspect-square rounded-[20px] border border-slate-200 border-dashed bg-slate-50/50 flex flex-col items-center justify-center text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-all cursor-pointer"
                    >
                      <Plus size={20} />
                      <span className="text-[10px] font-bold uppercase mt-2">
                        Add
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* 3. Product Variants */}
            <Card title="Product Variants" icon={Layers}>
              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {variants.map((v, idx) => (
                    <motion.div
                      key={v.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="relative p-6 bg-slate-50/50 rounded-[24px] border border-slate-100 group"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                        <div className="md:col-span-1 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Size
                          </label>
                          <select
                            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                            value={v.size}
                            onChange={(e) => {
                              const newV = [...variants];
                              newV[idx].size = e.target.value;
                              setVariants(newV);
                            }}
                          >
                            {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-1 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Color
                          </label>
                          <div className="relative">
                            <input
                              type="color"
                              className="w-full h-10 p-1 bg-white border border-slate-200 rounded-xl cursor-pointer"
                              value={v.color}
                              onChange={(e) => {
                                const newV = [...variants];
                                newV[idx].color = e.target.value;
                                setVariants(newV);
                              }}
                            />
                          </div>
                        </div>
                        <div className="md:col-span-1 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Stock
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all font-semibold text-slate-700"
                            value={v.stock}
                            onChange={(e) => {
                              const newV = [...variants];
                              newV[idx].stock = e.target.value;
                              setVariants(newV);
                            }}
                          />
                        </div>
                        <div className="md:col-span-1 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Price
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                              ₹
                            </span>
                            <input
                              type="number"
                              className="w-full pl-6 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all font-black text-slate-800"
                              value={v.price}
                              onChange={(e) => {
                                const newV = [...variants];
                                newV[idx].price = e.target.value;
                                setVariants(newV);
                              }}
                            />
                          </div>
                        </div>
                        <div className="md:col-span-1 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-emerald-500">
                            Discount
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 text-xs">
                              ₹
                            </span>
                            <input
                              type="number"
                              placeholder="Off"
                              className="w-full pl-6 pr-3 py-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-all text-emerald-700 font-bold"
                              value={v.discountPrice}
                              onChange={(e) => {
                                const newV = [...variants];
                                newV[idx].discountPrice = e.target.value;
                                setVariants(newV);
                              }}
                            />
                          </div>
                        </div>
                        <div className="md:col-span-1 flex justify-end">
                          <button
                            onClick={() => removeVariant(v.id)}
                            className="w-10 h-10 rounded-xl bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white flex items-center justify-center cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <button
                  onClick={addVariant}
                  className="w-full py-4 rounded-[20px] border-2 border-dashed border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/30 transition-all flex items-center justify-center gap-2 text-sm font-bold cursor-pointer"
                >
                  <Plus size={18} /> Add Another Variant
                </button>
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN — Sticky Preview & Status */}
          <div className="lg:col-span-4 space-y-8 sticky top-28">
            {/* 4. Product Status */}
            <Card title="Availability & Visibility" icon={Settings2}>
              <div className="space-y-3">
                <Toggle
                  label="Visible in Store"
                  sub="Enable product for customers"
                  active={status.visible}
                  onClick={() =>
                    setStatus((s) => ({ ...s, visible: !s.visible }))
                  }
                />
                <Toggle
                  label="Featured Product"
                  sub="Display in homepage spotlight"
                  active={status.featured}
                  onClick={() =>
                    setStatus((s) => ({ ...s, featured: !s.featured }))
                  }
                />
                <Toggle
                  label="New Arrival"
                  sub="Showcase in 'What's New'"
                  active={status.newArrival}
                  onClick={() =>
                    setStatus((s) => ({ ...s, newArrival: !s.newArrival }))
                  }
                />
                <Toggle
                  label="On Sale"
                  sub="Enable promotional pricing"
                  active={status.onSale}
                  onClick={() =>
                    setStatus((s) => ({ ...s, onSale: !s.onSale }))
                  }
                />
              </div>
            </Card>

            {/* 5. Live Product Preview */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-sky-400 rounded-[34px] blur-xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-white rounded-[32px] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Live Preview
                  </span>
                  <Layout size={14} className="text-blue-500" />
                </div>

                <div className="p-6 space-y-5">
                  {/* Preview Image */}
                  <div className="aspect-4/5 rounded-[24px] bg-slate-100 overflow-hidden relative border border-slate-50">
                    {images[0] ? (
                      <img
                        src={images[0].preview}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                        <ImageIcon size={48} strokeWidth={1} />
                        <span className="text-[10px] font-bold uppercase tracking-widest mt-4">
                          No Image
                        </span>
                      </div>
                    )}
                    {status.onSale && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-blue-600 shadow-sm">
                        SALE 20%
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black text-blue-600 px-2 py-0.5 bg-blue-50 rounded-md uppercase tracking-wider">
                        {dbCategories.find((c) => c.id === category)?.name ||
                          "Category"}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                        {brand || "StoreX"}
                      </span>
                    </div>

                    <h2 className="text-lg font-black text-slate-900 leading-tight">
                      {name || "Premium Product Title"}
                    </h2>

                    <div className="flex items-end gap-3 pt-1">
                      <span className="text-2xl font-black text-slate-900 leading-none">
                        ₹{variants[0]?.price || "0"}
                      </span>
                      {variants[0]?.discountPrice && (
                        <span className="text-sm font-bold text-slate-300 line-through pb-0.5">
                          ₹{Number(variants[0].price) + 500}
                        </span>
                      )}
                    </div>

                    {/* Color Dots */}
                    <div className="flex gap-2 pt-2">
                      {variants.slice(0, 4).map((v) => (
                        <div
                          key={v.id}
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-100"
                          style={{ backgroundColor: v.color }}
                        />
                      ))}
                    </div>

                    <div className="pt-4">
                      <div className="w-full h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-sm font-black tracking-tight cursor-pointer">
                        Preview Checkout
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProduct;
