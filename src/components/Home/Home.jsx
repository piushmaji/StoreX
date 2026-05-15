import React, { useState } from "react";
import Deal from "./Deal";
import CategoryCards from "./CategoryCards/CategoryCards";
import SendInquiry from "./SendInquiry";
import ExtraService from "./ExtraService";
import ImgSlider from "./ImgSlider";
import RecomendedItems from "./RecomendedItems";
import { getFeaturedProducts } from "../../services/productService";
import { useEffect } from "react";

const womensCollectionData = {
  id: 101,
  title: "Women's Collection",
  buttonText: "Shop Women's",
  categorySlug: "women",
  bgImage:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop",
  items: [
    {
      id: 1,
      name: "Silk Blouse",
      img: "https://images.unsplash.com/photo-1674384613407-43e021208955?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "2,499",
    },
    {
      id: 2,
      name: "Wool Coat",
      img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop",
      price: "4,899",
    },
    {
      id: 3,
      name: "Minimalist Tote",
      img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1200&auto=format&fit=crop",
      price: "1,199",
    },
    {
      id: 4,
      name: "Classic Heels",
      img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop",
      price: "3,599",
    },
    {
      id: 5,
      name: "Linen Dress",
      img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
      price: "2,599",
    },
    {
      id: 6,
      name: "Cashmere Scarf",
      img: "https://images.unsplash.com/photo-1620610300405-1a8519fcbb88?q=80&w=1200&auto=format&fit=crop",
      price: "1,499",
    },
    {
      id: 7,
      name: "Gold Plated Earrings",
      img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
      price: "999",
    },
    {
      id: 8,
      name: "Pleated Skirt",
      img: "https://images.unsplash.com/photo-1582142337651-76077717d12f?q=80&w=1200&auto=format&fit=crop",
      price: "1,999",
    },
  ],
};

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1470&auto=format&fit=crop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1470&auto=format&fit=crop",
  },
];

const mensCollectionData = {
  id: 102,
  title: "Men's Essentials",
  buttonText: "Shop Men's",
  categorySlug: "men",
  bgImage:
    "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1470&auto=format&fit=crop",
  items: [
    {
      id: 1,
      name: "Linen Shirt",
      img: "https://images.unsplash.com/photo-1772583435302-354ee9fb7f09?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "1,899",
    },
    {
      id: 2,
      name: "Leather Boots",
      img: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1200&auto=format&fit=crop",
      price: "4,999",
    },
    {
      id: 3,
      name: "Tailored Trousers",
      img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop",
      price: "2,299",
    },
    {
      id: 4,
      name: "Chronograph Watch",
      img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop",
      price: "5,999",
    },
    {
      id: 5,
      name: "Denim Jacket",
      img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1200&auto=format&fit=crop",
      price: "3,499",
    },
    {
      id: 6,
      name: "Aviator Sunglasses",
      img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop",
      price: "1,299",
    },
    {
      id: 7,
      name: "Leather Belt",
      img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
      price: "899",
    },
    {
      id: 8,
      name: "Oxford Shoes",
      img: "https://images.unsplash.com/photo-1614252339460-e171b1e60055?q=80&w=1200&auto=format&fit=crop",
      price: "3,999",
    },
  ],
};

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    const data = await getFeaturedProducts();
    setFeaturedProducts(data);
  };

  return (
    <div className="relative w-full bg-white overflow-x-hidden font-sans">
      {/* ── Announcement Bar ─────────────────────────────────────── */}
      <div className="w-full bg-gray-900 text-white text-center py-2 text-xs tracking-widest font-medium uppercase">
        FREE DELIVERY ON ORDERS OVER ₹999 &nbsp;·&nbsp; NEW ARRIVALS EVERY
        FRIDAY
      </div>

      {/* 1. Hero Slider - Full Bleed */}
      <section className="w-full h-[80vh] min-h-[600px] lg:h-[90vh]">
        <ImgSlider slides={slides} />
      </section>

      {/* ── Main content wrapper ──────────────────────────────────── */}
      <div className="max-w-screen-2xl mx-auto space-y-12 md:space-y-24 pb-20 pt-8">
        {/* 3. Deals section */}
        <section className="px-4 lg:px-8 animate-premium-fade">
          <Deal />
        </section>

        {/* 4. Recommended Items */}
        <section className="px-4 lg:px-8 animate-premium-fade [animation-delay:200ms]">
          <RecomendedItems products={featuredProducts} />
        </section>

        {/* 5. Women's/Men's Category Cards */}
        <section className="px-4 lg:px-8 space-y-12 animate-premium-fade [animation-delay:400ms]">
          <CategoryCards {...womensCollectionData} />
          <CategoryCards {...mensCollectionData} />
        </section>

        {/* 6. Extra Services (Member Perks) */}
        <section className="px-4 lg:px-8 border-t border-gray-100 pt-12 animate-premium-fade [animation-delay:600ms]">
          <ExtraService />
        </section>

        {/* 8. Send Inquiry / Query */}
        <section className="px-4 lg:px-8 animate-premium-fade [animation-delay:800ms]">
          <SendInquiry />
        </section>
      </div>
    </div>
  );
};

export default Home;
