import React, { useContext, useEffect, useState } from 'react';
import emptyCart from '../../assets/empty-cart.webp';
import dummyProduct from '../../assets/dummyProduct.webp';
import { FaLocationPinLock, FaX } from 'react-icons/fa6';
import QuantitySelector from '../../Components/QuantitySelector';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseconfig';

const Cart = () => {
  const {user} = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  let [price,setPrice] = useState(0);
  let [shippingCost,setShippingCost] = useState(0);
  useEffect(()=>{
    setCart(user?.cart);
   let total =  user.cart.reduce((acc,curr)=>acc+(Number(curr.variant.price)*curr.Quantity),0);
   let shippingCost = cart.reduce((acc,curr)=>acc+Number(curr.deliveryCharges),0);
   setPrice(total);
   setShippingCost(shippingCost);
  },[user])
  
  const  removeProduct = async(id) => {
      let updatedCart = cart.filter(item=>item.id !== id);
     const userInfoRef = doc(db,'users', user.uid);
     await updateDoc(userInfoRef,{cart:updatedCart});
  }
  
  return (
    <div className="cart px-2 md:container md:mx-auto text-black min-h-[90dvh] gap-6 grid md:grid-cols-3 py-6 md:px-4">
      <div className="Cart-Products col-span-2 md:p-6 mx-auto bg-[#f7f7f7] rounded-lg shadow-lg ">
        {cart?.map(item=>(
          <div key={item.id} className="Product relative flex border mb-2 border-black flex-wrap md:flex-nowrap w-[90vw] sm:w-[100%]  gap-4 justify-center items-center md:justify-start md:items-start shadow-md px-6 py-4 bg-white rounded-lg">
          <div className="img relative w-[120px] h-[120px] flex justify-center items-center border rounded-md overflow-hidden">
            <img src={item.imageUrls[0]} alt="Product" className="w-full h-full object-cover" />
          </div>
          <div className="Data flex flex-col gap-y-3 justify-start items-start px-4">
            <div className="title text-lg font-normal text-black text-wrap">
              {item.title}
            </div>
            <div className="price flex flex-col gap-3 justify-center items-center">
              <h1 className="text-xl font-semibold text-black">PKR:{item.variant.price}</h1>
              <button className="text-red-500 hover:text-red-700 text-xl absolute top-2 right-2">
                <FaX onClick={()=>removeProduct(item.id)}/>
              </button>
            </div>
          <h1 className='font-semibold'>Quantity: <span className='font-medium'>{item.Quantity} </span></h1>
           </div>
        </div>
        ))}
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
            <h3>Subtotal ({cart.length} items)</h3>
            <h3>Rs. {price}</h3>
          </div>
          <div className="flex justify-between text-sm font-medium mt-2">
            <h3>Shipping Fee</h3>
            <h3>Rs. {shippingCost}</h3>
          </div>
          <hr className="bg-gray-500 w-[90%]" />

          <div className="flex justify-between text-xl font-bold mt-4">
            <h3>Grand total</h3>
            <h3>Rs. {shippingCost+price}</h3>
          </div>

          <button className="w-full py-3 text-white bg-black cursor-pointer mt-6 rounded-lg hover:bg-gray-800 transition">
            Proceed to Checkout ({cart.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
