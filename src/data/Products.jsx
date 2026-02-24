// Import images from respective product folders
import {
    image1 as shirt1,
    image2 as shirt2,
    image3 as shirt3,
    image4 as shirt4,
    image5 as shirt5
} from '../assets/images/products/shirt/index';

import {
    image1 as tshirt1,
    image2 as tshirt2,
    image3 as tshirt3,
    image4 as tshirt4,
} from '../assets/images/products/tshirt/index';

import {
    image1 as hoodie1,
    image2 as hoodie2,
    image3 as hoodie3,
    image4 as hoodie4,
} from '../assets/images/products/Hoodie/index';

import {
    image1 as sweatshirt1,
    image2 as sweatshirt2,
    image3 as sweatshirt3,
    image4 as sweatshirt4,
} from '../assets/images/products/sweatshirt/index';

import {
    image1 as jacket1,
    image2 as jacket2,
    image3 as jacket3,
    image4 as jacket4,
    image5 as jacket5
} from '../assets/images/products/jacket/index';

// Note: Add additional image imports for new product categories as needed
// e.g., joggers, shorts, cargo, denim, polo, dress, skirt, etc.


// Helper to generate price history
// priceHistory: array of { date: "YYYY-MM-DD", price: number }
// Covers last 3 months with weekly data points

const today = new Date("2026-02-24");

function generatePriceHistory(currentPrice, variation = 0.1) {
    const history = [];
    for (let weeksAgo = 12; weeksAgo >= 0; weeksAgo--) {
        const date = new Date(today);
        date.setDate(date.getDate() - weeksAgo * 7);
        const fluctuation = 1 + (Math.random() * variation * 2 - variation);
        const price = Math.round(currentPrice * fluctuation / 10) * 10;
        history.push({
            date: date.toISOString().split("T")[0],
            price
        });
    }
    // Ensure last entry matches current sale price
    history[history.length - 1].price = currentPrice;
    return history;
}


const products = {

    // ─────────────────────────────────────────
    // T-SHIRTS
    // ─────────────────────────────────────────

    p001: {
        id: "p001",
        title: "Classic Crew Neck T-Shirt",
        inStock: true,
        images: [tshirt1, tshirt2, tshirt3, tshirt4],
        category: "tshirt",
        rating: {
            stars: 4.5,
            score: 4.5,
            reviews: 312,
            sold: 1204
        },
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "White", hex: "#FFFFFF" },
            { name: "Black", hex: "#1A1A1A" },
            { name: "Navy", hex: "#1B2A4A" },
            { name: "Grey Melange", hex: "#B0B0B0" },
            { name: "Olive", hex: "#6B7645" }
        ],
        pricing: {
            originalPrice: 999,
            salePrice: 399,
            discountPercentage: 60,
            savings: 600
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 429 },
                { date: "2026-02-03", price: 419 },
                { date: "2026-02-10", price: 409 },
                { date: "2026-02-17", price: 409 },
                { date: "2026-02-24", price: 399 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 499 },
                { date: "2025-12-02", price: 489 },
                { date: "2025-12-09", price: 479 },
                { date: "2025-12-16", price: 469 },
                { date: "2025-12-23", price: 459 },
                { date: "2025-12-30", price: 449 },
                { date: "2026-01-06", price: 449 },
                { date: "2026-01-13", price: 439 },
                { date: "2026-01-20", price: 439 },
                { date: "2026-01-27", price: 429 },
                { date: "2026-02-03", price: 419 },
                { date: "2026-02-10", price: 409 },
                { date: "2026-02-17", price: 409 },
                { date: "2026-02-24", price: 399 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "T-Shirt",
            material: "100% Combed Cotton",
            fit: "Regular Fit",
            neck: "Crew Neck",
            sleeve: "Half Sleeve",
            customization: "Custom prints available",
            protection: "Easy returns - 7 days"
        },
        description: "A wardrobe essential — our classic crew neck tee in 100% combed cotton. Soft, breathable, and built to last through countless washes.",
        specs: {
            model: "#TSH-001",
            style: "Casual Everyday",
            certificate: "OEKO-TEX Standard 100",
            gsm: "180 GSM"
        },
        features: [
            "Bio-washed fabric for extra softness",
            "Color-fast reactive dyes",
            "Reinforced shoulder stitching",
            "Tagless neck label",
            "Pre-shrunk cotton"
        ]
    },

    p002: {
        id: "p002",
        title: "Oversized Drop-Shoulder Tee",
        inStock: true,
        images: [tshirt2, tshirt1, tshirt4, tshirt3],
        category: "tshirt",
        rating: {
            stars: 4.0,
            score: 4.2,
            reviews: 198,
            sold: 876
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Washed Black", hex: "#2C2C2C" },
            { name: "Stone", hex: "#C8B89A" },
            { name: "Sage Green", hex: "#8A9E7E" },
            { name: "Dusty Pink", hex: "#D4A0A0" },
            { name: "Off White", hex: "#F5F0E8" }
        ],
        pricing: {
            originalPrice: 1299,
            salePrice: 599,
            discountPercentage: 54,
            savings: 700
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 649 },
                { date: "2026-02-03", price: 649 },
                { date: "2026-02-10", price: 629 },
                { date: "2026-02-17", price: 619 },
                { date: "2026-02-24", price: 599 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 799 },
                { date: "2025-12-02", price: 779 },
                { date: "2025-12-09", price: 769 },
                { date: "2025-12-16", price: 749 },
                { date: "2025-12-23", price: 729 },
                { date: "2025-12-30", price: 719 },
                { date: "2026-01-06", price: 699 },
                { date: "2026-01-13", price: 679 },
                { date: "2026-01-20", price: 669 },
                { date: "2026-01-27", price: 649 },
                { date: "2026-02-03", price: 649 },
                { date: "2026-02-10", price: 629 },
                { date: "2026-02-17", price: 619 },
                { date: "2026-02-24", price: 599 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "T-Shirt",
            material: "100% Cotton",
            fit: "Oversized / Boxy",
            neck: "Crew Neck",
            sleeve: "Drop Shoulder",
            customization: "Screen print available",
            protection: "Easy returns - 7 days"
        },
        description: "The drop-shoulder oversized tee that's taken over streetwear — now in our premium heavyweight cotton.",
        specs: {
            model: "#TSH-002",
            style: "Streetwear",
            certificate: "OEKO-TEX Standard 100",
            gsm: "220 GSM"
        },
        features: [
            "Heavyweight 220 GSM fabric",
            "Drop shoulder seam",
            "Garment washed finish",
            "Ribbed collar",
            "Relaxed boxy silhouette"
        ]
    },

    p003: {
        id: "p003",
        title: "Graphic Print Tee – Urban Series",
        inStock: true,
        images: [tshirt3, tshirt1, tshirt2, tshirt4],
        category: "tshirt",
        rating: {
            stars: 4.5,
            score: 4.4,
            reviews: 145,
            sold: 603
        },
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Black", hex: "#1A1A1A" },
            { name: "White", hex: "#FFFFFF" },
            { name: "Charcoal", hex: "#4A4A4A" }
        ],
        pricing: {
            originalPrice: 1499,
            salePrice: 699,
            discountPercentage: 53,
            savings: 800
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 749 },
                { date: "2026-02-03", price: 739 },
                { date: "2026-02-10", price: 729 },
                { date: "2026-02-17", price: 709 },
                { date: "2026-02-24", price: 699 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 899 },
                { date: "2025-12-02", price: 879 },
                { date: "2025-12-09", price: 859 },
                { date: "2025-12-16", price: 839 },
                { date: "2025-12-23", price: 819 },
                { date: "2025-12-30", price: 799 },
                { date: "2026-01-06", price: 789 },
                { date: "2026-01-13", price: 779 },
                { date: "2026-01-20", price: 769 },
                { date: "2026-01-27", price: 749 },
                { date: "2026-02-03", price: 739 },
                { date: "2026-02-10", price: 729 },
                { date: "2026-02-17", price: 709 },
                { date: "2026-02-24", price: 699 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Graphic T-Shirt",
            material: "100% Combed Cotton",
            fit: "Regular Fit",
            neck: "Crew Neck",
            sleeve: "Half Sleeve",
            customization: "N/A",
            protection: "Easy returns - 7 days"
        },
        description: "Bold graphic tee from our Urban Series — high-density screen print that won't crack or fade.",
        specs: {
            model: "#TSH-003",
            style: "Streetwear Graphic",
            certificate: "OEKO-TEX Standard 100",
            gsm: "180 GSM"
        },
        features: [
            "High-density screen print",
            "Crack-resistant ink",
            "Washed for a broken-in feel",
            "Reinforced neck rib",
            "Straight hem"
        ]
    },

    p004: {
        id: "p004",
        title: "Polo Collar T-Shirt – Classic Pique",
        inStock: true,
        images: [tshirt4, tshirt3, tshirt1, tshirt2],
        category: "tshirt",
        rating: {
            stars: 4.0,
            score: 4.1,
            reviews: 221,
            sold: 780
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "White", hex: "#FFFFFF" },
            { name: "Navy", hex: "#1B2A4A" },
            { name: "Bottle Green", hex: "#2A5C45" },
            { name: "Maroon", hex: "#6B2737" },
            { name: "Sky Blue", hex: "#7EC8E3" }
        ],
        pricing: {
            originalPrice: 1499,
            salePrice: 649,
            discountPercentage: 57,
            savings: 850
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 699 },
                { date: "2026-02-03", price: 689 },
                { date: "2026-02-10", price: 669 },
                { date: "2026-02-17", price: 659 },
                { date: "2026-02-24", price: 649 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 849 },
                { date: "2025-12-02", price: 839 },
                { date: "2025-12-09", price: 819 },
                { date: "2025-12-16", price: 809 },
                { date: "2025-12-23", price: 799 },
                { date: "2025-12-30", price: 779 },
                { date: "2026-01-06", price: 759 },
                { date: "2026-01-13", price: 749 },
                { date: "2026-01-20", price: 729 },
                { date: "2026-01-27", price: 699 },
                { date: "2026-02-03", price: 689 },
                { date: "2026-02-10", price: 669 },
                { date: "2026-02-17", price: 659 },
                { date: "2026-02-24", price: 649 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Polo T-Shirt",
            material: "100% Cotton Pique",
            fit: "Slim Fit",
            neck: "Polo Collar",
            sleeve: "Half Sleeve",
            customization: "Embroidery available",
            protection: "Easy returns - 7 days"
        },
        description: "The timeless polo in premium cotton pique — smart enough for a casual Friday, relaxed enough for the weekend.",
        specs: {
            model: "#POL-001",
            style: "Smart Casual",
            certificate: "OEKO-TEX Standard 100",
            gsm: "200 GSM"
        },
        features: [
            "Double-yarn pique knit",
            "2-button placket",
            "Ribbed sleeve hem",
            "Side vents",
            "Pre-shrunk & color-fast"
        ]
    },

    // ─────────────────────────────────────────
    // SHIRTS
    // ─────────────────────────────────────────

    p005: {
        id: "p005",
        title: "Premium Cotton Formal Shirt",
        inStock: true,
        images: [shirt1, shirt2, shirt3, shirt4, shirt5],
        category: "shirt",
        rating: {
            stars: 4.0,
            score: 4.0,
            reviews: 193,
            sold: 512
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "White", hex: "#FFFFFF" },
            { name: "Sky Blue", hex: "#7EC8E3" },
            { name: "Powder Pink", hex: "#F2C4C4" },
            { name: "Mint", hex: "#C5E8D5" },
            { name: "Charcoal", hex: "#4A4A4A" }
        ],
        pricing: {
            originalPrice: 1999,
            salePrice: 749,
            discountPercentage: 63,
            savings: 1250
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 799 },
                { date: "2026-02-03", price: 789 },
                { date: "2026-02-10", price: 769 },
                { date: "2026-02-17", price: 759 },
                { date: "2026-02-24", price: 749 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 999 },
                { date: "2025-12-02", price: 979 },
                { date: "2025-12-09", price: 959 },
                { date: "2025-12-16", price: 939 },
                { date: "2025-12-23", price: 919 },
                { date: "2025-12-30", price: 899 },
                { date: "2026-01-06", price: 869 },
                { date: "2026-01-13", price: 849 },
                { date: "2026-01-20", price: 829 },
                { date: "2026-01-27", price: 799 },
                { date: "2026-02-03", price: 789 },
                { date: "2026-02-10", price: 769 },
                { date: "2026-02-17", price: 759 },
                { date: "2026-02-24", price: 749 }
            ]
        },
        shipping: {
            type: "Shipping: ₹49",
            charges: 49,
            note: "Free shipping above ₹1500"
        },
        details: {
            type: "Formal Shirt",
            material: "100% Premium Cotton",
            fit: "Slim Fit",
            neck: "Spread Collar",
            sleeve: "Full Sleeve",
            customization: "Custom monogram available",
            protection: "Exchange within 7 days"
        },
        description: "A polished formal shirt that keeps you looking sharp all day. Wrinkle-resistant premium cotton with a crisp spread collar.",
        specs: {
            model: "#SHT-001",
            style: "Formal Business",
            certificate: "OEKO-TEX Standard",
            gsm: "110 GSM"
        },
        features: [
            "Non-iron wrinkle-free fabric",
            "Spread collar with stays",
            "Curved hem",
            "Chest pocket",
            "Mother-of-pearl buttons"
        ]
    },

    p006: {
        id: "p006",
        title: "Linen Blend Casual Shirt",
        inStock: true,
        images: [shirt2, shirt1, shirt4, shirt3, shirt5],
        category: "shirt",
        rating: {
            stars: 4.5,
            score: 4.6,
            reviews: 178,
            sold: 423
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Natural Beige", hex: "#D4C5A9" },
            { name: "Powder Blue", hex: "#B3D4E8" },
            { name: "White", hex: "#FFFFFF" },
            { name: "Sage", hex: "#8A9E7E" },
            { name: "Terracotta", hex: "#C27250" }
        ],
        pricing: {
            originalPrice: 2499,
            salePrice: 999,
            discountPercentage: 60,
            savings: 1500
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 1099 },
                { date: "2026-02-03", price: 1079 },
                { date: "2026-02-10", price: 1049 },
                { date: "2026-02-17", price: 1019 },
                { date: "2026-02-24", price: 999 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 1399 },
                { date: "2025-12-02", price: 1349 },
                { date: "2025-12-09", price: 1299 },
                { date: "2025-12-16", price: 1249 },
                { date: "2025-12-23", price: 1229 },
                { date: "2025-12-30", price: 1199 },
                { date: "2026-01-06", price: 1179 },
                { date: "2026-01-13", price: 1149 },
                { date: "2026-01-20", price: 1129 },
                { date: "2026-01-27", price: 1099 },
                { date: "2026-02-03", price: 1079 },
                { date: "2026-02-10", price: 1049 },
                { date: "2026-02-17", price: 1019 },
                { date: "2026-02-24", price: 999 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Casual Shirt",
            material: "55% Linen, 45% Cotton",
            fit: "Relaxed Fit",
            neck: "Cuban Collar",
            sleeve: "Half Sleeve / Convertible",
            customization: "N/A",
            protection: "Easy returns - 10 days"
        },
        description: "Breathable linen-cotton blend shirt for warm days. The Cuban collar gives it a laid-back, resort-ready feel.",
        specs: {
            model: "#SHT-002",
            style: "Resort Casual",
            certificate: "OEKO-TEX Standard",
            gsm: "140 GSM"
        },
        features: [
            "Linen-cotton blend for breathability",
            "Cuban (camp) collar",
            "Coconut shell buttons",
            "Single chest pocket",
            "Straight hem"
        ]
    },

    p007: {
        id: "p007",
        title: "Flannel Check Overshirt",
        inStock: true,
        images: [shirt3, shirt5, shirt1, shirt2, shirt4],
        category: "shirt",
        rating: {
            stars: 4.5,
            score: 4.5,
            reviews: 134,
            sold: 321
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Red/Black Check", hex: "#8B1A1A" },
            { name: "Navy/Green Check", hex: "#1B3A5C" },
            { name: "Grey/Cream Check", hex: "#9E9E9E" },
            { name: "Brown/Camel Check", hex: "#7A5C3A" }
        ],
        pricing: {
            originalPrice: 2999,
            salePrice: 1199,
            discountPercentage: 60,
            savings: 1800
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 1349 },
                { date: "2026-02-03", price: 1299 },
                { date: "2026-02-10", price: 1269 },
                { date: "2026-02-17", price: 1229 },
                { date: "2026-02-24", price: 1199 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 1899 },
                { date: "2025-12-02", price: 1849 },
                { date: "2025-12-09", price: 1799 },
                { date: "2025-12-16", price: 1749 },
                { date: "2025-12-23", price: 1699 },
                { date: "2025-12-30", price: 1649 },
                { date: "2026-01-06", price: 1549 },
                { date: "2026-01-13", price: 1499 },
                { date: "2026-01-20", price: 1449 },
                { date: "2026-01-27", price: 1349 },
                { date: "2026-02-03", price: 1299 },
                { date: "2026-02-10", price: 1269 },
                { date: "2026-02-17", price: 1229 },
                { date: "2026-02-24", price: 1199 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Overshirt / Shacket",
            material: "100% Brushed Flannel Cotton",
            fit: "Relaxed / Layering Fit",
            neck: "Classic Collar",
            sleeve: "Full Sleeve",
            customization: "N/A",
            protection: "Easy returns - 10 days"
        },
        description: "The shacket you'll reach for all season — wear it open over a tee or buttoned as a light jacket.",
        specs: {
            model: "#SHT-003",
            style: "Casual / Layering",
            certificate: "OEKO-TEX Standard",
            gsm: "260 GSM"
        },
        features: [
            "Heavyweight brushed flannel",
            "Double chest pockets",
            "Side pockets",
            "Can be worn as light jacket",
            "Soft inner brushed surface"
        ]
    },

    // ─────────────────────────────────────────
    // HOODIES
    // ─────────────────────────────────────────

    p008: {
        id: "p008",
        title: "Premium Fleece Pullover Hoodie",
        inStock: true,
        images: [hoodie1, hoodie2, hoodie3, hoodie4],
        category: "hoodie",
        rating: {
            stars: 5.0,
            score: 4.8,
            reviews: 412,
            sold: 1567
        },
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
            { name: "Black", hex: "#1A1A1A" },
            { name: "Charcoal", hex: "#4A4A4A" },
            { name: "Grey Melange", hex: "#B0B0B0" },
            { name: "Navy", hex: "#1B2A4A" },
            { name: "Maroon", hex: "#6B2737" },
            { name: "Forest Green", hex: "#2D5A3D" },
            { name: "Beige", hex: "#E8DCC8" }
        ],
        pricing: {
            originalPrice: 2999,
            salePrice: 999,
            discountPercentage: 67,
            savings: 2000
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 1099 },
                { date: "2026-02-03", price: 1079 },
                { date: "2026-02-10", price: 1049 },
                { date: "2026-02-17", price: 1019 },
                { date: "2026-02-24", price: 999 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 1599 },
                { date: "2025-12-02", price: 1549 },
                { date: "2025-12-09", price: 1499 },
                { date: "2025-12-16", price: 1449 },
                { date: "2025-12-23", price: 1399 },
                { date: "2025-12-30", price: 1349 },
                { date: "2026-01-06", price: 1299 },
                { date: "2026-01-13", price: 1249 },
                { date: "2026-01-20", price: 1149 },
                { date: "2026-01-27", price: 1099 },
                { date: "2026-02-03", price: 1079 },
                { date: "2026-02-10", price: 1049 },
                { date: "2026-02-17", price: 1019 },
                { date: "2026-02-24", price: 999 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free express delivery on all hoodies"
        },
        details: {
            type: "Pullover Hoodie",
            material: "65% Cotton, 35% Polyester",
            fit: "Relaxed Fit",
            neck: "Drawstring Hood",
            sleeve: "Full Sleeve",
            customization: "Custom prints & embroidery",
            protection: "Easy returns - 10 days"
        },
        description: "Our best-selling pullover hoodie — ultra-soft fleece lining, generous hood, and a fit that works for everyone.",
        specs: {
            model: "#HOD-001",
            style: "Casual / Streetwear",
            certificate: "OEKO-TEX Standard",
            gsm: "320 GSM"
        },
        features: [
            "Premium 320 GSM fleece",
            "Adjustable drawstring hood",
            "Kangaroo front pocket",
            "Ribbed cuffs and hem",
            "Double-layered hood"
        ]
    },

    p009: {
        id: "p009",
        title: "Zip-Up Hoodie – Essential Series",
        inStock: true,
        images: [hoodie2, hoodie4, hoodie1, hoodie3],
        category: "hoodie",
        rating: {
            stars: 4.5,
            score: 4.5,
            reviews: 267,
            sold: 892
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Black", hex: "#1A1A1A" },
            { name: "Grey", hex: "#808080" },
            { name: "Navy", hex: "#1B2A4A" },
            { name: "Olive", hex: "#6B7645" }
        ],
        pricing: {
            originalPrice: 3499,
            salePrice: 1299,
            discountPercentage: 63,
            savings: 2200
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 1449 },
                { date: "2026-02-03", price: 1399 },
                { date: "2026-02-10", price: 1369 },
                { date: "2026-02-17", price: 1329 },
                { date: "2026-02-24", price: 1299 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 1999 },
                { date: "2025-12-02", price: 1949 },
                { date: "2025-12-09", price: 1899 },
                { date: "2025-12-16", price: 1849 },
                { date: "2025-12-23", price: 1749 },
                { date: "2025-12-30", price: 1699 },
                { date: "2026-01-06", price: 1649 },
                { date: "2026-01-13", price: 1599 },
                { date: "2026-01-20", price: 1499 },
                { date: "2026-01-27", price: 1449 },
                { date: "2026-02-03", price: 1399 },
                { date: "2026-02-10", price: 1369 },
                { date: "2026-02-17", price: 1329 },
                { date: "2026-02-24", price: 1299 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free express delivery on all hoodies"
        },
        details: {
            type: "Zip-Up Hoodie",
            material: "60% Cotton, 40% Polyester",
            fit: "Regular Fit",
            neck: "Drawstring Hood",
            sleeve: "Full Sleeve",
            customization: "Embroidery available",
            protection: "Easy returns - 10 days"
        },
        description: "Versatile zip-up hoodie you can throw on over anything. Full-length YKK zipper, fleece-lined, and built to last.",
        specs: {
            model: "#HOD-002",
            style: "Casual / Athleisure",
            certificate: "OEKO-TEX Standard",
            gsm: "300 GSM"
        },
        features: [
            "Full-length YKK zipper",
            "Fleece-lined interior",
            "Side hand pockets with zipper",
            "Adjustable drawstring",
            "Ribbed cuffs and hem"
        ]
    },

    p010: {
        id: "p010",
        title: "Graphic Hoodie – Limited Drop",
        inStock: true,
        images: [hoodie3, hoodie1, hoodie2, hoodie4],
        category: "hoodie",
        rating: {
            stars: 4.5,
            score: 4.7,
            reviews: 189,
            sold: 634
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Black", hex: "#1A1A1A" },
            { name: "Washed Grey", hex: "#9A9A9A" },
            { name: "Off White", hex: "#F5F0E8" }
        ],
        pricing: {
            originalPrice: 3999,
            salePrice: 1599,
            discountPercentage: 60,
            savings: 2400
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 1699 },
                { date: "2026-02-03", price: 1699 },
                { date: "2026-02-10", price: 1649 },
                { date: "2026-02-17", price: 1629 },
                { date: "2026-02-24", price: 1599 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 2199 },
                { date: "2025-12-02", price: 2149 },
                { date: "2025-12-09", price: 2099 },
                { date: "2025-12-16", price: 2049 },
                { date: "2025-12-23", price: 1999 },
                { date: "2025-12-30", price: 1949 },
                { date: "2026-01-06", price: 1849 },
                { date: "2026-01-13", price: 1799 },
                { date: "2026-01-20", price: 1749 },
                { date: "2026-01-27", price: 1699 },
                { date: "2026-02-03", price: 1699 },
                { date: "2026-02-10", price: 1649 },
                { date: "2026-02-17", price: 1629 },
                { date: "2026-02-24", price: 1599 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free express delivery on all hoodies"
        },
        details: {
            type: "Graphic Hoodie",
            material: "70% Cotton, 30% Polyester",
            fit: "Oversized Fit",
            neck: "Drawstring Hood",
            sleeve: "Full Sleeve",
            customization: "N/A – Limited edition",
            protection: "Easy returns - 10 days"
        },
        description: "Limited-drop graphic hoodie with oversized silhouette and premium puff-print artwork. Once it's gone, it's gone.",
        specs: {
            model: "#HOD-003-LE",
            style: "Streetwear / Limited",
            certificate: "OEKO-TEX Standard",
            gsm: "340 GSM"
        },
        features: [
            "Puff-print graphic artwork",
            "Oversized premium cut",
            "Heavyweight 340 GSM",
            "Garment washed",
            "Kangaroo pocket"
        ]
    },

    // ─────────────────────────────────────────
    // SWEATSHIRTS
    // ─────────────────────────────────────────

    p011: {
        id: "p011",
        title: "Premium Crew Neck Sweatshirt",
        inStock: true,
        images: [sweatshirt1, sweatshirt2, sweatshirt3, sweatshirt4],
        category: "sweatshirt",
        rating: {
            stars: 5.0,
            score: 4.9,
            reviews: 287,
            sold: 1102
        },
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Black", hex: "#1A1A1A" },
            { name: "Grey Melange", hex: "#B0B0B0" },
            { name: "Navy", hex: "#1B2A4A" },
            { name: "Maroon", hex: "#6B2737" },
            { name: "Olive", hex: "#6B7645" },
            { name: "Dusty Blue", hex: "#7A9CBB" }
        ],
        pricing: {
            originalPrice: 2499,
            salePrice: 849,
            discountPercentage: 66,
            savings: 1650
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 949 },
                { date: "2026-02-03", price: 929 },
                { date: "2026-02-10", price: 909 },
                { date: "2026-02-17", price: 879 },
                { date: "2026-02-24", price: 849 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 1299 },
                { date: "2025-12-02", price: 1249 },
                { date: "2025-12-09", price: 1199 },
                { date: "2025-12-16", price: 1149 },
                { date: "2025-12-23", price: 1099 },
                { date: "2025-12-30", price: 1049 },
                { date: "2026-01-06", price: 1029 },
                { date: "2026-01-13", price: 999 },
                { date: "2026-01-20", price: 979 },
                { date: "2026-01-27", price: 949 },
                { date: "2026-02-03", price: 929 },
                { date: "2026-02-10", price: 909 },
                { date: "2026-02-17", price: 879 },
                { date: "2026-02-24", price: 849 }
            ]
        },
        shipping: {
            type: "Shipping: ₹60",
            charges: 60,
            note: "Free shipping on orders above ₹1500"
        },
        details: {
            type: "Sweatshirt",
            material: "80% Cotton, 20% Polyester",
            fit: "Regular Fit",
            neck: "Crew Neck",
            sleeve: "Full Sleeve",
            customization: "Print & embroidery available",
            protection: "Exchange - 7 days"
        },
        description: "The crew-neck sweatshirt done right. Soft fleece interior, clean minimal exterior, and a fit that flatters every body type.",
        specs: {
            model: "#SWT-001",
            style: "Casual Comfort",
            certificate: "OEKO-TEX",
            gsm: "280 GSM"
        },
        features: [
            "Fleece inner lining",
            "Ribbed cuffs and hem",
            "Set-in sleeve",
            "Soft brushed interior",
            "Pre-shrunk fabric"
        ]
    },

    p012: {
        id: "p012",
        title: "Acid Wash Sweatshirt",
        inStock: true,
        images: [sweatshirt3, sweatshirt1, sweatshirt4, sweatshirt2],
        category: "sweatshirt",
        rating: {
            stars: 4.5,
            score: 4.4,
            reviews: 143,
            sold: 498
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Acid Black", hex: "#3A3A3A" },
            { name: "Acid Navy", hex: "#2A3A5A" },
            { name: "Acid Maroon", hex: "#5A2535" }
        ],
        pricing: {
            originalPrice: 2999,
            salePrice: 1099,
            discountPercentage: 63,
            savings: 1900
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 1199 },
                { date: "2026-02-03", price: 1179 },
                { date: "2026-02-10", price: 1149 },
                { date: "2026-02-17", price: 1119 },
                { date: "2026-02-24", price: 1099 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 1699 },
                { date: "2025-12-02", price: 1649 },
                { date: "2025-12-09", price: 1599 },
                { date: "2025-12-16", price: 1549 },
                { date: "2025-12-23", price: 1499 },
                { date: "2025-12-30", price: 1449 },
                { date: "2026-01-06", price: 1379 },
                { date: "2026-01-13", price: 1329 },
                { date: "2026-01-20", price: 1269 },
                { date: "2026-01-27", price: 1199 },
                { date: "2026-02-03", price: 1179 },
                { date: "2026-02-10", price: 1149 },
                { date: "2026-02-17", price: 1119 },
                { date: "2026-02-24", price: 1099 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Sweatshirt",
            material: "80% Cotton, 20% Polyester",
            fit: "Regular Fit",
            neck: "Crew Neck",
            sleeve: "Full Sleeve",
            customization: "N/A",
            protection: "Exchange - 7 days"
        },
        description: "Vintage vibes in a premium sweatshirt. Each piece is individually acid-washed so no two are exactly alike.",
        specs: {
            model: "#SWT-002",
            style: "Vintage / Streetwear",
            certificate: "OEKO-TEX",
            gsm: "300 GSM"
        },
        features: [
            "Individual acid-wash treatment",
            "Unique one-of-a-kind finish",
            "Heavyweight cotton blend",
            "Ribbed collar, cuffs, hem",
            "Kangaroo pocket"
        ]
    },

    // ─────────────────────────────────────────
    // JACKETS
    // ─────────────────────────────────────────

    p013: {
        id: "p013",
        title: "Premium Winter Puffer Jacket",
        inStock: true,
        images: [jacket1, jacket2, jacket3, jacket4, jacket5],
        category: "jacket",
        rating: {
            stars: 4.5,
            score: 4.6,
            reviews: 334,
            sold: 789
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Black", hex: "#1A1A1A" },
            { name: "Navy", hex: "#1B2A4A" },
            { name: "Olive", hex: "#6B7645" },
            { name: "Beige", hex: "#D4C5A9" },
            { name: "Burgundy", hex: "#6B2737" }
        ],
        pricing: {
            originalPrice: 5999,
            salePrice: 2499,
            discountPercentage: 58,
            savings: 3500
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 2799 },
                { date: "2026-02-03", price: 2699 },
                { date: "2026-02-10", price: 2599 },
                { date: "2026-02-17", price: 2549 },
                { date: "2026-02-24", price: 2499 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 4999 },
                { date: "2025-12-02", price: 4799 },
                { date: "2025-12-09", price: 4499 },
                { date: "2025-12-16", price: 4199 },
                { date: "2025-12-23", price: 3899 },
                { date: "2025-12-30", price: 3599 },
                { date: "2026-01-06", price: 3299 },
                { date: "2026-01-13", price: 3099 },
                { date: "2026-01-20", price: 2899 },
                { date: "2026-01-27", price: 2799 },
                { date: "2026-02-03", price: 2699 },
                { date: "2026-02-10", price: 2599 },
                { date: "2026-02-17", price: 2549 },
                { date: "2026-02-24", price: 2499 }
            ]
        },
        shipping: {
            type: "Shipping: ₹99",
            charges: 99,
            note: "Free shipping on orders above ₹3000"
        },
        details: {
            type: "Puffer Jacket",
            material: "Outer: Nylon, Fill: Recycled Polyester",
            fit: "Regular Fit",
            neck: "Stand Collar",
            sleeve: "Full Sleeve",
            customization: "Logo embroidery available",
            protection: "Exchange - 15 days"
        },
        description: "Warm, lightweight, and packable — our best-selling puffer jacket handles everything from commutes to mountain trips.",
        specs: {
            model: "#JKT-001",
            style: "Winter Casual",
            certificate: "ISO-9001",
            fill: "150G recycled polyester fill"
        },
        features: [
            "Water-resistant ripstop nylon",
            "150G thermal fill",
            "Detachable hood",
            "Packable into chest pocket",
            "Multiple zip pockets"
        ]
    },

    p014: {
        id: "p014",
        title: "Bomber Jacket – Satin Finish",
        inStock: true,
        images: [jacket2, jacket4, jacket1, jacket3, jacket5],
        category: "jacket",
        rating: {
            stars: 4.0,
            score: 4.3,
            reviews: 198,
            sold: 456
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Black", hex: "#1A1A1A" },
            { name: "Forest Green", hex: "#2D5A3D" },
            { name: "Navy", hex: "#1B2A4A" },
            { name: "Burgundy", hex: "#6B2737" }
        ],
        pricing: {
            originalPrice: 4999,
            salePrice: 1999,
            discountPercentage: 60,
            savings: 3000
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 2199 },
                { date: "2026-02-03", price: 2149 },
                { date: "2026-02-10", price: 2099 },
                { date: "2026-02-17", price: 2049 },
                { date: "2026-02-24", price: 1999 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 3499 },
                { date: "2025-12-02", price: 3299 },
                { date: "2025-12-09", price: 3099 },
                { date: "2025-12-16", price: 2899 },
                { date: "2025-12-23", price: 2699 },
                { date: "2025-12-30", price: 2499 },
                { date: "2026-01-06", price: 2399 },
                { date: "2026-01-13", price: 2299 },
                { date: "2026-01-20", price: 2249 },
                { date: "2026-01-27", price: 2199 },
                { date: "2026-02-03", price: 2149 },
                { date: "2026-02-10", price: 2099 },
                { date: "2026-02-17", price: 2049 },
                { date: "2026-02-24", price: 1999 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Bomber Jacket",
            material: "Satin Polyester with fleece lining",
            fit: "Regular Fit",
            neck: "Ribbed Collar",
            sleeve: "Full Sleeve",
            customization: "Embroidery patches available",
            protection: "Exchange - 10 days"
        },
        description: "A sleek satin bomber with plush fleece lining — the jacket that takes your streetwear from good to great.",
        specs: {
            model: "#JKT-002",
            style: "Streetwear",
            certificate: "OEKO-TEX",
            lining: "100% Polyester Fleece"
        },
        features: [
            "Satin outer shell",
            "Warm fleece inner lining",
            "Ribbed collar, cuffs, hem",
            "Two side pockets + one chest pocket",
            "Full-length zip closure"
        ]
    },

    p015: {
        id: "p015",
        title: "Denim Trucker Jacket",
        inStock: true,
        images: [jacket3, jacket1, jacket5, jacket2, jacket4],
        category: "jacket",
        rating: {
            stars: 4.5,
            score: 4.5,
            reviews: 223,
            sold: 534
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Mid Blue", hex: "#5A7FAA" },
            { name: "Dark Indigo", hex: "#2A3A5A" },
            { name: "Light Wash", hex: "#A0B8D0" },
            { name: "Black Denim", hex: "#2C2C2C" }
        ],
        pricing: {
            originalPrice: 3999,
            salePrice: 1699,
            discountPercentage: 57,
            savings: 2300
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 1849 },
                { date: "2026-02-03", price: 1799 },
                { date: "2026-02-10", price: 1769 },
                { date: "2026-02-17", price: 1729 },
                { date: "2026-02-24", price: 1699 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 2799 },
                { date: "2025-12-02", price: 2699 },
                { date: "2025-12-09", price: 2599 },
                { date: "2025-12-16", price: 2449 },
                { date: "2025-12-23", price: 2299 },
                { date: "2025-12-30", price: 2199 },
                { date: "2026-01-06", price: 2099 },
                { date: "2026-01-13", price: 1999 },
                { date: "2026-01-20", price: 1929 },
                { date: "2026-01-27", price: 1849 },
                { date: "2026-02-03", price: 1799 },
                { date: "2026-02-10", price: 1769 },
                { date: "2026-02-17", price: 1729 },
                { date: "2026-02-24", price: 1699 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Denim Jacket",
            material: "100% Cotton Denim",
            fit: "Classic Trucker Fit",
            neck: "Classic Collar",
            sleeve: "Full Sleeve",
            customization: "Custom embroidery available",
            protection: "Easy returns - 10 days"
        },
        description: "A timeless trucker jacket in heavy-duty cotton denim. Pairs with everything from joggers to chinos.",
        specs: {
            model: "#JKT-003",
            style: "Casual / Workwear",
            certificate: "OEKO-TEX Standard",
            gsm: "12 oz denim"
        },
        features: [
            "Heavy 12oz denim",
            "Adjustable waist tabs",
            "Chest flap pockets",
            "Side hand pockets",
            "Metal button closure"
        ]
    },

    // ─────────────────────────────────────────
    // JOGGERS / BOTTOMS
    // ─────────────────────────────────────────

    p016: {
        id: "p016",
        title: "Fleece Jogger Pants",
        inStock: true,
        images: [sweatshirt2, sweatshirt4, sweatshirt1, sweatshirt3],
        category: "jogger",
        rating: {
            stars: 4.5,
            score: 4.6,
            reviews: 356,
            sold: 1287
        },
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Black", hex: "#1A1A1A" },
            { name: "Charcoal", hex: "#4A4A4A" },
            { name: "Grey Melange", hex: "#B0B0B0" },
            { name: "Navy", hex: "#1B2A4A" },
            { name: "Olive", hex: "#6B7645" }
        ],
        pricing: {
            originalPrice: 1999,
            salePrice: 799,
            discountPercentage: 60,
            savings: 1200
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 899 },
                { date: "2026-02-03", price: 869 },
                { date: "2026-02-10", price: 849 },
                { date: "2026-02-17", price: 829 },
                { date: "2026-02-24", price: 799 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 1299 },
                { date: "2025-12-02", price: 1249 },
                { date: "2025-12-09", price: 1199 },
                { date: "2025-12-16", price: 1149 },
                { date: "2025-12-23", price: 1099 },
                { date: "2025-12-30", price: 1049 },
                { date: "2026-01-06", price: 999 },
                { date: "2026-01-13", price: 969 },
                { date: "2026-01-20", price: 939 },
                { date: "2026-01-27", price: 899 },
                { date: "2026-02-03", price: 869 },
                { date: "2026-02-10", price: 849 },
                { date: "2026-02-17", price: 829 },
                { date: "2026-02-24", price: 799 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Jogger Pants",
            material: "80% Cotton, 20% Polyester",
            fit: "Tapered Fit",
            waist: "Elasticated with drawstring",
            leg: "Ribbed ankle cuff",
            customization: "Embroidery available",
            protection: "Easy returns - 7 days"
        },
        description: "Go-anywhere fleece joggers in a tapered cut. Soft enough for the sofa, sharp enough for a coffee run.",
        specs: {
            model: "#JOG-001",
            style: "Athleisure / Casual",
            certificate: "OEKO-TEX",
            gsm: "280 GSM"
        },
        features: [
            "Brushed fleece interior",
            "Tapered jogger fit",
            "Elasticated waistband + drawstring",
            "Two deep side pockets",
            "Zip back pocket"
        ]
    },

    p017: {
        id: "p017",
        title: "Cargo Jogger Pants",
        inStock: true,
        images: [sweatshirt1, sweatshirt3, sweatshirt2, sweatshirt4],
        category: "jogger",
        rating: {
            stars: 4.0,
            score: 4.2,
            reviews: 214,
            sold: 678
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Khaki", hex: "#C3B091" },
            { name: "Black", hex: "#1A1A1A" },
            { name: "Olive", hex: "#6B7645" },
            { name: "Grey", hex: "#808080" }
        ],
        pricing: {
            originalPrice: 2499,
            salePrice: 999,
            discountPercentage: 60,
            savings: 1500
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 1099 },
                { date: "2026-02-03", price: 1079 },
                { date: "2026-02-10", price: 1049 },
                { date: "2026-02-17", price: 1029 },
                { date: "2026-02-24", price: 999 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 1699 },
                { date: "2025-12-02", price: 1649 },
                { date: "2025-12-09", price: 1599 },
                { date: "2025-12-16", price: 1549 },
                { date: "2025-12-23", price: 1499 },
                { date: "2025-12-30", price: 1399 },
                { date: "2026-01-06", price: 1299 },
                { date: "2026-01-13", price: 1249 },
                { date: "2026-01-20", price: 1149 },
                { date: "2026-01-27", price: 1099 },
                { date: "2026-02-03", price: 1079 },
                { date: "2026-02-10", price: 1049 },
                { date: "2026-02-17", price: 1029 },
                { date: "2026-02-24", price: 999 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Cargo Jogger",
            material: "100% Cotton Twill",
            fit: "Relaxed Tapered",
            waist: "Elasticated with drawstring",
            leg: "Ribbed ankle cuff",
            customization: "N/A",
            protection: "Easy returns - 7 days"
        },
        description: "Utility meets comfort. Six-pocket cargo joggers in durable cotton twill with a tapered ankle cuff.",
        specs: {
            model: "#JOG-002",
            style: "Utility / Streetwear",
            certificate: "OEKO-TEX",
            gsm: "240 GSM"
        },
        features: [
            "6 pockets (2 side, 2 cargo, 2 back)",
            "Cargo pockets with button flap",
            "Drawstring + elastic waistband",
            "Tapered leg with ribbed cuff",
            "Durable twill fabric"
        ]
    },

    // ─────────────────────────────────────────
    // SHORTS
    // ─────────────────────────────────────────

    p018: {
        id: "p018",
        title: "Cotton Athletic Shorts",
        inStock: true,
        images: [tshirt1, tshirt3, tshirt2, tshirt4],
        category: "shorts",
        rating: {
            stars: 4.0,
            score: 4.0,
            reviews: 167,
            sold: 723
        },
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Black", hex: "#1A1A1A" },
            { name: "Grey", hex: "#808080" },
            { name: "Navy", hex: "#1B2A4A" },
            { name: "Olive", hex: "#6B7645" },
            { name: "White", hex: "#FFFFFF" }
        ],
        pricing: {
            originalPrice: 1299,
            salePrice: 499,
            discountPercentage: 62,
            savings: 800
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 549 },
                { date: "2026-02-03", price: 539 },
                { date: "2026-02-10", price: 529 },
                { date: "2026-02-17", price: 509 },
                { date: "2026-02-24", price: 499 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 749 },
                { date: "2025-12-02", price: 729 },
                { date: "2025-12-09", price: 709 },
                { date: "2025-12-16", price: 689 },
                { date: "2025-12-23", price: 669 },
                { date: "2025-12-30", price: 649 },
                { date: "2026-01-06", price: 629 },
                { date: "2026-01-13", price: 609 },
                { date: "2026-01-20", price: 579 },
                { date: "2026-01-27", price: 549 },
                { date: "2026-02-03", price: 539 },
                { date: "2026-02-10", price: 529 },
                { date: "2026-02-17", price: 509 },
                { date: "2026-02-24", price: 499 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Athletic Shorts",
            material: "100% Cotton",
            fit: "Regular Fit",
            waist: "Elasticated with drawstring",
            length: "Above knee (7 inch inseam)",
            customization: "Screen print available",
            protection: "Easy returns - 7 days"
        },
        description: "Lightweight cotton shorts for workouts, lounging, or just beating the heat — available in every essential color.",
        specs: {
            model: "#SHO-001",
            style: "Athletic / Casual",
            certificate: "OEKO-TEX",
            gsm: "160 GSM"
        },
        features: [
            "Breathable cotton",
            "Elasticated waist with drawstring",
            "Deep side pockets",
            "Inner mesh brief lining",
            "7 inch inseam"
        ]
    },

    p019: {
        id: "p019",
        title: "Denim Shorts – Mid Length",
        inStock: true,
        images: [shirt1, shirt3, shirt2, shirt4],
        category: "shorts",
        rating: {
            stars: 3.5,
            score: 3.8,
            reviews: 112,
            sold: 345
        },
        sizes: ["28", "30", "32", "34", "36"],
        colors: [
            { name: "Light Wash", hex: "#A0B8D0" },
            { name: "Mid Blue", hex: "#5A7FAA" },
            { name: "Dark Indigo", hex: "#2A3A5A" },
            { name: "Black", hex: "#1A1A1A" }
        ],
        pricing: {
            originalPrice: 1999,
            salePrice: 799,
            discountPercentage: 60,
            savings: 1200
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 899 },
                { date: "2026-02-03", price: 879 },
                { date: "2026-02-10", price: 849 },
                { date: "2026-02-17", price: 829 },
                { date: "2026-02-24", price: 799 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 1299 },
                { date: "2025-12-02", price: 1249 },
                { date: "2025-12-09", price: 1199 },
                { date: "2025-12-16", price: 1149 },
                { date: "2025-12-23", price: 1099 },
                { date: "2025-12-30", price: 1049 },
                { date: "2026-01-06", price: 999 },
                { date: "2026-01-13", price: 949 },
                { date: "2026-01-20", price: 909 },
                { date: "2026-01-27", price: 899 },
                { date: "2026-02-03", price: 879 },
                { date: "2026-02-10", price: 849 },
                { date: "2026-02-17", price: 829 },
                { date: "2026-02-24", price: 799 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Denim Shorts",
            material: "100% Cotton Denim",
            fit: "Regular Fit",
            waist: "Button + zip fly",
            length: "Mid length (10 inch inseam)",
            customization: "N/A",
            protection: "Easy returns - 7 days"
        },
        description: "Classic mid-length denim shorts in washed cotton — perfect for warm days and weekend vibes.",
        specs: {
            model: "#SHO-002",
            style: "Casual / Summer",
            certificate: "OEKO-TEX",
            gsm: "10 oz denim"
        },
        features: [
            "Sanforized cotton denim",
            "5-pocket design",
            "Metal rivet reinforcement",
            "Frayed hem detail",
            "Mid-rise waist"
        ]
    },

    // ─────────────────────────────────────────
    // DENIM
    // ─────────────────────────────────────────

    p020: {
        id: "p020",
        title: "Slim Fit Denim Jeans – Stretch",
        inStock: true,
        images: [shirt4, shirt2, shirt5, shirt1, shirt3],
        category: "denim",
        rating: {
            stars: 4.5,
            score: 4.5,
            reviews: 498,
            sold: 1876
        },
        sizes: ["28", "30", "32", "34", "36", "38"],
        colors: [
            { name: "Mid Blue", hex: "#5A7FAA" },
            { name: "Dark Indigo", hex: "#2A3A5A" },
            { name: "Light Wash", hex: "#A0B8D0" },
            { name: "Black", hex: "#1A1A1A" },
            { name: "Grey", hex: "#808080" }
        ],
        pricing: {
            originalPrice: 3499,
            salePrice: 1299,
            discountPercentage: 63,
            savings: 2200
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 1449 },
                { date: "2026-02-03", price: 1399 },
                { date: "2026-02-10", price: 1369 },
                { date: "2026-02-17", price: 1329 },
                { date: "2026-02-24", price: 1299 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 2299 },
                { date: "2025-12-02", price: 2199 },
                { date: "2025-12-09", price: 2099 },
                { date: "2025-12-16", price: 1999 },
                { date: "2025-12-23", price: 1899 },
                { date: "2025-12-30", price: 1799 },
                { date: "2026-01-06", price: 1699 },
                { date: "2026-01-13", price: 1599 },
                { date: "2026-01-20", price: 1499 },
                { date: "2026-01-27", price: 1449 },
                { date: "2026-02-03", price: 1399 },
                { date: "2026-02-10", price: 1369 },
                { date: "2026-02-17", price: 1329 },
                { date: "2026-02-24", price: 1299 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Slim Fit Jeans",
            material: "98% Cotton, 2% Elastane",
            fit: "Slim Fit",
            waist: "Button + zip fly",
            leg: "Tapered",
            customization: "N/A",
            protection: "Easy returns - 10 days"
        },
        description: "Slim-fit stretch jeans with the right amount of give — moves with you without losing its shape.",
        specs: {
            model: "#DEN-001",
            style: "Contemporary Casual",
            certificate: "OEKO-TEX Standard",
            gsm: "11.5 oz stretch denim"
        },
        features: [
            "2% elastane for stretch",
            "Slim tapered cut",
            "5-pocket construction",
            "Metal hardware",
            "Machine washable"
        ]
    },

    p021: {
        id: "p021",
        title: "Baggy Wide Leg Jeans",
        inStock: true,
        images: [shirt2, shirt5, shirt3, shirt1, shirt4],
        category: "denim",
        rating: {
            stars: 4.5,
            score: 4.6,
            reviews: 287,
            sold: 934
        },
        sizes: ["28", "30", "32", "34", "36"],
        colors: [
            { name: "Light Wash", hex: "#A0B8D0" },
            { name: "Vintage Blue", hex: "#6B88A8" },
            { name: "Dark Indigo", hex: "#2A3A5A" },
            { name: "Washed Black", hex: "#2C2C2C" }
        ],
        pricing: {
            originalPrice: 3999,
            salePrice: 1599,
            discountPercentage: 60,
            savings: 2400
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 1749 },
                { date: "2026-02-03", price: 1699 },
                { date: "2026-02-10", price: 1649 },
                { date: "2026-02-17", price: 1629 },
                { date: "2026-02-24", price: 1599 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 2799 },
                { date: "2025-12-02", price: 2699 },
                { date: "2025-12-09", price: 2599 },
                { date: "2025-12-16", price: 2449 },
                { date: "2025-12-23", price: 2299 },
                { date: "2025-12-30", price: 2149 },
                { date: "2026-01-06", price: 1999 },
                { date: "2026-01-13", price: 1899 },
                { date: "2026-01-20", price: 1799 },
                { date: "2026-01-27", price: 1749 },
                { date: "2026-02-03", price: 1699 },
                { date: "2026-02-10", price: 1649 },
                { date: "2026-02-17", price: 1629 },
                { date: "2026-02-24", price: 1599 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Baggy Jeans",
            material: "100% Cotton Denim",
            fit: "Baggy / Wide Leg",
            waist: "Button + zip fly",
            leg: "Straight wide leg",
            customization: "N/A",
            protection: "Easy returns - 10 days"
        },
        description: "The silhouette everyone's wearing right now. Relaxed through the hip and thigh with a straight wide leg.",
        specs: {
            model: "#DEN-002",
            style: "Streetwear / Retro",
            certificate: "OEKO-TEX Standard",
            gsm: "12 oz rigid denim"
        },
        features: [
            "Rigid 12oz cotton denim",
            "Baggy through hip & thigh",
            "Straight wide leg opening",
            "5-pocket design",
            "Triple-stitched seams"
        ]
    },

    // ─────────────────────────────────────────
    // TRACK / CO-ORDS
    // ─────────────────────────────────────────

    p022: {
        id: "p022",
        title: "Fleece Co-ord Set – Hoodie + Jogger",
        inStock: true,
        images: [hoodie4, hoodie2, sweatshirt2, sweatshirt4],
        category: "coord",
        rating: {
            stars: 5.0,
            score: 4.8,
            reviews: 389,
            sold: 1234
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Black", hex: "#1A1A1A" },
            { name: "Grey Melange", hex: "#B0B0B0" },
            { name: "Navy", hex: "#1B2A4A" },
            { name: "Maroon", hex: "#6B2737" },
            { name: "Olive", hex: "#6B7645" }
        ],
        pricing: {
            originalPrice: 4999,
            salePrice: 1799,
            discountPercentage: 64,
            savings: 3200
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 1999 },
                { date: "2026-02-03", price: 1949 },
                { date: "2026-02-10", price: 1899 },
                { date: "2026-02-17", price: 1849 },
                { date: "2026-02-24", price: 1799 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 2999 },
                { date: "2025-12-02", price: 2899 },
                { date: "2025-12-09", price: 2799 },
                { date: "2025-12-16", price: 2699 },
                { date: "2025-12-23", price: 2499 },
                { date: "2025-12-30", price: 2399 },
                { date: "2026-01-06", price: 2299 },
                { date: "2026-01-13", price: 2199 },
                { date: "2026-01-20", price: 2099 },
                { date: "2026-01-27", price: 1999 },
                { date: "2026-02-03", price: 1949 },
                { date: "2026-02-10", price: 1899 },
                { date: "2026-02-17", price: 1849 },
                { date: "2026-02-24", price: 1799 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all co-ord sets"
        },
        details: {
            type: "Co-ord Set (Top + Bottom)",
            material: "65% Cotton, 35% Polyester",
            fit: "Relaxed (Hoodie) + Tapered (Jogger)",
            includes: "Pullover Hoodie + Matching Jogger",
            customization: "Embroidery available",
            protection: "Easy returns - 10 days"
        },
        description: "The matching set you'll live in — a soft fleece hoodie and tapered jogger in perfect coordinating colors. Buy together and save.",
        specs: {
            model: "#COO-001",
            style: "Athleisure / Streetwear",
            certificate: "OEKO-TEX",
            gsm: "320 GSM fleece"
        },
        features: [
            "Matching hoodie + jogger",
            "Premium fleece fabric",
            "Kangaroo hoodie pocket",
            "Elasticated jogger waistband",
            "Ribbed trims throughout"
        ]
    },

    p023: {
        id: "p023",
        title: "Sweatshirt + Jogger Co-ord – Minimal",
        inStock: true,
        images: [sweatshirt1, sweatshirt3, sweatshirt4, sweatshirt2],
        category: "coord",
        rating: {
            stars: 4.5,
            score: 4.5,
            reviews: 201,
            sold: 678
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Off White", hex: "#F5F0E8" },
            { name: "Beige", hex: "#D4C5A9" },
            { name: "Sage Green", hex: "#8A9E7E" },
            { name: "Dusty Pink", hex: "#D4A0A0" },
            { name: "Slate Blue", hex: "#7A9CBB" }
        ],
        pricing: {
            originalPrice: 4499,
            salePrice: 1699,
            discountPercentage: 62,
            savings: 2800
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 1849 },
                { date: "2026-02-03", price: 1799 },
                { date: "2026-02-10", price: 1769 },
                { date: "2026-02-17", price: 1729 },
                { date: "2026-02-24", price: 1699 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 2799 },
                { date: "2025-12-02", price: 2699 },
                { date: "2025-12-09", price: 2599 },
                { date: "2025-12-16", price: 2499 },
                { date: "2025-12-23", price: 2299 },
                { date: "2025-12-30", price: 2199 },
                { date: "2026-01-06", price: 2099 },
                { date: "2026-01-13", price: 1999 },
                { date: "2026-01-20", price: 1899 },
                { date: "2026-01-27", price: 1849 },
                { date: "2026-02-03", price: 1799 },
                { date: "2026-02-10", price: 1769 },
                { date: "2026-02-17", price: 1729 },
                { date: "2026-02-24", price: 1699 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all co-ord sets"
        },
        details: {
            type: "Co-ord Set (Top + Bottom)",
            material: "80% Cotton, 20% Polyester",
            fit: "Relaxed (Sweatshirt) + Straight (Jogger)",
            includes: "Crew Neck Sweatshirt + Matching Jogger",
            customization: "Custom print available",
            protection: "Easy returns - 10 days"
        },
        description: "Minimalist matching set in muted tones — elevated basics that look intentional, feel effortless.",
        specs: {
            model: "#COO-002",
            style: "Minimalist / Loungewear",
            certificate: "OEKO-TEX",
            gsm: "280 GSM"
        },
        features: [
            "Tonal branding throughout",
            "Crew neck sweatshirt",
            "Straight-leg jogger",
            "Soft fleece lining",
            "Ribbed cuffs and hem"
        ]
    },

    // ─────────────────────────────────────────
    // THERMAL / BASELAYERS
    // ─────────────────────────────────────────

    p024: {
        id: "p024",
        title: "Thermal Full Sleeve Base Layer",
        inStock: true,
        images: [tshirt1, tshirt2, tshirt3, tshirt4],
        category: "thermal",
        rating: {
            stars: 4.0,
            score: 4.3,
            reviews: 156,
            sold: 489
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Black", hex: "#1A1A1A" },
            { name: "White", hex: "#FFFFFF" },
            { name: "Dark Grey", hex: "#4A4A4A" },
            { name: "Navy", hex: "#1B2A4A" }
        ],
        pricing: {
            originalPrice: 1499,
            salePrice: 599,
            discountPercentage: 60,
            savings: 900
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 699 },
                { date: "2026-02-03", price: 679 },
                { date: "2026-02-10", price: 649 },
                { date: "2026-02-17", price: 629 },
                { date: "2026-02-24", price: 599 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 1099 },
                { date: "2025-12-02", price: 1049 },
                { date: "2025-12-09", price: 999 },
                { date: "2025-12-16", price: 949 },
                { date: "2025-12-23", price: 899 },
                { date: "2025-12-30", price: 849 },
                { date: "2026-01-06", price: 799 },
                { date: "2026-01-13", price: 759 },
                { date: "2026-01-20", price: 729 },
                { date: "2026-01-27", price: 699 },
                { date: "2026-02-03", price: 679 },
                { date: "2026-02-10", price: 649 },
                { date: "2026-02-17", price: 629 },
                { date: "2026-02-24", price: 599 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Thermal Base Layer",
            material: "60% Cotton, 35% Modal, 5% Elastane",
            fit: "Slim / Body Hugging",
            neck: "Crew Neck",
            sleeve: "Full Sleeve",
            customization: "N/A",
            protection: "Easy returns - 7 days"
        },
        description: "Lightweight thermal that traps body heat without bulk. Wear under shirts, hoodies, or jackets all winter.",
        specs: {
            model: "#THM-001",
            style: "Winter Baselayer",
            certificate: "OEKO-TEX",
            gsm: "160 GSM thermal knit"
        },
        features: [
            "Modal blend for softness",
            "Thermal loop-knit structure",
            "Flat-lock seams, no chafing",
            "Stretch for easy layering",
            "Moisture-wicking"
        ]
    },

    // ─────────────────────────────────────────
    // VEST / TANK
    // ─────────────────────────────────────────

    p025: {
        id: "p025",
        title: "Muscle Fit Ribbed Vest",
        inStock: true,
        images: [tshirt2, tshirt4, tshirt1, tshirt3],
        category: "vest",
        rating: {
            stars: 4.0,
            score: 4.1,
            reviews: 234,
            sold: 876
        },
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "White", hex: "#FFFFFF" },
            { name: "Black", hex: "#1A1A1A" },
            { name: "Cream", hex: "#FAF0DC" },
            { name: "Sage", hex: "#8A9E7E" },
            { name: "Dusty Blue", hex: "#7A9CBB" }
        ],
        pricing: {
            originalPrice: 999,
            salePrice: 349,
            discountPercentage: 65,
            savings: 650
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 399 },
                { date: "2026-02-03", price: 389 },
                { date: "2026-02-10", price: 379 },
                { date: "2026-02-17", price: 359 },
                { date: "2026-02-24", price: 349 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 599 },
                { date: "2025-12-02", price: 579 },
                { date: "2025-12-09", price: 549 },
                { date: "2025-12-16", price: 529 },
                { date: "2025-12-23", price: 499 },
                { date: "2025-12-30", price: 479 },
                { date: "2026-01-06", price: 459 },
                { date: "2026-01-13", price: 439 },
                { date: "2026-01-20", price: 419 },
                { date: "2026-01-27", price: 399 },
                { date: "2026-02-03", price: 389 },
                { date: "2026-02-10", price: 379 },
                { date: "2026-02-17", price: 359 },
                { date: "2026-02-24", price: 349 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Vest / Tank Top",
            material: "95% Cotton, 5% Elastane",
            fit: "Muscle / Fitted",
            neck: "Scoop Neck",
            sleeve: "Sleeveless",
            customization: "Screen print available",
            protection: "Easy returns - 7 days"
        },
        description: "Ribbed muscle-fit vest that layers under a jacket or stands alone. The stretch ribbing hugs your shape without restricting movement.",
        specs: {
            model: "#VST-001",
            style: "Casual / Layering",
            certificate: "OEKO-TEX",
            gsm: "200 GSM ribbed knit"
        },
        features: [
            "Stretch ribbed knit",
            "Scoop neck",
            "Muscle / fitted silhouette",
            "Wide shoulder straps",
            "Pre-shrunk"
        ]
    },

    // ─────────────────────────────────────────
    // WINDCHEATER / LIGHT JACKET
    // ─────────────────────────────────────────

    p026: {
        id: "p026",
        title: "Windcheater Shell Jacket",
        inStock: true,
        images: [jacket5, jacket3, jacket1, jacket2, jacket4],
        category: "jacket",
        rating: {
            stars: 4.5,
            score: 4.4,
            reviews: 167,
            sold: 398
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Black", hex: "#1A1A1A" },
            { name: "Forest Green", hex: "#2D5A3D" },
            { name: "Royal Blue", hex: "#2A4A8A" },
            { name: "Red", hex: "#C0392B" },
            { name: "Stone", hex: "#C8B89A" }
        ],
        pricing: {
            originalPrice: 3499,
            salePrice: 1399,
            discountPercentage: 60,
            savings: 2100
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 1549 },
                { date: "2026-02-03", price: 1499 },
                { date: "2026-02-10", price: 1469 },
                { date: "2026-02-17", price: 1429 },
                { date: "2026-02-24", price: 1399 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 2499 },
                { date: "2025-12-02", price: 2399 },
                { date: "2025-12-09", price: 2299 },
                { date: "2025-12-16", price: 2199 },
                { date: "2025-12-23", price: 2099 },
                { date: "2025-12-30", price: 1999 },
                { date: "2026-01-06", price: 1849 },
                { date: "2026-01-13", price: 1749 },
                { date: "2026-01-20", price: 1649 },
                { date: "2026-01-27", price: 1549 },
                { date: "2026-02-03", price: 1499 },
                { date: "2026-02-10", price: 1469 },
                { date: "2026-02-17", price: 1429 },
                { date: "2026-02-24", price: 1399 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Windcheater Jacket",
            material: "100% Nylon ripstop",
            fit: "Regular Fit",
            neck: "High Neck / Stand Collar",
            sleeve: "Full Sleeve",
            customization: "N/A",
            protection: "Easy returns - 10 days"
        },
        description: "Lightweight nylon windcheater that packs down into its own pocket. Block wind and light rain without the bulk.",
        specs: {
            model: "#JKT-004",
            style: "Outdoor / Active",
            certificate: "ISO-9001",
            weight: "Ultralight 180g"
        },
        features: [
            "Ultralight 180g construction",
            "Wind and water resistant",
            "Packs into chest pocket",
            "Mesh inner lining",
            "Sealed zip front"
        ]
    },

    // ─────────────────────────────────────────
    // FULL TRACKSUIT
    // ─────────────────────────────────────────

    p027: {
        id: "p027",
        title: "Premium Track Suit – Tricot",
        inStock: true,
        images: [hoodie1, hoodie3, sweatshirt1, sweatshirt3],
        category: "tracksuit",
        rating: {
            stars: 4.5,
            score: 4.5,
            reviews: 245,
            sold: 712
        },
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
            { name: "Black / Black", hex: "#1A1A1A" },
            { name: "Navy / White", hex: "#1B2A4A" },
            { name: "Forest / White", hex: "#2D5A3D" },
            { name: "Maroon / Gold", hex: "#6B2737" }
        ],
        pricing: {
            originalPrice: 5999,
            salePrice: 2299,
            discountPercentage: 62,
            savings: 3700
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 2499 },
                { date: "2026-02-03", price: 2449 },
                { date: "2026-02-10", price: 2399 },
                { date: "2026-02-17", price: 2349 },
                { date: "2026-02-24", price: 2299 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 3999 },
                { date: "2025-12-02", price: 3799 },
                { date: "2025-12-09", price: 3599 },
                { date: "2025-12-16", price: 3399 },
                { date: "2025-12-23", price: 3199 },
                { date: "2025-12-30", price: 2999 },
                { date: "2026-01-06", price: 2799 },
                { date: "2026-01-13", price: 2699 },
                { date: "2026-01-20", price: 2599 },
                { date: "2026-01-27", price: 2499 },
                { date: "2026-02-03", price: 2449 },
                { date: "2026-02-10", price: 2399 },
                { date: "2026-02-17", price: 2349 },
                { date: "2026-02-24", price: 2299 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Full Tracksuit (Top + Bottom)",
            material: "100% Polyester Tricot",
            fit: "Regular Fit",
            includes: "Zip Jacket + Jogger Pants",
            customization: "Name & number print available",
            protection: "Easy returns - 10 days"
        },
        description: "Retro-inspired tricot tracksuit with contrast side taping — athletic roots, streetwear appeal.",
        specs: {
            model: "#TRK-001",
            style: "Sportswear / Streetwear",
            certificate: "ISO-9001",
            gsm: "200 GSM tricot"
        },
        features: [
            "Tricot polyester fabric",
            "Contrast side stripe taping",
            "Full-zip track jacket",
            "Elasticated jogger waistband",
            "Zip side pockets on both pieces"
        ]
    },

    // ─────────────────────────────────────────
    // INNERWEAR / SOCKS
    // ─────────────────────────────────────────

    p028: {
        id: "p028",
        title: "Everyday Boxer Briefs – 3-Pack",
        inStock: true,
        images: [tshirt3, tshirt1, tshirt4, tshirt2],
        category: "innerwear",
        rating: {
            stars: 4.5,
            score: 4.6,
            reviews: 678,
            sold: 2341
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Black / Grey / White (Pack)", hex: "#1A1A1A" },
            { name: "Navy / Blue / White (Pack)", hex: "#1B2A4A" },
            { name: "All Black Pack", hex: "#111111" }
        ],
        pricing: {
            originalPrice: 1499,
            salePrice: 599,
            discountPercentage: 60,
            savings: 900
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 649 },
                { date: "2026-02-03", price: 639 },
                { date: "2026-02-10", price: 619 },
                { date: "2026-02-17", price: 609 },
                { date: "2026-02-24", price: 599 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 899 },
                { date: "2025-12-02", price: 879 },
                { date: "2025-12-09", price: 849 },
                { date: "2025-12-16", price: 829 },
                { date: "2025-12-23", price: 799 },
                { date: "2025-12-30", price: 769 },
                { date: "2026-01-06", price: 749 },
                { date: "2026-01-13", price: 729 },
                { date: "2026-01-20", price: 699 },
                { date: "2026-01-27", price: 649 },
                { date: "2026-02-03", price: 639 },
                { date: "2026-02-10", price: 619 },
                { date: "2026-02-17", price: 609 },
                { date: "2026-02-24", price: 599 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Boxer Briefs (3-pack)",
            material: "95% Cotton, 5% Elastane",
            fit: "Fitted",
            waist: "Elasticated branded waistband",
            customization: "N/A",
            protection: "No returns on innerwear"
        },
        description: "Everyday comfort, pack of 3. Super-soft cotton boxer briefs with a supportive waistband and no-chafe flat seams.",
        specs: {
            model: "#INN-001",
            style: "Everyday Essential",
            certificate: "OEKO-TEX Standard 100",
            gsm: "180 GSM"
        },
        features: [
            "Soft cotton-elastane blend",
            "Contoured pouch for support",
            "Flat-lock stitching",
            "Branded waistband",
            "Pre-shrunk fabric"
        ]
    },

    p029: {
        id: "p029",
        title: "Ankle Length Socks – 5-Pack",
        inStock: true,
        images: [tshirt4, tshirt2, tshirt3, tshirt1],
        category: "socks",
        rating: {
            stars: 4.0,
            score: 4.0,
            reviews: 412,
            sold: 2876
        },
        sizes: ["Free Size (UK 6–10)"],
        colors: [
            { name: "All White Pack", hex: "#FFFFFF" },
            { name: "All Black Pack", hex: "#1A1A1A" },
            { name: "Mixed Neutral Pack", hex: "#B0B0B0" },
            { name: "Mixed Color Pack", hex: "#7EC8E3" }
        ],
        pricing: {
            originalPrice: 699,
            salePrice: 299,
            discountPercentage: 57,
            savings: 400
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 329 },
                { date: "2026-02-03", price: 319 },
                { date: "2026-02-10", price: 309 },
                { date: "2026-02-17", price: 309 },
                { date: "2026-02-24", price: 299 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 449 },
                { date: "2025-12-02", price: 429 },
                { date: "2025-12-09", price: 419 },
                { date: "2025-12-16", price: 409 },
                { date: "2025-12-23", price: 399 },
                { date: "2025-12-30", price: 389 },
                { date: "2026-01-06", price: 369 },
                { date: "2026-01-13", price: 359 },
                { date: "2026-01-20", price: 339 },
                { date: "2026-01-27", price: 329 },
                { date: "2026-02-03", price: 319 },
                { date: "2026-02-10", price: 309 },
                { date: "2026-02-17", price: 309 },
                { date: "2026-02-24", price: 299 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Ankle Socks (5-pack)",
            material: "80% Cotton, 15% Polyester, 5% Elastane",
            fit: "Regular / Snug",
            length: "Ankle length",
            customization: "N/A",
            protection: "No returns on socks"
        },
        description: "The five-pack you'll actually use — ankle-length everyday socks in go-with-everything colors.",
        specs: {
            model: "#SOK-001",
            style: "Everyday Essential",
            certificate: "OEKO-TEX Standard 100",
            gsm: "N/A"
        },
        features: [
            "Cushioned sole",
            "Arch support band",
            "Reinforced heel and toe",
            "No-slip cuff grip",
            "Machine washable"
        ]
    },

    // ─────────────────────────────────────────
    // ACCESSORIES
    // ─────────────────────────────────────────

    p030: {
        id: "p030",
        title: "Knit Beanie – Ribbed Wool Blend",
        inStock: true,
        images: [hoodie4, hoodie2, hoodie3, hoodie1],
        category: "accessories",
        rating: {
            stars: 4.5,
            score: 4.7,
            reviews: 178,
            sold: 645
        },
        sizes: ["One Size"],
        colors: [
            { name: "Black", hex: "#1A1A1A" },
            { name: "Grey Melange", hex: "#B0B0B0" },
            { name: "Camel", hex: "#C19A6B" },
            { name: "Maroon", hex: "#6B2737" },
            { name: "Forest Green", hex: "#2D5A3D" },
            { name: "Navy", hex: "#1B2A4A" }
        ],
        pricing: {
            originalPrice: 999,
            salePrice: 399,
            discountPercentage: 60,
            savings: 600
        },
        priceHistory: {
            oneMonth: [
                { date: "2026-01-27", price: 449 },
                { date: "2026-02-03", price: 439 },
                { date: "2026-02-10", price: 419 },
                { date: "2026-02-17", price: 409 },
                { date: "2026-02-24", price: 399 }
            ],
            threeMonths: [
                { date: "2025-11-25", price: 699 },
                { date: "2025-12-02", price: 679 },
                { date: "2025-12-09", price: 649 },
                { date: "2025-12-16", price: 629 },
                { date: "2025-12-23", price: 599 },
                { date: "2025-12-30", price: 569 },
                { date: "2026-01-06", price: 549 },
                { date: "2026-01-13", price: 519 },
                { date: "2026-01-20", price: 479 },
                { date: "2026-01-27", price: 449 },
                { date: "2026-02-03", price: 439 },
                { date: "2026-02-10", price: 419 },
                { date: "2026-02-17", price: 409 },
                { date: "2026-02-24", price: 399 }
            ]
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on all orders"
        },
        details: {
            type: "Beanie",
            material: "50% Wool, 50% Acrylic",
            fit: "One Size (stretch fit)",
            customization: "Custom patch available",
            protection: "Easy returns - 7 days"
        },
        description: "A classic ribbed beanie in a warm wool-acrylic blend. The kind of thing you grab on the way out the door every winter morning.",
        specs: {
            model: "#ACC-001",
            style: "Winter Essential",
            certificate: "OEKO-TEX",
            gsm: "N/A"
        },
        features: [
            "Wool-acrylic blend warmth",
            "Fine rib knit",
            "Stretch for universal fit",
            "Fold-up cuff",
            "Tonal branding label"
        ]
    }

};

export default products;