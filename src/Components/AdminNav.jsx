import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaPlus, FaMinus, FaBoxOpen } from 'react-icons/fa';
import { BiPackage } from 'react-icons/bi';
import { MdFolderSpecial } from 'react-icons/md';
import logo from '../assets/logo.jpeg';

const AdminSidebar = ({ isSidebarExpanded, setSidebarExpanded }) => {
  const [isCategoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [isProductMenuOpen, setProductMenuOpen] = useState(false);

  const toggleCategoryMenu = () => setCategoryMenuOpen(!isCategoryMenuOpen);
  const toggleProductMenu = () => setProductMenuOpen(!isProductMenuOpen);
  
  const handleSidebarExpand = () => {
    setSidebarExpanded(true);
  };

  useEffect(() => {
    if (!isSidebarExpanded) {
      setCategoryMenuOpen(false);
      setProductMenuOpen(false);
    }
  }, [isSidebarExpanded]);

  return (
    <div onClick={handleSidebarExpand} className={`admin-sidebar z-20 w-[50px] lg:w-[250px] bg-[#1E293B] px-4 py-2 flex flex-col items-center ${isSidebarExpanded ? "absolute md:relative w-auto md:w-[250px] h-screen shadow-md" : ""}`}>
      <img src={logo} alt="logo" className="mb-1 h-12 w-auto object-contain hidden lg:block" />

      <nav className="w-full flex flex-col gap-6">
        <Link to="." className="text-white text-base flex items-center gap-2 hover:text-gray-300">
          <FaHome size={30}/> <span className={`${isSidebarExpanded ? "block" : "hidden"} lg:block`}>Dashboard</span>
        </Link>
        <Link to="orders" className="text-white text-base flex items-center gap-2 hover:text-gray-300">
          <FaBoxOpen size={30}/> <span className={`${isSidebarExpanded ? "block" : "hidden"} lg:block`}>Orders</span>
        </Link>
        <Link to="users" className="text-white text-base flex items-center gap-2 hover:text-gray-300">
          <FaUsers size={30}/> <span className={`${isSidebarExpanded ? "block" : "hidden"} lg:block`}>Users</span>
        </Link>

        <div>
          <button onClick={toggleProductMenu} className="text-white text-base flex items-center gap-2 justify-between md:justify-start hover:text-gray-300 w-full">
            <BiPackage size={30}/> <span className={`${isSidebarExpanded ? "block" : "hidden"} lg:block`}>Products</span> 
            {isProductMenuOpen ? <FaMinus size={10} className={`${isSidebarExpanded ? "" : "hidden lg:block"}`} /> : <FaPlus size={10} className={`${isSidebarExpanded ? "" : "hidden lg:block"}`} />}
          </button>
          <div className={`ml-6 flex flex-col gap-2 transition-all duration-300 ${isProductMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <Link to="add-product" className="text-white text-sm hover:text-gray-300">Add Product</Link>
            <Link to="product-list" className="text-white text-sm hover:text-gray-300">Product List</Link>
          </div>
        </div>

        <div>
          <button onClick={toggleCategoryMenu} className="text-white text-base flex justify-between md:justify-start items-center gap-2 hover:text-gray-300 w-full">
            <MdFolderSpecial size={30}/> <span className={`${isSidebarExpanded ? "block" : "hidden"} lg:block`}>Categories</span> 
            {isCategoryMenuOpen ? <FaMinus size={10} className={`${isSidebarExpanded ? "" : "hidden lg:block"}`} /> : <FaPlus size={10} className={`${isSidebarExpanded ? "" : "hidden lg:block"}`} />}
          </button>
          <div className={`ml-6 flex flex-col gap-2 transition-all duration-300 ${isCategoryMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <Link to="add-category" className="text-white text-sm hover:text-gray-300">Add Category</Link>
            <Link to="category-list" className="text-white text-sm hover:text-gray-300">Categories List</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
