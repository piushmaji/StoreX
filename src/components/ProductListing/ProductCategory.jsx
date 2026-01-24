import { ChevronLeft, ChevronRight, Heart, LayoutGrid, Menu } from 'lucide-react'
import products from '../../data/Products'
import { Link } from 'react-router-dom'

const ProductCategory = () => {
  const productArray = Object.values(products)

  return (
    <div className='h-full flex flex-col justify-between gap-5'>
      {/* Featured section  */}
      <div className='flex items-center justify-between p-4 border border-gray-300 rounded-lg'>

        <div className='font-thin'>
          <h1>12,911 product in <span className='font-semibold'>Mobile accessory</span></h1>
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
      <div className='flex flex-col flex-1 gap-2'>

        {/* Each Product Category section  */}
        {productArray.map((product) => [
          <Link
            key={product.id}
            to={`${product.id}`}
          >
            <div key={product.id} className='w-full flex bg-white border border-gray-300 rounded-lg p-4 hover:cursor-pointer group transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg '>

              {/* image  */}
              <div className='w-1/4'>
                <img className='h-64 w-full object-contain' src={product.images[0]} alt={product.title} />
              </div>
              <div className='flex w-full justify-between'>

                {/* Name  */}
                <div className='flex flex-col justify-evenly px-4'>
                  <section>
                    <h1>{product.title}</h1>
                  </section>

                  {/* price,old price and ratings  */}
                  <section>
                    <div className='flex gap-2 items-center'>
                      <h2 className='font-extrabold text-lg'>₹{product.pricing.retail.salePrice}</h2>
                      <h2 className='line-through text-gray-500 text-sm'>₹{product.pricing.retail.originalPrice}</h2>
                    </div>
                    <div className='flex gap-6'>
                      <div className='flex gap-2'>
                        <p>{'⭐️'.repeat(Math.floor(product.rating.stars))}</p>
                        <h1 className='text-yellow-500'>{product.rating.score}</h1>
                      </div>
                      <li className='text-gray-400'>{product.rating.sold} Sold</li>
                      <li className='text-lime-600'>{product.shipping.type}</li>
                    </div>
                  </section>

                  {/* Description section and view more details   */}
                  <section className='w-4/5 font-light flex flex-col gap-2'>
                    <p>{product.description}{product.features[0]}.{product.features[1]}.{product.features[2]}</p>
                    <ul>
                      <li className="text-blue-500 font-semibold  hover:text-blue-800 hover:cursor-pointer ">View details</li>
                    </ul>
                  </section>
                </div>

                {/* Love React or wishlist section */}
                <div className='h-10 p-2 flex items-center bg-white rounded-lg shadow-lg border border-gray-400 text-blue-600'>
                  <Heart />
                </div>

              </div>
            </div>
          </Link>
        ])}


      </div>

      {/* Next Page section  */}
      <div className='flex justify-end-safe items-center py-4 gap-4'>
        <div>
          <select className='p-2 bg-white border border-gray-300 rounded-lg '>
            <option value="ShowPages">Show Pages</option>
            <option value="Show 10">Show 10</option>
            <option value="Show 20">Show 20</option>
            <option value="Show 25 +">Show 25 +</option>
          </select>
        </div>
        <div>
          <div className='flex items-center justify-center '>
            <button className='h-10 w-10 bg-gray-50 flex items-center justify-center rounded-l-lg border border-gray-400 border-r-0 '>
              <ChevronLeft />
            </button>
            <div className='h-10 w-10 bg-gray-50 flex items-center justify-center border border-gray-400 border-r-0 '>
              <h1>1</h1>
            </div>

            <div className='h-10 w-10 bg-gray-50 flex items-center justify-center border border-gray-400 border-r-0 '>
              <h1>2</h1>
            </div>

            <div className='h-10 w-10 bg-gray-50 flex items-center justify-center border border-gray-400 '>
              <h1>3</h1>
            </div>

            <button className='h-10 w-10 bg-gray-50 flex items-center justify-center rounded-r-lg border border-gray-400 border-l-0'>
              <ChevronRight /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCategory
