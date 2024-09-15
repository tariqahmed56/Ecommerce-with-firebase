import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import menStyle from "../../assets/menswiper/men-style.webp";
import frag from "../../assets/menswiper/frag.webp";
import trousers from "../../assets/menswiper/men-trousers.webp";
import shoes from "../../assets/menswiper/shoes.avif";
import nike from "../../assets/menswiper/nike-shoes.jpg";
import jacket from "../../assets/menswiper/jacket.jpg";
import ProductCard from "../../Components/ProductCard";
import Sidebar from "../../Components/Sidebar";
import Carousel from "../../Components/Carousel";
import Sort from "../../Components/Sort";
const Men = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const location = useLocation();
  return (
    <div className="w-full text-black">
      <Carousel images={[menStyle, nike, trousers, shoes, jacket, frag]} />
      <div className="flex justify-start w-[75%] mx-auto">
        <button
          style={{ fontFamily: "Playfair Display" }}
          className="px-10 text-xl tracking-[5px] py-3 md:hidden border border-[gray] hover:bg-black hover:text-white"
          onClick={toggleSidebar}
        >
          filters
        </button>
      </div>

      <div className="container mx-auto flex py-5 relative">
        <div
          className={`transition-all duration-300 ease-in-out
            md:relative md:left-0
            ${isSidebarOpen ? "left-0" : "-left-full"} 
            absolute top-0 h-full md:w-auto w-3/4 bg-white z-50 md:z-auto`}
        >
          <Sidebar genre={"Men's Fashion"} />
        </div>
        <div className="flex flex-col items-center gap-2 relative">
          <div className="Sortwraper self-end">
            <Sort/>
          </div>
        <div className="flex flex-wrap justify-center items-center gap-4 w-full">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
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

export default Men;
