import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineSearch,
} from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import logo from '../../assets/logo.jpeg';
import { FaBars, FaXmark, FaUser, FaBagShopping } from "react-icons/fa6";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user , LogOut  } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const HandleSingOut = () =>{
    LogOut();
      navigate('/')
  }
  const toggleNavbar = () => setIsOpen((prev) => !prev);
  const debounce = (fun,delay) =>{
    let timerId ;
    return (...args) =>{
      clearTimeout(timerId);
    timerId = setTimeout(()=>fun(...args),delay);
    }
  }
  const handleInput = (e) => {
    console.log(e.target.value);
  };
  const debouncedInputHandler = debounce(handleInput,400);


  return (
    <nav className="h-[64px] bg-black flex justify-between lg:px-6 items-center px-4 py-2 relative">
      {isOpen ? (
        <FaXmark className="cursor-pointer sm:hidden" size={25} color="white" onClick={toggleNavbar} />
      ) : (
        <FaBars className="cursor-pointer sm:hidden" size={25} color="white" onClick={toggleNavbar} />
      )}

      {/* Mobile & Tablet Navigation */}
      <ul className={`flex gap-3 sm:hidden ${isOpen ? 'flex opacity-100 h-[150px] pointer-events-auto' : " h-0 pointer-events-none opacity-0"} z-50 absolute flex-col bg-black w-full left-0 top-[100%] p-3`}>
        <li><NavLink to={`store/all-product`}>Shop</NavLink></li>
        <li><NavLink to="store/men-fashion">Men's Fashion</NavLink></li>
        <li><NavLink to="store/women-fashion">Women's Fashion</NavLink></li>
        <li>
        </li>
       
      </ul>

      {/* Desktop Navigation */}
      <ul className="sm:flex hidden gap-3 text-sm font-light">
      <li><NavLink to={`store/all-product`}>Shop</NavLink></li>
        <li><NavLink to="store/men-fashion">Men's Fashion</NavLink></li>
        <li><NavLink to="store/women-fashion">Women's Fashion</NavLink></li>
      {user?.role === 'admin' && <li><NavLink to="admin-panel">Dashboard</NavLink></li>}
      </ul>

      <div className="logo w-[200px] max-w-[350px]">
        <NavLink to="/"><img src={logo} alt="logo" /></NavLink>
      </div>

      <div className="flex gap-3 items-center">
        {user ? (
          <>
           <div className="Link relative group">
            <NavLink to="profile"><FaUser size={25} /></NavLink>
            <div className="UserProfileSideBar translate-y-8 translate-x-[60px] transition-all group-hover:translate-y-2 group-hover:opacity-100 opacity-0 pointer-events-none group-hover:pointer-events-auto  -left-[170px] top-8 z-30 rounded-md w-[200px] absolute  bg-gray-100 p-4 flex flex-col gap-4 text-gray-700 border-r-2 border-gray-200 shadow-inner">
           <div className="absolute h-6 w-6 left-[53%] bg-gray-100 rotate-45 -translate-y-6"></div>
          <Link to="profile" className="px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 hover:text-black rounded-lg">
            Contacts
          </Link>
          <Link to="profile/settings" className="px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 hover:text-black rounded-lg">
            Account Settings
          </Link>
          <Link to="profile/orders" className="px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 hover:text-black rounded-lg">
            Orders
          </Link>
          <button
        className="px-5 py-2 whitespace-nowrap  text-nowrap overflow-hidden flex items-center justify-center gap-1 bg-red-500 text-white font-medium rounded-lg shadow-md transition-all duration-200 ease-in-out"
        onClick={HandleSingOut}
      > 
        <FaSignOutAlt/> Logout
      </button>
        </div>
            </div>
            <NavLink to="cart" className='relative'>{user.cart?.length > 0 && <span className="bg-red-500 text-white w-4 h-4 rounded-full flex justify-center items-center absolute -top-0 -right-2 text-sm">{user?.cart.length}</span>}<FaBagShopping className="cursor-pointer text-white" size={23} /></NavLink>
          </>
        ) : (
          <NavLink to="login">login</NavLink>
        )}
        <AiOutlineHeart size={20} className="cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
