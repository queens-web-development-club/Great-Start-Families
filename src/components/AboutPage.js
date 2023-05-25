import React, { useState } from "react";
import responsiveImage from "../assets/homekids.png"; // Replace with your image file path
import imageTop from "../assets/kingston.jpg"; // Replace with your image file path
import imageBottom from "../assets/twins.jpg";

const scrollToSection = (section) => {
  document.getElementById(section).scrollIntoView({ behavior: "smooth" });
};

function AboutPage() {
  return (
    <div className='flex h-auto pt-10 sm:text-left' id='about'>
      <div className='w-1/2  justify-center items-center hidden sm:flex'>
        <div className='relative   w-full h-64 inline-flex flex-col items-center'>
          <div alt='Top' className=' rounded-3xl  w-80 h-96 absolute right-2 bottom-20  lg:right-10 xl:right-24 lg:bottom-0 '>
            <img src={imageTop} alt='Top' className='h-full w-full rounded-3xl border-4 border-black' />
          </div>
          <div alt='Bottom' className='rounded-3xl  w-80 h-96 absolute left-2 top-20 lg:top-0 lg:left-10 xl:left-24'>
            <img src={imageBottom} alt='Bottom' className='h-full w-full rounded-3xl border-4 border-black ' />
          </div>
        </div>
      </div>
      <div className='sm:w-1/2 flex flex-col sm:pr-3 lg:pr-10 xl:pr-32 sm:pl-3 sm:pb-10  '>
        <h1 className=' text-3xl mt-5 font-bold sm:mb-4 p-2 sm:p-0  sm:text-5xl sm:mt-20'>
          How we're making a <span className='text-purple-600'>difference</span>
        </h1>
        <p className=' mb-4 text-xl sm:text-2xl p-2 sm:p-0  mt-5'>
          We offer.. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <button className='bg-purple-600 text-xl w-40 rounded-full py-3 sm:mt-5 sm:m-0 ml-auto mr-auto' onClick={() => scrollToSection("calendar")}>
          Calender
        </button>
      </div>
    </div>
  );
}

export default AboutPage;
