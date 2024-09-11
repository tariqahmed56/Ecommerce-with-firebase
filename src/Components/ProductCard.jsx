import React from 'react'
import product from '../assets/dummyProduct.webp'
const ProductCard = ({imgUrl,discount,brand,title,isShippingFree,originalPrice,actualPrice}) => {
  return (
    <div className='flex flex-col w-[180px] relative h-[340px] object-cover cursor-pointer'>
      <div className="imgContainer bg-gray-400 h-[75%] relative group overflow-hidden">
      <img src={product} className='absolute group-hover:scale-[1.05] duration-300 transition-all  h-auto w-auto max-w-full mix-blend-multiply max-h-[100%] top-0 left-0 right-0 bottom-0 mx-auto'/>
      </div>
      <h1 className='text-sm font-bold'>Alunari</h1>
      <p className='text-[12px] font-normal text-ellipsis'>Orange striped cardigian</p>
      <p className='text-[10px] font-medium text-gray-500 text-ellipsis uppercase'>Delivery free</p>
      <div className="price flex gap-1 items-center">
        <span>Rs.</span>
        <p className='originalPrice text-[13px] font-semibold text-red-600'>4000</p>
        <p className='originalPrice text-[13px] font-semibold line-through'>4500</p>
      </div>
    </div>
  )
}

export default ProductCard
