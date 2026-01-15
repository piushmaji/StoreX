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
        <div className='grid lg:grid-cols-8  bg-gray-50 lg:p-4'>

          {/* Branding,Desc also social media links */}
          <div className='flex flex-col col-span-2 p-4 pl-14'>
            <div className='flex items-center'>
              <img className='h-16 w-16' src="img/mainLogo.png" alt="mainLogo.png" />
              <h1 className='text-2xl'>StoreX</h1>
            </div>
            <div>
              <p className='text-xs pl-6 w-[90%] font-thin'>Best information about the company gies here but now lorem ipsum is Lorem.</p>
            </div>
            <div className='flex gap-2 pt-5 pl-6'>
              <Facebook className='h-7 w-7 p-1 fill-gray-50 stroke-gray-50 bg-gray-400 rounded-full ' strokeWidth={1} />
              <Instagram className='h-7 w-7 p-1  stroke-gray-50 bg-gray-400 rounded-full ' strokeWidth={3} />
              <Twitter className='h-7 w-7 p-1 fill-gray-50 stroke-gray-50 bg-gray-400 rounded-full ' strokeWidth={1} />
              <Youtube className='h-7 w-7 p-1 stroke-gray-50 bg-gray-400 rounded-full ' strokeWidth={3} />
              <Linkedin className='h-7 w-7 p-1 fill-gray-50 stroke-gray-50 bg-gray-400 rounded-full ' strokeWidth={1} />
            </div>
          </div>


          {footerLinks.map((section) => [
            <div key={section.id}>
              <div className='flex flex-col lg:items-center lg:justify-center lg:p-6 p-2 pl-20'>
                <ul className='pb-2  lg:text-start'>
                  <li className='pb-2'>{section.title}</li>
                  <ul className='text-gray-400'>
                    {section.links.map((links, index) => [
                      <li key={index}>{links}</li>
                    ])}
                  </ul>
                </ul>
              </div>

            </div>
          ])}
          <div className='col-span-2 lg:p-6 flex flex-col gap-2 justify-center items-center lg:block pb-2'>
            <div className='lg:pb-4'>
              <h1>Get App</h1>
            </div>
            <div className='lg:w-30 flex lg:flex-col gap-2 pb-2 '>
              <img className='hover:cursor-pointer' src="img/Footer/appleApp.svg" alt="appleApp" />
              <img className='hover:cursor-pointer' src="img/Footer/playStore.svg" alt="playStore" />
            </div>
          </div>
        </div>

        {/* Copyright and language  */}
        <div className='bg-gray-200 p-4'>
          <div className='text-sm text-gray-400 flex justify-between lg:pl-20 lg:pr-44 px-10'>
            <h1>© 2023 Ecommerce. </h1>
            <h2>🇺🇸English</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainFooter
