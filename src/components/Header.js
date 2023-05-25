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
    <header className='bg-white text-purple-600 px-2 sm:px-6 py-4 shadow-md'>
      <div className=' container mx-auto  flex flex-wrap justify-between items-center'>
        <div className='flex items-center'>
          <img src={logo} alt='Company Logo' className='h-16 w-auto mr-4' />
          <h1 className='text-xl font-semibold'>A Great Start for Families</h1>
        </div>
        <div className='hidden md:flex'>
          <button className='mx-2' onClick={() => scrollToSection("about")}>
            About
          </button>
          <button className='mx-2' onClick={() => scrollToSection("resources")}>
            Resources
          </button>
          <button className='mx-2' onClick={() => scrollToSection("calendar")}>
            Calender
          </button>
          <button className='mx-2'>Contact</button>
        </div>
        <button className='md:hidden text-purple-600 focus:outline-none' onClick={toggleMenu}>
          {/* Hamburger menu icon */}
          <svg className='h-6 w-6 fill-current' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M4 5h16c1.1 0 2 .9 2 2s-.9 2-2 2H4c-1.1 0-2-.9-2-2s.9-2 2-2zm0 6h16c1.1 0 2 .9 2 2s-.9 2-2 2H4c-1.1 0-2-.9-2-2s.9-2 2-2zm0 6h16c1.1 0 2 .9 2 2s-.9 2-2 2H4c-1.1 0-2-.9-2-2s.9-2 2-2z' />
          </svg>
        </button>
        {/* Mobile menu */}
        <div className={`md:hidden w-full menu-transition ${menuOpen ? "menu-open" : ""}`}>
          <button className='block w-full text-left px-2 py-1' onClick={() => scrollToSection("about")}>
            About
          </button>
          <button className='block w-full text-left px-2 py-1' onClick={() => scrollToSection("resources")}>
            Resources
          </button>
          <button className='block w-full text-left px-2 py-1' onClick={() => scrollToSection("calendar")}>
            Calendar
          </button>
          <button className='block w-full text-left px-2 py-1' onClick={() => scrollToSection("contact")}>
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
