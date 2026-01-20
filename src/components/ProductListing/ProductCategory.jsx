import { ChevronLeft, ChevronRight, Heart, LayoutGrid, Menu } from 'lucide-react'
import { gopro, headphone, iphone, laptop, mitab, watch } from '../../assets/images/ProductCategory/index'
export const products = [
  {
    id: 1,
    img: iphone,
    name: "Canon Camera EOS 2000",
    title: "Canon Camera EOS 2000, Black 10x Zoom",
    price: 82834,
    oldPrice: 93624,
    stars: 4.5,
    orders: 1594,
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 2,
    img: gopro,
    name: "GoPro HERO6",
    title: "GoPro HERO6 4K Action Camera - Black",
    price: 8834,
    oldPrice: 9624,
    stars: 4.5,
    orders: 134,
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 3,
    img: mitab,
    name: "GoPro HERO6",
    title: "GoPro HERO6 4K Action Camera - Black",
    price: 92834,
    oldPrice: 9999,
    stars: 4.5,
    orders: 194,
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 4,
    img: laptop,
    name: "GoPro HERO6",
    title: "GoPro HERO6 4K Action Camera - Black",
    price: 78834,
    oldPrice: 90000,
    stars: 4.5,
    orders: 112,
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 5,
    img: watch,
    name: "GoPro HERO6",
    title: "GoPro HERO6 4K Action Camera - Black",
    price: 8999,
    oldPrice: 9990,
    stars: 4.5,
    orders: 754,
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 6,
    img: headphone,
    name: "GoPro HERO6",
    title: "GoPro HERO6 4K Action Camera - Black",
    price: 3999,
    oldPrice: 7999,
    stars: 4.5,
    orders: 1894,
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }
];


const ProductCategory = () => {
  return (
    <div className='h-full flex flex-col justify-between gap-5'>
      {/* Featured section  */}
      <div className='flex items-center justify-between p-4 border border-gray-300 rounded-lg'>

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
      <div className='flex flex-col flex-1 gap-2'>

        {/* Each Product Category section  */}
        {products.map((items) => [

          <div key={items.id} className='w-full flex bg-white border border-gray-300 rounded-lg p-4 hover:cursor-pointer group transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg '>

            {/* image  */}
            <div className='w-1/4'>
              <img className='w-full' src={items.img} alt={iphone} />
            </div>
            <div className='flex'>

              {/* Name  */}
              <div className='flex flex-col justify-evenly gap-2 px-4'>
                <section>
                  <h1>{items.title}</h1>
                </section>

                {/* price,old price and ratings  */}
                <section>
                  <div className='flex gap-2 items-center'>
                    <h2 className='font-extrabold text-lg'>₹{items.price}</h2>
                    <h2 className='line-through text-gray-500 text-sm'>₹{items.oldPrice}</h2>
                  </div>
                  <div className='flex gap-6'>
                    <div className='flex gap-2'>
                      <p>⭐️⭐️⭐️⭐️⭐️</p>
                      <h1 className='text-yellow-500'>{items.stars}</h1>
                    </div>
                    <li className='text-gray-400'>{items.orders}</li>
                    <li className='text-lime-600'>Free Shipping</li>
                  </div>
                </section>

                {/* Description section and view more details   */}
                <section className='w-4/5 bg-ambe-400 font-light'>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dolores repellat facere accusantium? Nulla consectetur dolores unde libero, nesciunt laudantium.</p>
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
