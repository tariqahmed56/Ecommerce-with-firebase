import React, { useContext, useEffect, useState } from 'react';
import Input from '../../Components/Input';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { doc, updateDoc , collection,  setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebaseconfig';
import { productDataContext } from '../../contexts/ProductDataContext';

const PlaceOrder = () => {
    const {user} = useContext(AuthContext);
    const {successMessage , errorMessage} = useContext(productDataContext)
    console.log(user.uid)
    const location = useLocation();
    const navigate = useNavigate();
    const {shippingCost , price } = location.state
    console.log(user.cart)
    const [formData,setFormData] = useState({
        email: "",
        name: "" ,
        address: "",
        mobileNumber: "",
        paymentMethod: "Cash on Delivery"
    });
    useEffect(()=>{
        setFormData(()=>{
            let data = {
                name: user?.name ? user?.name :  "",
                email: user?.email ? user?.email  : "",
                address: "",
                mobileNumber: user?.mobileNumber ? user.mobileNumber :""
            };
            return data;
        });
    },[user?.name , user?.email , user?.mobileNumber]);

    const HandleChange = (e) =>{
        const {name , value} = e.target;
        setFormData((prev)=>{
            let updatedData = {...prev, [name] : value};
            return updatedData;
        })
    }
    async function HandleSubmit(e){
        e.preventDefault();
         let orderData = {
            products:[...user.cart],
            shippingAddress: formData.address,
            shippingCost,
            totalPrice: price,
            paymentMethod: formData.paymentMethod,
            phone: formData.mobileNumber
         }
        await addOrder(orderData,user.uid)         
    };

const addOrder = async (orderData, userId) => {
  try {
    const userOrdersRef = collection(db, 'orders', userId, 'orders');
    const userInfoRef = doc(db,'users', user.uid);

    const newOrderRef = doc(userOrdersRef); 
    setDoc(newOrderRef, {
      products: orderData.products,          
      shippingAddress: orderData.shippingAddress, 
      totalPrice: orderData.totalPrice,      
      shippingCost: orderData.shippingCost, 
      phone: orderData.mobileNumber,   
      paymentMethod: "COD",     
      status: 'pending',                     
      createdAt: serverTimestamp(),          
      updatedAt: serverTimestamp(),   

    }).then(()=>{
         updateDoc(userInfoRef,{cart:[]});
    }).then(()=>{
        successMessage('Order completed successfully.')
        navigate('/profile/orders');

    })

  } catch (error) {
     errorMessage('Something Went Wrong pleasr Try Again.')
}
};


  return (
    <form onSubmit={HandleSubmit} className="flex flex-col-reverse  lg:flex-row justify-evenly gap-8 py-8 lg:pt-14 min-h-[80vh] border-t container mx-auto px-4 text-black">
      <div className="flex flex-1 flex-col  w-full lg:max-w-[400px]">
        <div className="text-xl sm:text-2xl">
          <div className="inline-flex gap-2 items-center mb-4">
            <p className="text-gray-500">
              DELIVERY{" "}
              <span className="text-gray-700 font-medium">INFORMATION</span>
            </p>
            <p className="flex-grow h-[2px] bg-gray-700" />
          </div>
        </div>
        <Input onChange={HandleChange} value={formData.name}  name="name" label="Name" placeholder="e.g., Tariq Ahmed" />
        <Input onChange={HandleChange} value={formData.email}  name="email" label="Email" type="email" placeholder="Email address" />
        <Input onChange={HandleChange} value={formData.address}  name="address" label="Address" placeholder="street , flat no , city , province" />
        <Input onChange={HandleChange} value={formData.mobileNumber}  name="mobileNumber" label="Phone" type="number" placeholder="Phone" />
        <div className="mt-10">
          <div className="inline-flex gap-2 items-center mb-4">
            <p className="text-gray-500">
              PAYMENT <span className="text-gray-700 font-medium">METHOD</span>
            </p>
            <p className="flex-grow h-[2px] bg-gray-700" />
          </div>
          <div className="flex flex-col lg:flex-row gap-4">

            <div className="flex items-center gap-3 border p-3 rounded cursor-pointer">
              <p className="w-4 h-4 border rounded-full bg-green-400" />
              <p className="text-gray-500 text-sm font-medium">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full mt-8">
            <button
              type="submit"
              className="bg-black w-full text-white px-16 py-3 rounded text-sm hover:bg-gray-800"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>

      <div className="w-[300px]">
        <div className="text-xl sm:text-2xl mb-6">
          <div className="inline-flex gap-2 items-center mb-4">
            <p className="text-gray-500">
              CART <span className="text-gray-700 font-medium">TOTALS</span>
            </p>
            <p className="flex-grow h-[2px] bg-gray-700" />
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm border rounded p-4">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p> {price}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p> {shippingCost}</p>
          </div>
          <hr />
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p> {shippingCost + price} PKR</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
