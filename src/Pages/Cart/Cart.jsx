import React, { useState } from 'react'
import emptyCart from '../../assets/empty-cart.webp'
import dummyProduct from '../../assets/dummyProduct.webp'
import { FaLocationArrow, FaLocationPin, FaLocationPinLock, FaTrash } from 'react-icons/fa6';
const Cart = () => {
    let [cart,setCart] = useState([1,2]);
    if(cart.length === 0){
        return (
            <div className='flex flex-col gap-2 justify-center items-center h-[90dvh] py-3'>
                <button className='text-black border border-black px-10 py-2'>Go to shop</button>
                <img src={emptyCart} alt="empty cart image" className='max-w-[280px] md:max-w-[400px] w-[32vw]'/>
            </div>
        )
    };
  return (
   <div className="cart container mx-auto text-black min-h-[90dvh] gap-3 grid md:grid-cols-3 py-3">
      <div className="Cart-Products col-span-2 p-3 bg-[#a7a6a6]">
        <div className="Product flex flex-wrap gap-2 justify-start items-start shadow-md px-[20px] py-1  bg-white">
            
          <div className="img relative w-[100px] h-[100px] flex justify-center items-center">
           <img src={dummyProduct} alt="Products" className='w-[40px] h-[40px] object-cover' />
          </div>
          <div className="Data flex flex-col gap-y-2 justify-start items-start px-2">
          <div className="title flex justify-start items-start text-sm">
              Lorem ipsum dolor sit amet consectetur.
          </div>
          <div className="price flex flex-col gap-2 justify-center items-center">
           <h1>Rs. 4500</h1>
           <FaTrash/>
          </div>
          <div className="amount flex text-black">
              <button className='py-1 bg-[#9fa59ffb] px-3 text-center cursor-pointer'>-</button>
              <input type="text" value={2} className=' text-center text-black bg-[#c8d0c8fb] py-1 w-[50px] outline-none' placeholder='write something' />
              <button className='py-1 cursor-pointer bg-[#9fa59ffb] px-3 text-center'>+</button>
          </div>
          </div>
        </div>
      </div>
      <div className="Cart-Summary shadow-md h-[300px] text-black px-5 py-2">
        <div className="location flex flex-col gap-3 ">
         <h3 className='text-sm test-black'>Location</h3>
         <div className="text text-sm flex gap-2 items-center">
         <FaLocationPinLock color='#6b7280'/>
              <p className='text-sm text-black'> Sindh - Gadhi - Pakistkan</p>
         </div>
              <hr className='bg-gray-500 w-[90%]'/>
              <h1 className='text-xl'>Cart Summary</h1>
              <div className="flex justify-between">
                <h3 className="text-sm">
                    Subtotal (2 items)
                </h3>
                <h3 className="text-sm">
                    Rs. 9000
                </h3>
              </div>
              <div className="flex justify-between">
                <h3 className="text-sm">
                    Shipping Fee
                </h3>
                <h3 className="text-sm">
                    Rs. 200
                </h3>
              </div>
              <hr className='bg-gray-500 w-[90%]'/>
              <div className="flex justify-between">
                <h3 className="text-sm">
                    Grand total
                </h3>
                <h3 className="text-sm">
                    Rs. 9200
                </h3>
              </div>
              <button className='w-full py-2 text-white bg-black cursor-pointer'>Proceed to Checkout (2)</button>
        </div>
      </div>
   </div>
  )
}

export default Cart
