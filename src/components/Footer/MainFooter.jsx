import { ChevronUp, Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import React from 'react'

const MainFooter = () => {

  const footerLinks = [
    {
      id: 1,
      title: "About",
      links: [
        "About Us",
        "Find store",
        "Categories",
        "Blogs",
      ],
    },
    {
      id: 2,
      title: "Partnership",
      links: [
        "About Us",
        "Find store",
        "Categories",
        "Blogs",
      ],
    },
    {
      id: 3,
      title: "Information",
      links: [
        "Help Center",
        "Money Refund",
        "Shipping",
        "Contact us",
      ],
    },
    {
      id: 4,
      title: "For users",
      links: [
        "Login",
        "Register",
        "Settings",
        "My Orders",
      ],
    },
  ]


  return (
    <div>
      <div>
        {/* Branding and links part */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 bg-gray-50 items-start gap-6 lg:gap-4 px-4 sm:px-8 lg:px-20 py-8'>

          {/* Branding, Desc also social media links */}
          <div className='flex flex-col sm:col-span-2 lg:col-span-2'>
            <div className='flex flex-col items-start gap-3 px-4 py-2'>
              <div className='flex items-center gap-2'>
                <img className='h-10 w-10 drop-shadow-lg bg-gray-50 border-2 border-blue-500 rounded-2xl p-1' src="img/Logo/storex.png" alt="Logo" />
                <h1 className='text-2xl font-semibold'>StoreX</h1>
              </div>
              <div>
                <p className='text-xs sm:text-sm w-[90%] text-gray-600'>Best information about the company goes here but now lorem ipsum is Lorem.</p>
              </div>
            </div>
            <div className='flex gap-2 pt-5 pl-4'>
              <Facebook className='h-7 w-7 p-1 cursor-pointer hover:bg-gray-700 transition rounded-full bg-gray-400 fill-gray-50 stroke-0' />
              <Instagram className='h-7 w-7 p-1 cursor-pointer hover:bg-gray-700 transition rounded-full bg-gray-400 stroke-gray-50' />
              <Twitter className='h-7 w-7 p-1 cursor-pointer hover:bg-gray-700 transition rounded-full bg-gray-400 fill-gray-50 stroke-0' />
              <Youtube className='h-7 w-7 p-1 cursor-pointer hover:bg-gray-700 transition rounded-full bg-gray-400 stroke-gray-50' />
              <Linkedin className='h-7 w-7 p-1 cursor-pointer hover:bg-gray-700 transition rounded-full bg-gray-400 fill-gray-50 stroke-0' />
            </div>
          </div>

          <div className='sm:col-span-2 lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 mt-4 sm:mt-0'>
            {footerLinks.map((section) => (
              <div key={section.id}>
                <div className='flex flex-col'>
                  <ul>
                    <li className='font-medium text-sm sm:text-base mb-2'>{section.title}</li>
                    <li>
                      <ul className='text-gray-500 space-y-1.5 text-xs sm:text-sm'>
                        {section.links.map((link, index) => (
                          <li className='hover:text-gray-700 cursor-pointer transition' key={index}>{link}</li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className='sm:col-span-2 lg:col-span-2 flex flex-col items-start gap-3'>
            <div>
              <h1 className='font-medium text-sm sm:text-base'>Get App</h1>
            </div>
            <div className='flex flex-col gap-2'>
              <img className='hover:cursor-pointer w-32 sm:w-36' src="img/Footer/appleApp.svg" alt="appleApp" />
              <img className='hover:cursor-pointer w-32 sm:w-36' src="img/Footer/playStore.svg" alt="playStore" />
            </div>
          </div>
        </div>

        {/* Copyright and language */}
        <div className='bg-gray-200 p-4'>
          <div className='text-xs sm:text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 px-4 sm:px-8 lg:px-20'>
            <h1>© 2023 Ecommerce.</h1>
            <h2>🇺🇸 English</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainFooter