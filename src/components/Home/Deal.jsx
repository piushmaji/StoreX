import { Link } from "react-router-dom";
import Timer from "./Timer";
import { ArrowRight, Zap, TrendingUp, Star } from "lucide-react";

const Deal = () => {
  // Premium Gen-Z aesthetic imagery
  const mainCategoryDeal = {
    title: "WINTER\nSTREET",
    desc: "Heavy Knits & Oversized Coats.",
    img: "https://images.unsplash.com/photo-1771310972919-b91ef93d08ef?q=80&w=1001&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    discount: "40% OFF",
  };

  const flexCategories = [
    {
      name: "METALLIC\nACCESSORIES",
      slug: "accessories",
      size: "large",
      img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
      discount: "FLAT 20%",
    },
    {
      name: "STREET\nESSENTIALS",
      slug: "men",
      size: "large",
      img: "https://images.unsplash.com/photo-1574427797991-b086946fa9e7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      discount: "MIN 15%",
    },
    {
      name: "VINTAGE\nDENIM",
      slug: "men",
      size: "large",
      img: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop",
      discount: "UP TO 30%",
    },
    {
      name: "DESIGNER\nEYEWEAR",
      slug: "accessories",
      size: "large",
      img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
      discount: "FLAT 25%",
    },
  ];

  const offerEndDate = new Date();
  offerEndDate.setDate(offerEndDate.getDate() + 3);

  return (
    <div className="w-full my-12 font-sans">
      {/* Minimal Header */}
      <div className="flex items-end justify-between mb-10 px-2">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 leading-none">
            Flash Drops
          </h2>
          <p className="text-[10px] font-black tracking-[0.4em] text-blue-600 uppercase mt-4">
            Limited Time Collections
          </p>
        </div>
        <button className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gray-900 hover:text-blue-600 transition-colors group pb-1 border-b border-gray-900 hover:border-blue-600">
          View All Drops
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[700px]">
        {/* ── Left: Hero Deal (Dark & Aggressive) ── */}
        <div className="lg:w-[45%] relative rounded-[2.5rem] overflow-hidden group cursor-pointer h-[450px] md:h-[550px] lg:h-full bg-black premium-shadow">
          <img
            src={mainCategoryDeal.img}
            alt="Hero Deal"
            className="absolute inset-0 w-full h-full object-cover opacity-80 transition-all duration-[2s] ease-out group-hover:scale-110 group-hover:opacity-100"
          />

          {/* Aggressive gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 z-10">
            {/* Top Badge & Timer */}
            <div className="flex justify-between items-start">
              <div className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl">
                <Zap size={14} className="fill-black" />
                <span className="text-[9px] uppercase tracking-[0.2em] font-black">
                  Hot Drop
                </span>
              </div>

              <div className="text-right flex flex-col items-end">
                <span className="text-white/60 text-[8px] uppercase tracking-[0.3em] font-black mb-2">
                  Closes In
                </span>
                <div className="text-white">
                  <Timer endDate={offerEndDate} />
                </div>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="text-white mt-auto">
              <h2
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-4 uppercase drop-shadow-2xl"
                style={{ whiteSpace: "pre-line" }}
              >
                {mainCategoryDeal.title}
              </h2>
              <p className="text-white/70 text-[11px] font-black tracking-widest uppercase mb-8 max-w-[200px] leading-relaxed">
                {mainCategoryDeal.desc}
              </p>

              <div className="flex items-center gap-4">
                <span className="bg-blue-600 text-white px-8 py-4 rounded-full text-xs font-black tracking-[0.15em] uppercase shadow-2xl shadow-blue-600/40">
                  {mainCategoryDeal.discount}
                </span>
                <button className="flex items-center justify-center w-14 h-14 bg-white text-black rounded-full hover:bg-gray-200 transition-all group/btn active:scale-90">
                  <ArrowRight
                    size={20}
                    strokeWidth={3}
                    className="group-hover/btn:-rotate-45 transition-transform duration-500"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Bento Grid ── */}
        <div className="lg:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
          {flexCategories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/category/${cat.slug}`}
              className={`group relative rounded-[2rem] overflow-hidden cursor-pointer bg-[#F9FAFB] premium-shadow ${
                cat.size === "large"
                  ? "sm:row-span-2 h-[400px] sm:h-auto"
                  : "h-[300px] sm:h-auto"
              }`}
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              />
              {/* Vignette */}
              <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/80 transition-opacity duration-500 group-hover:opacity-90" />

              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 text-white">
                {/* Discount Pill */}
                <div className="self-start bg-black/50 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full text-[8px] font-black tracking-[0.2em] uppercase">
                  {cat.discount}
                </div>

                <div className="mt-auto">
                  <h4
                    className="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-[0.85] mb-2"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {cat.name}
                  </h4>

                  {/* Hover Reveal Button */}
                  <div className="overflow-hidden h-0 group-hover:h-12 transition-all duration-500 mt-0 group-hover:mt-4 opacity-0 group-hover:opacity-100">
                    <div className="flex items-center gap-3 text-[9px] font-black tracking-[0.3em] uppercase text-white hover:text-blue-400 transition-colors">
                      Explore Now <ArrowRight size={14} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deal;
