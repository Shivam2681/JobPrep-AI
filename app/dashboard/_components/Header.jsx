"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X, Search } from 'lucide-react'

function Header() {
  const path = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Questions', path: '/dashboard/Questions' },
    { name: 'Upgrade', path: '/dashboard/Upgrade' },
    { name: 'How it works?', path: '/dashboard/How-it-works' }
  ];

  useEffect(() => {
    console.log(path);
    // Close mobile menu when path changes
    setMobileMenuOpen(false);
  }, [path]);

  return (
    <div className=' sticky top-0 z-50 backdrop-blur-sm bg-[#1A1A2E]/90 border-b border-[#3D3E50]/30 shadow-[0_4px_20px_rgba(0,0,0,0.2)]'>
      <div className='flex p-4 items-center justify-between max-w-7xl mx-auto relative'>
        <div className="flex items-center gap-2">
          <Image src={'/logo.svg'} width={50} height={50} alt='logo' className="hover:opacity-90 transition-all" />
          <span className=" font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#FF007A] to-[#00FFFF]">
            JobPrep-AI
          </span>
        </div>
        
        {/* Desktop Menu */}
        <ul className='hidden md:flex gap-8'>
          {menuItems.map((item) => (
            <Link href={item.path} key={item.path}>
              <li className={`hover:text-[#FF007A] hover:font-bold transition-all cursor-pointer ${
                path === item.path ? 'text-[#FF007A] font-bold' : 'text-white'
              }`}>
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
        
        <div className="flex items-center gap-4">
          {/* <div className="hidden sm:block relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-1.5 text-sm rounded-lg bg-[#2A2B3F]/80 border-none focus:outline-none focus:ring-1 focus:ring-[#FF007A] text-white w-40"
            />
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#B0B0B0] w-4 h-4" />
          </div> */}
          
          <UserButton 
            afterSignOutUrl="/" 
            appearance={{
              elements: {
                userButtonAvatarBox: "w-9 h-9 border-2 border-[#FF007A]/30"
              }
            }}
          />
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-[#B0B0B0] hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#2A2B3F] py-4 px-6 absolute w-full z-50 shadow-lg animate-fadeIn">
          <ul className='flex flex-col gap-4'>
            {menuItems.map((item) => (
              <Link href={item.path} key={item.path}>
                <li className={`hover:text-[#FF007A] hover:font-bold transition-all cursor-pointer ${
                  path === item.path ? 'text-[#FF007A] font-bold' : 'text-[#B0B0B0]'
                }`}>
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
          
          <div className="relative mt-4">
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-2 text-sm rounded-lg bg-[#1D1E30] border-none focus:outline-none focus:ring-1 focus:ring-[#FF007A] text-white w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B0B0B0] w-4 h-4" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Header