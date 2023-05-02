import React from "react";
import responsiveImage from "../assets/homekids.png"; // Replace with your image file path

function HomePage() {
  return (
    <div className='relative'>
      <img src={responsiveImage} alt='A responsive image' className='w-full h-auto' />
      <div className='absolute top-1/2 right-1/4 md:left-1/4 transform -translate-y-1/2 bg-white rounded-lg p-4 md:p-6 shadow-md'>
        <h2 className='text-xl md:text-2xl font-semibold mb-4'>Title</h2>
        <p className='mb-4 text-sm md:text-base'>This is a small description for the text section with rounded edges.</p>
        <div className='flex space-x-2 md:space-x-4'>
          <button className='bg-blue-500 text-white px-3 md:px-4 py-1 md:py-2 rounded text-sm md:text-base'>Button 1</button>
          <button className='bg-blue-500 text-white px-3 md:px-4 py-1 md:py-2 rounded text-sm md:text-base'>Button 2</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
