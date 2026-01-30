import { Link } from "react-router-dom"

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20">

            <img
                src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                alt="Empty Cart"
                className="w-64 mb-6"
            />

            <h2 className="text-2xl font-semibold mb-2">
                Your cart is empty!
            </h2>

            <p className="text-gray-500 mb-6">
                Add items to it now.
            </p>

            <Link to={'/product'}>
                <button
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                    Shop Now
                </button>
            </Link>
        </div>
    );
};

export default EmptyCart;
