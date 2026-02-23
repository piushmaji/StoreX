import { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { TrendingDown, TrendingUp, Minus } from "lucide-react"

const ALL_DATA = [
  { date: "Mar", price: 3199 },
  { date: "Apr", price: 3099 },
  { date: "May", price: 3299 },
  { date: "Jun", price: 2999 },
  { date: "Jul", price: 3199 },
  { date: "Aug", price: 3399 },
  { date: "Sep", price: 3249 },
  { date: "Oct", price: 2799 },
  { date: "Nov", price: 3499 },
  { date: "Dec", price: 2499 },
  { date: "Jan", price: 2899 },
  { date: "Feb", price: 2699 },
]

const FILTERS = [
  { label: "1M", slice: 3 },
  { label: "3M", slice: 3 },
  { label: "6M", slice: 6 },
  { label: "1Y", slice: 12 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: "#111827", color: "#fff", padding: "8px 12px", borderRadius: 12, fontSize: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}>
      <p style={{ color: "#9ca3af", margin: "0 0 2px" }}>{label}</p>
      <p style={{ fontWeight: 900, fontSize: 16, margin: 0 }}>₹{payload[0].value.toLocaleString()}</p>
    </div>
  )
}

export default function PriceHistoryChart() {
  const currentPrice = 2699
  const [active, setActive] = useState("1Y")

  const data = ALL_DATA.slice(-(FILTERS.find(f => f.label === active).slice))
  const prices = data.map(d => d.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const diff = currentPrice - data[0].price
  const pct = Math.abs(((diff / data[0].price) * 100).toFixed(1))
  const trend = diff < 0 ? "down" : diff > 0 ? "up" : "flat"

  return (
    <div className="bg-slate-50 flex items-center justify-center p-5">
      <div className="w-full bg-white rounded-3xl border border-gray-100 p-5 shadow-xl shadow-slate-100">

        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-[15px] font-black text-gray-900">Price History</p>
            <div className="flex items-center gap-1.5 mt-1">
              {trend === "down" && <TrendingDown size={13} className="text-emerald-500" />}
              {trend === "up" && <TrendingUp size={13} className="text-red-400" />}
              {trend === "flat" && <Minus size={13} className="text-gray-400" />}
              <span className={`text-xs font-bold ${trend === "down" ? "text-emerald-500" : trend === "up" ? "text-red-400" : "text-gray-400"}`}>
                {trend === "flat" ? "No change" : `${pct}% ${trend === "down" ? "cheaper" : "costlier"}`}
              </span>
              <span className="text-[10px] text-gray-400">vs {active} ago</span>
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex gap-1">
            {FILTERS.map(f => (
              <button
                key={f.label}
                onClick={() => setActive(f.label)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer border-0 ${active === f.label
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Stat pills ── */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { label: "Current", value: currentPrice, cls: "text-blue-600" },
            { label: "Lowest", value: minPrice, cls: "text-emerald-600" },
            { label: "Highest", value: maxPrice, cls: "text-red-400" },
          ].map(({ label, value, cls }) => (
            <div key={label} className="flex flex-col items-center py-2.5 rounded-2xl bg-gray-50">
              <span className="text-[10px] text-gray-400 font-medium">{label}</span>
              <span className={`text-sm font-black ${cls}`}>₹{value.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* ── Chart ── */}
        <div style={{ height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis hide domain={[minPrice - 300, maxPrice + 300]} />
              <Tooltip content={<CustomTooltip />} />

              {/* Lowest price dashed line */}
              <ReferenceLine y={minPrice} stroke="#10b991" strokeDasharray="4 3" strokeWidth={1.5} />

              <Area
                type="monotone"
                dataKey="price"
                stroke="#2563eb"
                strokeWidth={2.5}
                fill="url(#priceGrad)"
                dot={false}
                activeDot={{ r: 5, fill: "#2563eb", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* ── Footer ── */}
        <p className="text-[11px] text-gray-400 text-center mt-3">
          {currentPrice <= minPrice
            ? "🎉 Lowest price ever — great time to buy!"
            : `₹${(currentPrice - minPrice).toLocaleString()} above all‑time low · 🟢 dashed line = lowest`}
        </p>
      </div>
    </div>
  )
}