import { useState, useRef } from "react"
import { Star, Upload, X, ZoomIn, ChevronLeft, ChevronRight, Camera, Check, Image, ChevronDown, ChevronUp, Plus } from "lucide-react"

const MOCK_REVIEWS = [
  {
    id: 1, user: "Arjun M.", avatar: "AM", avatarBg: "bg-blue-500",
    rating: 5, date: "12 Feb 2026", verified: true,
    caption: "Absolutely love the quality! Fits perfectly.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    ]
  },
  {
    id: 2, user: "Priya S.", avatar: "PS", avatarBg: "bg-rose-500",
    rating: 4, date: "8 Feb 2026", verified: true,
    caption: "Great product, color is exactly as shown.",
    images: ["https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80"]
  },
  {
    id: 3, user: "Rahul K.", avatar: "RK", avatarBg: "bg-emerald-500",
    rating: 5, date: "5 Feb 2026", verified: false,
    caption: "Wore this to the gym, super comfortable and stylish!",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80",
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&q=80",
    ]
  },
  {
    id: 4, user: "Sneha D.", avatar: "SD", avatarBg: "bg-violet-500",
    rating: 3, date: "1 Feb 2026", verified: true,
    caption: "Decent product. Stitching could be better.",
    images: ["https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80"]
  },
  {
    id: 5, user: "Vikram J.", avatar: "VJ", avatarBg: "bg-amber-500",
    rating: 5, date: "28 Jan 2026", verified: true,
    caption: "Best purchase of the month, very happy!",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80",
    ]
  },
  {
    id: 6, user: "Meera R.", avatar: "MR", avatarBg: "bg-pink-500",
    rating: 4, date: "22 Jan 2026", verified: false,
    caption: "Stylish and lightweight. Will buy again.",
    images: ["https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&q=80"]
  },
]

const Stars = ({ count, size = 12 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <Star key={i} size={size} className={i <= count ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
    ))}
  </div>
)

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox = ({ images, startIndex, review, onClose }) => {
  const [idx, setIdx] = useState(startIndex)
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative flex flex-col sm:flex-row w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
        {/* Image */}
        <div className="relative flex-1 bg-gray-950 min-h-[280px] flex items-center justify-center">
          <img src={images[idx]} alt="" className="w-full h-full object-contain max-h-[60vh] sm:max-h-[80vh]" />
          {images.length > 1 && <>
            <button onClick={() => setIdx(i => (i - 1 + images.length) % images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => setIdx(i => (i + 1) % images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all">
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => <button key={i} onClick={() => setIdx(i)} className={`h-1 rounded-full transition-all ${i === idx ? 'bg-white w-5' : 'bg-white/40 w-1.5'}`} />)}
            </div>
          </>}
          <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white">
            <X size={14} />
          </button>
        </div>
        {/* Review info */}
        <div className="w-full sm:w-56 p-4 flex flex-col gap-3 overflow-y-auto">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${review.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{review.avatar}</div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-xs font-bold text-gray-900">{review.user}</p>
                {review.verified && <span className="inline-flex items-center gap-0.5 px-1 py-px bg-blue-50 text-blue-500 text-[9px] font-bold rounded-full"><Check size={8} />Verified</span>}
              </div>
              <p className="text-[10px] text-gray-400">{review.date}</p>
            </div>
          </div>
          <Stars count={review.rating} size={13} />
          {review.caption && <p className="text-xs text-gray-600 leading-relaxed">{review.caption}</p>}
          {images.length > 1 && (
            <div className="flex gap-1.5 flex-wrap mt-auto pt-2 border-t border-gray-100">
              {images.map((img, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`w-12 h-12 rounded-lg overflow-hidden transition-all ${i === idx ? 'ring-2 ring-blue-500 ring-offset-1' : 'opacity-50 hover:opacity-80'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Upload Modal ─────────────────────────────────────────────────────────────
const UploadModal = ({ onClose, onSubmit }) => {
  const [previews, setPreviews] = useState([])
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [caption, setCaption] = useState("")
  const [name, setName] = useState("")
  const fileRef = useRef()

  const addFiles = (files) => {
    Array.from(files).filter(f => f.type.startsWith("image/")).forEach(f => {
      const r = new FileReader()
      r.onload = e => setPreviews(p => [...p, e.target.result].slice(0, 5))
      r.readAsDataURL(f)
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
          <div>
            <p className="text-sm font-extrabold text-gray-900">Add Your Photos</p>
            <p className="text-xs text-gray-400">Share your experience with others</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center">
            <X size={14} className="text-gray-500" />
          </button>
        </div>

        <div className="px-5 py-4 flex flex-col gap-3.5">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
            className="w-full text-sm border-2 border-gray-200 focus:border-blue-400 rounded-xl px-3 py-2.5 outline-none transition-all placeholder:text-gray-300 font-medium" />

          {/* Stars */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <button key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)} onClick={() => setRating(i)} className="transition-transform hover:scale-110">
                <Star size={26} className={`transition-colors ${i <= (hover || rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
              </button>
            ))}
            {rating > 0 && <span className="ml-1 text-xs font-bold text-gray-500">{['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][rating]}</span>}
          </div>

          {/* Photo upload */}
          <div className="flex gap-2 flex-wrap">
            {previews.map((src, i) => (
              <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden group">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button onClick={() => setPreviews(p => p.filter((_, j) => j !== i))} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <X size={13} className="text-white" />
                </button>
              </div>
            ))}
            {previews.length < 5 && (
              <button onClick={() => fileRef.current.click()}
                className={`rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 flex flex-col items-center justify-center gap-1 text-gray-300 hover:text-blue-400 transition-all ${previews.length === 0 ? 'w-full h-20' : 'w-16 h-16'}`}>
                <Camera size={previews.length === 0 ? 20 : 16} />
                {previews.length === 0 && <span className="text-xs font-semibold">Tap to upload</span>}
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => addFiles(e.target.files)} />
          </div>

          <textarea value={caption} onChange={e => setCaption(e.target.value)} placeholder="What do you think? (optional)" rows={2}
            className="w-full text-sm border-2 border-gray-200 focus:border-blue-400 rounded-xl px-3 py-2.5 outline-none transition-all resize-none placeholder:text-gray-300" />
        </div>

        <div className="px-5 pb-5 flex gap-2">
          <button onClick={onClose} className="flex-1 h-10 rounded-xl border-2 border-gray-100 text-sm font-bold text-gray-400 hover:bg-gray-50 transition-all">Cancel</button>
          <button disabled={!rating || !name.trim() || !previews.length} onClick={() => onSubmit({ name, rating, caption, previews })}
            className="flex-1 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-300 text-white font-bold text-sm transition-all shadow-md shadow-blue-100 disabled:shadow-none">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

// ═══ MAIN ═════════════════════════════════════════════════════════════════════
const PHOTO_LIMIT = 8
const REVIEW_LIMIT = 3

const GalleryTab = () => {
  const [reviews, setReviews] = useState(MOCK_REVIEWS)
  const [expanded, setExpanded] = useState(false)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [showUpload, setShowUpload] = useState(false)
  const [toast, setToast] = useState(false)

  const allImages = reviews.flatMap(r => r.images.map((src, i) => ({ review: r, src, i })))
  const totalPhotos = allImages.length
  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)

  const visiblePhotos = showAllPhotos ? allImages : allImages.slice(0, PHOTO_LIMIT)
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, REVIEW_LIMIT)
  const hiddenPhotos = totalPhotos - PHOTO_LIMIT
  const hiddenReviews = reviews.length - REVIEW_LIMIT

  const handleSubmit = ({ name, rating, caption, previews }) => {
    const initials = name.trim().split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    const colors = ["bg-blue-500", "bg-rose-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500"]
    setReviews(p => [{ id: Date.now(), user: name, avatar: initials, avatarBg: colors[reviews.length % colors.length], rating, date: "Just now", verified: false, caption, images: previews }, ...p])
    setShowUpload(false)
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  return (
    <div className="w-full">

      {/* ── COLLAPSED TRIGGER ─────────────────────────────── */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-gray-50 hover:bg-gray-100/80 border border-gray-100 transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          {/* 4 stacked preview photos */}
          <div className="flex -space-x-2.5">
            {allImages.slice(0, 4).map((item, i) => (
              <div key={i} className="w-9 h-9 rounded-xl overflow-hidden ring-2 ring-white shrink-0" style={{ zIndex: 4 - i }}>
                <img src={item.src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-gray-800">Customer Photos</p>
              <span className="text-[11px] font-semibold text-gray-400">{totalPhotos} photos</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Stars count={Math.round(avgRating)} size={11} />
              <span className="text-[11px] text-gray-400">{avgRating} · {reviews.length} reviews</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-gray-600 transition-colors">
          <span className="text-xs font-semibold hidden sm:block">{expanded ? "Close" : "View all"}</span>
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
      </button>

      {/* ── EXPANDED PANEL ────────────────────────────────── */}
      {expanded && (
        <div className="mt-3 flex flex-col gap-5">

          {/* Top bar */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400">
              {showAllPhotos ? `All ${totalPhotos} photos` : `Showing ${Math.min(PHOTO_LIMIT, totalPhotos)} of ${totalPhotos}`}
            </p>
            <button onClick={() => setShowUpload(true)}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl px-3.5 py-2 shadow-sm shadow-blue-200 transition-all active:scale-95">
              <Upload size={12} /> Add Photos
            </button>
          </div>

          {toast && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-2 rounded-xl">
              <Check size={12} /> Your review was posted! Thank you.
            </div>
          )}

          {/* ── Photo grid ── */}
          <div className="grid grid-cols-4 gap-2">
            {visiblePhotos.map((item, idx) => {
              const isLastVisible = !showAllPhotos && idx === PHOTO_LIMIT - 1 && hiddenPhotos > 0
              return (
                <div key={`${item.review.id}-${item.i}`}
                  className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer group"
                  onClick={() => isLastVisible ? setShowAllPhotos(true) : setLightbox({ review: item.review, startIndex: item.i })}
                >
                  <img src={item.src} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />

                  {/* Normal hover */}
                  {!isLastVisible && (
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn size={18} className="text-white" />
                    </div>
                  )}

                  {/* +N overlay on last tile */}
                  {isLastVisible && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-0.5">
                      <span className="text-white font-black text-xl leading-none">+{hiddenPhotos}</span>
                      <span className="text-white/70 text-[10px] font-semibold">more</span>
                    </div>
                  )}

                  {/* Multi badge */}
                  {!isLastVisible && item.i === 0 && item.review.images.length > 1 && (
                    <div className="absolute top-1 right-1 bg-black/60 text-white text-[9px] font-bold px-1.5 py-px rounded-full flex items-center gap-0.5">
                      <Image size={8} />{item.review.images.length}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Show less photos */}
          {showAllPhotos && hiddenPhotos > 0 && (
            <button onClick={() => setShowAllPhotos(false)} className="text-xs text-gray-400 hover:text-gray-600 font-semibold transition-colors text-center">
              Show less ↑
            </button>
          )}

          {/* ── Reviews ── */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">Reviews</p>
            <div className="flex flex-col">
              {visibleReviews.map((review, i) => (
                <div key={review.id} className={`flex gap-2.5 py-3 ${i < visibleReviews.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <div className={`w-7 h-7 rounded-full ${review.avatarBg} flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5`}>
                    {review.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-gray-900">{review.user}</span>
                        {review.verified && (
                          <span className="inline-flex items-center gap-px px-1 py-px bg-blue-50 text-blue-500 text-[9px] font-bold rounded-full">
                            <Check size={8} /> Verified
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0">{review.date}</span>
                    </div>
                    <div className="mt-0.5 mb-1"><Stars count={review.rating} size={11} /></div>
                    {review.caption && <p className="text-xs text-gray-500 leading-relaxed">{review.caption}</p>}
                    {/* Photo strip */}
                    {review.images.length > 0 && (
                      <div className="flex gap-1.5 mt-2 overflow-x-auto no-scrollbar">
                        {review.images.map((img, j) => (
                          <button key={j} onClick={() => setLightbox({ review, startIndex: j })}
                            className="shrink-0 w-10 h-10 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-400 transition-all">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Show more / less reviews */}
            {!showAllReviews && hiddenReviews > 0 && (
              <button onClick={() => setShowAllReviews(true)}
                className="w-full mt-2 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all">
                <Plus size={12} /> {hiddenReviews} more reviews
              </button>
            )}
            {showAllReviews && reviews.length > REVIEW_LIMIT && (
              <button onClick={() => setShowAllReviews(false)}
                className="w-full mt-2 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors py-1">
                Show less ↑
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      {lightbox && <Lightbox images={lightbox.review.images} startIndex={lightbox.startIndex} review={lightbox.review} onClose={() => setLightbox(null)} />}
      {showUpload && <UploadModal onClose={() => setShowUpload(false)} onSubmit={handleSubmit} />}
    </div>
  )
}

export default GalleryTab