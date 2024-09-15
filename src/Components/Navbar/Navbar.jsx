import React, { useState } from "react";
import {  NavLink } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiFillProfile,
  AiOutlineProfile,
  AiOutlineClose,
} from "react-icons/ai";
import logo from '../../assets/logo.jpeg'
import { FaBars,FaCircleXmark , FaXmark , FaUser , FaSearchengin, FaBagShopping} from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
const Navbar = () => {
  const [isOppen, setIsOppen] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false)
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
      <ul className={`flex gap-3 sm:hidden mobile-ul ${isOppen ? 'flex opacity-100 h-[150px] pointer-events-auto' : " h-0 pointer-events-none opacity-0"} z-50 absolute flex-col bg-black w-full left-0 top-[100%] p-3`}>
        <li>
          <NavLink to={"home"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"men-fashion"}>Men's Fashion</NavLink>
        </li>
        <li>
          <NavLink to={"women-fashion"}>Women's Fashion</NavLink>
        </li>
        <li>
          <NavLink to={''}>
        <div className="actions sm:hidden flex justify-start gap-4">
          <AiOutlineSearch  size={25}/>
          <AiOutlineHeart   size={25}/>
          {isLoggedIn ? <FaUser size={25} /> : <NavLink>Login</NavLink>}
        </div>
          </NavLink>
        </li>
       {
        !isLoggedIn &&
        <li>
          <NavLink to={''}>
          <FaBagShopping size={20} className="text-white"/>
          </NavLink>
        </li>
        }
      </ul>
      <ul className={`desktop-hover-effect sm:flex hidden gap-3 relative p-2 text-sm font-light`}>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"men-fashion"}>Men's Fashion</NavLink>
        </li>
        <li>
          <NavLink to={"women-fashion"}>Women's Fashion</NavLink>
        </li>
        <div className="actions sm:hidden flex justify-start gap-4">
          <AiOutlineSearch  size={25} className="cursor-pointer"/>
          <AiOutlineHeart   size={25} className="cursor-pointer"/>
          {
          isLoggedIn ? <NavLink to={'profile'}><FaUser/></NavLink> : <NavLink to={'login'}>Login</NavLink>
          }
           {
          isLoggedIn ? <NavLink to={'cart'}><FaShoppingBag size={25}/></NavLink> : null
          }

        </div>
      </ul>
        <div className="logo w-[200px] max-w-[350px] md:self-center">
         <NavLink to={'/'}> <img src={logo} alt="logo" /></NavLink>
        </div>
        <div className="flex gap-3 justify-center items-center">
          <AiOutlineSearch size={20} className="cursor-pointer"/>
          <AiOutlineHeart size={20} className="cursor-pointer"/>
          {
          !isLoggedIn 
          && 
           <NavLink to={'cart'}>
            <FaBagShopping className="cursor-pointer text-white" size={23}/>  
          </NavLink>
          }
          {!isLoggedIn ? <NavLink to={'profile'}><FaUser size={25}/></NavLink> : <NavLink to={'login'}>Login</NavLink>}

        </div>
    </nav>
  );
};

export default Navbar;
