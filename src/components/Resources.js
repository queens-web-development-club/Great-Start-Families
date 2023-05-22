import React from "react";
import responsiveImage1 from "../assets/Resource.png";
import responsiveImage2 from "../assets/Resource2.jpg";
import responsiveImage3 from "../assets/Resource2.jpg";

const columns = [
  { title: "Story Time", img: responsiveImage1, text: "Some information about this  epic first column." },
  { title: "Parental Help", img: responsiveImage1, text: "Some information about this second column." },
  { title: "Title 3", img: responsiveImage1, text: "Some information about this third column." },
];

function Resources() {
  return (
    <div className='bg-white px-6 py-4'>
      <div className='lg:m-10 '>
        <div className='text-left mb-6'>
          <h1 className='text-4xl font-bold mb-2'>Resources</h1>
          <p className='text-lg '>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className='scroll-container text-left flex justify-between space-x-2'>
          {columns.map((column) => (
            <div key={column.title} className='column w-1/4 bg-white rounded-3xl m-2 shadow border-4 border-black'>
              <img src={column.img} className='h-auto border-b-4 border-black bg-gray-300 mb-2 rounded-t-3xl' />
              <h2 className='text-xl lg:text-3xl font-bold mb-1 ml-2 xl:ml-8'>{column.title}</h2>
              <p className='text-gray-700 lg:text-xl mb-2 ml-2 xl:ml-8'>{column.text}</p>
              <button className='bg-purple-600 px-4 py-2 ml-2 xl:ml-8 mb-5 lg:px-10 lg:py-3  lg:text-xl rounded-full'>Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Resources;
