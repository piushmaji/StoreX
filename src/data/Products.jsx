import { collar, fold, front, wearing, front1 } from '../assets/images/ProductsAllSideImages/Tshirt/index'

const products = {
    p001: {
        id: "p001",
        title: "Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle",
        inStock: true,
        images: [front, collar, fold, wearing, front1],
        rating: {
            stars: 4.5,
            score: 9.3,
            reviews: 32,
            sold: 154
        },
        pricing: [
            { price: 98, range: "50–100 pcs" },
            { price: 90, range: "100–700 pcs" },
            { price: 78, range: "700+ pcs" }
        ],
        details: {
            priceType: "Negotiable",
            type: "T-shirt",
            material: "Cotton",
            design: "Slim fit",
            customization: "Customized logo and design packages",
            protection: "Refund Policy",
            warranty: "2 years full warranty"
        },
        description:
            "High quality cotton slim fit t-shirt.",
        specs: {
            model: "#8786867",
            style: "Classic style",
            certificate: "ISO-898921212",
            size: "M / L / XL",
            memory: "-"
        },
        features: [
            "Breathable fabric",
            "Machine washable",
            "Color fade resistant"
        ],
        seller: {
            name: "Guanjoi Trading LLC",
            location: "Germany, Berlin",
            flag: "https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg",
            verified: true,
            shipping: "Worldwide shipping"
        }
    },
    p002: {
        id: "p002",
        title: "Men Premium Winter Hoodie",
        inStock: false,
        images: [front, fold, wearing],
        rating: {
            stars: 4.2,
            score: 8.8,
            reviews: 21,
            sold: 89
        },
        pricing: [
            { price: 120, range: "20–50 pcs" },
            { price: 110, range: "50–200 pcs" }
        ],
        details: {
            priceType: "Fixed",
            type: "Hoodie",
            material: "Fleece",
            design: "Winter wear",
            customization: "Logo printing available",
            protection: "Replacement Policy",
            warranty: "1 year warranty"
        },
        description:
            "Warm fleece hoodie designed for winter season.",
        specs: {
            model: "#H99823",
            style: "Casual",
            certificate: "ISO-778899",
            size: "L / XL / XXL",
            memory: "-"
        },
        features: [
            "Warm fleece lining",
            "Adjustable hood",
            "Premium stitching"
        ],
        seller: {
            name: "NorthWear Pvt Ltd",
            location: "India, Delhi",
            flag: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
            verified: false,
            shipping: "Domestic shipping"
        }
    },
    p003: {
        id: "p003",
        title: "Classic Polo Shirt - Premium Cotton Blend",
        inStock: true,
        images: [front, collar, wearing, fold],
        rating: {
            stars: 4.7,
            score: 9.5,
            reviews: 47,
            sold: 203
        },
        pricing: [
            { price: 85, range: "30–100 pcs" },
            { price: 78, range: "100–500 pcs" },
            { price: 70, range: "500+ pcs" }
        ],
        details: {
            priceType: "Negotiable",
            type: "Polo Shirt",
            material: "Cotton Blend",
            design: "Classic fit",
            customization: "Embroidery and printing available",
            protection: "Quality Guarantee",
            warranty: "1 year warranty"
        },
        description:
            "Premium polo shirt with excellent durability and comfort.",
        specs: {
            model: "#PO4567",
            style: "Business casual",
            certificate: "ISO-9001",
            size: "S / M / L / XL",
            memory: "-"
        },
        features: [
            "Ribbed collar",
            "Moisture-wicking",
            "Wrinkle resistant"
        ],
        seller: {
            name: "Euro Textile Co.",
            location: "France, Paris",
            flag: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
            verified: true,
            shipping: "Worldwide shipping"
        }
    },
    p004: {
        id: "p004",
        title: "Athletic Performance Tank Top",
        inStock: true,
        images: [front, wearing, fold],
        rating: {
            stars: 4.3,
            score: 8.9,
            reviews: 28,
            sold: 112
        },
        pricing: [
            { price: 45, range: "50–200 pcs" },
            { price: 40, range: "200–1000 pcs" },
            { price: 35, range: "1000+ pcs" }
        ],
        details: {
            priceType: "Negotiable",
            type: "Tank Top",
            material: "Polyester",
            design: "Athletic fit",
            customization: "Screen printing available",
            protection: "30-day return",
            warranty: "6 months warranty"
        },
        description:
            "Lightweight athletic tank top for gym and sports activities.",
        specs: {
            model: "#AT2233",
            style: "Athletic",
            certificate: "ISO-14001",
            size: "M / L / XL",
            memory: "-"
        },
        features: [
            "Quick-dry technology",
            "Lightweight fabric",
            "Anti-odor treatment"
        ],
        seller: {
            name: "FitGear Sports",
            location: "USA, California",
            flag: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
            verified: true,
            shipping: "International shipping"
        }
    },
    p005: {
        id: "p005",
        title: "Vintage Graphic Print T-Shirt",
        inStock: true,
        images: [front, collar, wearing, front1, fold],
        rating: {
            stars: 4.6,
            score: 9.1,
            reviews: 65,
            sold: 287
        },
        pricing: [
            { price: 65, range: "40–150 pcs" },
            { price: 58, range: "150–500 pcs" },
            { price: 52, range: "500+ pcs" }
        ],
        details: {
            priceType: "Fixed",
            type: "Graphic T-shirt",
            material: "100% Cotton",
            design: "Vintage print",
            customization: "Custom prints available",
            protection: "Exchange Policy",
            warranty: "1 year warranty"
        },
        description:
            "Trendy graphic t-shirt with vintage-inspired designs.",
        specs: {
            model: "#GT7788",
            style: "Streetwear",
            certificate: "OEKO-TEX",
            size: "S / M / L / XL / XXL",
            memory: "-"
        },
        features: [
            "High-quality prints",
            "Soft cotton fabric",
            "Pre-shrunk"
        ],
        seller: {
            name: "Urban Threads Ltd",
            location: "UK, London",
            flag: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
            verified: true,
            shipping: "Worldwide shipping"
        }
    },
    p006: {
        id: "p006",
        title: "Business Casual Button-Down Shirt",
        inStock: false,
        images: [front, collar, fold, wearing],
        rating: {
            stars: 4.4,
            score: 8.7,
            reviews: 19,
            sold: 76
        },
        pricing: [
            { price: 135, range: "25–75 pcs" },
            { price: 125, range: "75–300 pcs" }
        ],
        details: {
            priceType: "Fixed",
            type: "Button-Down Shirt",
            material: "Cotton-Linen",
            design: "Regular fit",
            customization: "Monogram available",
            protection: "Refund Policy",
            warranty: "2 years warranty"
        },
        description:
            "Professional button-down shirt perfect for office wear.",
        specs: {
            model: "#BD9921",
            style: "Formal",
            certificate: "ISO-9001",
            size: "M / L / XL / XXL",
            memory: "-"
        },
        features: [
            "Wrinkle-free fabric",
            "Button-down collar",
            "Easy care"
        ],
        seller: {
            name: "Executive Wear",
            location: "Italy, Milan",
            flag: "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg",
            verified: true,
            shipping: "European shipping"
        }
    },
    p007: {
        id: "p007",
        title: "Sports Training Compression Shirt",
        inStock: true,
        images: [front, wearing, fold],
        rating: {
            stars: 4.8,
            score: 9.6,
            reviews: 53,
            sold: 198
        },
        pricing: [
            { price: 95, range: "30–100 pcs" },
            { price: 88, range: "100–400 pcs" },
            { price: 82, range: "400+ pcs" }
        ],
        details: {
            priceType: "Negotiable",
            type: "Compression Shirt",
            material: "Spandex-Polyester",
            design: "Compression fit",
            customization: "Team logos accepted",
            protection: "Quality Guarantee",
            warranty: "1 year warranty"
        },
        description:
            "Professional compression shirt for enhanced athletic performance.",
        specs: {
            model: "#CS5544",
            style: "Performance",
            certificate: "ISO-14001",
            size: "S / M / L / XL",
            memory: "-"
        },
        features: [
            "4-way stretch",
            "Muscle support",
            "UV protection"
        ],
        seller: {
            name: "ProSport Gear",
            location: "Canada, Toronto",
            flag: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg",
            verified: true,
            shipping: "Worldwide shipping"
        }
    },
    p008: {
        id: "p008",
        title: "Casual V-Neck Cotton T-Shirt",
        inStock: true,
        images: [front, collar, wearing, front1],
        rating: {
            stars: 4.1,
            score: 8.5,
            reviews: 24,
            sold: 95
        },
        pricing: [
            { price: 55, range: "60–200 pcs" },
            { price: 48, range: "200–800 pcs" },
            { price: 42, range: "800+ pcs" }
        ],
        details: {
            priceType: "Negotiable",
            type: "V-Neck T-shirt",
            material: "Cotton",
            design: "Regular fit",
            customization: "Various colors available",
            protection: "30-day return",
            warranty: "1 year warranty"
        },
        description:
            "Comfortable everyday v-neck t-shirt in multiple colors.",
        specs: {
            model: "#VN3344",
            style: "Casual",
            certificate: "OEKO-TEX",
            size: "S / M / L / XL",
            memory: "-"
        },
        features: [
            "Soft hand feel",
            "Tagless design",
            "Durable stitching"
        ],
        seller: {
            name: "Cotton Basics Inc",
            location: "Australia, Sydney",
            flag: "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg",
            verified: false,
            shipping: "Asia-Pacific shipping"
        }
    },
    p009: {
        id: "p009",
        title: "Premium Crew Neck Sweatshirt",
        inStock: true,
        images: [front, fold, wearing, collar],
        rating: {
            stars: 4.5,
            score: 9.0,
            reviews: 38,
            sold: 145
        },
        pricing: [
            { price: 105, range: "25–80 pcs" },
            { price: 95, range: "80–350 pcs" },
            { price: 88, range: "350+ pcs" }
        ],
        details: {
            priceType: "Negotiable",
            type: "Sweatshirt",
            material: "Cotton-Polyester",
            design: "Regular fit",
            customization: "Printing and embroidery",
            protection: "Exchange Policy",
            warranty: "18 months warranty"
        },
        description:
            "Cozy crew neck sweatshirt for all-season comfort.",
        specs: {
            model: "#SW6677",
            style: "Casual comfort",
            certificate: "ISO-9001",
            size: "M / L / XL / XXL",
            memory: "-"
        },
        features: [
            "Fleece-lined",
            "Ribbed cuffs",
            "Pill-resistant"
        ],
        seller: {
            name: "Comfort Wear Co.",
            location: "Spain, Barcelona",
            flag: "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg",
            verified: true,
            shipping: "European shipping"
        }
    },
    p010: {
        id: "p010",
        title: "Slim Fit Henley Shirt - Long Sleeve",
        inStock: true,
        images: [front, collar, wearing, fold, front1],
        rating: {
            stars: 4.6,
            score: 9.2,
            reviews: 41,
            sold: 167
        },
        pricing: [
            { price: 88, range: "35–120 pcs" },
            { price: 80, range: "120–500 pcs" },
            { price: 72, range: "500+ pcs" }
        ],
        details: {
            priceType: "Fixed",
            type: "Henley Shirt",
            material: "Cotton Jersey",
            design: "Slim fit",
            customization: "Logo placement available",
            protection: "Refund Policy",
            warranty: "2 years warranty"
        },
        description:
            "Stylish henley shirt with button placket and slim fit design.",
        specs: {
            model: "#HL8899",
            style: "Smart casual",
            certificate: "ISO-898921212",
            size: "S / M / L / XL",
            memory: "-"
        },
        features: [
            "Button placket",
            "Reinforced seams",
            "Soft jersey fabric"
        ],
        seller: {
            name: "Nordic Fashion House",
            location: "Sweden, Stockholm",
            flag: "https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg",
            verified: true,
            shipping: "Worldwide shipping"
        }
    },
    p011: {
        id: "p011",
        title: "Lightweight Windbreaker Jacket",
        inStock: false,
        images: [front, wearing, fold],
        rating: {
            stars: 4.3,
            score: 8.6,
            reviews: 17,
            sold: 68
        },
        pricing: [
            { price: 145, range: "15–50 pcs" },
            { price: 135, range: "50–200 pcs" }
        ],
        details: {
            priceType: "Fixed",
            type: "Windbreaker",
            material: "Nylon",
            design: "Athletic fit",
            customization: "Heat transfer printing",
            protection: "Replacement Policy",
            warranty: "1 year warranty"
        },
        description:
            "Water-resistant windbreaker perfect for outdoor activities.",
        specs: {
            model: "#WB1122",
            style: "Outdoor",
            certificate: "ISO-14001",
            size: "M / L / XL",
            memory: "-"
        },
        features: [
            "Water-resistant",
            "Packable design",
            "Adjustable hem"
        ],
        seller: {
            name: "Adventure Gear Ltd",
            location: "New Zealand, Auckland",
            flag: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg",
            verified: false,
            shipping: "International shipping"
        }
    },
    p012: {
        id: "p012",
        title: "Oversized Streetwear T-Shirt",
        inStock: true,
        images: [front, collar, wearing, front1, fold],
        rating: {
            stars: 4.7,
            score: 9.4,
            reviews: 72,
            sold: 312
        },
        pricing: [
            { price: 72, range: "50–150 pcs" },
            { price: 65, range: "150–600 pcs" },
            { price: 58, range: "600+ pcs" }
        ],
        details: {
            priceType: "Negotiable",
            type: "Oversized T-shirt",
            material: "Heavy Cotton",
            design: "Oversized fit",
            customization: "Custom designs and colors",
            protection: "Quality Guarantee",
            warranty: "1 year warranty"
        },
        description:
            "Trendy oversized t-shirt with modern streetwear aesthetic.",
        specs: {
            model: "#OS4455",
            style: "Streetwear",
            certificate: "OEKO-TEX",
            size: "L / XL / XXL",
            memory: "-"
        },
        features: [
            "Drop shoulder design",
            "Heavy-weight fabric",
            "Extended length"
        ],
        seller: {
            name: "Street Culture Brands",
            location: "Japan, Tokyo",
            flag: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg",
            verified: true,
            shipping: "Worldwide shipping"
        }
    }
};

export default products;