import { ChevronLeft, ChevronRight, LayoutGrid, Menu } from 'lucide-react'
import React from 'react'

const ProductCategory = () => {
  return (
    <div className='h-full bg-zinc-500'>
      {/* Featured section  */}
      <div className='bg-indigo-400 flex items-center justify-between p-2'>

        <div className='font-thin'>
          <h1>12,911 items in <span className='font-semibold'>Mobile accessory</span></h1>
        </div>

        <div className='flex gap-6'>
          <div className='flex items-center gap-2'>
            <input className='h-4 w-4' type="checkbox" /> <label>Verified only</label>
          </div>
          <div>
            <select
              className='bg-gray-50 p-2 rounded-lg'
              name="Featured">
              <option value="Featured">Featured</option>
              <option value="Featured">Featured</option>
              <option value="Featured">Featured</option>
              <option value="Featured">Featured</option>
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <div className='bg-gray-50 border border-gray-400 p-1 rounded-lg'>
              <LayoutGrid />
            </div>
            <div className='bg-gray-50 border border-gray-400 p-1 rounded-lg'>
              <Menu />
            </div>
          </div>
        </div>
      </div>

      {/* Main Product Category section  */}
      <div>j</div>

      {/* Next Page section  */}
      <div className='flex justify-end-safe items-center'>
        <div>
          <select>
            <option value="ShowPages">Show Pages</option>
            <option value="Show 10">Show 10</option>
            <option value="Show 20">Show 20</option>
            <option value="Show 25 +">Show 25 +</option>
          </select>
        </div>
        <div>
          <div className='flex items-center justify-center'>
            <div className='h-8 w-10 bg-gray-50 flex items-center justify-center rounded-l-lg border border-gray-400 border-r-0 '>
              <ChevronLeft />
            </div>
            <div className='h-8 w-10 bg-gray-50 flex items-center justify-center border border-gray-400 border-r-0 '>
              <h1>1</h1>
            </div>

            <div className='h-8 w-10 bg-gray-50 flex items-center justify-center border border-gray-400 border-r-0 '>
              <h1>2</h1>
            </div>

            <div className='h-8 w-10 bg-gray-50 flex items-center justify-center border border-gray-400 '>
              <h1>3</h1>
            </div>

            <div className='h-8 w-10 bg-gray-50 flex items-center justify-center rounded-r-lg border border-gray-400 border-l-0'><ChevronRight /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCategory
