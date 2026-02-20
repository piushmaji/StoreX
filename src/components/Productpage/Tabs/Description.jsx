import { Check } from 'lucide-react'
import React from 'react'

const Description = ({ product }) => {
  return (
    <div>
      <div className="flex flex-col gap-7">

        {/* Description Text */}
        <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
          <p className="text-sm text-gray-600 leading-relaxed text-justify">
            {product.description}
          </p>
        </div>

        {/* Specs Table */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-3">Specifications</h3>
          <div className="rounded-xl overflow-hidden border border-blue-100 w-[80%]">
            <table className="w-full">
              <tbody>
                {Object.entries(product.specs).map(([key, value], i) => (
                  <tr
                    key={key}
                    className={`border-b border-blue-50 last:border-0 transition-colors hover:bg-blue-50/40 ${i % 2 === 0 ? 'bg-white' : 'bg-blue-50/20'}`}
                  >
                    <td className="px-5 py-3.5 text-xs font-bold text-gray-400 uppercase tracking-wide w-40">
                      {key}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-700 font-medium">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-3">Key Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {product.features.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-white border border-blue-100 rounded-xl px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <Check size={11} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-sm text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Description