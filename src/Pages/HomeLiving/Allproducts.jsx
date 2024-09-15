import React from 'react'
import url from '../../assets/home-fashion.jpg';
import Hero from '../../Components/Hero';
import Sidebar from '../../Components/Sidebar';
import ProductCard from '../../Components/ProductCard';
const Allproducts = () => {
  return (
    <div className='text-black min-h-screen flex flex-col px-[30px]'>
      <div className="py-3 font-bold">path history goes here</div>
      <div className="main-containt flex">
     <Sidebar />
     <div className="flex flex-col gap-6">
      <div className=" w-full flex justify-end px-5">
        <select className='bg-gray-300 px-3 py-3 outline-none border cursor-pointer'>
        <option value="Price Low to High"  className='cursor-pointer uppercase'>
            SORT BY
          </option>
        <option value="Price Low to High"  className='cursor-pointer uppercase'>
              PRICE LOW TO HIGH
          </option>
          <option value="Price High to Low" className='cursor-pointer uppercase'>
           PRICE HIGH TO LOW
          </option>
         
          <option value="Date Old To New" className='cursor-pointer'>
          DATE OLD TO NEW
          </option>
          <option value="Date New To Old" className='cursor-pointer'>
            DATE NEW TO OLD
          </option>
        </select>
      </div>
     <div className="products flex flex-wrap gap-5 items-center justify-center pb-7 ">
    {Array.from({length:15},(_,index)=>  <ProductCard key={index}/>)}
     </div>
      </div>
      </div>
     </div>
  )
}

export default Allproducts
