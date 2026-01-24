// Import images from respective product folders
import {
    image1 as bag1,
    image2 as bag2,
    image3 as bag3,
    image4 as bag4,
    image5 as bag5
} from '../assets/images/products/bag/index';

import {
    image1 as camera1,
    image2 as camera2,
    image3 as camera3,
    image4 as camera4
} from '../assets/images/products/camera/index';

import {
    image1 as earphone1,
    image2 as earphone2,
    image3 as earphone3,
    image4 as earphone4,
    image5 as earphone5
} from '../assets/images/products/earphone/index';

import {
    image1 as iphone1,
    image2 as iphone2,
    image3 as iphone3,
    image4 as iphone4
} from '../assets/images/products/iphone/index';

import {
    image1 as jacket1,
    image2 as jacket2,
    image3 as jacket3,
    image4 as jacket4,
    image5 as jacket5
} from '../assets/images/products/jacket/index';

import {
    image1 as laptop1,
    image2 as laptop2,
    image3 as laptop3,
    image4 as laptop4
} from '../assets/images/products/laptop/index';

import {
    image1 as shirt1,
    image2 as shirt2,
    image3 as shirt3,
    image4 as shirt4,
    image5 as shirt5
} from '../assets/images/products/shirt/index';

import {
    image1 as watch1,
    image2 as watch2,
    image3 as watch3,
    image4 as watch4
} from '../assets/images/products/smartWatch/index';

import {
    image1 as sweatshirt1,
    image2 as sweatshirt2,
    image3 as sweatshirt3,
    image4 as sweatshirt4,
} from '../assets/images/products/sweatshirt/index';

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
    image1 as tv1,
    image2 as tv2,
    image3 as tv3,
    image4 as tv4,
} from '../assets/images/products/tv/index';

const products = {
    p001: {
        id: "p001",
        title: "Premium Leather Travel Backpack",
        inStock: true,
        images: [bag1, bag2, bag3, bag4, bag5],
        category: "bag",
        rating: {
            stars: 4.6,
            score: 9.2,
            reviews: 45,
            sold: 178
        },
        pricing: {
            bulk: [
                { price: 3500, range: "50–100 pcs" },
                { price: 3200, range: "100–500 pcs" },
                { price: 2800, range: "500+ pcs" }
            ],
            retail: {
                originalPrice: 5999,
                salePrice: 3499,
                discountPercentage: 42,
                savings: 2500
            }
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery on orders above ₹2000"
        },
        details: {
            priceType: "Negotiable",
            type: "Travel Backpack",
            material: "Genuine Leather",
            design: "Spacious multi-compartment",
            customization: "Customized logo and design packages",
            protection: "Refund Policy - 30 days",
            warranty: "2 years full warranty"
        },
        description: "Premium quality leather backpack with multiple compartments, perfect for travel and daily use.",
        specs: {
            model: "#BAG8867",
            style: "Travel & Business",
            certificate: "ISO-9001",
            size: "45L capacity",
            color: "Black, Brown, Navy Blue"
        },
        features: [
            "Water-resistant leather",
            "Laptop compartment (15.6 inch)",
            "USB charging port",
            "Anti-theft pocket"
        ],
        seller: {
            name: "Urban Leather Co.",
            location: "India, Mumbai",
            flag: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
            verified: true,
            shipping: "Worldwide shipping"
        }
    },

    p002: {
        id: "p002",
        title: "Professional DSLR Camera - 24MP",
        inStock: true,
        images: [camera1, camera2, camera3, camera4],
        category: "camera",
        rating: {
            stars: 3.8,
            score: 8.6,
            reviews: 89,
            sold: 234
        },
        pricing: {
            bulk: [
                { price: 42000, range: "10–50 pcs" },
                { price: 40000, range: "50–200 pcs" }
            ],
            retail: {
                originalPrice: 55999,
                salePrice: 41999,
                discountPercentage: 25,
                savings: 14000
            }
        },
        shipping: {
            type: "Shipping charges included",
            charges: 0,
            note: "Insured shipping included in price"
        },
        details: {
            priceType: "Fixed",
            type: "DSLR Camera",
            material: "Magnesium Alloy Body",
            design: "Professional grade",
            customization: "Bundle packages available",
            protection: "Refund Policy - 15 days",
            warranty: "3 years manufacturer warranty + 1 year extended"
        },
        description: "High-performance 24MP DSLR camera with advanced autofocus and 4K video recording.",
        specs: {
            model: "#CAM2024X",
            style: "Professional Photography",
            certificate: "CE, FCC certified",
            size: "Standard DSLR",
            color: "Black"
        },
        features: [
            "24MP APS-C sensor",
            "4K video recording",
            "ISO 100-25600",
            "45-point autofocus system",
            "Wi-Fi and Bluetooth"
        ],
        seller: {
            name: "PhotoPro Electronics",
            location: "India, Delhi",
            flag: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
            verified: true,
            shipping: "India & International"
        }
    },

    p003: {
        id: "p003",
        title: "Wireless Noise Cancelling Earphones",
        inStock: true,
        images: [earphone1, earphone2, earphone3, earphone4, earphone5],
        category: "earphone",
        rating: {
            stars: 4.0,
            score: 9.0,
            reviews: 156,
            sold: 567
        },
        pricing: {
            bulk: [
                { price: 1800, range: "100–500 pcs" },
                { price: 1500, range: "500–2000 pcs" },
                { price: 1200, range: "2000+ pcs" }
            ],
            retail: {
                originalPrice: 3999,
                salePrice: 1799,
                discountPercentage: 55,
                savings: 2200
            }
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free shipping on all orders"
        },
        details: {
            priceType: "Negotiable",
            type: "TWS Earphones",
            material: "ABS Plastic",
            design: "Ergonomic in-ear",
            customization: "Logo printing available",
            protection: "Replacement Policy - 10 days",
            warranty: "1 year warranty"
        },
        description: "Premium wireless earphones with active noise cancellation and superior sound quality.",
        specs: {
            model: "#EP5544",
            style: "True Wireless",
            certificate: "BIS certified",
            size: "Compact",
            color: "Black, White, Blue"
        },
        features: [
            "Active Noise Cancellation",
            "30 hours total playback",
            "IPX5 water resistant",
            "Touch controls",
            "Type-C charging"
        ],
        seller: {
            name: "SoundWave Technologies",
            location: "India, Bangalore",
            flag: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
            verified: true,
            shipping: "Pan-India shipping"
        }
    },

    p004: {
        id: "p004",
        title: "iPhone 15 Pro Max - 256GB",
        inStock: true,
        images: [iphone1, iphone2, iphone3, iphone4],
        category: "iphone",
        rating: {
            stars: 4.9,
            score: 9.8,
            reviews: 342,
            sold: 891
        },
        pricing: {
            bulk: [
                { price: 145000, range: "5–20 pcs" },
                { price: 142000, range: "20–100 pcs" }
            ],
            retail: {
                originalPrice: 159900,
                salePrice: 144999,
                discountPercentage: 9,
                savings: 14901
            }
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free express delivery + insurance"
        },
        details: {
            priceType: "Fixed",
            type: "Smartphone",
            material: "Titanium",
            design: "Premium flagship",
            customization: "Accessories bundle available",
            protection: "7 days replacement policy",
            warranty: "1 year Apple India warranty"
        },
        description: "Latest iPhone 15 Pro Max with titanium design, A17 Pro chip, and advanced camera system.",
        specs: {
            model: "#iPH15PM256",
            style: "Flagship Smartphone",
            certificate: "BIS, FCC, CE",
            size: "6.7 inch display",
            color: "Natural Titanium, Blue Titanium, White Titanium, Black Titanium"
        },
        features: [
            "A17 Pro chip",
            "48MP main camera",
            "Titanium body",
            "Action button",
            "USB-C port",
            "Dynamic Island"
        ],
        seller: {
            name: "Apple Authorized Reseller",
            location: "India, Multiple Locations",
            flag: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
            verified: true,
            shipping: "Nationwide shipping"
        }
    },

    p005: {
        id: "p005",
        title: "Premium Winter Puffer Jacket",
        inStock: true,
        images: [jacket1, jacket2, jacket3, jacket4, jacket5],
        category: "jacket",
        rating: {
            stars: 3.7,
            score: 8.4,
            reviews: 67,
            sold: 245
        },
        pricing: {
            bulk: [
                { price: 2800, range: "30–100 pcs" },
                { price: 2500, range: "100–500 pcs" },
                { price: 2200, range: "500+ pcs" }
            ],
            retail: {
                originalPrice: 5999,
                salePrice: 2799,
                discountPercentage: 53,
                savings: 3200
            }
        },
        shipping: {
            type: "Shipping charges: ₹99",
            charges: 99,
            note: "Free shipping on orders above ₹3000"
        },
        details: {
            priceType: "Negotiable",
            type: "Winter Jacket",
            material: "Polyester with thermal lining",
            design: "Oversized puffer",
            customization: "Logo embroidery available",
            protection: "Exchange Policy - 15 days",
            warranty: "6 months warranty"
        },
        description: "Warm and stylish puffer jacket with water-resistant exterior, perfect for winter.",
        specs: {
            model: "#JKT9988",
            style: "Winter Casual",
            certificate: "ISO-9001",
            size: "M / L / XL / XXL",
            color: "Black, Navy, Olive, Beige"
        },
        features: [
            "Water-resistant outer",
            "Thermal insulation",
            "Detachable hood",
            "Multiple pockets",
            "Adjustable cuffs"
        ],
        seller: {
            name: "Winter Wear India",
            location: "India, Delhi",
            flag: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
            verified: true,
            shipping: "Pan-India delivery"
        }
    },

    p006: {
        id: "p006",
        title: "Gaming Laptop - 16GB RAM, RTX 4060",
        inStock: true,
        images: [laptop1, laptop2, laptop3, laptop4],
        category: "laptop",
        rating: {
            stars: 4.6,
            score: 9.2,
            reviews: 128,
            sold: 456
        },
        pricing: {
            bulk: [
                { price: 82000, range: "10–50 pcs" },
                { price: 78000, range: "50–200 pcs" }
            ],
            retail: {
                originalPrice: 109990,
                salePrice: 81999,
                discountPercentage: 25,
                savings: 27991
            }
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free insured delivery across India"
        },
        details: {
            priceType: "Fixed",
            type: "Gaming Laptop",
            material: "Aluminum chassis",
            design: "High-performance gaming",
            customization: "Extended warranty available",
            protection: "7 days replacement",
            warranty: "2 years comprehensive warranty"
        },
        description: "Powerful gaming laptop with Intel i7 13th gen, RTX 4060, and 144Hz display.",
        specs: {
            model: "#LAP2024G",
            style: "Gaming Performance",
            certificate: "BIS, Energy Star",
            size: "15.6 inch FHD 144Hz",
            color: "Shadow Black, Phantom Blue"
        },
        features: [
            "Intel i7 13th Gen",
            "RTX 4060 6GB",
            "16GB DDR5 RAM",
            "512GB NVMe SSD",
            "144Hz display",
            "RGB keyboard"
        ],
        seller: {
            name: "TechZone Electronics",
            location: "India, Hyderabad",
            flag: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
            verified: true,
            shipping: "Nationwide delivery"
        }
    },

    p007: {
        id: "p007",
        title: "Premium Cotton Formal Shirt",
        inStock: true,
        images: [shirt1, shirt2, shirt3, shirt4, shirt5],
        category: "shirt",
        rating: {
            stars: 4.4,
            score: 8.8,
            reviews: 93,
            sold: 312
        },
        pricing: {
            bulk: [
                { price: 650, range: "50–200 pcs" },
                { price: 580, range: "200–1000 pcs" },
                { price: 520, range: "1000+ pcs" }
            ],
            retail: {
                originalPrice: 1999,
                salePrice: 649,
                discountPercentage: 68,
                savings: 1350
            }
        },
        shipping: {
            type: "Shipping charges: ₹50",
            charges: 50,
            note: "Free shipping above ₹1500"
        },
        details: {
            priceType: "Negotiable",
            type: "Formal Shirt",
            material: "100% Premium Cotton",
            design: "Slim fit",
            customization: "Custom tailoring available",
            protection: "Exchange within 7 days",
            warranty: "Quality guarantee - 3 months"
        },
        description: "Premium cotton formal shirt with wrinkle-free fabric, ideal for office and formal occasions.",
        specs: {
            model: "#SHT4455",
            style: "Formal Business",
            certificate: "OEKO-TEX Standard",
            size: "S / M / L / XL / XXL",
            color: "White, Blue, Pink, Black, Grey"
        },
        features: [
            "Non-iron fabric",
            "Spread collar",
            "Curved hem",
            "Chest pocket",
            "Breathable material"
        ],
        seller: {
            name: "Elite Formals",
            location: "India, Pune",
            flag: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
            verified: true,
            shipping: "India-wide delivery"
        }
    },

    p008: {
        id: "p008",
        title: "Smart Watch Pro - AMOLED Display",
        inStock: true,
        images: [watch1, watch2, watch3, watch4],
        category: "smartWatch",
        rating: {
            stars: 4.5,
            score: 9.0,
            reviews: 234,
            sold: 789
        },
        pricing: {
            bulk: [
                { price: 2200, range: "50–200 pcs" },
                { price: 1900, range: "200–1000 pcs" },
                { price: 1600, range: "1000+ pcs" }
            ],
            retail: {
                originalPrice: 4999,
                salePrice: 2199,
                discountPercentage: 56,
                savings: 2800
            }
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free delivery + 1 extra strap"
        },
        details: {
            priceType: "Negotiable",
            type: "Smart Watch",
            material: "Stainless Steel + Silicone strap",
            design: "Premium smartwatch",
            customization: "Multiple strap options",
            protection: "10 days replacement",
            warranty: "1 year warranty"
        },
        description: "Feature-rich smartwatch with AMOLED display, health tracking, and 7-day battery life.",
        specs: {
            model: "#SW2024P",
            style: "Smart Wearable",
            certificate: "BIS certified",
            size: "1.43 inch AMOLED",
            color: "Black, Silver, Rose Gold"
        },
        features: [
            "1.43 inch AMOLED",
            "SpO2 monitoring",
            "Heart rate tracking",
            "100+ sports modes",
            "IP68 waterproof",
            "7 days battery"
        ],
        seller: {
            name: "WearTech Solutions",
            location: "India, Chennai",
            flag: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
            verified: true,
            shipping: "All India shipping"
        }
    },

    p009: {
        id: "p009",
        title: "Premium Cotton Blend Sweatshirt",
        inStock: true,
        images: [sweatshirt1, sweatshirt2, sweatshirt3, sweatshirt4],
        category: "sweatshirt",
        rating: {
            stars: 4.6,
            score: 9.2,
            reviews: 87,
            sold: 298
        },
        pricing: {
            bulk: [
                { price: 850, range: "40–150 pcs" },
                { price: 750, range: "150–600 pcs" },
                { price: 650, range: "600+ pcs" }
            ],
            retail: {
                originalPrice: 2499,
                salePrice: 849,
                discountPercentage: 66,
                savings: 1650
            }
        },
        shipping: {
            type: "Shipping charges: ₹60",
            charges: 60,
            note: "Free shipping on orders above ₹1500"
        },
        details: {
            priceType: "Negotiable",
            type: "Sweatshirt",
            material: "80% Cotton, 20% Polyester",
            design: "Regular fit",
            customization: "Print and embroidery available",
            protection: "Exchange - 7 days",
            warranty: "6 months quality guarantee"
        },
        description: "Comfortable cotton blend sweatshirt with fleece lining, perfect for casual wear.",
        specs: {
            model: "#SWT7788",
            style: "Casual Comfort",
            certificate: "OEKO-TEX",
            size: "M / L / XL / XXL",
            color: "Black, Grey, Navy, Maroon, Olive"
        },
        features: [
            "Fleece inner lining",
            "Ribbed cuffs and hem",
            "Kangaroo pocket",
            "Soft brushed interior",
            "Pre-shrunk fabric"
        ],
        seller: {
            name: "ComfortWear India",
            location: "India, Ludhiana",
            flag: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
            verified: true,
            shipping: "Pan-India delivery"
        }
    },

    p010: {
        id: "p010",
        title: "Classic Crew Neck T-Shirt - Premium Cotton",
        inStock: true,
        images: [tshirt1, tshirt2, tshirt3, tshirt4],
        category: "tshirt",
        rating: {
            stars: 4.3,
            score: 8.6,
            reviews: 156,
            sold: 623
        },
        pricing: {
            bulk: [
                { price: 380, range: "100–500 pcs" },
                { price: 320, range: "500–2000 pcs" },
                { price: 280, range: "2000+ pcs" }
            ],
            retail: {
                originalPrice: 999,
                salePrice: 379,
                discountPercentage: 62,
                savings: 620
            }
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free shipping on all t-shirts"
        },
        details: {
            priceType: "Negotiable",
            type: "T-Shirt",
            material: "100% Combed Cotton",
            design: "Regular fit",
            customization: "Custom prints available",
            protection: "Easy returns - 7 days",
            warranty: "3 months quality assurance"
        },
        description: "Premium quality crew neck t-shirt in 100% combed cotton, soft and durable.",
        specs: {
            model: "#TSH3366",
            style: "Casual Everyday",
            certificate: "OEKO-TEX Standard 100",
            size: "S / M / L / XL / XXL",
            color: "White, Black, Grey, Navy, Red, Green"
        },
        features: [
            "Bio-washed fabric",
            "Color-fast dyes",
            "Reinforced stitching",
            "Tagless neck label",
            "Pre-shrunk cotton"
        ],
        seller: {
            name: "Cotton Craft India",
            location: "India, Tirupur",
            flag: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
            verified: true,
            shipping: "Nationwide delivery"
        }
    },

    p011: {
        id: "p011",
        title: "Premium Winter Hoodie - Fleece Lined",
        inStock: true,
        images: [hoodie1, hoodie2, hoodie3, hoodie4],
        category: "hoodie",
        rating: {
            stars: 4.6,
            score: 9.2,
            reviews: 112,
            sold: 345
        },
        pricing: {
            bulk: [
                { price: 950, range: "40–150 pcs" },
                { price: 850, range: "150–600 pcs" },
                { price: 750, range: "600+ pcs" }
            ],
            retail: {
                originalPrice: 2999,
                salePrice: 949,
                discountPercentage: 68,
                savings: 2050
            }
        },
        shipping: {
            type: "Free Shipping",
            charges: 0,
            note: "Free express delivery on all hoodies"
        },
        details: {
            priceType: "Negotiable",
            type: "Hoodie",
            material: "65% Cotton, 35% Polyester",
            design: "Oversized fit",
            customization: "Custom prints and embroidery",
            protection: "Exchange - 10 days",
            warranty: "6 months quality guarantee"
        },
        description: "Premium quality winter hoodie with ultra-soft fleece lining and spacious kangaroo pocket.",
        specs: {
            model: "#HD2024W",
            style: "Streetwear Casual",
            certificate: "OEKO-TEX Standard",
            size: "M / L / XL / XXL",
            color: "Black, Grey, Navy, Maroon, Olive Green, Beige"
        },
        features: [
            "Premium fleece lining",
            "Adjustable drawstring hood",
            "Kangaroo pocket",
            "Ribbed cuffs and hem",
            "Heavy-duty zipper",
            "Double-layered hood"
        ],
        seller: {
            name: "StreetStyle Apparel",
            location: "India, Delhi",
            flag: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
            verified: true,
            shipping: "Pan-India delivery"
        }
    },

    p012: {
        id: "p012",
        title: "55 inch 4K Ultra HD Smart LED TV",
        inStock: true,
        images: [tv1, tv2, tv3, tv4],
        category: "tv",
        rating: {
            stars: 4.5,
            score: 9.0,
            reviews: 287,
            sold: 834
        },
        pricing: {
            bulk: [
                { price: 35000, range: "5–20 pcs" },
                { price: 33000, range: "20–100 pcs" }
            ],
            retail: {
                originalPrice: 54990,
                salePrice: 34999,
                discountPercentage: 36,
                savings: 19991
            }
        },
        shipping: {
            type: "Free Installation",
            charges: 0,
            note: "Free delivery + installation across India"
        },
        details: {
            priceType: "Fixed",
            type: "Smart LED TV",
            material: "Premium plastic & metal",
            design: "Frameless bezel",
            customization: "Wall mount & stand included",
            protection: "10 days replacement",
            warranty: "2 years comprehensive warranty + 1 year panel warranty"
        },
        description: "Stunning 55-inch 4K Ultra HD Smart TV with vibrant colors, HDR support, and built-in streaming apps.",
        specs: {
            model: "#TV55-4K2024",
            style: "Modern Entertainment",
            certificate: "BIS, Energy Star 5",
            size: "55 inch (139 cm)",
            color: "Piano Black"
        },
        features: [
            "4K Ultra HD (3840 x 2160)",
            "HDR10+ support",
            "Dolby Audio",
            "Built-in WiFi",
            "Android TV / Smart OS",
            "3 HDMI & 2 USB ports",
            "Screen mirroring",
            "Voice remote control"
        ],
        seller: {
            name: "ElectroVision India",
            location: "India, Bangalore",
            flag: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
            verified: true,
            shipping: "Nationwide delivery & installation"
        }
    }
};

export default products;