import React from 'react'
import Input from './Input'
import PriceRange from './PriceRange'
import { FaXmark } from 'react-icons/fa6'
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
  return (
    <div 
    className='w-[250px] bg-white min-h-[100dvh] shrink-0 shadow-md px-4 pt-2 block opacity-[100]  relative'>
       
      <h1 className='text-black text-sm font-bold'>{genre}</h1>
       <div className="cat flex flex-col py-2">
        {categoryies.map((cat)=>(
           <Input type='checkbox' value={cat.title} label={cat.title} key={cat.title}/>
        ))}
       </div>
       <PriceRange min={500} max={10000} step={500} gap={1000} onChange={DoNothingForNow}/>
      <div className="flex flex-col py-2 gap-2">
        <h1 className='text-xl font-bold'> Brands</h1>
        <div className="cat flex flex-col py-2">
        {brands.map((brand)=>(
           <Input type={'radio'} value={brand.brand} label={brand.brand} name={'brands'} key={brand.brand}/>
        ))}
       </div>
      </div>
    </div>
  )
}

export default Sidebar
