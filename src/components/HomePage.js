import React from "react";
import responsiveImage from "../assets/homekids.png"; // Replace with your image file path

function HomePage() {
  return (
    <div className=' md:text-left relative text-white'>
      <img src={responsiveImage} alt='A responsive image' className='w-full h-auto' />
      <div class=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:top-1/4 md:left-20 md:transform-none'>
        <div class='bg-opacity-60 bg-black rounded-lg p-4 md:p-6 shadow-md '>
          <h2 className='opacity-100 text-white text-3xl md:text-5xl font-semibold mb-4'>
            Programs for <br /> families in need.
          </h2>
          <p className='opacity-100 mb-4 text-sm md:text-base'>
            Monlthy events organized by the Kingston community. <br /> Anyone of all ages can drop by!
          </p>

          <div className='flex justify-center space-x-2 md:justify-start md:space-x-4'>
            <button className='bg-purple-600 text-white px-3 md:px-4 py-1 md:py-2 rounded text-sm md:text-base'>Calender</button>
            <button className='bg-purple-600 text-white px-3 md:px-4 py-1 md:py-2 rounded text-sm md:text-base'>Resources</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
