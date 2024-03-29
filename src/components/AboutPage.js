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
      <div className='items-center justify-center hidden w-1/2 sm:flex'>
        <div className='relative inline-flex flex-col items-center w-full h-64'>
          <div alt='Top' className='absolute rounded-3xl w-80 h-96 right-2 bottom-20 lg:right-10 xl:right-24 lg:bottom-0'>
            <img src={imageTop} alt='Top' className='w-full h-full border-4 border-black rounded-3xl' />
          </div>
          <div alt='Bottom' className='absolute rounded-3xl w-80 h-96 left-2 top-20 lg:top-0 lg:left-10 xl:left-24'>
            <img src={imageBottom} alt='Bottom' className='w-full h-full border-4 border-black rounded-3xl ' />
          </div>
        </div>
      </div>
      <div className='flex flex-col sm:w-1/2 sm:pr-3 lg:pr-10 xl:pr-32 sm:pl-3 sm:pb-10 '>
        <h1 className='p-2 mt-5 text-3xl font-bold sm:mb-4 sm:p-0 sm:text-5xl sm:mt-20'>
          WE OFFER <span className='text-purple-600'>YOU</span>
        </h1>
        <ul className='m-2 list-disc text-left p-2 pl-5 sm:pl-5 mt-5 mb-4 text-xl sm:text-2xl'>
          <li>Programs for caregivers from prenatal to 6 years of age</li>
          <li>Childminding available on-site, caregivers can access services while their children are cared for on-site</li>
          <li>Parenting Programs</li>
          <li>Family Activities</li>
          <li>Indigenous Supports</li>
          <li>Cooking Programs</li>
        </ul>

        <button
          className='w-40 py-3 ml-auto mr-auto text-xl transition duration-150 ease-in-out bg-purple-600 rounded-full hover:bg-purple-500 sm:mt-5 sm:m-0'
          onClick={() => scrollToSection("calendar")}
        >
          Calender
        </button>
      </div>
    </div>
  );
}

export default AboutPage;
