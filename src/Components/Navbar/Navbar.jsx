import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineSearch,
} from "react-icons/ai";
import logo from '../../assets/logo.jpeg';
import { FaBars, FaXmark, FaUser, FaBagShopping } from "react-icons/fa6";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen((prev) => !prev);

  return (
    <nav className="h-[64px] bg-black flex justify-between lg:px-6 items-center px-4 py-2 relative">
      {isOpen ? (
        <FaXmark className="cursor-pointer sm:hidden" size={25} color="white" onClick={toggleNavbar} />
      ) : (
        <FaBars className="cursor-pointer sm:hidden" size={25} color="white" onClick={toggleNavbar} />
      )}

      {/* Mobile & Tablet Navigation */}
      <ul className={`flex gap-3 sm:hidden ${isOpen ? 'flex opacity-100 h-[150px] pointer-events-auto' : " h-0 pointer-events-none opacity-0"} z-50 absolute flex-col bg-black w-full left-0 top-[100%] p-3`}>
        <li><NavLink to={`store/all-product`}>Home</NavLink></li>
        <li><NavLink to="store/men-fashion">Men's Fashion</NavLink></li>
        <li><NavLink to="store/women-fashion">Women's Fashion</NavLink></li>
        <li>
          <div className="actions flex gap-4">
            <AiOutlineSearch size={25} />
            <AiOutlineHeart size={25} />
            {user ? (
              <NavLink to="profile"><FaUser size={25} /></NavLink>
            ) : (
              <NavLink to="login"><FaUser size={25} /></NavLink>
            )}
          </div>
        </li>
        {user && (
          <li>
            <NavLink to="cart"><FaBagShopping size={20} className="text-white" /></NavLink>
          </li>
        )}
      </ul>

      {/* Desktop Navigation */}
      <ul className="sm:flex hidden gap-3 text-sm font-light">
      <li><NavLink to={`store/all-product`}>Home</NavLink></li>
        <li><NavLink to="store/men-fashion">Men's Fashion</NavLink></li>
        <li><NavLink to="store/women-fashion">Women's Fashion</NavLink></li>
      {user?.role === 'admin' && <li><NavLink to="admin-panel">Dashboard</NavLink></li>}
      </ul>

      <div className="logo w-[200px] max-w-[350px]">
        <NavLink to="/"><img src={logo} alt="logo" /></NavLink>
      </div>

      <div className="flex gap-3 items-center">
        <AiOutlineSearch size={20} className="cursor-pointer" />
        <AiOutlineHeart size={20} className="cursor-pointer" />
        {user ? (
          <>
            <NavLink to="cart"><FaBagShopping className="cursor-pointer text-white" size={23} /></NavLink>
            <NavLink to="profile"><FaUser size={25} /></NavLink>
          </>
        ) : (
          <NavLink to="login">Login</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
