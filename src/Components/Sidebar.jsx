import React from 'react'
import Input from './Input'
import PriceRange from './PriceRange'

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
            brand : "Nike"
        },
        {
            brand : "Nike"
        },
    ]
  return (
    <div className='w-[250px] min-h-[100dvh] shrink-0'>
      <h1 className='text-black text-sm font-bold'>All Products</h1>
       <div className="cat flex flex-col py-2">
        {categoryies.map((cat)=>(
           <Input type='checkbox' value={cat.title} label={cat.title} key={cat.title}/>
        ))}
       </div>
       <PriceRange/>
      <div className="flex flex-col py-2 gap-2">
        <h1 className='text-xl font-bold'> Brands</h1>
        <div className="cat flex flex-col py-2">
        {brands.map((brand)=>(
           <Input type='radio' value={brand.brand} label={brand.brand} name={'brands'} key={brand.brand}/>
        ))}
       </div>
      </div>
    </div>
  )
}

export default Sidebar
