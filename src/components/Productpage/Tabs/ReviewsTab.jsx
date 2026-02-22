import { useState } from 'react'
import { Star, ThumbsUp, ThumbsDown, CheckCircle, Filter } from 'lucide-react'

const DUMMY_REVIEWS = [
  {
    id: 1,
    name: 'Arjun Mehta',
    avatar: 'AM',
    rating: 5,
    date: 'Jan 15, 2026',
    title: 'Absolutely love this product!',
    body: 'The quality is outstanding. I have been using it for a month now and it still looks brand new. Highly recommend to everyone looking for premium quality.',
    helpful: 24,
    verified: true,
    color: 'bg-blue-600',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    avatar: 'PS',
    rating: 4,
    date: 'Jan 8, 2026',
    title: 'Great value for money',
    body: 'Really good product overall. The material feels premium and the finish is excellent. Only minor issue is the sizing runs slightly small, so order one size up.',
    helpful: 18,
    verified: true,
    color: 'bg-indigo-500',
  },
  {
    id: 3,
    name: 'Rohan Das',
    avatar: 'RD',
    rating: 3,
    date: 'Dec 28, 2025',
    title: 'Decent but expected more',
    body: 'The product is okay for the price. Delivery was fast and packaging was good. However the color looked slightly different from the photos online.',
    helpful: 9,
    verified: false,
    color: 'bg-slate-500',
  },
  {
    id: 4,
    name: 'Sneha Kapoor',
    avatar: 'SK',
    rating: 5,
    date: 'Dec 20, 2025',
    title: 'Exceeded my expectations!',
    body: 'Wow, I am genuinely impressed. The craftsmanship is top notch and it fits perfectly. Will definitely be buying more from this seller.',
    helpful: 31,
    verified: true,
    color: 'bg-blue-500',
  },
]

const RATING_BREAKDOWN = [
  { stars: 5, count: 68, pct: 68 },
  { stars: 4, count: 18, pct: 18 },
  { stars: 3, count: 8, pct: 8 },
  { stars: 2, count: 4, pct: 4 },
  { stars: 1, count: 2, pct: 2 },
]

const StarRow = ({ value, size = 16 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(s => (
      <Star
        key={s}
        size={size}
        className={s <= value ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
      />
    ))}
  </div>
)

const ReviewsTab = ({ product }) => {
  const [helpful, setHelpful] = useState({})
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? DUMMY_REVIEWS : DUMMY_REVIEWS.filter(r => r.rating === Number(filter))

  return (
    <div className="flex flex-col gap-7">

      {/* ── Summary Card ── */}
      <div className="flex flex-col sm:flex-row gap-6 bg-linear-to-br from-blue-50 to-slate-50 rounded-2xl p-6 border border-blue-100">

        {/* Big Score */}
        <div className="flex flex-col items-center justify-center sm:w-40 shrink-0 gap-1">
          <span className="text-6xl font-black text-gray-900">{product?.rating?.score ?? '4.6'}</span>
          <StarRow value={Math.round(product?.rating?.stars ?? 4.6)} size={18} />
          <span className="text-xs text-gray-400 mt-1">{product?.rating?.reviews ?? '3470'} reviews</span>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px bg-blue-200" />

        {/* Breakdown Bars */}
        <div className="flex-1 flex flex-col gap-2 justify-center">
          {RATING_BREAKDOWN.map(({ stars, count, pct }) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-500 w-3">{stars}</span>
              <Star size={12} className="text-amber-400 fill-amber-400 shrink-0" />
              <div className="flex-1 h-2 bg-blue-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 w-6 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Filter Pills ── */}
      <div className="flex flex-wrap gap-2">
        {['All', '5', '4', '3', '2', '1'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200
                            ${filter === f
                ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200'
                : 'bg-white border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600'
              }`}
          >
            {f !== 'All' && <Star size={11} className={filter === f ? 'fill-white text-white' : 'fill-amber-400 text-amber-400'} />}
            {f}
          </button>
        ))}
      </div>

      {/* ── Review Cards ── */}
      <div className="flex flex-col gap-4">
        {filtered.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl border border-blue-100 p-5 hover:border-blue-200 hover:shadow-md hover:shadow-blue-50 transition-all duration-200">

            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className={`${r.color} w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                {r.avatar}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-gray-900">{r.name}</span>
                  {r.verified && (
                    <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle size={11} />
                      Verified
                    </span>
                  )}
                  <span className="text-xs text-gray-400 ml-auto">{r.date}</span>
                </div>

                <StarRow value={r.rating} size={13} />

                <p className="text-sm font-semibold text-gray-800 mt-2">{r.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed mt-1">{r.body}</p>

                {/* Helpful */}
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs text-gray-400">Helpful?</span>
                  <button
                    onClick={() => setHelpful(h => ({ ...h, [r.id]: h[r.id] === 'up' ? null : 'up' }))}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200
                                            ${helpful[r.id] === 'up'
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600'
                      }`}
                  >
                    <ThumbsUp size={12} />
                    {r.helpful + (helpful[r.id] === 'up' ? 1 : 0)}
                  </button>
                  <button
                    onClick={() => setHelpful(h => ({ ...h, [r.id]: h[r.id] === 'down' ? null : 'down' }))}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200
                                            ${helpful[r.id] === 'down'
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'bg-white border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500'
                      }`}
                  >
                    <ThumbsDown size={12} />
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Write a Review CTA ── */}
      <div className="flex flex-col items-center gap-3 bg-linear-to-br from-blue-50 to-slate-50 rounded-2xl p-6 border border-blue-100 text-center">
        <p className="text-sm font-bold text-gray-800">Share your experience</p>
        <p className="text-xs text-gray-400">Help others make better decisions</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md shadow-blue-200 hover:shadow-lg transition-all duration-200 active:scale-95">
          Write a Review
        </button>
      </div>

    </div>
  )
}

export default ReviewsTab