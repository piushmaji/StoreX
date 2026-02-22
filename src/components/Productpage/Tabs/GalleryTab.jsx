import { useState } from "react"
import { Star, Upload, X, ZoomIn, ChevronLeft, ChevronRight, Camera, Check, Image, ChevronDown, ChevronUp } from "lucide-react"

const MOCK_REVIEWS = [
  {
    id: 1, user: "Arjun M.", avatar: "AM", avatarBg: "bg-blue-500",
    rating: 5, date: "12 Feb 2026", verified: true,
    caption: "Absolutely love the quality! Fits perfectly.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    ]
  },
  {
    id: 2, user: "Priya S.", avatar: "PS", avatarBg: "bg-rose-500",
    rating: 4, date: "8 Feb 2026", verified: true,
    caption: "Great product, color is exactly as shown.",
    images: ["https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80"]
  },
  {
    id: 3, user: "Rahul K.", avatar: "RK", avatarBg: "bg-emerald-500",
    rating: 5, date: "5 Feb 2026", verified: false,
    caption: "Wore this to the gym, super comfortable and stylish!",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&q=80",
    ]
  },
  {
    id: 4, user: "Sneha D.", avatar: "SD", avatarBg: "bg-violet-500",
    rating: 3, date: "1 Feb 2026", verified: true,
    caption: "Decent product. Stitching could be better.",
    images: ["https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80"]
  },
  {
    id: 5, user: "Vikram J.", avatar: "VJ", avatarBg: "bg-amber-500",
    rating: 5, date: "28 Jan 2026", verified: true,
    caption: "Best purchase of the month, very happy!",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
    ]
  },
  {
    id: 6, user: "Meera R.", avatar: "MR", avatarBg: "bg-pink-500",
    rating: 4, date: "22 Jan 2026", verified: false,
    caption: "Stylish and lightweight. Will buy again.",
    images: ["https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80"]
  },
]

const Stars = ({ count, size = 12 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <Star key={i} size={size} className={i <= count ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
    ))}
  </div>
)

// ─── Lightbox — shows image + reviewer card side by side ─────────────────────
const Lightbox = ({ images, startIndex, review, onClose }) => {
  const [idx, setIdx] = useState(startIndex)
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length)
  const next = () => setIdx(i => (i + 1) % images.length)

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="relative flex flex-col sm:flex-row w-full max-w-3xl max-h-[92vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Image side ── */}
        <div className="relative flex-1 bg-gray-950 min-h-[260px] flex items-center justify-center">
          <img
            src={images[idx]}
            alt=""
            className="w-full h-full object-contain max-h-[55vh] sm:max-h-[88vh]"
          />

          {images.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all">
                <ChevronLeft size={16} />
              </button>
              <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all">
                <ChevronRight size={16} />
              </button>
              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)} className={`h-1 rounded-full transition-all ${i === idx ? 'bg-white w-5' : 'bg-white/40 w-1.5'}`} />
                ))}
              </div>
            </>
          )}

          <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all">
            <X size={14} />
          </button>
        </div>

        {/* ── Reviewer info side ── */}
        <div className="w-full sm:w-60 flex flex-col p-4 gap-3 overflow-y-auto border-l border-gray-100">
          {/* Reviewer */}
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-full ${review.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
              {review.avatar}
            </div>
            <div>
              <div className="flex items-center gap-1 flex-wrap">
                <p className="text-sm font-bold text-gray-900">{review.user}</p>
                {review.verified && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-px bg-blue-50 text-blue-500 text-[9px] font-bold rounded-full">
                    <Check size={8} /> Verified
                  </span>
                )}
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5">{review.date}</p>
            </div>
          </div>

          <Stars count={review.rating} size={14} />

          {review.caption && (
            <p className="text-xs text-gray-600 leading-relaxed">{review.caption}</p>
          )}

          {/* Thumbnail strip if multiple images */}
          {images.length > 1 && (
            <div className="mt-auto pt-3 border-t border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">More from this review</p>
              <div className="flex gap-1.5 flex-wrap">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`w-12 h-12 rounded-lg overflow-hidden transition-all shrink-0 ${i === idx ? 'ring-2 ring-blue-500 ring-offset-1' : 'opacity-50 hover:opacity-80'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ═══ MAIN GalleryTab ══════════════════════════════════════════════════════════
const PHOTO_LIMIT = 8

const GalleryTab = ({ extraReviews = [] }) => {
  const allReviews = [...extraReviews, ...MOCK_REVIEWS]
  const [expanded, setExpanded] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [lightbox, setLightbox] = useState(null)

  // Flatten to { review, src, imgIdx }
  const allImages = allReviews.flatMap(r =>
    r.images.map((src, i) => ({ review: r, src, imgIdx: i }))
  )
  const totalPhotos = allImages.length
  const avgRating = allReviews.length
    ? (allReviews.reduce((a, r) => a + r.rating, 0) / allReviews.length).toFixed(1)
    : "0"

  const visible = showAll ? allImages : allImages.slice(0, PHOTO_LIMIT)
  const remaining = totalPhotos - PHOTO_LIMIT

  return (
    <div className="w-full">

      {/* ── Collapsed trigger ── */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-gray-50 hover:bg-gray-100/80 border border-gray-100 transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          {/* Stacked preview */}
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
              <span className="text-[11px] font-medium text-gray-400">{totalPhotos} photos</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Stars count={Math.round(Number(avgRating))} size={11} />
              <span className="text-[11px] text-gray-400">{avgRating} avg · {allReviews.length} reviewers</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-400 group-hover:text-gray-600 transition-colors">
          <span className="text-xs font-semibold hidden sm:block">{expanded ? "Close" : "View photos"}</span>
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
      </button>

      {/* ── Expanded: photos only ── */}
      {expanded && (
        <div className="mt-3 flex flex-col gap-3">

          {/* Subheading */}
          <p className="text-xs text-gray-400 font-medium">
            {showAll ? `All ${totalPhotos} photos` : `${Math.min(PHOTO_LIMIT, totalPhotos)} of ${totalPhotos} photos`} · click to view details
          </p>

          {/* Grid */}
          <div className="grid grid-cols-4 gap-2">
            {visible.map((item, idx) => {
              const isLast = !showAll && idx === PHOTO_LIMIT - 1 && remaining > 0
              return (
                <div
                  key={`${item.review.id}-${item.imgIdx}`}
                  className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer group"
                  onClick={() => isLast
                    ? setShowAll(true)
                    : setLightbox({ review: item.review, startIndex: item.imgIdx })
                  }
                >
                  <img
                    src={item.src}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Hover zoom */}
                  {!isLast && (
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                      {/* Reviewer name on hover */}
                      <div className="flex items-center gap-1">
                        <div className={`w-4 h-4 rounded-full ${item.review.avatarBg} flex items-center justify-center text-white text-[7px] font-bold shrink-0`}>
                          {item.review.avatar}
                        </div>
                        <p className="text-white text-[10px] font-semibold truncate leading-none">{item.review.user}</p>
                      </div>
                    </div>
                  )}

                  {/* +N more overlay */}
                  {isLast && (
                    <div className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center gap-0.5">
                      <span className="text-white font-black text-xl leading-none">+{remaining}</span>
                      <span className="text-white/70 text-[10px] font-semibold">more</span>
                    </div>
                  )}

                  {/* Multi-image badge */}
                  {!isLast && item.imgIdx === 0 && item.review.images.length > 1 && (
                    <div className="absolute top-1.5 right-1.5 bg-black/55 text-white text-[9px] font-bold px-1.5 py-px rounded-full flex items-center gap-0.5">
                      <Image size={8} />{item.review.images.length}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Show less */}
          {showAll && remaining > 0 && (
            <button onClick={() => setShowAll(false)} className="text-xs text-gray-400 hover:text-gray-600 font-semibold text-center transition-colors py-1">
              Show less ↑
            </button>
          )}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          images={lightbox.review.images}
          startIndex={lightbox.startIndex}
          review={lightbox.review}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  )
}

export default GalleryTab