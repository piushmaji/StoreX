import React from 'react'
import Deal from './Deal'
import CategoryCards from './CategoryCards/CategoryCards'
import SendInquiry from './SendInquiry'
import ExtraService from './ExtraService'
import Suppliers from './Suppliers'
import ImgSlider from './ImgSlider'
import RecomendedItems from './RecomendedItems'

const womensCollectionData = {
    id: 101,
    title: "Women's Collection",
    buttonText: "Shop Women's",
    bgImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop",
    items: [
        { id: 1, name: "Silk Blouse", img: "https://images.unsplash.com/photo-1550639524-a6f58345a90d?q=80&w=1200&auto=format&fit=crop", price: "2,499" },
        { id: 2, name: "Wool Coat", img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop", price: "4,899" },
        { id: 3, name: "Minimalist Tote", img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1200&auto=format&fit=crop", price: "1,199" },
        { id: 4, name: "Classic Heels", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop", price: "3,599" },
        { id: 5, name: "Linen Dress", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop", price: "2,599" },
        { id: 6, name: "Cashmere Scarf", img: "https://images.unsplash.com/photo-1620610300405-1a8519fcbb88?q=80&w=1200&auto=format&fit=crop", price: "1,499" },
        { id: 7, name: "Gold Plated Earrings", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop", price: "999" },
        { id: 8, name: "Pleated Skirt", img: "https://images.unsplash.com/photo-1582142337651-76077717d12f?q=80&w=1200&auto=format&fit=crop", price: "1,999" },
    ],
}

const slides = [
    { image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop" },
    { image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1470&auto=format&fit=crop" },
    { image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1470&auto=format&fit=crop" },
];

const mensCollectionData = {
    id: 102,
    title: "Men's Essentials",
    buttonText: "Shop Men's",
    bgImage: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1470&auto=format&fit=crop",
    items: [
        { id: 1, name: "Linen Shirt", img: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=1200&auto=format&fit=crop", price: "1,899" },
        { id: 2, name: "Leather Boots", img: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1200&auto=format&fit=crop", price: "4,999" },
        { id: 3, name: "Tailored Trousers", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop", price: "2,299" },
        { id: 4, name: "Chronograph Watch", img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop", price: "5,999" },
        { id: 5, name: "Denim Jacket", img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1200&auto=format&fit=crop", price: "3,499" },
        { id: 6, name: "Aviator Sunglasses", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop", price: "1,299" },
        { id: 7, name: "Leather Belt", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop", price: "899" },
        { id: 8, name: "Oxford Shoes", img: "https://images.unsplash.com/photo-1614252339460-e171b1e60055?q=80&w=1200&auto=format&fit=crop", price: "3,999" },
    ],
}

const clothingCategories = [
    { id: 1, label: "NEW IN", href: "#" },
    { id: 2, label: "WOMEN", href: "#" },
    { id: 3, label: "MEN", href: "#" },
    { id: 4, label: "ACCESSORIES", href: "#" },
    { id: 5, label: "SALE", href: "#" },
];

const Home = () => {

    return (
        <div className="relative w-full bg-white overflow-x-hidden font-sans">

            {/* ── Announcement Bar ─────────────────────────────────────── */}
            <div className="w-full bg-gray-900 text-white text-center py-2 text-xs tracking-widest font-medium uppercase">
                FREE DELIVERY ON ORDERS OVER ₹999 &nbsp;·&nbsp; NEW ARRIVALS EVERY FRIDAY
            </div>

            {/* ── Category Nav Pill Row ─────────────────────────────────── */}
            <nav className="flex items-center justify-center gap-6 py-4 border-b border-gray-100 px-4">
                {clothingCategories.map(cat => (
                    <a
                        key={cat.id}
                        href={cat.href}
                        className={`text-xs font-semibold tracking-widest transition-colors duration-200 pb-1
                            \${cat.label === "SALE"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-gray-900 border-transparent"
                            }`}
                    >
                        {cat.label}
                    </a>
                ))}
            </nav>

            {/* ── Main content wrapper ──────────────────────────────────── */}
            <div className="max-w-screen-2xl mx-auto space-y-12 pb-16">

                {/* Hero Slider */}
                <section className="px-4 lg:px-8 mt-6">
                    <ImgSlider slides={slides} />
                </section>

                {/* Deals section */}
                <section className="px-4 lg:px-8">
                    <Deal />
                </section>

                {/* Women's Category Cards */}
                <section className="px-4 lg:px-8">
                    <CategoryCards {...womensCollectionData} />
                </section>

                {/* Men's Category Cards */}
                <section className="px-4 lg:px-8">
                    <CategoryCards {...mensCollectionData} />
                </section>

                {/* Send Inquiry */}
                <section className="px-4 lg:px-8">
                    <SendInquiry />
                </section>

                {/* Recommended Items */}
                <section className="px-4 lg:px-8">
                    <RecomendedItems />
                </section>

                {/* Extra Services & Suppliers wrapper */}
                <div className="px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 border-t border-gray-100 pt-12">
                    <ExtraService />
                    <Suppliers />
                </div>
            </div>
        </div>
    )
}

export default Home
