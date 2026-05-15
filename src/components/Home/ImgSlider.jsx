import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const slides_meta = [
    {
        heading: "New Season,\nNew You.",
        sub: "Spring / Summer 2025 Collection",
        cta: "Shop Now",
    },
    {
        heading: "Style That\nSpeaks.",
        sub: "Exclusive Deals — Up to 40% Off",
        cta: "Explore Deals",
    },
    {
        heading: "Wear What\nMoves You.",
        sub: "Premium Essentials, Everyday Comfort",
        cta: "Discover More",
    },
];

const ImgSlider = ({ slides }) => {
    const [index, setIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [direction, setDirection] = useState("next"); // "next" | "prev"

    const goTo = useCallback((next, dir = "next") => {
        if (animating) return;
        setAnimating(true);
        setDirection(dir);
        setTimeout(() => {
            setIndex(next);
            setAnimating(false);
        }, 500);
    }, [animating]);

    const nextSlide = useCallback(() => {
        goTo((index + 1) % slides.length, "next");
    }, [index, slides.length, goTo]);

    const prevSlide = useCallback(() => {
        goTo(index === 0 ? slides.length - 1 : index - 1, "prev");
    }, [index, slides.length, goTo]);

    useEffect(() => {
        const timer = setInterval(nextSlide, 4000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const meta = slides_meta[index] ?? slides_meta[0];

    return (
        <div className="relative w-full h-full overflow-hidden group bg-gray-900">

            {/* ── Slide Images ──────────────────────────────────────── */}
            {slides.map((slide, i) => (
                <div
                    key={i}
                    className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                    style={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 1 : 0 }}
                >
                    <img
                        src={slide.image}
                        alt={`Slide ${i + 1}`}
                        className="w-full h-full object-cover object-center"
                        style={{
                            transform: i === index ? "scale(1.05)" : "scale(1)",
                            transition: "transform 10s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        }}
                    />
                    {/* Very subtle gradient for text legibility, keeping image crisp */}
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-transparent" />
                </div>
            ))}

            {/* ── Editorial Text Overlay ────────────────────────────── */}
            <div
                key={index} // Force re-render animation
                className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-16 lg:px-24 pointer-events-none max-w-screen-2xl mx-auto w-full"
            >
                <div 
                    className="max-w-2xl"
                    style={{ animation: "fadeUpIn 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
                >
                    <p className="text-[9px] sm:text-xs lg:text-sm tracking-[0.5em] text-white/70 mb-6 font-black uppercase">
                        {meta.sub}
                    </p>
                    <h1
                        className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-10 leading-[0.95] tracking-tighter uppercase"
                        style={{ whiteSpace: "pre-line" }}
                    >
                        {meta.heading}
                    </h1>
                    <a
                        href="#"
                        className="pointer-events-auto inline-flex items-center gap-4 self-start text-white text-[10px] lg:text-sm font-black tracking-[0.2em] uppercase bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-500 group"
                    >
                        {meta.cta} 
                        <ArrowRight size={16} strokeWidth={2.5} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </a>
                </div>
            </div>

            {/* ── Prev / Next Buttons ───────────────────────────────── */}
            <div className="absolute right-6 sm:right-16 lg:right-24 bottom-12 z-20 flex gap-4 sm:flex">
                <button
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="h-12 w-12 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-500 hover:scale-105"
                >
                    <ArrowLeft size={18} strokeWidth={1.5} />
                </button>
                <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="h-12 w-12 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-500 hover:scale-105"
                >
                    <ArrowRight size={18} strokeWidth={1.5} />
                </button>
            </div>

            {/* ── Dot Indicators ────────────────────────────────────── */}
            <div className="absolute bottom-12 left-6 sm:left-16 lg:left-24 z-20 flex items-center gap-4">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i, i > index ? "next" : "prev")}
                        aria-label={`Go to slide ${i + 1}`}
                        className="transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] relative overflow-hidden rounded-full"
                        style={{
                            width: i === index ? "64px" : "12px",
                            height: "3px",
                            background: "rgba(255,255,255,0.2)"
                        }}
                    >
                        {/* Progress bar effect for active dot */}
                        {i === index && (
                            <div className="absolute inset-0 bg-white" 
                                style={{ 
                                    animation: "progress 4s linear forwards"
                                }} 
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* ── CSS animation keyframe ────────────────────────────── */}
            <style>{`
                @keyframes fadeUpIn {
                    from { opacity: 0; transform: translateY(30px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes progress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
            `}</style>
        </div>
    );
};

export default ImgSlider;
