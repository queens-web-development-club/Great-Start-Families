import React from "react";
import responsiveImage from "../assets/homekids.png"; // Replace with your image file path

function HomePage() {
  return (
    <div className=' md:text-left relative text-white'>
      <img src={responsiveImage} alt='A responsive image' className='w-full h-auto' />

      <div class=' absolute  w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:w-auto md:top-10 md:left-20 md:transform-none lg:top-20 xl:top-32'>
        <div class='bg-opacity-60 bg-black sm:rounded-3xl p-4 md:p-6 shadow-md '>
          <h2 className='opacity-100 text-white text-2xl sm:text-4xl md:text-7xl  font-semibold mb-2 sm:mb-4 xl:text-8xl'>
            Programs for <br className='hidden sm:block' /> families in need.
          </h2>
          <p className=' opacity-100 mb-4 text-md  md:text-base xl:text-3xl'>
            Monlthy events organized by the Kingston community. <br className='hidden sm:block' /> Anyone of all ages can drop by!
          </p>

          <div className='flex justify-center space-x-2 md:justify-start md:space-x-4 '>
            <button className='bg-purple-600 text-white px-3 md:px-6 py-2 md:py-3 rounded-full  md:text-2xl xl:px-10 xl:py-5  xl:text-4xl'>
              Calender
            </button>
            <button className='bg-purple-600 text-white px-3 md:px-6 py-2 md:py-3 rounded-full  md:text-2xl xl:px-10 xl:py-5 xl:text-4xl'>
              Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
