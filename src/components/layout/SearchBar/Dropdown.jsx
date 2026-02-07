import React from 'react'
import { Link } from 'react-router-dom'

const Dropdown = ({ data, close }) => {
    return (
        <div className="w-full  bg-white border border-gray-300 shadow-lg rounded overflow-y-auto">
            {data.map((item) => (
                <Link to={`product/${item.id}`}>
                    <div
                        key={item.id}
                        onClick={close}
                        className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                    >
                        {item.title}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Dropdown