import React, { useCallback, useEffect, useState } from 'react';
import Input from './Input';
import PriceRange from './PriceRange';
import { FaChevronDown, FaX } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ genre , allCategories , gender , setFilters , filters , closeSideBar , isSideBarOpen}) => {
  const [categories,setCategories] = useState([]);
  useEffect(()=>{
    setCategories([]);
    setFilters({
      categories: [],
      genders: [],
      brands: [],
      priceRange:[0,15000]
    })
  },[])
  useEffect(()=>{
    console.log('changed')
    if(gender === "Neuter"){
      console.log(gender)
      setCategories(allCategories);
    }else{
      setCategories(()=>allCategories.filter(cats=>cats.gender === gender));
    }
  },[allCategories,gender]);
 
  const [brands,setBrands] = useState([
    { brand: "Mendeez" }, 
    { brand: "Zeroyya" },
    { brand: "Zara" },
    { brand: "Adidas" },
    { brand: "Nike" },
    { brand: "H&M" }
  ]);
  
 
  const [categoryDropdown, setCategoryDropdown] = useState(true);
  const [brandsDropdown, setBrandsDropdown] = useState(true);

  const handleCategoryDropdown = () => setCategoryDropdown(!categoryDropdown);
  const handleBrandsDropdown = () => setBrandsDropdown(!brandsDropdown);
  const handleFilterChange = (e) =>{
    const filterField = e.target.name; 
    const value = e.target.value;     
    console.log(filters)    
  
    setFilters((prevFilters) => {
      // Price Range filter is handled inisde priceRange component;
      if (filterField !== "priceRange") {
        const updatedField = prevFilters[filterField].includes(value)
          ? prevFilters[filterField].filter((item) => item !== value) 
          : [...prevFilters[filterField], value];                   
  
        return {
          ...prevFilters,
          [filterField]: updatedField,
        }; 
      }
    });
    console.log(filters)    
  }
  
  return (
    <div 
    className={`md:min-w-[250px]  md:max-w-[320px] md:w-[320px] absolute ${isSideBarOpen ? '-left-[0%]' : '-left-[100%]'} transition-all  top-[60px] md:top-0 z-10 md:left-0 shadow-2xl md:shadow-none md:bg-none w-full px-5 text-black  pt-4 py-10 mt-12 bg-white md:relative  min-h-[100dvh]`}>
      <FaX 
      onClick={closeSideBar}
       size={30}
       className='md:hidden block text-2xl shadow-inner font-bold font-play absolute right-5 top-1 text-red-700 cursor-pointer'/>
      <h1 
        className="mt-10 md:mt-1 py-2 border-t border-gray-800 text-sm font-semibold flex items-center justify-between cursor-pointer hover:text-gray-600 transition duration-200" 
        onClick={handleCategoryDropdown}
      >
        {genre || "Categories"}
        <span className={`transition-transform duration-300 ${categoryDropdown ? 'rotate-180' : ''}`}>
          <FaChevronDown size={15} />
        </span>
      </h1>
      {categoryDropdown && (
        <div className="flex flex-col py-2">
          {categories?.map((cat) => (
            <Input type="checkbox" 
            value={cat.category} 
            name={"categories"} 
            label={cat.category} 
            key={cat.category} 
            onChange={handleFilterChange}
            width={"w-auto"}
            />
          ))}
        </div>
      )}
      
      <div className="">
        <PriceRange setFilter={setFilters}/>
      </div>

      <div className="py-2 mt-2  border-t border-gray-800">
        <h1 
          className="text-sm font-semibold flex items-center justify-between cursor-pointer hover:text-gray-600 transition duration-200" 
          onClick={handleBrandsDropdown}
        >
          Brands
          <span className={`transition-transform duration-300 ${brandsDropdown ? 'rotate-180' : ''}`}>
            <FaChevronDown size={15} />
          </span>
        </h1>
        {brandsDropdown && (
          <div className="py-2">
            {brands.map((brand) => (
              <Input type="checkbox" 
              value={brand.brand} 
              label={brand.brand}
               name="brands" 
               key={brand.brand} 
               onChange={handleFilterChange}
               width={"w-auto"}
               />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
