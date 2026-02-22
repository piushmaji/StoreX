import { useState, useRef } from 'react'
import { Star, X, CheckCircle, ThumbsUp, Camera, ZoomIn } from 'lucide-react'

const SEED = [
  { id: 1, name: 'Arjun M.', avatar: 'AM', color: 'bg-blue-500', rating: 5, date: 'Jan 15', verified: true, body: 'Outstanding quality. Fits perfectly and looks exactly like the photos.', helpful: 24, images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80"] },
  { id: 2, name: 'Priya S.', avatar: 'PS', color: 'bg-rose-400', rating: 4, date: 'Jan 8', verified: true, body: 'Great value. Material feels premium. Size runs small — go one up.', helpful: 18, images: [] },
  { id: 3, name: 'Sneha K.', avatar: 'SK', color: 'bg-violet-500', rating: 5, date: 'Dec 20', verified: true, body: 'Genuinely impressed. Craftsmanship is top notch. Will buy again.', helpful: 31, images: ["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&q=80", "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&q=80"] },
  { id: 4, name: 'Rohan D.', avatar: 'RD', color: 'bg-slate-400', rating: 3, date: 'Dec 28', verified: false, body: 'Decent for the price. Color slightly different from photos.', helpful: 9, images: [] },
]

const LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!']
const BREAKDOWN = [{ s: 5, p: 68 }, { s: 4, p: 18 }, { s: 3, p: 8 }, { s: 2, p: 4 }, { s: 1, p: 2 }]

const Stars = ({ n, size = 13 }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={size} className={i <= n ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />)}
  </div>
)

// ── Popup Form ────────────────────────────────────────────────────────────────
const ReviewPopup = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [body, setBody] = useState('')
  const [photos, setPhotos] = useState([])
  const ref = useRef()

  const addFiles = f => Array.from(f).filter(x => x.type.startsWith('image/')).forEach(x => {
    const r = new FileReader()
    r.onload = e => setPhotos(p => [...p, e.target.result].slice(0, 4))
    r.readAsDataURL(x)
  })

  const ok = name.trim() && rating && body.trim()

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <div>
            <p className="text-base font-extrabold text-gray-900">Write a Review</p>
            <p className="text-xs text-gray-400">Your opinion helps others</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <X size={14} className="text-gray-500" />
          </button>
        </div>

        <div className="px-5 pb-6 flex flex-col gap-4">
          {/* Name */}
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
            className="w-full text-sm border-0 bg-gray-100 rounded-xl px-4 py-3 outline-none placeholder:text-gray-400 font-medium focus:ring-2 focus:ring-blue-200 transition-all" />

          {/* Star picker */}
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map(i => (
                <button key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)} onClick={() => setRating(i)} className="transition-transform hover:scale-110 active:scale-95">
                  <Star size={34} className={`transition-all ${i <= (hover || rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
                </button>
              ))}
              {(hover || rating) > 0 && <span className="ml-1 self-center text-sm font-bold text-gray-500">{LABELS[hover || rating]}</span>}
            </div>
          </div>

          {/* Body */}
          <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="What did you think? Fit, quality, look..." rows={3}
            className="w-full text-sm border-0 bg-gray-100 rounded-xl px-4 py-3 outline-none resize-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-200 transition-all" />

          {/* Photo upload */}
          <div className="flex gap-2 flex-wrap">
            {photos.map((src, i) => (
              <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden group">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button onClick={() => setPhotos(p => p.filter((_, j) => j !== i))} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <X size={14} className="text-white" />
                </button>
              </div>
            ))}
            {photos.length < 4 && (
              <button onClick={() => ref.current.click()} className="w-16 h-16 rounded-xl bg-gray-100 hover:bg-gray-200 flex flex-col items-center justify-center gap-1 transition-colors group">
                <Camera size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-[9px] font-bold text-gray-400 group-hover:text-blue-500">Photo</span>
              </button>
            )}
            <input ref={ref} type="file" accept="image/*" multiple className="hidden" onChange={e => addFiles(e.target.files)} />
          </div>

          {/* Submit */}
          <button disabled={!ok} onClick={() => onSubmit({ name, rating, body, images: photos })}
            className="w-full h-12 rounded-2xl bg-gray-900 hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-400 text-white font-extrabold text-sm transition-all active:scale-[0.98] shadow-lg shadow-gray-200 disabled:shadow-none">
            {ok ? 'Post Review' : 'Fill in the fields above'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Image viewer ──────────────────────────────────────────────────────────────
const Viewer = ({ images, i, onClose }) => {
  const [idx, setIdx] = useState(i)
  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-sm w-full flex flex-col items-center gap-3" onClick={e => e.stopPropagation()}>
        <img src={images[idx]} alt="" className="w-full rounded-2xl object-contain max-h-[70vh]" />
        {images.length > 1 && <div className="flex gap-2">{images.map((img, j) => <button key={j} onClick={() => setIdx(j)} className={`w-10 h-10 rounded-lg overflow-hidden transition-all ${j === idx ? 'ring-2 ring-white' : 'opacity-40'}`}><img src={img} alt="" className="w-full h-full object-cover" /></button>)}</div>}
        <button onClick={onClose} className="absolute -top-1 -right-1 w-7 h-7 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white"><X size={13} /></button>
      </div>
    </div>
  )
}

// ── Review Card ───────────────────────────────────────────────────────────────
const Card = ({ r }) => {
  const [liked, setLiked] = useState(false)
  const [viewer, setViewer] = useState(null)
  return (
    <div className="py-4 border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-3">
        <div className={`${r.color} w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0`}>{r.avatar}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-gray-900">{r.name}</span>
            {r.verified && <CheckCircle size={12} className="text-emerald-500" />}
            <span className="text-xs text-gray-400 ml-auto">{r.date}</span>
          </div>
          <Stars n={r.rating} size={11} />
          <p className="text-xs text-gray-500 leading-relaxed mt-1.5">{r.body}</p>

          {r.images?.length > 0 && (
            <div className="flex gap-1.5 mt-2">
              {r.images.map((img, i) => (
                <button key={i} onClick={() => setViewer(i)} className="w-14 h-14 rounded-xl overflow-hidden group relative">
                  <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                    <ZoomIn size={13} className="text-white" />
                  </div>
                </button>
              ))}
            </div>
          )}

          <button onClick={() => setLiked(l => !l)} className={`mt-2 inline-flex items-center gap-1 text-[11px] font-semibold transition-colors ${liked ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'}`}>
            <ThumbsUp size={11} /> {r.helpful + (liked ? 1 : 0)} helpful
          </button>
        </div>
      </div>
      {viewer !== null && <Viewer images={r.images} i={viewer} onClose={() => setViewer(null)} />}
    </div>
  )
}

// ═══ MAIN ═════════════════════════════════════════════════════════════════════
const ReviewsTab = ({ product }) => {
  const [reviews, setReviews] = useState(SEED)
  const [filter, setFilter] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const [popup, setPopup] = useState(false)
  const [toast, setToast] = useState(false)

  const avg = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
  const filtered = filter ? reviews.filter(r => r.rating === filter) : reviews
  const visible = showAll ? filtered : filtered.slice(0, 3)

  const handleSubmit = ({ name, rating, body, images }) => {
    const initials = name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    const colors = ['bg-blue-500', 'bg-rose-400', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500']
    setReviews(p => [{ id: Date.now(), name, avatar: initials, color: colors[Math.floor(Math.random() * colors.length)], rating, date: 'Now', verified: false, body, helpful: 0, images }, ...p])
    setPopup(false)
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  return (
    <div className="flex flex-col gap-5">

      {/* ── Summary ── */}
      <div className="flex gap-5 p-4 bg-gray-50 rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-1 shrink-0 w-24">
          <span className="text-4xl font-black text-gray-900">{product?.rating?.score ?? avg}</span>
          <Stars n={Math.round(avg)} size={12} />
          <span className="text-[10px] text-gray-400">{reviews.length} reviews</span>
        </div>
        <div className="flex-1 flex flex-col gap-1.5 justify-center">
          {BREAKDOWN.map(({ s, p }) => (
            <div key={s} className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 w-2">{s}</span>
              <Star size={9} className="text-amber-400 fill-amber-400" />
              <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${p}%` }} />
              </div>
              <span className="text-[10px] text-gray-400 w-5 text-right">{p}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Filter + Add button ── */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[0, 5, 4, 3, 2, 1].map(f => (
          <button key={f} onClick={() => { setFilter(f); setShowAll(false) }}
            className={`shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${filter === f ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400'}`}>
            {f ? <><Star size={9} className={filter === f ? 'fill-white text-white' : 'fill-amber-400 text-amber-400'} />{f}</> : 'All'}
          </button>
        ))}
        <button onClick={() => setPopup(true)} className="shrink-0 ml-auto px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition-all active:scale-95 shadow-sm shadow-blue-200">
          + Add Review
        </button>
      </div>

      {/* ── Toast ── */}
      {toast && <div className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl">✓ Review posted — thank you!</div>}

      {/* ── Reviews ── */}
      <div className="divide-y divide-gray-100">
        {visible.length === 0
          ? <p className="text-center py-8 text-xs text-gray-400">No reviews for this rating.</p>
          : visible.map(r => <Card key={r.id} r={r} />)
        }
      </div>

      {/* Show more */}
      {!showAll && filtered.length > 3 && (
        <button onClick={() => setShowAll(true)} className="text-xs font-bold text-gray-400 hover:text-gray-700 transition-colors text-center py-1">
          Show {filtered.length - 3} more ↓
        </button>
      )}
      {showAll && filtered.length > 3 && (
        <button onClick={() => setShowAll(false)} className="text-xs font-bold text-gray-400 hover:text-gray-700 transition-colors text-center py-1">
          Show less ↑
        </button>
      )}

      {/* ── Popup ── */}
      {popup && <ReviewPopup onClose={() => setPopup(false)} onSubmit={handleSubmit} />}
    </div>
  )
}

export default ReviewsTab