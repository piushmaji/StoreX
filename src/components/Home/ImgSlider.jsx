import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState('next');

    // Demo slides - replace with your actual product images and data
    const slides = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop',
            title: 'Summer Collection',
            subtitle: 'Discover Your Style',
            description: 'Explore our latest arrivals with up to 40% off',
            cta: 'Shop Now',
            accent: '#FF6B6B'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&h=900&fit=crop',
            title: 'Exclusive Deals',
            subtitle: 'Limited Time Offer',
            description: 'Premium quality at unbeatable prices',
            cta: 'Browse Collection',
            accent: '#4ECDC4'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=900&fit=crop',
            title: 'New Arrivals',
            subtitle: 'Fresh & Trending',
            description: 'Be the first to get the latest drops',
            cta: 'Explore Now',
            accent: '#FFE66D'
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=900&fit=crop',
            title: 'Premium Selection',
            subtitle: 'Luxury Redefined',
            description: 'Curated picks for the discerning shopper',
            cta: 'View Collection',
            accent: '#95E1D3'
        }
    ];

    const nextSlide = useCallback(() => {
        setDirection('next');
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setDirection('prev');
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    const goToSlide = (index) => {
        setDirection(index > currentSlide ? 'next' : 'prev');
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    };

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    const handleInteraction = () => {
        setIsAutoPlaying(false);
    };

    return (
        <div className='px-2'>
            <div className="relative w-full h-125 bg-black overflow-hidden group">
                {/* Slides Container */}
                <div className="relative w-full h-full">
                    {slides.map((slide, index) => {
                        const isActive = index === currentSlide;
                        const isPrev = index === (currentSlide - 1 + slides.length) % slides.length;
                        const isNext = index === (currentSlide + 1) % slides.length;

                        let transformClass = 'translate-x-full opacity-0';
                        if (isActive) transformClass = 'translate-x-0 opacity-100';
                        else if (isPrev) transformClass = '-translate-x-full opacity-0';

                        return (
                            <div
                                key={slide.id}
                                className={`absolute inset-0 transition-all duration-700 ease-out ${transformClass}`}
                                style={{ transitionProperty: 'transform, opacity' }}
                            >
                                {/* Background Image with Parallax Effect */}
                                <div
                                    className="absolute inset-0 transition-transform duration-[10000ms] ease-out"
                                    style={{
                                        transform: isActive ? 'scale(1.05)' : 'scale(1)',
                                    }}
                                >
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Gradient Overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="relative h-full flex items-center">
                                    <div className="container mx-auto px-6 md:px-12 lg:px-16">
                                        <div className="max-w-2xl">
                                            {/* Accent Line */}
                                            <div
                                                className="w-16 h-0.5 mb-4 rounded-full transform origin-left transition-all duration-700 delay-100"
                                                style={{
                                                    backgroundColor: slide.accent,
                                                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                                                }}
                                            />

                                            {/* Subtitle */}
                                            <div
                                                className="transform transition-all duration-700 delay-200"
                                                style={{
                                                    transform: isActive ? 'translateY(0) translateX(0)' : 'translateY(20px) translateX(-20px)',
                                                    opacity: isActive ? 1 : 0,
                                                }}
                                            >
                                                <p className="text-white/90 uppercase tracking-[0.2em] text-xs md:text-sm font-light mb-3 font-mono">
                                                    {slide.subtitle}
                                                </p>
                                            </div>

                                            {/* Title */}
                                            <div
                                                className="transform transition-all duration-700 delay-300"
                                                style={{
                                                    transform: isActive ? 'translateY(0)' : 'translateY(30px)',
                                                    opacity: isActive ? 1 : 0,
                                                }}
                                            >
                                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 leading-none tracking-tight">
                                                    {slide.title}
                                                </h1>
                                            </div>

                                            {/* Description */}
                                            <div
                                                className="transform transition-all duration-700 delay-500"
                                                style={{
                                                    transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                                                    opacity: isActive ? 1 : 0,
                                                }}
                                            >
                                                <p className="text-base md:text-lg text-white/80 mb-5 md:mb-6 font-light max-w-lg">
                                                    {slide.description}
                                                </p>
                                            </div>

                                            {/* CTA Button */}
                                            <div
                                                className="transform transition-all duration-700 delay-700"
                                                style={{
                                                    transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                                                    opacity: isActive ? 1 : 0,
                                                }}
                                            >
                                                <button
                                                    className="group/btn relative px-8 py-3 text-base font-semibold text-black bg-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                                                    onClick={handleInteraction}
                                                >
                                                    <span className="relative z-10 tracking-wide">{slide.cta}</span>
                                                    <div
                                                        className="absolute inset-0 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"
                                                        style={{ backgroundColor: slide.accent }}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Slide Number Indicator */}
                                <div
                                    className="absolute top-4 right-4 md:top-6 md:right-8 transform transition-all duration-700 delay-300"
                                    style={{
                                        opacity: isActive ? 1 : 0,
                                        transform: isActive ? 'translateY(0)' : 'translateY(-20px)',
                                    }}
                                >
                                    <div className="text-white/60 font-mono text-xs md:text-sm">
                                        <span className="text-white text-lg md:text-xl font-bold">{String(index + 1).padStart(2, '0')}</span>
                                        <span className="mx-1 md:mx-2">/</span>
                                        <span>{String(slides.length).padStart(2, '0')}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={() => { prevSlide(); handleInteraction(); }}
                    className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                    onClick={() => { nextSlide(); handleInteraction(); }}
                    className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {slides.map((slide, index) => (
                        <button
                            key={slide.id}
                            onClick={() => goToSlide(index)}
                            className="group/dot relative"
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            {/* Outer ring */}
                            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${index === currentSlide
                                    ? 'border-white scale-100'
                                    : 'border-white/40 scale-75 hover:border-white/60 hover:scale-90'
                                }`}>
                                {/* Inner dot */}
                                <div
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-100' : 'bg-white/40 scale-0 group-hover/dot:scale-75'
                                        }`}
                                    style={{
                                        backgroundColor: index === currentSlide ? slide.accent : 'rgba(255,255,255,0.4)'
                                    }}
                                />
                            </div>

                            {/* Progress ring for active slide */}
                            {index === currentSlide && isAutoPlaying && (
                                <svg className="absolute inset-0 w-10 h-10 -rotate-90">
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r="18"
                                        className="stroke-current text-white/30"
                                        strokeWidth="2"
                                        fill="none"
                                    />
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r="18"
                                        className="stroke-current"
                                        style={{
                                            stroke: slide.accent,
                                            strokeDasharray: '113.1',
                                            animation: 'progress 5s linear'
                                        }}
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>

                {/* Autoplay Toggle */}
                <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="absolute bottom-4 md:bottom-6 right-4 md:right-6 w-9 h-9 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 text-xs font-mono"
                    aria-label={isAutoPlaying ? 'Pause autoplay' : 'Resume autoplay'}
                >
                    {isAutoPlaying ? '||' : '▶'}
                </button>

                <style jsx>{`
        @keyframes progress {
          from {
            stroke-dashoffset: 113.1;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
            </div>
        </div>
    );
};

export default ImageCarousel;