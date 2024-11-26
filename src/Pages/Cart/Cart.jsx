import React, { useContext, useEffect, useState } from 'react';
import '../../index.css'
import emptyCart from '../../assets/empty-cart.webp';
import dummyProduct from '../../assets/dummyProduct.webp';
import { FaLocationPinLock, FaTrashArrowUp } from 'react-icons/fa6';
import QuantitySelector from '../../Components/QuantitySelector';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseconfig';
import Button from '../../Components/Button';

const Cart = () => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [price,setPrice] = useState(0);
  const [shippingCost,setShippingCost] = useState(0);
  const [SelectedAddress, setSelectedAddress] = useState('')
  const [dropdownOpen,setDropdownOpen] = useState(false)
  useEffect(()=>{
    setCart(()=>{
      let value = user?.cart || [];
      return value
    });
    setSelectedAddress(()=>{
      let ad = user?.addresses?.length > 0 ? user.addresses[0] : '';
      return;
    })
    if(user?.cart){
      let total =  user?.cart.reduce((acc,curr)=>acc+(Number(curr.variant.price)*curr.Quantity),0);
      let shippingCost = user?.cart.reduce((acc,curr)=>acc+Number(curr.deliveryCharges),0);
      setPrice(total);
      setShippingCost(shippingCost);
    }
  },[user]);
  
  const  removeProduct = async(id,size) => {
      let updatedCart = cart.filter(item=>{
        let idMatch = item.id === id ? item.variant.size === size : false;
        return !idMatch;
      });
      console.log(updatedCart)
     const userInfoRef = doc(db,'users', user.uid);
     await updateDoc(userInfoRef,{cart:updatedCart});
  }
  function NavigateToCheckOut(){
    navigate('/check-out' , {state:{price,shippingCost}})
}

if(!cart.length){

    return <div className="container  flex flex-col justify-center items-center pb-3">
      <img src={emptyCart} className='scale-90 max-w-[700px]'/>
      <p className='text-center font-play text-black py-2 text-xl -top-10 relative'>Oops! Your cart looks lonely. Add some items to make it happy!</p>
      <Link to={'/store/all-products'}>
      <Button text="Browse Products"/>
      </Link>
      </div>
  }
 
  return (
    <div className="cart w-full px-4 md:container md:mx-auto text-black min-h-[90dvh] gap-6 flex  md:flex-wrap-reverse flex-wrap flex-row py-6 ">
      
      <div className="Cart-Products w-full col-span-2 md:p-6 mx-auto bg-[#f7f7f7] rounded-lg shadow-lg basis-3/4">
        {cart?.map((item,index)=>(
          <div key={index} className="Product relative flex border mb-2 border-black flex-wrap  gap-4 justify-center items-center md:justify-start md:items-start shadow-md px-6 py-4 bg-white rounded-lg">
          <div className="img relative  flex justify-center items-center border rounded-md overflow-hidden">
            <img src={item.imageUrls[0]} alt="Product" className="w-20 h-20 mix-blend-multiply object-cover" />
          </div>
          <div className="Data flex flex-col gap-y-1 justify-start items-start px-4">
            <div className="title text-lg font-normal text-black text-wrap">
              {item.title}
            </div>
            <div className="title  font-normal text-black text-wrap">
              size: {item.variant.size}
            </div>
            <div className="price flex flex-col gap-3 justify-center items-center">
              <h1 className="text-black">Price: {item.variant.price} PKR</h1>
              <button className="text-[#272727] text-xl absolute bottom-4 right-4 hover:text-red-400">
                <FaTrashArrowUp size={25} onClick={()=>removeProduct(item.id,item.variant.size)}/>
              </button>
            </div>
          <h1 className=''>Quantity: <span className='font-medium'>{item.Quantity} </span></h1>
           </div>
        </div>
        ))}
      </div>
      <div className="Cart-Summary flex-1 shadow-lg bg-white p-6 rounded-lg w-[90vw] md:w-auto ">
       
       <div className="location flex flex-col gap-4 relative">
   <h3 className="text-sm font-medium text-gray-600 relative">Location</h3>
   <div className="text text-sm flex gap-3 items-center">
     <FaLocationPinLock color="#6b7280" />
     <p className="text-sm text-black">{SelectedAddress}</p>
     <div className="">
     {user?.addresses?.length > 0 &&
       <button 
         className="text-xs text-blue-400 hover:underline" 
         onClick={() => setDropdownOpen(!dropdownOpen)}
       >
           Change Address
       </button>
         }
       {dropdownOpen && (
         <ul className="absolute top-0 mt-2 left-0 bg-white shadow-md w-[300px] rounded-lg border border-gray-300 z-10">
           {user?.addresses.map((address, index) => (
             <li
               key={index}
               onClick={() => {
                 setSelectedAddress(address);
                 setDropdownOpen(false);
               }}
               className={`text-xs py-2 px-3 cursor-pointer hover:bg-gray-100 ${
                 SelectedAddress === address ? "bg-gray-200 font-semibold" : ""
               }`}
             >
               {address}
             </li>
           ))}
         </ul>
       )}
     </div>
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
     <h3>Rs. {shippingCost + price}</h3>
   </div>
   <button 
   onClick={NavigateToCheckOut}
   className="w-full py-3 text-white bg-black cursor-pointer mt-6 rounded-lg hover:bg-gray-800 transition">
     Proceed to Checkout ({cart.length})
   </button>
 </div>
 
       </div>
    </div>
  );
};

export default Cart;
