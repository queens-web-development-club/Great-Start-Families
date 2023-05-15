import React, { useState } from "react";
import logo from "../assets/logo.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className='bg-white text-purple-600 px-6 py-4 shadow-md'>
      <div className='container mx-auto flex flex-wrap justify-between items-center'>
        <div className='flex items-center'>
          <img src={logo} alt='Company Logo' className='h-16 w-auto mr-4' />
          <h1 className='text-xl font-semibold'>A Great Start for Families</h1>
        </div>
        <div className='hidden md:flex'>
          <button className='mx-2'>Home</button>
          <button className='mx-2'>About</button>
          <button className='mx-2'>Resources</button>
          <button className='mx-2'>Programs</button>
          <button className='mx-2'>Contact</button>
        </div>
        <button className='md:hidden text-purple-600 focus:outline-none' onClick={toggleMenu}>
          {/* Hamburger menu icon */}
          <svg className='h-6 w-6 fill-current' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M4 5h16c1.1 0 2 .9 2 2s-.9 2-2 2H4c-1.1 0-2-.9-2-2s.9-2 2-2zm0 6h16c1.1 0 2 .9 2 2s-.9 2-2 2H4c-1.1 0-2-.9-2-2s.9-2 2-2zm0 6h16c1.1 0 2 .9 2 2s-.9 2-2 2H4c-1.1 0-2-.9-2-2s.9-2 2-2z' />
          </svg>
        </button>
        {/* Mobile menu */}
        <div className={`${menuOpen ? "block" : "hidden"} md:hidden w-full mt-4`}>
          <button className='block w-full text-left px-2 py-1'>Home</button>
          <button className='block w-full text-left px-2 py-1'>About</button>
          <button className='block w-full text-left px-2 py-1'>Resources</button>
          <button className='block w-full text-left px-2 py-1'>Porgrams</button>
          <button className='block w-full text-left px-2 py-1'>Contact</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
