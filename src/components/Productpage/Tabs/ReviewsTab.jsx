import { useState, useRef } from 'react'
import { Star, ThumbsUp, ThumbsDown, CheckCircle, Camera, Upload, X, Plus, ChevronDown, ChevronUp, ZoomIn } from 'lucide-react'

// ─── Seed data ────────────────────────────────────────────────────────────────
const SEED_REVIEWS = [
    {
        id: 1, name: 'Arjun Mehta', avatar: 'AM', color: 'bg-blue-500',
        rating: 5, date: 'Jan 15, 2026', verified: true,
        title: 'Absolutely love this product!',
        body: 'The quality is outstanding. Ive been using it for a month and it still looks brand new. Highly recommend.',
        helpful: 24,
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
        ]
    },
    {
        id: 2, name: 'Priya Sharma', avatar: 'PS', color: 'bg-rose-500',
        rating: 4, date: 'Jan 8, 2026', verified: true,
        title: 'Great value for money',
        body: 'Really good product overall. The material feels premium and finish is excellent. Sizing runs slightly small, order one size up.',
        helpful: 18,
        images: [
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&q=80",
        ]
    },
    {
        id: 3, name: 'Rohan Das', avatar: 'RD', color: 'bg-slate-500',
        rating: 3, date: 'Dec 28, 2025', verified: false,
        title: 'Decent but expected more',
        body: 'The product is okay for the price. Delivery was fast and packaging was good. Color looked slightly different from the photos.',
        helpful: 9,
        images: []
    },
    {
        id: 4, name: 'Sneha Kapoor', avatar: 'SK', color: 'bg-violet-500',
        rating: 5, date: 'Dec 20, 2025', verified: true,
        title: 'Exceeded my expectations!',
        body: 'Genuinely impressed. Craftsmanship is top notch and it fits perfectly. Will definitely be buying more from this seller.',
        helpful: 31,
        images: [
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&q=80",
        ]
    },
]

const RATING_BREAKDOWN = [
    { stars: 5, pct: 68 }, { stars: 4, pct: 18 },
    { stars: 3, pct: 8 }, { stars: 2, pct: 4 }, { stars: 1, pct: 2 },
]

const Stars = ({ count, size = 13 }) => (
    <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(s => (
            <Star key={s} size={size} className={s <= count ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
        ))}
    </div>
)

// ─── Quick image viewer ───────────────────────────────────────────────────────
const ImageViewer = ({ images, startIdx, onClose }) => {
    const [idx, setIdx] = useState(startIdx)
    return (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
            <div className="relative max-w-lg w-full" onClick={e => e.stopPropagation()}>
                <img src={images[idx]} alt="" className="w-full rounded-2xl object-contain max-h-[80vh]" />
                {images.length > 1 && (
                    <div className="flex gap-2 justify-center mt-3">
                        {images.map((img, i) => (
                            <button key={i} onClick={() => setIdx(i)}
                                className={`w-10 h-10 rounded-lg overflow-hidden transition-all ${i === idx ? 'ring-2 ring-white ring-offset-1 ring-offset-black' : 'opacity-50 hover:opacity-80'}`}>
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
                <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white">
                    <X size={14} />
                </button>
            </div>
        </div>
    )
}

// ─── Write Review Form ────────────────────────────────────────────────────────
const WriteReviewForm = ({ onSubmit, onCancel }) => {
    const [name, setName] = useState('')
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [previews, setPreviews] = useState([])
    const fileRef = useRef()

    const addFiles = files => {
        Array.from(files).filter(f => f.type.startsWith('image/')).forEach(f => {
            const r = new FileReader()
            r.onload = e => setPreviews(p => [...p, e.target.result].slice(0, 4))
            r.readAsDataURL(f)
        })
    }

    const canPost = name.trim() && rating > 0 && body.trim()

    return (
        <div className="border-2 border-blue-100 bg-blue-50/30 rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <p className="text-sm font-extrabold text-gray-800">Write a Review</p>
                <button onClick={onCancel} className="w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-400 transition-colors">
                    <X size={13} />
                </button>
            </div>

            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                className="w-full text-sm border-2 border-gray-200 focus:border-blue-400 rounded-xl px-3 py-2 outline-none transition-all placeholder:text-gray-300 bg-white" />

            {/* Star picker */}
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                    <button key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)} onClick={() => setRating(i)} className="transition-transform hover:scale-110">
                        <Star size={24} className={`transition-colors ${i <= (hover || rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
                    </button>
                ))}
                {rating > 0 && <span className="ml-1 text-xs font-bold text-gray-400">{['','Poor','Fair','Good','Great','Excellent!'][rating]}</span>}
            </div>

            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Review title (optional)"
                className="w-full text-sm border-2 border-gray-200 focus:border-blue-400 rounded-xl px-3 py-2 outline-none transition-all placeholder:text-gray-300 bg-white" />

            <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Tell us what you think..." rows={3}
                className="w-full text-sm border-2 border-gray-200 focus:border-blue-400 rounded-xl px-3 py-2 outline-none transition-all resize-none placeholder:text-gray-300 bg-white" />

            {/* Photo upload */}
            <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Add Photos <span className="normal-case font-normal">(optional, up to 4)</span></p>
                <div className="flex gap-2 flex-wrap">
                    {previews.map((src, i) => (
                        <div key={i} className="relative w-14 h-14 rounded-xl overflow-hidden group">
                            <img src={src} alt="" className="w-full h-full object-cover" />
                            <button onClick={() => setPreviews(p => p.filter((_, j) => j !== i))}
                                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <X size={12} className="text-white" />
                            </button>
                        </div>
                    ))}
                    {previews.length < 4 && (
                        <button onClick={() => fileRef.current.click()}
                            className={`rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 text-gray-300 hover:text-blue-400 flex flex-col items-center justify-center gap-1 transition-all ${previews.length === 0 ? 'w-full h-16' : 'w-14 h-14'}`}>
                            <Camera size={previews.length === 0 ? 18 : 14} />
                            {previews.length === 0 && <span className="text-xs font-semibold">Add photos</span>}
                        </button>
                    )}
                    <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => addFiles(e.target.files)} />
                </div>
            </div>

            <div className="flex gap-2 pt-1">
                <button onClick={onCancel} className="flex-1 h-9 rounded-xl border-2 border-gray-200 text-xs font-bold text-gray-400 hover:bg-gray-50 transition-all">Cancel</button>
                <button disabled={!canPost} onClick={() => onSubmit({ name, rating, title, body, images: previews })}
                    className="flex-1 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-300 text-white font-bold text-xs transition-all shadow-sm shadow-blue-100 disabled:shadow-none">
                    Post Review
                </button>
            </div>
        </div>
    )
}

// ─── Single Review Card ───────────────────────────────────────────────────────
const ReviewCard = ({ review }) => {
    const [helpful, setHelpful] = useState(null)
    const [viewer, setViewer] = useState(null)

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-blue-100 hover:shadow-sm transition-all duration-200">
            <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className={`${review.color} w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {review.avatar}
                </div>

                <div className="flex-1 min-w-0">
                    {/* Name + date */}
                    <div className="flex items-center flex-wrap gap-1.5 mb-1">
                        <span className="text-sm font-bold text-gray-900">{review.name}</span>
                        {review.verified && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-px bg-emerald-50 text-emerald-600 text-[9px] font-bold rounded-full">
                                <CheckCircle size={8} /> Verified
                            </span>
                        )}
                        <span className="text-xs text-gray-400 ml-auto shrink-0">{review.date}</span>
                    </div>

                    <Stars count={review.rating} size={12} />

                    {review.title && <p className="text-xs font-bold text-gray-800 mt-1.5">{review.title}</p>}
                    <p className="text-xs text-gray-500 leading-relaxed mt-1">{review.body}</p>

                    {/* ── Uploaded photos under review ── */}
                    {review.images?.length > 0 && (
                        <div className="flex gap-1.5 mt-2.5 overflow-x-auto no-scrollbar">
                            {review.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setViewer(i)}
                                    className="shrink-0 w-14 h-14 rounded-xl overflow-hidden group relative transition-all hover:ring-2 hover:ring-blue-400 hover:ring-offset-1"
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                                        <ZoomIn size={14} className="text-white" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Helpful */}
                    <div className="flex items-center gap-2 mt-3">
                        <span className="text-[11px] text-gray-400">Helpful?</span>
                        <button
                            onClick={() => setHelpful(h => h === 'up' ? null : 'up')}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-bold transition-all ${helpful === 'up' ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-500'}`}
                        >
                            <ThumbsUp size={10} /> {review.helpful + (helpful === 'up' ? 1 : 0)}
                        </button>
                        <button
                            onClick={() => setHelpful(h => h === 'down' ? null : 'down')}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-bold transition-all ${helpful === 'down' ? 'bg-red-500 border-red-500 text-white' : 'border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500'}`}
                        >
                            <ThumbsDown size={10} /> No
                        </button>
                    </div>
                </div>
            </div>

            {/* Image viewer modal */}
            {viewer !== null && (
                <ImageViewer images={review.images} startIdx={viewer} onClose={() => setViewer(null)} />
            )}
        </div>
    )
}

// ═══ MAIN ReviewsTab ══════════════════════════════════════════════════════════
const REVIEW_LIMIT = 3

const ReviewsTab = ({ product }) => {
    const [reviews, setReviews] = useState(SEED_REVIEWS)
    const [filter, setFilter] = useState('All')
    const [showForm, setShowForm] = useState(false)
    const [showAll, setShowAll] = useState(false)
    const [toast, setToast] = useState(false)

    const filtered = filter === 'All' ? reviews : reviews.filter(r => r.rating === Number(filter))
    const visible = showAll ? filtered : filtered.slice(0, REVIEW_LIMIT)
    const hidden = filtered.length - REVIEW_LIMIT

    const handleSubmit = ({ name, rating, title, body, images }) => {
        const initials = name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
        const colors = ['bg-blue-500', 'bg-rose-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500']
        setReviews(p => [{
            id: Date.now(), name, avatar: initials,
            color: colors[Math.floor(Math.random() * colors.length)],
            rating, date: 'Just now', verified: false,
            title, body, helpful: 0, images
        }, ...p])
        setShowForm(false)
        setToast(true)
        setTimeout(() => setToast(false), 3000)
    }

    const avgRating = reviews.length
        ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
        : '0'

    return (
        <div className="flex flex-col gap-5">

            {/* ── Summary ── */}
            <div className="flex flex-col sm:flex-row gap-5 bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-5 border border-blue-100">
                {/* Score */}
                <div className="flex flex-col items-center justify-center sm:w-36 shrink-0 gap-1.5">
                    <span className="text-5xl font-black text-gray-900">{product?.rating?.score ?? avgRating}</span>
                    <Stars count={Math.round(Number(avgRating))} size={16} />
                    <span className="text-xs text-gray-400">{product?.rating?.reviews ?? reviews.length} reviews</span>
                </div>
                <div className="hidden sm:block w-px bg-blue-200" />
                {/* Bars */}
                <div className="flex-1 flex flex-col gap-1.5 justify-center">
                    {RATING_BREAKDOWN.map(({ stars, pct }) => (
                        <div key={stars} className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-gray-400 w-2">{stars}</span>
                            <Star size={10} className="text-amber-400 fill-amber-400 shrink-0" />
                            <div className="flex-1 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-[10px] text-gray-400 w-5 text-right">{pct}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Filter pills ── */}
            <div className="flex flex-wrap gap-2">
                {['All', '5', '4', '3', '2', '1'].map(f => (
                    <button key={f} onClick={() => { setFilter(f); setShowAll(false) }}
                        className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${filter === f ? 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-200' : 'bg-white border-gray-200 text-gray-500 hover:border-blue-300'}`}>
                        {f !== 'All' && <Star size={10} className={filter === f ? 'fill-white text-white' : 'fill-amber-400 text-amber-400'} />}
                        {f}
                    </button>
                ))}
            </div>

            {/* ── Toast ── */}
            {toast && (
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-2.5 rounded-xl">
                    ✓ Your review was posted! Thank you.
                </div>
            )}

            {/* ── Write review form / CTA ── */}
            {showForm ? (
                <WriteReviewForm onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
            ) : (
                <button
                    onClick={() => setShowForm(true)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all group"
                >
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                            <Camera size={15} className="text-blue-500" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-gray-700 group-hover:text-blue-700 transition-colors">Write a Review</p>
                            <p className="text-xs text-gray-400">Share your experience + add photos</p>
                        </div>
                    </div>
                    <Plus size={16} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
                </button>
            )}

            {/* ── Review cards ── */}
            <div className="flex flex-col gap-3">
                {visible.length === 0 ? (
                    <div className="text-center py-8 text-xs text-gray-400">No reviews for this rating yet.</div>
                ) : (
                    visible.map(r => <ReviewCard key={r.id} review={r} />)
                )}
            </div>

            {/* Show more / less */}
            {!showAll && hidden > 0 && (
                <button onClick={() => setShowAll(true)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all">
                    <ChevronDown size={13} /> Show {hidden} more review{hidden > 1 ? 's' : ''}
                </button>
            )}
            {showAll && filtered.length > REVIEW_LIMIT && (
                <button onClick={() => setShowAll(false)}
                    className="w-full text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors py-1 flex items-center justify-center gap-1">
                    <ChevronUp size={13} /> Show less
                </button>
            )}
        </div>
    )
}

export default ReviewsTab