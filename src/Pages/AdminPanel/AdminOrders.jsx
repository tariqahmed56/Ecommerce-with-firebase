import { collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebaseconfig";
import { GrDeliver } from "react-icons/gr";
const AdminOrders = () => {
  const [allOrders,setAllOrders] = useState([]);
  useEffect(()=>{
  const fetchOrders = async () => {
    try {
      const ordersRef = collection(db, 'users');
      const querySnapshot = await getDocs(ordersRef);

      if (querySnapshot.empty) {
        console.warn("No orders found in the database.");
      }
      console.log(querySnapshot.collection)

      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data(),
      }));
       let orders = usersData.filter((item)=> item.orders).reduce((acc,curr)=>[...acc,...curr.orders],[]);
      //  console.log(orders);
         setAllOrders(orders);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  fetchOrders();
}, []);
// responsible For order status Change
const handleChange = async (event , userId , orderId) =>{
  const newStatusVal = event.target.value;
  const userDocRef = doc(db,"users",userId);
  const userDoc = await getDoc(userDocRef);
  const userData = userDoc.data();
  const updatedUserOrders = userData.orders.map((or)=> or.orderId === orderId ? {...or, status:newStatusVal} : or)
  await updateDoc(userDocRef,{orders:updatedUserOrders});
}
  
  return (
  <div className="grid gap-2">
    {allOrders.map((order,index)=>(
        <div key={index} className="grid grid-cols-1 text-white sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm ">
         <GrDeliver size={30} color="white"/>
        <div>
          <div>
          {order.products.map((product , index)=>(
             <p className="py-0.5" key={index}>
             {product.title} x {product.Quantity} <span> {product.variant.size} </span> ,
           </p>
          ))}
          </div>
          <p className="mt-3 mb-2 font-medium">{order.userName}</p>
          <div>
            <p>{order.shippingAddress}</p>
          </div>
        </div>
        <div>
          <p className="text-sm sm:text-[15px]">Items : {order.products.length}</p>
          <p className="mt-3">Method : COD</p>
          <p>Status : {order.status}</p>
          <p>Date : {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <p className="text-sm sm:text-sm">{order.totalPrice} Pkr</p>
        <select className="p-2 font-semibold text-black"  onChange={(event)=>handleChange(event,order.userId,order.orderId)}>
          <option value="Order Placed">Order Placed</option>
          <option value="Packing">Packing</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
    ))}
  </div>
  );
};

export default AdminOrders;
