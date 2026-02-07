import { ChevronLeft, ChevronRight, Heart, LayoutGrid, Menu } from 'lucide-react'
import products from '../../data/Products'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/material'
import WishListIcon from '../common/WishListIcon/WishListIcon'

const ProductCategory = () => {
  const productArray = Object.values(products)

  return (
    <div className='h-full flex flex-col justify-between gap-5'>
      {/* Featured section  */}
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between p-3 md:p-4 border border-gray-300 rounded-lg gap-3 md:gap-0'>
        <div className='font-thin text-sm md:text-base'>
          <h1>{productArray.length} product in <span className='font-semibold'>Mobile accessory</span></h1>
        </div>

        <div className='flex flex-wrap gap-3 md:gap-6 w-full md:w-auto'>
          <div className='flex items-center gap-2 text-sm md:text-base'>
            <input className='h-4 w-4' type="checkbox" /> <label>Verified only</label>
          </div>
          <div className='flex-1 md:flex-none'>
            <select
              className='bg-gray-50 p-2 rounded-lg w-full md:w-auto text-sm md:text-base'
              name="Featured">
              <option value="Featured">Featured</option>
              <option value="Featured">Featured</option>
              <option value="Featured">Featured</option>
              <option value="Featured">Featured</option>
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <div className='bg-gray-50 border border-gray-400 p-1 rounded-lg'>
              <LayoutGrid className='w-5 h-5 md:w-6 md:h-6' />
            </div>
            <div className='bg-gray-50 border border-gray-400 p-1 rounded-lg'>
              <Menu className='w-5 h-5 md:w-6 md:h-6' />
            </div>
          </div>
        </div>
      </div>

      {/* Main Product Category section  */}
      <div className='flex flex-col flex-1 gap-2 md:gap-3'>

        {/* Each Product Category section  */}
        {productArray.map((product) => (
          <div key={product.id} className='w-full flex flex-col sm:flex-row bg-white border border-gray-300 rounded-lg p-3 md:p-4 hover:cursor-pointer group transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg relative'>
            <Link
              to={`${product.id}`}
              target="_blank"
              className='w-full'
            >
              <div className='w-full flex flex-col sm:flex-row gap-3 md:gap-4'>
                {/* image  */}
                <div className='w-full sm:w-1/3 lg:w-1/4 shrink-0'>
                  <img className='h-48 sm:h-56 md:h-64 w-full object-contain' src={product.images[0]} alt={product.title} />
                </div>

                <div className='flex flex-col sm:flex-1 justify-between w-full'>
                  {/* Name  */}
                  <div className='flex flex-col justify-evenly gap-3 md:gap-4'>
                    <section>
                      <h1 className='text-base md:text-lg font-medium line-clamp-2'>{product.title}</h1>
                    </section>

                    {/* price,old price and ratings  */}
                    <section className='space-y-2'>
                      <div className='flex gap-2 items-center flex-wrap'>
                        <h2 className='font-extrabold text-lg md:text-xl'>₹{product.pricing.retail.salePrice}</h2>
                        <h2 className='line-through text-gray-500 text-sm md:text-base'>₹{product.pricing.retail.originalPrice}</h2>
                      </div>
                      <div className='flex flex-wrap gap-3 md:gap-6 text-xs md:text-sm'>
                        <div className='flex gap-2 items-center'>
                          <Rating value={product.rating.stars} precision={0.5} readOnly size="small" />
                          <h1 className='text-yellow-500'>{product.rating.score}</h1>
                        </div>
                        <li className='text-gray-400'>{product.rating.sold} Sold</li>
                        <li className='text-lime-600'>{product.shipping.type}</li>
                      </div>
                    </section>

                    {/* Description section and view more details   */}
                    <section className='w-full lg:w-4/5 font-light flex flex-col gap-2 text-sm md:text-base'>
                      <p className='line-clamp-2 md:line-clamp-3'>
                        {product.description}{product.features[0]}.{product.features[1]}.{product.features[2]}
                      </p>
                      <ul>
                        <li className="text-blue-500 font-semibold hover:text-blue-800 hover:cursor-pointer">View details</li>
                      </ul>
                    </section>
                  </div>
                </div>
              </div>
            </Link>

            {/* Love React or wishlist section */}
            <div className='absolute top-3 right-3 sm:relative sm:top-auto sm:right-auto h-10 w-10 p-2 flex items-center justify-center bg-white rounded-lg shadow-lg border border-gray-400 text-blue-600 shrink-0'>
              <WishListIcon product={product} />
            </div>
          </div>
        ))}
      </div>

      {/* Next Page section  */}
      <div className='flex flex-col sm:flex-row justify-end items-center py-4 gap-3 md:gap-4'>
        <div className='w-full sm:w-auto'>
          <select className='p-2 bg-white border border-gray-300 rounded-lg w-full sm:w-auto text-sm md:text-base'>
            <option value="ShowPages">Show Pages</option>
            <option value="Show 10">Show 10</option>
            <option value="Show 20">Show 20</option>
            <option value="Show 25 +">Show 25 +</option>
          </select>
        </div>
        <div>
          <div className='flex items-center justify-center'>
            <button className='h-8 w-8 md:h-10 md:w-10 bg-gray-50 flex items-center justify-center rounded-l-lg border border-gray-400 border-r-0'>
              <ChevronLeft className='w-4 h-4 md:w-5 md:h-5' />
            </button>
            <div className='h-8 w-8 md:h-10 md:w-10 bg-gray-50 flex items-center justify-center border border-gray-400 border-r-0 text-sm md:text-base'>
              <h1>1</h1>
            </div>

            <div className='h-8 w-8 md:h-10 md:w-10 bg-gray-50 flex items-center justify-center border border-gray-400 border-r-0 text-sm md:text-base'>
              <h1>2</h1>
            </div>

            <div className='h-8 w-8 md:h-10 md:w-10 bg-gray-50 flex items-center justify-center border border-gray-400 text-sm md:text-base'>
              <h1>3</h1>
            </div>

            <button className='h-8 w-8 md:h-10 md:w-10 bg-gray-50 flex items-center justify-center rounded-r-lg border border-gray-400 border-l-0'>
              <ChevronRight className='w-4 h-4 md:w-5 md:h-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCategory