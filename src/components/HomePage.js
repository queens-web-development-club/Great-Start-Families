import {useState, useEffect} from "react";
import responsiveImage from "../assets/homekids.png"; // Replace with your image file path

const scrollToSection = (section) => {
  document.getElementById(section).scrollIntoView({ behavior: "smooth" });
};

function HomePage() {
  const [homeScreenTitle, setHomeScreenTitle] = useState("");

  useEffect(() => {
    const fetchHomeScreenTitle = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/title`);
        if (!response.ok) {
          throw new Error("Failed to fetch home screen title");
        }
        const data = await response.json();
        setHomeScreenTitle(data.title);
      } catch (error) {
        console.error("Error fetching home screen title:", error);
      }
    };
    fetchHomeScreenTitle();
  }, []);

  return (
    <div className='relative text-white md:text-left'>
      <img src={responsiveImage} alt='A responsive image' className='w-full h-auto' />

      <div class=' absolute  w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:w-auto md:top-10 md:left-20 md:transform-none lg:top-20 xl:top-32'>
        <div class='bg-opacity-60 bg-black sm:rounded-3xl p-4 md:p-6 shadow-md md:w-2/3'>
          <h2 className='mb-2 text-2xl font-semibold text-white opacity-100 sm:text-4xl md:text-7xl sm:mb-4 xl:text-8xl'>
            {homeScreenTitle || "Welcome to Great Start Families"}
          </h2>
          <p className='mb-4 opacity-100 text-md md:text-base xl:text-3xl'>
            Make your community bigger! Let us help you go from surviving to thriving.
          </p>

          <div className='flex justify-center space-x-2 md:justify-start md:space-x-4 '>
            <button
              className='px-3 py-2 text-white transition duration-150 ease-in-out bg-purple-600 rounded-full hover:bg-purple-500 md:px-6 md:py-3 md:text-2xl xl:px-10 xl:py-5 xl:text-4xl'
              onClick={() => scrollToSection("calendar")}
            >
              Calendar
            </button>
            <button
              className='px-3 py-2 text-white transition duration-150 ease-in-out bg-purple-600 rounded-full hover:bg-purple-500 md:px-6 md:py-3 md:text-2xl xl:px-10 xl:py-5 xl:text-4xl'
              onClick={() => scrollToSection("resources")}
            >
              Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
