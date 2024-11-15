import React, { useEffect, useState } from 'react';
import Input from './Input';
import PriceRange from './PriceRange';
import { FaChevronDown } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ genre , allCategories , gender }) => {
  const [checked, setChecked] = useState(false);
  const [categories,setCategories] = useState([]);
  useEffect(()=>{
    if(gender === "Neuter"){
      console.log(gender)
      setCategories(allCategories);
    }else{
      setCategories(()=>allCategories.filter(cats=>cats.gender === gender));
    }
  },[allCategories,gender])
  const brands = [
    { brand: "Mendeez" }, 
    { brand: "Zeroyya" },
    { brand: "Zara" },
    { brand: "Adidas" },
    { brand: "Nike" },
    { brand: "H&M" }
  ];
  const [categoryDropdown, setCategoryDropdown] = useState(true);
  const [brandsDropdown, setBrandsDropdown] = useState(true);

  const handleCategoryDropdown = () => setCategoryDropdown(!categoryDropdown);
  const handleBrandsDropdown = () => setBrandsDropdown(!brandsDropdown);

  return (
    <div className="md:min-w-[250px]  md:max-w-[320px] md:w-[320px] w-full px-5 text-black  pt-4 py-8 mt-12 relative  min-h-[100dvh]">
      <h1 
        className=" py-2 border-t border-gray-800 text-sm font-semibold flex items-center justify-between cursor-pointer hover:text-gray-600 transition duration-200" 
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
            <Input type="checkbox" value={cat.category} label={cat.category} key={cat.category} />
          ))}
        </div>
      )}
      
      <div className="">
        <PriceRange />
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
              <Input type="checkbox" value={brand.brand} label={brand.brand} name="brands" key={brand.brand} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
