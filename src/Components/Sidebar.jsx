import React, { useState } from 'react'
import Input from './Input'
import PriceRange from './PriceRange'
import { FaChevronDown, FaXmark } from 'react-icons/fa6'
const Sidebar = ({genre}) => {
    const categoryies = [
        {
            title: "clothing"
        },
        {
            title: "Shoes"
        },
        {
            title: "Accessories"
        },
        {
            title: "Jewelry"
        },
        {
            title: "Bags"
        },
        {
            title: "store"
        }
    ]
    const brands = [
        {
            brand : "Nike"
        },
        {
            brand : "Apple"
        },
        {
            brand : "A Gold E"
        },
        {
            brand : "Nike"
        },
        {
            brand : "something"
        },
        {
            brand : "Nothing"
        },
    ]
    function DoNothingForNow(){
        console.log('nothing')
    }
    const [categoryDropdown,setCategoryDropdown]=useState(false);
    const [brandsDropdown,setbrandsDropdown]=useState(false);

    const handleCategoryDropDown = () => setCategoryDropdown(!categoryDropdown);
    const handlebrandsDropdown = () => setbrandsDropdown(!brandsDropdown);
  return (
    <div 
    className='w-[250px] bg-white min-h-[40dvh] md:max-h-[70vh] shrink-0 shadow-md px-4 pt-2 block opacity-[100] py-4 mt-12 relative'>
       
      <h1 className='text-black mt-2 py-2  border-t-[2px] border-black text-sm font-semibold flex cursor-pointer justify-between items-center ' onClick={handleCategoryDropDown}>{genre ? genre : "Categories"}
         <span className={`text-xl transform ${categoryDropdown ? 'rotate-180': 'rotate-0'} `}><FaChevronDown size={15}/></span></h1>
      { 
        categoryDropdown && <div className="cat flex flex-col py-2">
        {categoryies.map((cat)=>(
           <Input type='checkbox' value={cat.title} label={cat.title} key={cat.title}/>
        ))}
       </div>
      }
       <PriceRange min={500} max={10000} step={500} gap={1000} onChange={DoNothingForNow} />

      <div className="flex flex-col py-2 mt-2 border-t-[2px] border-black">
        <h1 className='text-sm font-semibold flex items-center justify-between cursor-pointer' onClick={handlebrandsDropdown}>Brands  <span className={`text-xl transform ${brandsDropdown ? 'rotate-180': 'rotate-0'} `}><FaChevronDown size={15}/></span></h1>
       {brandsDropdown && <div className="cat  py-1">
        {brands.map((brand)=>(
           <Input type={'checkbox'} value={brand.brand} label={brand.brand} name={'brands'} key={brand.brand}/>
        ))}
       </div>}
      </div>
    </div>
  )
}

export default Sidebar
