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
        <div className="relative w-full overflow-hidden rounded-2xl group shadow-sm bg-gray-100"
            style={{ aspectRatio: "16/6", minHeight: "260px", maxHeight: "560px" }}>

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
                        className="w-full h-full object-cover"
                        style={{
                            transform: i === index ? "scale(1.05)" : "scale(1)",
                            transition: "transform 8s ease-out",
                        }}
                    />
                    {/* Cinematic linear overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />
                </div>
            ))}

            {/* ── Editorial Text Overlay ────────────────────────────── */}
            <div
                key={index} // Force re-render animation
                className="absolute inset-0 z-10 flex flex-col justify-center px-10 lg:px-20 pointer-events-none"
                style={{
                    animation: "fadeSlideIn 0.8s cubic-bezier(0.22,1,0.36,1) forwards",
                }}
            >
                <p className="text-xs lg:text-sm tracking-[0.2em] text-white/80 mb-3 font-semibold uppercase">
                    {meta.sub}
                </p>
                <h1
                    className="text-3xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight drop-shadow-sm"
                    style={{ whiteSpace: "pre-line", fontFamily: "'Inter', sans-serif" }}
                >
                    {meta.heading}
                </h1>
                <a
                    href="#"
                    className="pointer-events-auto inline-flex items-center gap-2 self-start bg-white text-gray-900 text-xs lg:text-sm font-bold tracking-widest px-6 py-3.5 rounded-full hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
                >
                    {meta.cta} →
                </a>
            </div>

            {/* ── Prev / Next Buttons ───────────────────────────────── */}
            <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 lg:h-12 lg:w-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
                <ArrowLeft size={20} />
            </button>
            <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 lg:h-12 lg:w-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
                <ArrowRight size={20} />
            </button>

            {/* ── Dot Indicators ────────────────────────────────────── */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i, i > index ? "next" : "prev")}
                        aria-label={`Go to slide ${i + 1}`}
                        className="transition-all duration-500 rounded-full"
                        style={{
                            width: i === index ? "32px" : "8px",
                            height: "8px",
                            background: i === index ? "#ffffff" : "rgba(255,255,255,0.4)",
                            boxShadow: i === index ? "0 0 10px rgba(255,255,255,0.5)" : "none"
                        }}
                    />
                ))}
            </div>

            {/* ── CSS animation keyframe ────────────────────────────── */}
            <style>{`
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default ImgSlider;
