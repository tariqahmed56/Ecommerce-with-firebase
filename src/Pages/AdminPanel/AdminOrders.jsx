import { collection, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebaseconfig";

const AdminOrders = () => {
  const [ords,setOrders] = useState([])
  useEffect(()=>{
  const fetchOrders = async () => {
    try {
      // Reference the main 'orders' collection
      const ordersRef = collection(db, 'users');
      const querySnapshot = await getDocs(ordersRef);

      if (querySnapshot.empty) {
        console.warn("No orders found in the database.");
      }
      console.log(querySnapshot.collection)

      // Map through the documents and format the data
      const allOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Document ID
        ...doc.data(), // Document Data
      }));

      setOrders(allOrders);
      console.log(allOrders)
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
    }
  };

  fetchOrders();
}, []);
  
  return (
    <div className="grid grid-cols-1 text-white sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm ">
      <img className="w-12" width={300} height={300}/>
      <div>
        <div>
          <p className="py-0.5">
            Boy Round Neck Pure Cotton T-shirt x 1 <span> M </span> ,
          </p>
          <p className="py-0.5">
            Women Zip-Front Relaxed Fit Jacket x 1 <span> M </span> ,
          </p>
          <p className="py-0.5">
            Girls Round Neck Cotton Top x 1 <span> L </span> ,
          </p>
          <p className="py-0.5">
            Girls Round Neck Cotton Top x 1 <span> M </span>{" "}
          </p>
        </div>
        <p className="mt-3 mb-2 font-medium">Tariq Tariq</p>
        <div>
          <p>naveed sodho house near royal guest house at old naka mithi,</p>
          <p>ghggh, p, Pakistan, 78976</p>
        </div>
      </div>
      <div>
        <p className="text-sm sm:text-[15px]">Items : 4</p>
        <p className="mt-3">Method : COD</p>
        <p>Payment : Pending</p>
        <p>Date : 11/26/2024</p>
      </div>
      <p className="text-sm sm:text-[15px]">$272</p>
      <select className="p-2 font-semibold text-black">
        <option value="Order Placed">Order Placed</option>
        <option value="Packing">Packing</option>
        <option value="Shipped">Shipped</option>
        <option value="Out for delivery">Out for delivery</option>
        <option value="Delivered">Delivered</option>
      </select>
    </div>
  );
};

export default AdminOrders;
