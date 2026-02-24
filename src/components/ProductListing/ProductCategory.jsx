import { ChevronLeft, ChevronRight, Heart, LayoutGrid, Menu } from 'lucide-react'
import products from '../../data/Products'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/material'
import WishListIcon from '../common/WishListIcon/WishListIcon'
import Pagination from './Pagination'
import FilterBar from './FilterBar'

const ProductCategory = () => {
  const productArray = Object.values(products)

  return (
    <div className='h-full flex flex-col justify-between gap-5'>
      {/* Featured section  */}

      <div>
        <FilterBar count={productArray.length} />
      </div>

      {/* Main Product Category section  */}
      <div className='flex flex-col flex-1 gap-2 md:gap-3'>

        {/* Each Product Category section  */}
        {productArray.map((product) => (
          <div key={product.id} className='w-full sm:flex-row  border-none shadow-sm  border border-gray-300 rounded-lg  md:p-4 hover:cursor-pointer group  ease-out hover:-translate-y-1 relative group  flex flex-col bg-white p-4 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]'>
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
                      <h1 className='text-base md:text-lg line-clamp-2 font-semibold text-gray-900 leading-tight'>{product.title}</h1>
                    </section>

                    {/* price,old price and ratings  */}
                    <section className='space-y-2'>
                      <div className='flex gap-2 items-center flex-wrap'>
                        <h2 className='md:text-xl text-2xl font-semibold  text-blue-600'>₹{product.pricing.salePrice}</h2>
                        <h2 className='md:text-base text-sm
text-gray-400
line-through'>₹{product.pricing.originalPrice}</h2>
                      </div>
                      <div className='flex flex-wrap gap-3 md:gap-6 text-xs md:text-sm'>
                        <div className='flex gap-2 items-center'>
                          <Rating value={product.rating.stars} precision={0.5} readOnly size="small" />
                          <h1 className='text-gray-500 text-sm'>{product.rating.score}</h1>
                        </div>
                        <li className='text-gray-400'>{product.rating.sold} Sold</li>
                        <li className='bg-green-100 text-green-700 px-2 py-1 rounded text-[10px]'>{product.shipping.type}</li>
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

      <div className='py-4'>
        <Pagination />
      </div>
    </div>
  )
}

export default ProductCategory