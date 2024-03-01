import React from "react";
import responsiveImage1 from "../assets/resourses/Nutrition.png";
import responsiveImage2 from "../assets/resourses/YOUTH.png";
import responsiveImage3 from "../assets/resourses/baby_care.png";

const columns = [
  { title: "Story Time", img: responsiveImage1, text: "Some information about this epic first column.", fileUrl: "../assets/resources/test.pdf" },
  { title: "Parental Help", img: responsiveImage2, text: "Some information about this second column.", fileUrl: "../assets/resources/test.pdf" },
  { title: "Title 3", img: responsiveImage3, text: "Some information about this third column.", fileUrl: "../assets/resources/test.pdf" },
];

function Resources() {
  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop();
    link.click();
  };

  return (
    <div className='px-6 py-4 bg-white' id='resources'>
      <div className='lg:m-10 '>
        <div className='mb-6 text-left'>
          <h1 className='mb-2 text-4xl font-bold'>Resources</h1>
          <p className='text-lg '>All of our programs and services are free.</p>
        </div>
        <div className='flex justify-between space-x-2 text-left scroll-container'>
          {columns.map((column) => (
            <div key={column.title} className='w-1/4 m-2 bg-white border-4 border-black shadow column rounded-3xl'>
              <img src={column.img} className='h-auto mb-2 bg-gray-300 border-b-4 border-black rounded-t-3xl' />
              <h2 className='mb-1 ml-2 text-xl font-bold lg:text-3xl xl:ml-8'>{column.title}</h2>
              <p className='mb-2 ml-2 text-gray-700 lg:text-xl xl:ml-8'>{column.text}</p>
              <button
                onClick={() => handleDownload(column.fileUrl)}
                className='px-4 py-2 mb-5 ml-2 transition duration-150 ease-in-out bg-purple-600 rounded-full xl:ml-8 lg:px-10 lg:py-3 lg:text-xl hover:bg-purple-500'
              >
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
