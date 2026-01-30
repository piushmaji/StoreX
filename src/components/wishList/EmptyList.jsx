import { Link } from "react-router-dom"

const EmptyList = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20">

            <img
                src="https://cdn.dribbble.com/userupload/40440695/file/original-f323b063d0e71600702d01d7eccb9c4c.jpg?resize=1504x1128&vertical=center"
                alt="Empty Cart"
                className="w-64 mb-6"
            />

            <h2 className="text-2xl font-semibold mb-2">
                Your WishList is empty!
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
    )
}

export default EmptyList
