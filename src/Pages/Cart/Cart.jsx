import React, { useState } from 'react';
import emptyCart from '../../assets/empty-cart.webp';
import dummyProduct from '../../assets/dummyProduct.webp';
import { FaLocationPinLock, FaTrash } from 'react-icons/fa6';

const Cart = () => {
  const [cart, setCart] = useState([1, 2]);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-[90dvh] py-4">
        <button className="bg-black text-white px-8 py-3 rounded-lg text-lg hover:bg-gray-800 transition">
          Go to shop
        </button>
        <img
          src={emptyCart}
          alt="empty cart"
          className="max-w-[280px] md:max-w-[400px] w-[32vw] rounded-lg shadow-lg"
        />
      </div>
    );
  }

  return (
    <div className="cart container mx-auto text-black min-h-[90dvh] gap-6 grid md:grid-cols-3 py-6 px-4">
      <div className="Cart-Products col-span-2 md:p-6 p-1  bg-[#f7f7f7] rounded-lg shadow-lg ">
        <div className="Product flex flex-wrap gap-4 justify-center items-center md:justify-start md:items-start shadow-md px-6 py-4 bg-white rounded-lg">
          <div className="img relative w-[120px] h-[120px] flex justify-center items-center border rounded-md overflow-hidden">
            <img src={dummyProduct} alt="Product" className="w-full h-full object-cover" />
          </div>
          <div className="Data flex flex-col gap-y-3 justify-start items-start px-4">
            <div className="title text-lg font-semibold text-black">
              Lorem ipsum dolor sit amet consectetur.
            </div>
            <div className="price flex flex-col gap-3 justify-center items-center">
              <h1 className="text-xl font-bold text-black">Rs. 4500</h1>
              <button className="text-red-500 hover:text-red-700 text-xl">
                <FaTrash />
              </button>
            </div>
            <div className="amount flex text-black items-center gap-3">
              <button className="py-2 px-4 bg-[#9fa59f] rounded-full text-lg cursor-pointer hover:bg-[#8f8d8b] transition">-</button>
              <input
                type="text"
                value={2}
                className="text-center text-black bg-[#c8d0c8] py-2 w-[60px] outline-none rounded-md"
              />
              <button className="py-2 px-4 bg-[#9fa59f] rounded-full text-lg cursor-pointer hover:bg-[#8f8d8b] transition">+</button>
            </div>
          </div>
        </div>
      </div>

      <div className="Cart-Summary shadow-lg bg-white p-6 rounded-lg w-[90vw] md:w-auto">
        <div className="location flex flex-col gap-4">
          <h3 className="text-sm font-medium text-gray-600">Location</h3>
          <div className="text text-sm flex gap-3 items-center">
            <FaLocationPinLock color="#6b7280" />
            <p className="text-sm text-black">Sindh - Gadhi - Pakistan</p>
          </div>
          <hr className="bg-gray-500 w-[90%]" />
          <h1 className="text-xl font-bold text-black mt-4">Cart Summary</h1>

          <div className="flex justify-between text-sm font-medium mt-4">
            <h3>Subtotal (2 items)</h3>
            <h3>Rs. 9000</h3>
          </div>
          <div className="flex justify-between text-sm font-medium mt-2">
            <h3>Shipping Fee</h3>
            <h3>Rs. 200</h3>
          </div>
          <hr className="bg-gray-500 w-[90%]" />

          <div className="flex justify-between text-xl font-bold mt-4">
            <h3>Grand total</h3>
            <h3>Rs. 9200</h3>
          </div>

          <button className="w-full py-3 text-white bg-black cursor-pointer mt-6 rounded-lg hover:bg-gray-800 transition">
            Proceed to Checkout (2)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
