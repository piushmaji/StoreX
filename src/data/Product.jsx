import { collar, fold, front, wearing, front1 } from '../assets/images/ProductsAllSideImages/Tshirt/index'

const product = {
    id: "p001",
    title: "Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle",
    inStock: true,

    images: [
        front,
        collar,
        fold,
        wearing,
        front1,
    ],

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
        type: "Classic shoes",
        material: "Plastic material",
        design: "Modern nice",
        customization: "Customized logo and design custom packages",
        protection: "Refund Policy",
        warranty: "2 years full warranty"
    },

    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

    specs: {
        model: "#8786867",
        style: "Classic style",
        certificate: "ISO-898921212",
        size: "34mm x 450mm x 19mm",
        memory: "36GB RAM"
    },

    features: [
        "Some great feature name here",
        "Lorem ipsum dolor sit amet, consectetur",
        "Duis aute irure dolor in reprehenderit",
        "Some great feature name here"
    ],

    seller: {
        name: "Guanjoi Trading LLC",
        location: "Germany, Berlin",
        flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png',
        verified: true,
        shipping: "Worldwide shipping"
    }
};

export default product;
