import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiFillProfile,
  AiOutlineProfile,
  AiOutlineClose,
} from "react-icons/ai";
import logo from '../../assets/logo.jpeg'
import { FaBars,FaCircleXmark , FaXmark , FaUser , FaSearchengin} from "react-icons/fa6";
const Navbar = () => {
  const [isOppen, setIsOppen] = useState(false);
  const toggleNavbar = () => {
    setIsOppen(prev=>!prev)
  }
  return (
    <nav className="h-[64px] bg-black flex justify-between lg:px-6 items-center px-4 py-2 relative">
      {isOppen ? (
        <FaXmark className="cursor-pointer sm:hidden" size={25} color="white" onClick={toggleNavbar}/>
      ) : (
        <FaBars
         className="cursor-pointer sm:hidden" size={25} color="white" onClick={toggleNavbar}/>
      )}
      {/* for mobile & tablets */}
      <ul className={`flex gap-3 sm:hidden mobile-ul ${isOppen ? 'flex opacity-100 h-[150px] pointer-events-auto' : " h-0 pointer-events-none opacity-0"} absolute flex-col bg-black w-full left-0 top-[100%] p-3`}>
        <li>
          <Link to={"home"}>Home</Link>
        </li>
        <li>
          <Link to={"men-fashion"}>Men's Fashion</Link>
        </li>
        <li>
          <Link to={"women-fashion"}>Women's Fashion</Link>
        </li>
        <div className="actions sm:hidden flex justify-start gap-4">
          <AiOutlineSearch  size={25}/>
          <AiOutlineHeart   size={25}/>
          <FaUser size={25} />
        </div>
      </ul>
      <ul className={`desktop-hover-effect sm:flex hidden gap-3 relative p-2 text-sm font-light`}>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"men-fashion"}>Men's Fashion</Link>
        </li>
        <li>
          <Link to={"women-fashion"}>Women's Fashion</Link>
        </li>
        <div className="actions sm:hidden flex justify-start gap-4">
          <AiOutlineSearch  size={25} className="cursor-pointer"/>
          <AiOutlineHeart   size={25} className="cursor-pointer"/>
          <FaUser size={25}  className="cursor-pointer"/>
        </div>
      </ul>
        <div className="logo w-[200px] max-w-[350px] md:self-center">
         <Link to={'/'}> <img src={logo} alt="logo" /></Link>
        </div>
        <div className="flex gap-3">
          <AiOutlineSearch size={25} className="cursor-pointer"/>
          <AiOutlineHeart size={25} className="cursor-pointer"/>
          <FaUser size={25} className="hidden sm:block cursor-pointer"  />
        </div>
    </nav>
  );
};

export default Navbar;
