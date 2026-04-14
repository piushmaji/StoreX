import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, Filter, ChevronDown, ChevronUp, Eye,
  XCircle, Package, ChevronLeft, ChevronRight,
  ArrowUpDown, Truck, CheckCircle2, Clock, Ban,
  CreditCard, Wallet, X, ShoppingBag, MapPin, Phone, Mail
} from "lucide-react"

// ─── Mock Data ───────────────────────────────────────────────
const MOCK_ORDERS = Array.from({ length: 28 }, (_, i) => ({
  id: `ORD-${String(1000 + i).padStart(5, "0")}`,
  customer: {
    name: ["Arjun Sharma", "Priya Patel", "Rahul Verma", "Sneha Gupta", "Karan Mehta", "Anjali Singh", "Vikram Rao", "Nisha Joshi"][i % 8],
    email: ["arjun@gmail.com", "priya@gmail.com", "rahul@gmail.com", "sneha@gmail.com", "karan@gmail.com", "anjali@gmail.com", "vikram@gmail.com", "nisha@gmail.com"][i % 8],
    phone: `+91 ${9800000000 + i}`,
    address: ["123 MG Road, Mumbai", "45 Park St, Delhi", "78 Brigade Rd, Bangalore", "12 Anna Salai, Chennai"][i % 4],
  },
  products: [
    { name: ["Nike Air Max", "Adidas Ultra Boost", "Levi's 501", "Apple AirPods", "Sony Headphones"][i % 5], qty: (i % 3) + 1, price: [2999, 7999, 3499, 12999, 8999][i % 5] },
    ...(i % 3 === 0 ? [{ name: ["Ray-Ban Sunglasses", "Puma Jacket", "Fossil Watch"][i % 3], qty: 1, price: [4999, 5999, 6999][i % 3] }] : [])
  ],
  total: [2999, 7999, 3499, 12999, 8999, 15998, 11498, 19998][i % 8],
  paymentStatus: ["paid", "paid", "paid", "unpaid", "paid", "unpaid"][i % 6],
  orderStatus: ["pending", "shipped", "delivered", "pending", "shipped", "cancelled", "delivered", "pending"][i % 8],
  date: new Date(2025, 11, 28 - i).toISOString(),
  paymentMethod: ["UPI", "Card", "COD", "Wallet"][i % 4],
}))

const STATUS_CONFIG = {
  pending: { label: "Pending", icon: Clock, bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", dot: "bg-amber-400" },
  shipped: { label: "Shipped", icon: Truck, bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", dot: "bg-blue-500" },
  delivered: { label: "Delivered", icon: CheckCircle2, bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", dot: "bg-emerald-500" },
  cancelled: { label: "Cancelled", icon: Ban, bg: "bg-red-50", text: "text-red-500", border: "border-red-200", dot: "bg-red-400" },
}

const PAYMENT_CONFIG = {
  paid: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
  unpaid: { bg: "bg-red-50", text: "text-red-500", border: "border-red-200" },
}

const PAGE_SIZE = 8

// ─── Status Badge ─────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status]
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}

// ─── Order Detail Modal ───────────────────────────────────────
const OrderModal = ({ order, onClose, onStatusChange }) => {
  if (!order) return null
  const total = order.products.reduce((s, p) => s + p.price * p.qty, 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-blue-500 px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-[10px] font-bold tracking-widest uppercase">Order Details</p>
            <h2 className="text-white font-black text-xl mt-0.5">{order.id}</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
            <X size={15} strokeWidth={2.5} />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Customer */}
          <div className="bg-slate-50 rounded-2xl p-4 space-y-2.5">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Customer</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow">
                {order.customer.name[0]}
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">{order.customer.name}</p>
                <p className="text-slate-400 text-xs">{order.customer.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { icon: Phone, text: order.customer.phone },
                { icon: MapPin, text: order.customer.address },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-slate-500">
                  <Icon size={12} className="text-blue-400 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Items Ordered</p>
            <div className="space-y-2">
              {order.products.map((p, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <ShoppingBag size={13} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{p.name}</p>
                      <p className="text-xs text-slate-400">Qty: {p.qty}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-slate-800">₹{(p.price * p.qty).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-3 px-4 py-3 bg-blue-600 rounded-xl">
              <span className="text-white/80 text-sm font-semibold">Total</span>
              <span className="text-white font-black text-base">₹{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Status + Payment */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Order Status</p>
              <div className="space-y-1.5">
                {Object.keys(STATUS_CONFIG).map(s => (
                  <button
                    key={s}
                    onClick={() => onStatusChange(order.id, s)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all
                                            ${order.orderStatus === s
                        ? `${STATUS_CONFIG[s].bg} ${STATUS_CONFIG[s].text} ${STATUS_CONFIG[s].border} border`
                        : "text-slate-400 hover:bg-slate-100"
                      }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[s].dot}`} />
                    {STATUS_CONFIG[s].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Payment</p>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border mb-3 ${PAYMENT_CONFIG[order.paymentStatus].bg} ${PAYMENT_CONFIG[order.paymentStatus].text} ${PAYMENT_CONFIG[order.paymentStatus].border}`}>
                <CreditCard size={11} />
                {order.paymentStatus === "paid" ? "Paid" : "Unpaid"}
              </div>
              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Wallet size={12} className="text-blue-400" />
                  <span>{order.paymentMethod}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={12} className="text-blue-400" />
                  <span>{new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────
const AdminOrderTable = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [sortField, setSortField] = useState("date")
  const [sortDir, setSortDir] = useState("desc")
  const [page, setPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [filterOpen, setFilterOpen] = useState(false)

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc")
    else { setSortField(field); setSortDir("desc") }
  }

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    setSelectedOrder(prev => prev?.id === orderId ? { ...prev, orderStatus: newStatus } : prev)
  }

  const handleCancel = (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: "cancelled" } : o))
  }

  const filtered = useMemo(() => {
    let data = [...orders]
    if (search) data = data.filter(o =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(search.toLowerCase())
    )
    if (statusFilter !== "all") data = data.filter(o => o.orderStatus === statusFilter)
    if (paymentFilter !== "all") data = data.filter(o => o.paymentStatus === paymentFilter)
    data.sort((a, b) => {
      let va = a[sortField], vb = b[sortField]
      if (sortField === "date") { va = new Date(va); vb = new Date(vb) }
      if (sortField === "customer") { va = a.customer.name; vb = b.customer.name }
      if (va < vb) return sortDir === "asc" ? -1 : 1
      if (va > vb) return sortDir === "asc" ? 1 : -1
      return 0
    })
    return data
  }, [orders, search, statusFilter, paymentFilter, sortField, sortDir])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const SortIcon = ({ field }) => (
    <span className={`ml-1 transition-colors ${sortField === field ? "text-blue-600" : "text-slate-300"}`}>
      {sortField === field
        ? sortDir === "asc" ? <ChevronUp size={13} /> : <ChevronDown size={13} />
        : <ArrowUpDown size={12} />
      }
    </span>
  )

  return (
    <div className="p-6 space-y-5" style={{ fontFamily: "'Sora', sans-serif" }}>

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Orders</h1>
          <p className="text-slate-400 text-sm mt-0.5">{filtered.length} total orders</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-500">Live</span>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Orders", value: orders.length, color: "from-blue-600 to-blue-500", light: "bg-blue-50 text-blue-600" },
          { label: "Pending", value: orders.filter(o => o.orderStatus === "pending").length, color: "from-amber-500 to-amber-400", light: "bg-amber-50 text-amber-600" },
          { label: "Shipped", value: orders.filter(o => o.orderStatus === "shipped").length, color: "from-blue-500 to-sky-400", light: "bg-sky-50 text-sky-600" },
          { label: "Delivered", value: orders.filter(o => o.orderStatus === "delivered").length, color: "from-emerald-500 to-emerald-400", light: "bg-emerald-50 text-emerald-600" },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-slate-800">{stat.value}</p>
            <div className={`mt-2 h-1 rounded-full bg-linear-to-r ${stat.color} opacity-60`} style={{ width: `${(stat.value / orders.length) * 100}%` }} />
          </div>
        ))}
      </div>

      {/* ── Search + Filter Bar ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search by order ID or customer..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-300 focus:bg-white transition-all"
            />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setFilterOpen(o => !o)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${filterOpen ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300"}`}
          >
            <Filter size={14} />
            Filters
            {(statusFilter !== "all" || paymentFilter !== "all") && (
              <span className="w-2 h-2 rounded-full bg-blue-400" />
            )}
          </button>
        </div>

        {/* Filter dropdowns */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-3 pt-4">
                {/* Status filter */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-xs font-bold text-slate-400 self-center mr-1">Status:</span>
                  {["all", "pending", "shipped", "delivered", "cancelled"].map(s => (
                    <button
                      key={s}
                      onClick={() => { setStatusFilter(s); setPage(1) }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all
                                                ${statusFilter === s
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-200"
                        }`}
                    >
                      {s === "all" ? "All" : STATUS_CONFIG[s].label}
                    </button>
                  ))}
                </div>

                {/* Payment filter */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-xs font-bold text-slate-400 self-center mr-1">Payment:</span>
                  {["all", "paid", "unpaid"].map(p => (
                    <button
                      key={p}
                      onClick={() => { setPaymentFilter(p); setPage(1) }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all
                                                ${paymentFilter === p
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-200"
                        }`}
                    >
                      {p === "all" ? "All" : p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>

                {(statusFilter !== "all" || paymentFilter !== "all") && (
                  <button
                    onClick={() => { setStatusFilter("all"); setPaymentFilter("all"); setPage(1) }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-500 bg-red-50 border border-red-200 hover:bg-red-100 transition-all"
                  >
                    <X size={11} /> Clear
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {[
                  { label: "Order ID", field: "id" },
                  { label: "Customer", field: "customer" },
                  { label: "Products", field: null },
                  { label: "Total", field: "total" },
                  { label: "Payment", field: "paymentStatus" },
                  { label: "Status", field: "orderStatus" },
                  { label: "Date", field: "date" },
                  { label: "Actions", field: null },
                ].map(col => (
                  <th
                    key={col.label}
                    onClick={() => col.field && handleSort(col.field)}
                    className={`px-4 py-3.5 text-left text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.15em] whitespace-nowrap
                                            ${col.field ? "cursor-pointer hover:text-blue-600 transition-colors select-none" : ""}`}
                  >
                    <span className="flex items-center">
                      {col.label}
                      {col.field && <SortIcon field={col.field} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center">
                      <Package size={32} className="text-slate-200 mx-auto mb-3" />
                      <p className="text-slate-400 font-semibold text-sm">No orders found</p>
                    </td>
                  </tr>
                ) : paginated.map((order, idx) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="group hover:bg-blue-50/40 transition-colors duration-150"
                  >
                    {/* Order ID */}
                    <td className="px-4 py-4">
                      <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                        {order.id}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-black text-xs shadow-sm shrink-0">
                          {order.customer.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700 whitespace-nowrap">{order.customer.name}</p>
                          <p className="text-[11px] text-slate-400">{order.customer.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Products */}
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        {order.products.slice(0, 2).map((p, i) => (
                          <p key={i} className="text-xs text-slate-600 whitespace-nowrap">
                            <span className="font-semibold">{p.name}</span>
                            <span className="text-slate-400"> ×{p.qty}</span>
                          </p>
                        ))}
                        {order.products.length > 2 && (
                          <p className="text-[10px] text-blue-500 font-semibold">+{order.products.length - 2} more</p>
                        )}
                      </div>
                    </td>

                    {/* Total */}
                    <td className="px-4 py-4">
                      <span className="text-sm font-black text-slate-800">₹{order.total.toLocaleString()}</span>
                    </td>

                    {/* Payment */}
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${PAYMENT_CONFIG[order.paymentStatus].bg} ${PAYMENT_CONFIG[order.paymentStatus].text} ${PAYMENT_CONFIG[order.paymentStatus].border}`}>
                        <CreditCard size={10} />
                        {order.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <StatusBadge status={order.orderStatus} />
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4">
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="w-8 h-8 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-colors"
                          title="View Details"
                        >
                          <Eye size={13} />
                        </button>
                        {order.orderStatus !== "cancelled" && order.orderStatus !== "delivered" && (
                          <button
                            onClick={() => handleCancel(order.id)}
                            className="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors"
                            title="Cancel Order"
                          >
                            <XCircle size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 bg-slate-50/40">
            <p className="text-xs text-slate-400 font-medium">
              Showing <span className="font-bold text-slate-600">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}</span> of <span className="font-bold text-slate-600">{filtered.length}</span>
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-xl border border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:text-blue-600 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={14} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce((acc, p, i, arr) => {
                  if (i > 0 && p - arr[i - 1] > 1) acc.push("...")
                  acc.push(p)
                  return acc
                }, [])
                .map((p, i) => p === "..." ? (
                  <span key={`ellipsis-${i}`} className="w-8 text-center text-slate-400 text-xs">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all
                                            ${page === p
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                        : "border border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:text-blue-600"
                      }`}
                  >
                    {p}
                  </button>
                ))
              }

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 rounded-xl border border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:text-blue-600 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminOrderTable