import ImgSlider from './ImgSlider'
import Deal from './Deal'
import CategoryCards from './CategoryCards/CategoryCards'
import SendInquiry from './SendInquiry'
import RecomendedItems from './RecomendedItems'
import ExtraService from './ExtraService'
import Suppliers from './Suppliers'

const Home = () => {
    const homeDecorData = {
        id: 101,
        title: "Home and Outdoor",
        buttonText: "Source Now",
        bgImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        items: [
            {
                id: 1,
                name: "Soft chairs",
                img: "https://static.vecteezy.com/system/resources/thumbnails/039/652/230/small/ai-generated-soft-armchair-soft-chair-soft-sofa-stylish-armchair-luxurious-armchair-luxurious-chair-soft-armchair-transparent-background-png.png",
                price: "999",
            },
            {
                id: 2,
                name: "Sofa & chair",
                img: "https://freepngimg.com/save/13099-furniture-png-image/1200x957",
                price: "899",
            },
            {
                id: 3,
                name: "Kitchen dishes",
                img: "https://png.pngtree.com/png-vector/20240408/ourmid/pngtree-large-metal-bowl-overflowing-with-colorful-kitchen-utensils-png-image_12270852.png",
                price: "199",
            },
            {
                id: 4,
                name: "Smart watches",
                img: "https://images.fonearena.com/blog/wp-content/uploads/2020/05/realme-smartwatch.png",
                price: "599",
            },
            {
                id: 5,
                name: "Kitchen mixer",
                img: "https://www.pngplay.com/wp-content/uploads/7/Mixer-Grinder-Kitchen-Background-PNG-Image.png",
                price: "599",
            },
            {
                id: 6,
                name: "Juicer",
                img: "https://png.pngtree.com/png-clipart/20240812/original/pngtree-juice-machine-full-of-juices-png-image_15753760.png",
                price: "499",
            },
            {
                id: 7,
                name: "Home appliance",
                img: "https://png.pngtree.com/png-clipart/20250417/original/pngtree-smart-home-and-kitchen-appliances-png-image_20843861.png",
                price: "9999",
            },
            {
                id: 8,
                name: "Coffee maker",
                img: "https://png.pngtree.com/png-clipart/20241203/original/pngtree-modern-coffee-maker-png-image_17483299.png",
                price: "1999",
            },
        ],
    }
    const slides = [
        {
            image: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/2ec5357fa1787447.jpg?q=60",
        },
        {
            image: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/cfde6a9e800a107a.png?q=60",
        },
        {
            image: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/265951683409e311.png?q=60",
        },
    ];
    const electronicsGadgets = {
        id: 102,
        title: "Electronics and gadgets",
        buttonText: "Source Now",
        bgImage: "https://images.unsplash.com/photo-1623970405357-1eb737075953?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        items: [
            {
                id: 1,
                name: "Smart watches",
                img: "https://www.boat-lifestyle.com/cdn/shop/files/WaveGenesisPro-FI_Orange01_fa9e528c-84c9-4a86-a0ed-6e31aba5364b.png?v=1697097677",
                price: "899",
            },
            {
                id: 2,
                name: "Cameras",
                img: "https://png.pngtree.com/png-vector/20240905/ourmid/pngtree-black-dslr-camera-with-large-lens-clipart-illustration-stock-photo-png-image_13758787.png",
                price: "19999",
            },
            {
                id: 3,
                name: "Headphones",
                img: "https://png.pngtree.com/png-vector/20250321/ourmid/pngtree-wireless-headphone-png-image_15830312.png",
                price: "999",
            },
            {
                id: 4,
                name: "Play Station",
                img: "https://wallpapers.com/images/featured/ps5-console-png-ywbv2gv3gfw23o3w.png",
                price: "29999",
            },
            {
                id: 5,
                name: "Gaming set",
                img: "https://png.pngtree.com/png-clipart/20241230/original/pngtree-vibrant-gaming-setup-neon-pink-desk-electric-blue-accents-ergonomic-ga-png-image_18316814.png",
                price: "49999",
            },
            {
                id: 6,
                name: "Laptops & PC",
                img: "https://www.freepnglogos.com/uploads/laptop-png/laptop-png-custom-safety-software-applications-terraine-27.png",
                price: "39999",
            },
            {
                id: 7,
                name: "Smartphones",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD4ptSLwnADJYa6U_VH2h768VC8B58ZfWHRg&s",
                price: "9999",
            },
            {
                id: 8,
                name: "Electric kettle",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt1gi9QEUOoH68eLIByEKgW5lIDznccR9teQ&s",
                price: "499",
            },
        ],
    }
    return (
        <div className='w-full bg-gray-50 overflow-x-hidden '>

            <div className='lg:px-18 lg:pt-8 py-4'>
                {/* image slider page */}
                <ImgSlider slides={slides} />

                {/* Deal section page */}
                <Deal />

                {/* Home and decor section */}
                <CategoryCards {...homeDecorData} />

                {/* ELectronics and gadgets section */}
                <CategoryCards {...electronicsGadgets} />

                {/* Send Inquiry section */}
                <SendInquiry />

                {/* Recomended Items section */}
                <RecomendedItems />

                {/* Extra Service section */}
                <ExtraService />

                {/* Suppliers by region section  */}
                <Suppliers />
            </div>
        </div>
    )
}

export default Home
