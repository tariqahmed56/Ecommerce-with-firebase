import React from "react";
import menHero from "../assets/home-fashion.jpg";
import { BiSearch } from "react-icons/bi";
const Hero = ({ imgUrl = menHero }) => {
  const style = {
    height: "calc(100dvh - 56px)",
    backgroundImage: `url(${imgUrl})`,
  };
  return (
    <div className={`bg-cover flex flex-col justify-center items-center`} style={style}>
      <h1 className="text-[3.8rem] flex gap-2 font-bold" style={{fontSize: "clamp(32px,4vw,4.8rem)"}}>
        <span>Find.</span>
        <span className="italic" style={{fontFamily: "Playfair Display"}}>Compare.</span>
        <span>Shop.</span>
      </h1>
      <p className="font-light text-[1.2rem] text-center">Fashion and home interior from over 100 online shops</p>
      <label htmlFor="search" className="relative w-[80%] sm:w-[45%]">
      <input type="text" placeholder="search..." className="mt-3 min-h-8 rounded-full w-full md:py-2 md:px-3 px-5 py-6  bg-black " id="search"/>
      <BiSearch className="absolute right-3 text-black top-[40%]" color="black" size={30}/>
      </label>
    </div>
  );
};

export default Hero;
