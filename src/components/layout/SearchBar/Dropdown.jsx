import React from 'react'

const Dropdown = ({ data, close }) => {
    return (
        <div>

            <div className="bg-white border shadow rounded">

                {data.map((item) => (
                    <div
                        key={item.id}
                        onClick={close}
                        className="p-2 hover:bg-gray-100"
                    >
                        {item.title}
                        {/* <img src={item.images[0]} alt="" /> */}
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Dropdown