import React from "react";

const SendInquiry = () => {
  return (
    <section className="p-2">
      <div className="relative rounded-xl overflow-hidden min-h-125">
        
        {/* Background Image */}
        <img
          src="img/quiry/factory.svg"
          alt="Factory"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-blue-600/80 to-teal-300/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 px-6 lg:px-14 py-14">

          {/* Left Content */}
          <div className="text-white max-w-xl space-y-4">
            <h1 className="text-2xl lg:text-3xl font-semibold">
              An easy way to send requests to all suppliers
            </h1>
            <p className="text-sm text-gray-100">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quos enim error sunt quibusdam.
            </p>
          </div>

          {/* Form */}
          <form className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4 shadow-lg">
            <h2 className="text-lg font-semibold">Send quote to suppliers</h2>

            <input
              type="text"
              readOnly
              value="What item you need?"
              className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none"
            />

            <textarea
              placeholder="Type more details"
              className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none"
            />

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Quantity"
                className="flex-1 h-10 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none"
              />

              <select className="w-28 h-10 border border-gray-300 rounded-lg px-2 text-sm focus:outline-none">
                <option>Pcs</option>
                <option>Kg</option>
                <option>Ton</option>
              </select>
            </div>

            <button className="w-40 h-10 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
              Send Inquiry
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default SendInquiry;
