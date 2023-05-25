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
    <div className='px-6 py-4 bg-white' id='resources'>
      <div className='lg:m-10 '>
        <div className='mb-6 text-left'>
          <h1 className='mb-2 text-4xl font-bold'>Resources</h1>
          <p className='text-lg '>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className='flex justify-between space-x-2 text-left scroll-container'>
          {columns.map((column) => (
            <div key={column.title} className='w-1/4 m-2 bg-white border-4 border-black shadow column rounded-3xl'>
              <img src={column.img} className='h-auto mb-2 bg-gray-300 border-b-4 border-black rounded-t-3xl' />
              <h2 className='mb-1 ml-2 text-xl font-bold lg:text-3xl xl:ml-8'>{column.title}</h2>
              <p className='mb-2 ml-2 text-gray-700 lg:text-xl xl:ml-8'>{column.text}</p>
              <button className='px-4 py-2 mb-5 ml-2 transition duration-150 ease-in-out bg-purple-600 rounded-full xl:ml-8 lg:px-10 lg:py-3 lg:text-xl hover:bg-purple-500'>
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Resources;
