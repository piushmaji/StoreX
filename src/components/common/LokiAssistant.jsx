import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  Truck,
  Copy,
  Check,
  RefreshCw,
  Gift,
  AlertCircle,
  ArrowRight,
  CornerDownRight,
  Bot,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProduct } from "../../context/admin/ProductContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const WELCOME_MESSAGES = [
  {
    id: "welcome-1",
    sender: "loki",
    text: "Hey there! 👋 I'm Loki, your personal shopping assistant. I can help you discover products, track orders, and unlock exclusive deals.",
    time: "Just now",
  },
  {
    id: "welcome-2",
    sender: "loki",
    text: "What can I help you with today?",
    time: "Just now",
    isQuickActions: true,
  },
];

const QUICK_CHIPS = [
  { id: "recommend", label: "🔍 Help Me Choose", action: "recommend" },
  { id: "track", label: "📦 Track My Order", action: "track" },
  { id: "coupon", label: "🏷️ Active Coupons", action: "coupon" },
  { id: "returns", label: "🔄 Returns & Exchanges", action: "returns" },
];

const LokiAssistant = () => {
  const { products } = useProduct();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState(WELCOME_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedCode, setCopiedCode] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Code "${code}" copied!`, {
      style: {
        background: "#0f172a",
        color: "#e2e8f0",
        border: "1px solid #3b82f6",
        borderRadius: "12px",
        fontSize: "13px",
      },
    });
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const handleSendMessage = (text, customType = null) => {
    if (!text.trim()) return;
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = "";
      let customContent = null;
      const lowerText = text.toLowerCase();

      if (
        customType === "recommend" ||
        lowerText.includes("choose") ||
        lowerText.includes("recommend") ||
        lowerText.includes("product") ||
        lowerText.includes("find")
      ) {
        const recommended =
          products && products.length > 0
            ? products.slice(0, 4)
            : [
                {
                  id: 1,
                  name: "Premium Leather Jacket",
                  slug: "premium-leather-jacket",
                  image_urls: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=300"],
                  rating: 4.9,
                  variants: [{ price: 8999 }],
                  category: { name: "Menswear" },
                },
                {
                  id: 2,
                  name: "Minimalist Chrono Watch",
                  slug: "chrono-watch",
                  image_urls: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300"],
                  rating: 4.8,
                  variants: [{ price: 14500 }],
                  category: { name: "Accessories" },
                },
              ];

        replyText = "Here are some top-rated picks I think you'll love:";
        customContent = (
          <div className="loki-product-scroll">
            {recommended.map((prod) => (
              <div key={prod.id} className="loki-product-card">
                <div className="loki-product-img-wrap">
                  <img
                    src={prod.image_urls?.[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300"}
                    alt={prod.name}
                    className="loki-product-img"
                  />
                  <span className="loki-badge">★ {prod.rating || "5.0"}</span>
                </div>
                <div className="loki-product-info">
                  <p className="loki-product-cat">{prod.category?.name || "Premium"}</p>
                  <h4 className="loki-product-name">{prod.name}</h4>
                  <div className="loki-product-footer">
                    <span className="loki-product-price">₹{prod.variants?.[0]?.price?.toLocaleString() || "5,999"}</span>
                    <Link
                      to={prod.slug ? `/products/${prod.slug}` : "/product"}
                      onClick={() => setIsOpen(false)}
                      className="loki-product-btn"
                    >
                      <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      } else if (
        customType === "track" ||
        lowerText.includes("track") ||
        lowerText.includes("order") ||
        lowerText.includes("stx-")
      ) {
        replyText = "Found your order! Here's the live tracking status:";
        customContent = (
          <div className="loki-track-card">
            <div className="loki-track-header">
              <div>
                <p className="loki-track-label">Order ID</p>
                <p className="loki-track-id">#STX-88402</p>
              </div>
              <span className="loki-track-status">On The Way</span>
            </div>
            <div className="loki-steps">
              {[
                { label: "Order Confirmed", sub: "May 18, 10:24 AM", done: true, active: false },
                { label: "Dispatched", sub: "May 18, 04:15 PM · DHL Express", done: true, active: false },
                { label: "Out for Delivery", sub: "Today, 08:30 AM · 5km away", done: false, active: true },
                { label: "Delivered", sub: "Estimated by evening", done: false, active: false },
              ].map((step, i) => (
                <div key={i} className="loki-step">
                  <div className="loki-step-line-wrap">
                    <div className={`loki-step-dot ${step.done ? "done" : step.active ? "active" : "pending"}`}>
                      {step.done && <Check size={8} strokeWidth={3} />}
                      {step.active && <span className="loki-pulse-dot" />}
                    </div>
                    {i < 3 && <div className={`loki-step-connector ${step.done ? "done" : ""}`} />}
                  </div>
                  <div className="loki-step-text">
                    <p className={`loki-step-label ${step.active ? "active" : ""}`}>{step.label}</p>
                    <p className="loki-step-sub">{step.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      } else if (
        customType === "coupon" ||
        lowerText.includes("coupon") ||
        lowerText.includes("discount") ||
        lowerText.includes("promo") ||
        lowerText.includes("code") ||
        lowerText.includes("offer")
      ) {
        replyText = "Here are your exclusive active offers — tap to copy:";
        customContent = (
          <div className="loki-coupons">
            {[
              { code: "LOKIGOLD20", title: "20% Off Storewide", sub: "Valid on all cart items", icon: <Gift size={14} />, accent: "#3b82f6" },
              { code: "MYSTICFREE", title: "Free Shipping", sub: "On orders above ₹2,000", icon: <Truck size={14} />, accent: "#06b6d4" },
            ].map((c) => (
              <div key={c.code} className="loki-coupon-card">
                <div className="loki-coupon-left">
                  <div className="loki-coupon-icon" style={{ background: `${c.accent}18`, color: c.accent, border: `1px solid ${c.accent}30` }}>
                    {c.icon}
                  </div>
                  <div>
                    <p className="loki-coupon-title">{c.title}</p>
                    <p className="loki-coupon-sub">{c.sub}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(c.code)}
                  className="loki-coupon-btn"
                  style={{ background: copiedCode === c.code ? "#22c55e" : c.accent }}
                >
                  {copiedCode === c.code ? <Check size={10} strokeWidth={3} /> : <Copy size={10} />}
                  <span>{copiedCode === c.code ? "Copied!" : c.code}</span>
                </button>
              </div>
            ))}
          </div>
        );
      } else if (
        customType === "returns" ||
        lowerText.includes("return") ||
        lowerText.includes("exchange") ||
        lowerText.includes("refund")
      ) {
        replyText = "Here's our hassle-free returns policy:";
        customContent = (
          <div className="loki-returns-card">
            <div className="loki-returns-header">
              <AlertCircle size={13} />
              <span>30-Day Easy Returns</span>
            </div>
            {[
              "Keep the item in original condition and packaging.",
              <>Initiate from your <Link to="/profile/orders" onClick={() => setIsOpen(false)} className="loki-link">Order Portal</Link> within 30 days.</>,
              "Free doorstep pickup — no hassle, no cost.",
              "Refund processed in 3–5 business days.",
            ].map((step, i) => (
              <div key={i} className="loki-return-step">
                <span className="loki-return-num">{i + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        );
      } else if (
        lowerText.includes("hello") ||
        lowerText.includes("hi") ||
        lowerText.includes("hey")
      ) {
        replyText = "Hello! Great to meet you 🙌 I'm here to make your shopping experience effortless. What can I help you with?";
      } else {
        replyText = "I'm working on understanding that better! For now, try one of these quick actions:";
        customContent = (
          <div className="loki-quick-grid">
            {QUICK_CHIPS.map((chip) => (
              <button key={chip.id} onClick={() => handleSendMessage(chip.label, chip.action)} className="loki-quick-btn">
                <span>{chip.label}</span>
                <CornerDownRight size={10} />
              </button>
            ))}
          </div>
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `loki-${Date.now()}`,
          sender: "loki",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          customContent,
        },
      ]);
    }, 1200);
  };

  const handleResetChat = () => {
    setMessages(WELCOME_MESSAGES);
    toast.success("Chat cleared!", {
      style: { background: "#0f172a", color: "#e2e8f0", border: "1px solid #3b82f6", borderRadius: "12px" },
    });
  };

  return (
    <>
      <style>{`
        .loki-wrap * { box-sizing: border-box; }

        /* ── Trigger Orb ── */
        .loki-orb {
          position: fixed; bottom: 96px; right: 24px; z-index: 9999;
        }
        @media (min-width: 768px) { .loki-orb { bottom: 24px; } }

        .loki-tooltip {
          position: absolute; bottom: 68px; right: 0;
          background: white; border: 1px solid #e2e8f0;
          border-radius: 16px 16px 4px 16px;
          padding: 10px 14px; width: 200px;
          box-shadow: 0 8px 32px rgba(59,130,246,0.15), 0 2px 8px rgba(0,0,0,0.08);
          font-family: 'DM Sans', sans-serif;
        }
        .loki-tooltip p {
          font-size: 12px; color: #334155; font-weight: 500; line-height: 1.4; margin: 0;
        }
        .loki-tooltip-close {
          position: absolute; top: 6px; right: 8px;
          background: none; border: none; cursor: pointer;
          color: #94a3b8; padding: 2px;
        }
        .loki-tooltip-dot {
          display: inline-block; width: 7px; height: 7px;
          background: #3b82f6; border-radius: 50%;
          animation: pulse-blue 2s infinite; margin-right: 6px;
        }
        @keyframes pulse-blue {
          0%,100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
          50% { box-shadow: 0 0 0 5px rgba(59,130,246,0); }
        }

        .loki-btn {
          width: 56px; height: 56px; border-radius: 50%; border: none; cursor: pointer;
          background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%);
          box-shadow: 0 4px 20px rgba(59,130,246,0.45), 0 0 0 0 rgba(59,130,246,0.3);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s ease; position: relative; overflow: hidden;
          animation: orb-breathe 3s ease-in-out infinite;
        }
        .loki-btn:hover {
          box-shadow: 0 8px 30px rgba(59,130,246,0.6), 0 0 0 8px rgba(59,130,246,0.1);
          transform: scale(1.06);
        }
        .loki-btn::before {
          content: ''; position: absolute; inset: 0; border-radius: 50%;
          background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
        }
        @keyframes orb-breathe {
          0%,100% { box-shadow: 0 4px 20px rgba(59,130,246,0.45); }
          50% { box-shadow: 0 4px 28px rgba(59,130,246,0.65), 0 0 0 6px rgba(59,130,246,0.08); }
        }

        /* ── Chat Panel ── */
        .loki-panel {
          position: fixed; z-index: 9999;
          bottom: 168px; right: 16px;
          width: calc(100vw - 32px);
          height: 560px; max-height: calc(100vh - 200px);
          border-radius: 24px; overflow: hidden;
          display: flex; flex-direction: column;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(24px) saturate(1.8);
          border: 1px solid rgba(59,130,246,0.15);
          box-shadow:
            0 32px 80px rgba(0,0,0,0.12),
            0 8px 32px rgba(59,130,246,0.12),
            0 0 0 1px rgba(255,255,255,0.8) inset;
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        @media (min-width: 640px) {
          .loki-panel { width: 390px; right: 24px; bottom: 96px; }
        }
        @media (min-width: 768px) {
          .loki-panel { bottom: 96px; }
        }

        /* Header */
        .loki-header {
          padding: 16px 18px;
          background: linear-gradient(135deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%);
          display: flex; align-items: center; justify-content: space-between;
          flex-shrink: 0;
        }
        .loki-header-left { display: flex; align-items: center; gap: 12px; }
        .loki-avatar {
          width: 40px; height: 40px; border-radius: 12px;
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.3);
          display: flex; align-items: center; justify-content: center;
          position: relative; flex-shrink: 0;
          backdrop-filter: blur(8px);
        }
        .loki-avatar-dot {
          position: absolute; bottom: -2px; right: -2px;
          width: 11px; height: 11px; border-radius: 50%;
          background: #4ade80; border: 2px solid #2563eb;
        }
        .loki-header-name {
          font-size: 15px; font-weight: 700; color: #fff; letter-spacing: -0.2px;
        }
        .loki-header-sub {
          font-size: 11px; color: rgba(255,255,255,0.75); font-weight: 400; margin-top: 1px;
          display: flex; align-items: center; gap: 4px;
        }
        .loki-ai-badge {
          font-size: 9px; font-weight: 800; background: rgba(255,255,255,0.2);
          color: #fff; padding: 1px 5px; border-radius: 5px; letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .loki-header-actions { display: flex; gap: 6px; }
        .loki-icon-btn {
          width: 32px; height: 32px; border-radius: 9px;
          background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.9); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; backdrop-filter: blur(4px);
        }
        .loki-icon-btn:hover { background: rgba(255,255,255,0.25); }

        /* Subheader notice */
        .loki-subheader {
          padding: 8px 18px;
          background: #eff6ff;
          border-bottom: 1px solid #dbeafe;
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; color: #2563eb; font-weight: 500;
          flex-shrink: 0;
        }

        /* Messages Area */
        .loki-messages {
          flex: 1; overflow-y: auto; padding: 16px;
          display: flex; flex-direction: column; gap: 14px;
          scrollbar-width: none;
          background: #f8faff;
        }
        .loki-messages::-webkit-scrollbar { display: none; }

        .loki-msg-row { display: flex; }
        .loki-msg-row.user { justify-content: flex-end; }
        .loki-msg-row.bot { justify-content: flex-start; }

        .loki-bubble-wrap { max-width: 88%; display: flex; flex-direction: column; gap: 4px; }
        .loki-time {
          font-size: 9px; color: #94a3b8; text-transform: uppercase;
          letter-spacing: 0.5px; padding: 0 4px;
        }
        .loki-msg-row.user .loki-time { text-align: right; }

        .loki-bubble {
          padding: 11px 14px; border-radius: 18px;
          font-size: 13px; line-height: 1.55; font-weight: 400;
        }
        .loki-bubble.user {
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          color: #fff;
          border-radius: 18px 18px 4px 18px;
          box-shadow: 0 2px 12px rgba(59,130,246,0.3);
        }
        .loki-bubble.bot {
          background: #fff;
          color: #1e293b;
          border-radius: 18px 18px 18px 4px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 6px rgba(0,0,0,0.05);
        }

        /* Quick Chips */
        .loki-chips { display: flex; flex-wrap: wrap; gap: 7px; padding-top: 4px; }
        .loki-chip {
          padding: 7px 12px; border-radius: 20px;
          background: #fff; border: 1px solid #dbeafe;
          font-size: 11px; font-weight: 600; color: #2563eb;
          cursor: pointer; transition: all 0.15s; white-space: nowrap;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .loki-chip:hover { background: #eff6ff; border-color: #3b82f6; transform: translateY(-1px); }
        .loki-chip:active { transform: scale(0.97); }

        /* Typing */
        .loki-typing-bubble {
          padding: 12px 16px; background: #fff;
          border-radius: 18px 18px 18px 4px; border: 1px solid #e2e8f0;
          display: flex; align-items: center; gap: 5px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.05);
        }
        .loki-typing-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #93c5fd;
        }
        .loki-typing-dot:nth-child(1) { animation: bounce-t 1s ease-in-out infinite; }
        .loki-typing-dot:nth-child(2) { animation: bounce-t 1s ease-in-out 0.2s infinite; }
        .loki-typing-dot:nth-child(3) { animation: bounce-t 1s ease-in-out 0.4s infinite; }
        @keyframes bounce-t {
          0%,80%,100% { transform: translateY(0); background: #93c5fd; }
          40% { transform: translateY(-5px); background: #3b82f6; }
        }

        /* Input Area */
        .loki-input-area {
          padding: 12px 14px;
          background: #fff;
          border-top: 1px solid #e2e8f0;
          display: flex; align-items: center; gap: 8px;
          flex-shrink: 0;
        }
        .loki-input {
          flex: 1; height: 42px; padding: 0 14px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          background: #f8faff;
          font-size: 13px; color: #0f172a;
          font-family: inherit; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .loki-input::placeholder { color: #94a3b8; }
        .loki-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
          background: #fff;
        }
        .loki-send {
          width: 42px; height: 42px; border-radius: 12px;
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; flex-shrink: 0;
        }
        .loki-send.active {
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          box-shadow: 0 2px 10px rgba(59,130,246,0.35);
          color: #fff;
        }
        .loki-send.active:hover { transform: scale(1.06); box-shadow: 0 4px 16px rgba(59,130,246,0.45); }
        .loki-send.inactive { background: #f1f5f9; color: #cbd5e1; cursor: not-allowed; }

        /* Product Cards */
        .loki-product-scroll {
          display: flex; gap: 10px; overflow-x: auto; padding-bottom: 4px;
          scrollbar-width: none;
        }
        .loki-product-scroll::-webkit-scrollbar { display: none; }
        .loki-product-card {
          flex-shrink: 0; width: 128px;
          background: #f8faff; border: 1px solid #e2e8f0;
          border-radius: 14px; overflow: hidden;
          transition: all 0.2s;
        }
        .loki-product-card:hover { border-color: #93c5fd; box-shadow: 0 4px 16px rgba(59,130,246,0.12); transform: translateY(-1px); }
        .loki-product-img-wrap { position: relative; height: 88px; overflow: hidden; background: #e2e8f0; }
        .loki-product-img { width: 100%; height: 100%; object-fit: cover; }
        .loki-badge {
          position: absolute; top: 6px; left: 6px;
          background: #2563eb; color: #fff;
          font-size: 8px; font-weight: 800; padding: 2px 5px; border-radius: 5px;
        }
        .loki-product-info { padding: 8px; }
        .loki-product-cat { font-size: 8px; font-weight: 700; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.4px; }
        .loki-product-name { font-size: 10px; font-weight: 600; color: #0f172a; margin-top: 2px; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .loki-product-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 6px; }
        .loki-product-price { font-size: 11px; font-weight: 800; color: #1d4ed8; }
        .loki-product-btn {
          width: 22px; height: 22px; border-radius: 7px;
          background: #eff6ff; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #3b82f6; transition: all 0.15s; text-decoration: none;
        }
        .loki-product-btn:hover { background: #3b82f6; color: #fff; }

        /* Order Tracking */
        .loki-track-card {
          background: #f8faff; border: 1px solid #dbeafe;
          border-radius: 14px; padding: 12px;
        }
        .loki-track-header {
          display: flex; align-items: center; justify-content: space-between;
          padding-bottom: 10px; border-bottom: 1px solid #e2e8f0; margin-bottom: 12px;
        }
        .loki-track-label { font-size: 9px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }
        .loki-track-id { font-size: 14px; font-weight: 800; color: #0f172a; font-family: monospace; }
        .loki-track-status {
          font-size: 10px; font-weight: 700; color: #2563eb;
          background: #eff6ff; border: 1px solid #bfdbfe;
          padding: 4px 9px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.3px;
        }
        .loki-steps { display: flex; flex-direction: column; gap: 0; }
        .loki-step { display: flex; gap: 10px; }
        .loki-step-line-wrap { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
        .loki-step-dot {
          width: 20px; height: 20px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          font-size: 9px; position: relative;
        }
        .loki-step-dot.done { background: #2563eb; color: #fff; }
        .loki-step-dot.active { background: #eff6ff; border: 2px solid #3b82f6; }
        .loki-step-dot.pending { background: #f1f5f9; border: 2px solid #e2e8f0; }
        .loki-pulse-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #3b82f6;
          animation: pulse-blue 1.5s ease-in-out infinite;
        }
        .loki-step-connector { width: 2px; flex: 1; min-height: 14px; margin: 2px 0; }
        .loki-step-connector.done { background: #2563eb; }
        .loki-step-connector:not(.done) { background: #e2e8f0; }
        .loki-step-text { padding: 1px 0 14px; }
        .loki-step-label { font-size: 11px; font-weight: 600; color: #334155; }
        .loki-step-label.active { color: #2563eb; font-weight: 700; }
        .loki-step-sub { font-size: 10px; color: #94a3b8; margin-top: 1px; }

        /* Coupons */
        .loki-coupons { display: flex; flex-direction: column; gap: 8px; }
        .loki-coupon-card {
          display: flex; align-items: center; justify-content: space-between;
          background: #f8faff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px 12px;
          transition: border-color 0.2s;
        }
        .loki-coupon-card:hover { border-color: #93c5fd; }
        .loki-coupon-left { display: flex; align-items: center; gap: 10px; }
        .loki-coupon-icon { width: 32px; height: 32px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .loki-coupon-title { font-size: 12px; font-weight: 700; color: #0f172a; }
        .loki-coupon-sub { font-size: 10px; color: #64748b; margin-top: 1px; }
        .loki-coupon-btn {
          display: flex; align-items: center; gap: 5px;
          padding: 6px 11px; border-radius: 8px; border: none; cursor: pointer;
          font-size: 10px; font-weight: 800; color: #fff; text-transform: uppercase; letter-spacing: 0.3px;
          transition: all 0.2s; white-space: nowrap;
        }
        .loki-coupon-btn:hover { filter: brightness(1.1); transform: translateY(-1px); }
        .loki-coupon-btn:active { transform: scale(0.97); }

        /* Returns */
        .loki-returns-card {
          background: #f8faff; border: 1px solid #dbeafe; border-radius: 14px; padding: 12px;
        }
        .loki-returns-header {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 700; color: #1d4ed8;
          padding-bottom: 10px; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0;
        }
        .loki-return-step {
          display: flex; align-items: flex-start; gap: 9px; padding: 5px 0;
          font-size: 11px; color: #475569; line-height: 1.5;
        }
        .loki-return-num {
          width: 19px; height: 19px; border-radius: 50%;
          background: #dbeafe; color: #1d4ed8;
          font-size: 10px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px;
        }
        .loki-link { color: #2563eb; font-weight: 600; text-decoration: none; }
        .loki-link:hover { text-decoration: underline; }

        /* Quick Grid */
        .loki-quick-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-top: 4px; }
        .loki-quick-btn {
          display: flex; align-items: center; justify-content: space-between;
          padding: 9px 11px; background: #f8faff;
          border: 1px solid #e2e8f0; border-radius: 11px;
          font-size: 11px; font-weight: 600; color: #334155;
          cursor: pointer; transition: all 0.15s; text-align: left;
        }
        .loki-quick-btn:hover { background: #eff6ff; border-color: #93c5fd; color: #2563eb; transform: translateY(-1px); }
        .loki-quick-btn:active { transform: scale(0.97); }

        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>

      <div className="loki-wrap">
        {/* ── Floating Trigger ── */}
        <div className="loki-orb">
          <AnimatePresence>
            {showTooltip && !isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.25 }}
                className="loki-tooltip"
              >
                <span className="loki-tooltip-dot" />
                <p>Need help shopping? I can find deals and track orders 🛍️</p>
                <button
                  className="loki-tooltip-close"
                  onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
                >
                  <X size={10} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => { setIsOpen(!isOpen); setShowTooltip(false); }}
            whileTap={{ scale: 0.9 }}
            className="loki-btn"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} color="#fff" strokeWidth={2.5} />
                </motion.span>
              ) : (
                <motion.span key="open" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Bot size={22} color="#fff" strokeWidth={1.75} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* ── Chat Panel ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="loki-panel"
            >
              {/* Header */}
              <div className="loki-header">
                <div className="loki-header-left">
                  <div className="loki-avatar">
                    <Bot size={18} color="#fff" strokeWidth={1.75} />
                    <div className="loki-avatar-dot" />
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                      <span className="loki-header-name">Loki</span>
                      <span className="loki-ai-badge">AI</span>
                    </div>
                    <div className="loki-header-sub">
                      <Zap size={9} />
                      Shopping Assistant · Online
                    </div>
                  </div>
                </div>
                <div className="loki-header-actions">
                  <button className="loki-icon-btn" onClick={handleResetChat} title="Clear chat">
                    <RefreshCw size={13} />
                  </button>
                  <button className="loki-icon-btn" onClick={() => setIsOpen(false)}>
                    <X size={13} />
                  </button>
                </div>
              </div>

              {/* Subheader */}
              <div className="loki-subheader">
                <Sparkles size={11} />
                Powered by AI · Usually replies instantly
              </div>

              {/* Messages */}
              <div className="loki-messages">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx < 3 ? idx * 0.08 : 0, duration: 0.22 }}
                    className={`loki-msg-row ${msg.sender === "user" ? "user" : "bot"}`}
                  >
                    <div className="loki-bubble-wrap">
                      <div className="loki-time">
                        {msg.sender === "loki" ? "Loki" : "You"} · {msg.time}
                      </div>
                      <div className={`loki-bubble ${msg.sender === "user" ? "user" : "bot"}`}>
                        {msg.text}
                        {msg.customContent && (
                          <div style={{ marginTop: "12px" }}>{msg.customContent}</div>
                        )}
                      </div>
                      {msg.isQuickActions && (
                        <div className="loki-chips">
                          {QUICK_CHIPS.map((chip) => (
                            <button
                              key={chip.id}
                              className="loki-chip"
                              onClick={() => handleSendMessage(chip.label, chip.action)}
                            >
                              {chip.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="loki-msg-row bot"
                  >
                    <div className="loki-bubble-wrap">
                      <div className="loki-time">Loki is typing…</div>
                      <div className="loki-typing-bubble">
                        <span className="loki-typing-dot" />
                        <span className="loki-typing-dot" />
                        <span className="loki-typing-dot" />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="loki-input-area">
                <input
                  className="loki-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything…"
                  onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(inputValue); }}
                />
                <button
                  className={`loki-send ${inputValue.trim() ? "active" : "inactive"}`}
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                >
                  <Send size={15} strokeWidth={2.5} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default LokiAssistant;