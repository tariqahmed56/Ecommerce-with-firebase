import React from "react";
import menHero from "../assets/home-fashion.jpg";
import { BiSearch } from "react-icons/bi";
import PriceRange from "./PriceRange";
const Hero = ({ imgUrl = menHero }) => {
  const style = {
    height: "calc(100dvh - 56px)",
    backgroundImage: `url(${imgUrl})`,
  };
  return (
    <div className={`bg-cover bg-right sm:bg-auto flex flex-col justify-center items-center relative`} style={style}>
      <div className="blackcover absolute h-full w-full bg-[#0000006c] bottom-0 left-0 z-[10]"></div>
      <h1 className="text-[3.8rem] flex gap-2 font-bold z-20" style={{fontSize: "clamp(32px,4vw,4.8rem)"}}>
        <span>Find.</span>
        <span className="italic" style={{fontFamily: "Playfair Display"}}>Compare.</span>
        <span>Shop.</span>
      </h1>
      <p className="font-light text-[1.2rem] text-center z-20">Exclusive Men's and Women's Fashion Collections</p>
      <label htmlFor="search" className="relative w-[80%] sm:w-[45%] z-20">
      <input type="text" placeholder="search..." className="z-20 mt-3 min-h-8 text-[#676565] rounded-full w-full md:py-2 md:px-3 px-5 py-6 outline-none " id="search"/>
      <BiSearch className="absolute right-3 text-black top-[40%] z-20" color="black" size={30}/>
      </label>
    </div>
  );
};

export default Hero;
