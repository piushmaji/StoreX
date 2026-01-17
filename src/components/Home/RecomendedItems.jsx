import {bag,blezzer,headphone,cattle,jacket,pant,tshirt,wallet,pot} from '../../assets/images/items-img/index'
const RecomendedItems = () => {

    const products = [
        {
            id: 1,
            title: "Men's T-Shirt",
            price: 10.30,
            description: "T-shirts with multiple colors, comfortable cotton fabric for daily wear.",
            img:tshirt
        },
        {
            id: 2,
            title: "Winter Jacket",
            price: 10.30,
            description: "Brown winter jacket with warm inner lining and hood.",
            img:jacket
        },
        {
            id: 3,
            title: "Men's Blazer",
            price: 12.50,
            description: "Stylish blue blazer suitable for formal occasions.",
            img: blezzer
        },
        {
            id: 4,
            title: "Men's Wallet",
            price: 34.00,
            description: "Premium leather wallet with multiple card slots.",
            img: wallet
        },
        {
            id: 5,
            title: "Leather Backpack",
            price: 99.00,
            description: "Durable leather backpack for travel and daily use.",
            img: bag
        },
        {
            id: 6,
            title: "Denim Shorts",
            price: 9.99,
            description: "Classic blue denim shorts with a modern fit.",
            img: pant
        },
        {
            id: 7,
            title: "Gaming Headset",
            price: 8.99,
            description: "Comfortable gaming headset with noise-isolating mic.",
            img: headphone
        },
        {
            id: 8,
            title: "Smartwatch",
            price: 10.30,
            description: "Modern silver smartwatch with fitness tracking features.",
            img: bag
        },
        {
            id: 9,
            title: "Clay Pot",
            price: 10.30,
            description: "Traditional clay pot suitable for cooking and storage.",
            img: pot
        },
        {
            id: 10,
            title: "Electric Kettle",
            price: 80.95,
            description: "Modern electric kettle with fast boiling technology.",
            img: cattle
        }
    ];

    return (
        <>
            <div className='p-2'>
                <div className='text-2xl p-2'>
                    <h1>Recommended items</h1>
                </div>
                <div className='grid lg:grid-cols-5 grid-cols-2 gap-2'>
                    {products.map((product) => [
                        <div
                            key={product.id}
                            className='border bg-white border-gray-300 rounded-lg pb-4'>
                            <div className='flex flex-col pt-4 items-center'>
                                <img
                                    className='h-40 w-40 '
                                    src={product.img} alt={product.title} />
                            </div>
                            <div className='pl-3 pt-2 w-[70%]'>
                                <h2>₹{product.price}</h2>
                                <p className='text-gray-400'>{product.description}</p>
                            </div>
                        </div>
                    ])}
                </div>
            </div>
        </>
    )
}

export default RecomendedItems
