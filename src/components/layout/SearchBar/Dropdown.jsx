import { Link } from 'react-router-dom'

const Dropdown = ({ data, close }) => {
    return (
        <div className="min-w-full bg-slate-100  border-gray-300 rounded-lg shadow-lg overflow-y-auto">
            {data.map((item) => (
                <Link to={`product/${item.id}`}>
                    <div
                        key={item.id}
                        onClick={close}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                    >
                        {item.title}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Dropdown