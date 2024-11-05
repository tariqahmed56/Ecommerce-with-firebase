import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaShoppingCart, FaPlus, FaMinus, FaThList, FaFolderOpen } from 'react-icons/fa';
import logo from '../assets/logo.jpeg';

const AdminNav = () => {
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);
  const [isProductsOpen, setProductsOpen] = useState(false);

  const toggleCategories = () => setCategoriesOpen(!isCategoriesOpen);
  const toggleProducts = () => setProductsOpen(!isProductsOpen);

  return (
    <div className="Admin-Sidebar basis-[150px]  bg-[#1E293B] px-4 py-2 flex flex-col items-center">
      <img src={logo} alt="logo" className="mb-1 h-12 w-auto object-contain" />

      <nav className="w-full flex flex-col gap-3">
        <Link to="." className="text-white text-base flex items-center gap-2 hover:text-gray-300">
          <FaTachometerAlt /> Dashboard
        </Link>
        <Link to="orders" className="text-white text-base flex items-center gap-2 hover:text-gray-300">
          <FaShoppingCart /> Orders
        </Link>
        <Link to="users" className="text-white text-base flex items-center gap-2 hover:text-gray-300">
          <FaUsers /> Users
        </Link>

        {/*Dropdown for Products*/}
        <div>
          <button onClick={toggleProducts} className="text-white text-base flex items-center gap-2 hover:text-gray-300 w-full">
            <FaThList /> Products {isProductsOpen ? <FaMinus /> : <FaPlus />}
          </button>
          <div className={`ml-6 flex flex-col gap-2 transition-all duration-300 ${isProductsOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <Link to="add-product" className="text-white text-sm hover:text-gray-300">
              Add Product
            </Link>
            <Link to="product-list" className="text-white text-sm hover:text-gray-300">
              Product List
            </Link>
          </div>
        </div>

        {/*  Dropdown  for Categories*/}
        <div>
          <button onClick={toggleCategories} className="text-white text-base flex items-center gap-2 hover:text-gray-300 w-full">
            <FaFolderOpen /> Categories {isCategoriesOpen ? <FaMinus /> : <FaPlus />}
          </button>
          <div className={`ml-6 flex flex-col gap-2 transition-all duration-300 ${isCategoriesOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <Link to="add-category" className="text-white text-sm hover:text-gray-300">
              Add Category
            </Link>
            <Link to="category-list" className="text-white text-sm hover:text-gray-300">
              Categories List
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNav;
