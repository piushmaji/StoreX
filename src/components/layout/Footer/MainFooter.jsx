import React from 'react'
import { Facebook, Instagram, Linkedin, Twitter, Youtube, ArrowUpRight } from 'lucide-react'

import storex from '../../../assets/images/Logo/storex.svg'
import appleApp from '../../../assets/images/Footer/appleApp.svg'
import playStore from '../../../assets/images/Footer/playStore.svg'

const MainFooter = () => {
  const footerLinks = [
    {
      id: 1,
      title: "Explore",
      links: ["About Us", "Find Store", "Categories", "Editorial Blogs"],
    },
    {
      id: 2,
      title: "Support",
      links: ["Help Center", "Money Refund", "Shipping Info", "Contact Us"],
    },
    {
      id: 3,
      title: "Legal",
      links: ["Terms of Service", "Privacy Policy", "Cookie Policy", "Accessibility"],
    },
  ]

  return (
    <footer className="bg-black text-white pt-20 pb-10 px-4 sm:px-8 lg:px-12 font-sans rounded-t-[3rem] mt-4">
      <div className="max-w-screen-2xl mx-auto">
        
        {/* ── Top Section: Links & Branding ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand & Socials */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white p-2 rounded-2xl">
                  <img className="h-8 w-8" src={storex} alt="Logo" />
                </div>
                <h1 className="text-3xl font-black tracking-tighter uppercase">StoreX</h1>
              </div>
              <p className="text-gray-400 text-sm max-w-sm leading-relaxed mb-8">
                Redefining the boundaries of modern fashion. Curating the best global streetwear, luxury, and avant-garde designs directly to your wardrobe.
              </p>
            </div>
            
            {/* Gen-Z Social Links */}
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((section) => (
              <div key={section.id}>
                <h3 className="text-xs font-black tracking-widest uppercase text-gray-500 mb-6">{section.title}</h3>
                <ul className="flex flex-col gap-4">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <a href="#" className="text-sm font-semibold text-gray-300 hover:text-white flex items-center gap-1 group transition-colors">
                        {link} <ArrowUpRight size={14} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* App Download */}
          <div className="md:col-span-12 lg:col-span-2 flex flex-row lg:flex-col items-center lg:items-start gap-4">
            <h3 className="text-xs font-black tracking-widest uppercase text-gray-500 hidden lg:block">Get App</h3>
            <a href="#" className="hover:scale-105 transition-transform"><img className="h-10 w-auto" src={appleApp} alt="App Store" /></a>
            <a href="#" className="hover:scale-105 transition-transform"><img className="h-10 w-auto" src={playStore} alt="Play Store" /></a>
          </div>
        </div>

        {/* ── Massive Typography Bottom ── */}
        <div className="w-full flex items-center justify-center border-t border-gray-900 pt-8 pb-4 relative overflow-hidden">
            <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-none text-white/5 select-none pointer-events-none">
                STOREX STUDIOS
            </h1>
            
            {/* Copyright overlays */}
            <div className="absolute inset-0 flex flex-col sm:flex-row items-center justify-between px-4 mt-8 sm:mt-16 z-10 pointer-events-none">
                <p className="text-xs font-bold tracking-widest uppercase text-gray-500">© 2026 StoreX Global.</p>
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Systems Online
                </div>
                <p className="text-xs font-bold tracking-widest uppercase text-gray-500">ENG 🇺🇸</p>
            </div>
        </div>

      </div>
    </footer>
  )
}

export default MainFooter