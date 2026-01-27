import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const ImgSlider = ({ slides }) => {
    const [index, setIndex] = useState(0);

    // Auto slide
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(timer);
    }, [index]);

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setIndex((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    return (
        <div className="px-2">
            <div className="relative w-full lg:h-100 h-40 overflow-hidden">

                {/* Image */}
                <img
                    src={slides[index].image}
                    alt=""
                    className="lg:w-full lg:h-full h-full w-full object-cover"
                />

                {/* Left Button */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
                >
                    <ArrowLeft />
                </button>

                {/* Right Button */}
                <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
                >
                    <ArrowRight />
                </button>
            </div>
        </div>
    );
};

export default ImgSlider;
