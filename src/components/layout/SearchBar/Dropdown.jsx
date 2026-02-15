import { Link } from 'react-router-dom'

const Dropdown = ({ data, close }) => {
    return ( 
        <div className="min-w-full bg-white
rounded-2xl
shadow-xl
border border-blue-100 text-sm">
            {data.map((item) => (
                <Link to={`product/${item.id}`}>
                    <div
                        key={item.id}
                        onClick={close}
                        className="px-4 py-2 cursor-pointer border-b border-gray-200 last:border-b-0 hover:bg-blue-50 text-gray-800
rounded-xl
transition"
                    >
                        {item.title}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Dropdown