import React from "react";
import menHero from "../assets/home-fashion.jpg";
import { BiSearch } from "react-icons/bi";
import PriceRange from "./PriceRange";
import Carousel from '../Components/Carousel';
import men1 from '../assets/menswiper/banner.webp'
import men2 from '../assets/menswiper/men-style.webp'
import women1 from '../assets/women-fashion.jpg'
import women2 from '../assets/women-style.webp'
import Button from "./Button";
const Hero = ({ imgUrl = menHero }) => {
  const style = {
    height: "calc(100dvh - 56px)",
    backgroundImage: `url(${imgUrl})`,
  };
  const images = [
    {
      id:1,
      url:men1
    },
    {
      id:2,
      url:women1
    },
    {
      id:3,
      url:men2
    },
    {
      id:4,
      url:women2
    }
  ]
  return (
    <div className={`bg-cover bg-right sm:bg-auto flex flex-col justify-center items-center relative bg-[#211f1f] pb-6`}>
      <Carousel images={images}/>
      <div className="blackcover absolute h-full w-full bg-[#0000006c] top-0 bottom-0 left-0 z-10"></div>
      <h1 className="text-[3.8rem] flex gap-2 font-bold z-20" style={{fontSize: "clamp(32px,4vw,4.8rem)"}}>
        <span>Find.</span>
        <span className="italic" style={{fontFamily: "Playfair Display"}}>Compare.</span>
        <span>Shop.</span>
      </h1>
      <p className="font-light text-[1.2rem] text-center z-20">Exclusive Men's and Women's Fashion Collections</p>
      <label htmlFor="search" className="relative w-[80%] sm:w-[45%] z-20">
      <input type="text" placeholder="search..." className="z-20 mt-3 bg-transparent border border-gray-500 min-h-8 text-white tracking-wider uppercase rounded-full w-full md:py-2 md:px-3 px-5 py-6 outline-none " id="search"/>
      <BiSearch className="absolute right-3 text-white top-[40%] z-20"  size={30}/>
      </label>
       <button className="sm:hidden block uppercase font-play tracking-widest text-xl cursor-pointer   text-black bg-white shadow-emerald-500 shadow-md  rounded-sm z-20 px-5 py-2 w-[250px] mt-5 hover:translate-y-2 hover:shadow-sm transition-all">Shop Now</button>
    </div>
  );
};

export default Hero;
