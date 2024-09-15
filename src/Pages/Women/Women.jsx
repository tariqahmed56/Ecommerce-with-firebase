import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import womenHero from '../../assets/women-fashion.jpg'
import Hero from '../../Components/Hero';
import Sidebar from '../../Components/Sidebar';
import ProductCard from '../../Components/ProductCard';
import Sort from '../../Components/Sort';
import { FaXmark } from 'react-icons/fa6';
const Women = () => {
  const location = useLocation();

  console.log(location.pathname.split('/')[1])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className='flex gap-4 relative'>
      
       <div
          className={`transition-all text-black duration-300 ease-in-out
            md:relative md:left-0
            ${isSidebarOpen ? 'left-0' : '-left-full'} 
            absolute top-0 h-full md:w-auto w-3/4 bg-white z-50 md:z-auto`}
        >
           <div className="w-[300px] flex justify-center md:hidden">
            <FaXmark size={30} onClick={toggleSidebar}/>
        </div>
          <Sidebar genre={"Women's Fashion"} />
        </div>
        <div className="flex flex-col py-3 relative w-full">

        <div className="flex lg:justify-end justify-center gap-3 w-full px-6 flex-wrap lg:px-7 text-black">
       <button
          style={{ fontFamily: "Playfair Display" }}
          className="px-10 text-xl tracking-[5px] py-3 md:hidden border border-[gray] hover:bg-black hover:text-white"
          onClick={toggleSidebar}
        >
          filters
        </button>
       <Sort color={'black'}/>
      </div>

      <div className="Products py-5 text-black flex gap-2 flex-wrap md:justify-start md:px-2 justify-center">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </div>

        </div>
    </div>
  )
}

export default Women
