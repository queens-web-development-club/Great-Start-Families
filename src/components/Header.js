import React, { useState } from "react";
import logo from "../assets/logo.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (section) => {
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className='px-2 py-4 text-purple-600 bg-white shadow-md sm:px-6'>
      <div className='container flex flex-wrap items-center justify-between mx-auto '>
        <div className='flex items-center'>
          <img src={logo} alt='Company Logo' className='w-auto h-16 mr-4' />
          <h1 className='text-xl font-semibold'>A Great Start for Families</h1>
        </div>
        <div className='hidden md:flex'>
          <button className='p-2 mx-2 hover:bg-opacity-60 hover:bg-gray-400 rounded-3xl' onClick={() => scrollToSection("about")}>
            About
          </button>
          <button className='p-2 mx-2 hover:bg-opacity-60 hover:bg-gray-400 rounded-3xl' onClick={() => scrollToSection("resources")}>
            Resources
          </button>
          <button className='p-2 mx-2 hover:bg-opacity-60 hover:bg-gray-400 rounded-3xl' onClick={() => scrollToSection("calendar")}>
            Calender
          </button>
          <button className='p-2 mx-2 hover:bg-opacity-60 hover:bg-gray-400 rounded-3xl'>Contact</button>
        </div>
        <button className='text-purple-600 md:hidden focus:outline-none' onClick={toggleMenu}>
          {/* Hamburger menu icon */}
          <svg className='w-6 h-6 fill-current' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M4 5h16c1.1 0 2 .9 2 2s-.9 2-2 2H4c-1.1 0-2-.9-2-2s.9-2 2-2zm0 6h16c1.1 0 2 .9 2 2s-.9 2-2 2H4c-1.1 0-2-.9-2-2s.9-2 2-2zm0 6h16c1.1 0 2 .9 2 2s-.9 2-2 2H4c-1.1 0-2-.9-2-2s.9-2 2-2z' />
          </svg>
        </button>
        {/* Mobile menu */}
        <div className={`md:hidden w-full menu-transition ${menuOpen ? "menu-open" : ""}`}>
          <button className='block w-full px-2 py-1 text-left' onClick={() => scrollToSection("about")}>
            About
          </button>
          <button className='block w-full px-2 py-1 text-left' onClick={() => scrollToSection("resources")}>
            Resources
          </button>
          <button className='block w-full px-2 py-1 text-left' onClick={() => scrollToSection("calendar")}>
            Calendar
          </button>
          <button className='block w-full px-2 py-1 text-left' onClick={() => scrollToSection("contact")}>
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
