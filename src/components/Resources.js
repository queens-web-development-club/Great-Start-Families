import {useState, useEffect} from "react";

function Resources() {
  const [items, setItems] = useState([]);
  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop();
    link.click();
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/items/public`);
        if (!response.ok) {
          console.error("Failed to fetch resources");
          throw new Error("Failed to fetch resources");
        }
        const data = await response.json();
        console.log("Fetched resources:", data);
        setItems(data);
        data.forEach(item => {
          fetchItemImage(item.id);
          fetchItemPdf(item.id);
        });
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    const fetchItemImage = async (itemId) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/item/${itemId}/public/image`);
        if (!response.ok) {
          throw new Error("Failed to fetch item image");
        }
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setItems(prevItems => prevItems.map(item => item.id === itemId ? {...item, image: imageUrl} : item));
      } catch (error) {
        console.error(`Error fetching image for item ${itemId}:`, error);
      }
    };
    const fetchItemPdf = async (itemId) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/item/${itemId}/public/pdf`);
        if (!response.ok) {
          throw new Error("Failed to fetch item PDF");
        }
        const blob = await response.blob();
        const pdfUrl = URL.createObjectURL(blob);
        setItems(prevItems => prevItems.map(item => item.id === itemId ? {...item, pdf: pdfUrl} : item));
      } catch (error) {
        console.error(`Error fetching PDF for item ${itemId}:`, error);
      }
    };
    fetchResources();
  }, []);

  return (
<div className='px-6 py-4 bg-white' id='resources'>
  <div className='lg:m-10 '>
    <div className='mb-6 text-left'>
      <h1 className='mb-2 text-4xl font-bold'>Resources</h1>
      <p className='text-lg '>All of our programs and services are free.</p>
    </div>

    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left scroll-container'>
      {items.map((item) => (
        <div
          key={item.title}
          className='flex flex-col bg-white border-4 border-black shadow rounded-3xl'
        >
          <div className='flex justify-center items-start h-[200px] overflow-hidden rounded-t-3xl bg-gray-300 border-b-4 border-black'>
            <img
              src={item.image}
              alt={item.title}
              className='h-full w-auto'
            />
          </div>

          <div className='flex-1 flex flex-col'>
            <h2 className='mb-1 ml-2 text-xl font-bold lg:text-3xl xl:ml-8'>
              {item.title}
            </h2>

            <div className='mb-2 ml-2 overflow-y-auto max-h-32 lg:text-xl xl:ml-8'>
              <p className='text-gray-700 whitespace-pre-wrap'>
                {item.description}
              </p>
            </div>

            <div className='mt-auto'>
              <button
                onClick={() => handleDownload(item.pdf)}
                className='px-4 py-2 mb-5 ml-2 transition duration-150 ease-in-out bg-purple-600 text-white rounded-full xl:ml-8 lg:px-10 lg:py-3 lg:text-xl hover:bg-purple-500'
              >
                Download
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
  );
}

export default Resources;
