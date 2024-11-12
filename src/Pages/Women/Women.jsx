import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaXmark } from 'react-icons/fa6';
import Sidebar from '../../Components/Sidebar';
import ProductCard from '../../Components/ProductCard';
import Sort from '../../Components/Sort';
import banner1 from '../../assets/women-style.webp';
import banner2 from '../../assets/women-style1.jpg';
import banner3 from '../../assets/women-style-2.webp';
import Carousel from '../../Components/Carousel';


const Women = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col gap-4 relative justify-center lg:px-12 w-full mx-auto container">
      <Carousel images={[banner1,banner2,banner3]}/>
      <div className="flex gap-4 relative justify-center lg:px-12 w-full mx-auto">
      <div
        className={`transition-all text-gray-800 duration-300 ease-in-out
          md:relative md:left-0
          ${isSidebarOpen ? 'left-0' : '-left-full'}
          absolute top-0 h-full md:w-auto w-3/4 z-50 md:z-auto bg-white`}
      >
        <div className="w-[300px] flex justify-end p-3 md:hidden">
          <FaXmark size={28} onClick={toggleSidebar} className="cursor-pointer text-gray-600 hover:text-red-500" />
        </div>
        <Sidebar genre="Women's Fashion" gender={"Female"} data={"DATA"}/>
      </div>

      <div className="flex flex-col py-3 w-full">
        <div className="flex lg:justify-end justify-center gap-4 w-full px-6 flex-wrap lg:px-10 text-gray-900">
          <button
            style={{ fontFamily: 'Playfair Display' }}
            className="px-10 text-xl tracking-[3px] py-2 border border-gray-400 text-gray-700 hover:bg-gray-800 hover:text-white transition-colors duration-200 md:hidden"
            onClick={toggleSidebar}
          >
            Filters
          </button>
          <Sort color="gray-800" />
        </div>

        <div className="Products py-5 text-gray-900 flex gap-4 flex-wrap md:justify-start md:px-2 justify-center">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Women;
