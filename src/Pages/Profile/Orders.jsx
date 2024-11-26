import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { db } from '../../config/firebaseconfig';
import OrdersLoader from '../../Components/PlaceHolderLoaders/OrdersLoader';
import { FaCross, FaX } from 'react-icons/fa6';

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    async function getMyOrders(userId) {
      try {
        const userOrdersRef = collection(db, "orders", userId, "orders");
        const querySnapshot = await getDocs(userOrdersRef);
        const userOrders = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setOrders(userOrders);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      } 
    }

    if (user?.uid) {
      getMyOrders(user.uid);
    } else {
      setLoading(false);
    }
  }, [user?.uid]);

  const closeModal = () => setSelectedOrder(null);

  return (
    <div className="font-outfit">
      <h1 className="uppercase text-[20px] py-4 flex justify-start items-center gap-3 font-medium">
        <span className="text-gray-500">Your</span> Orders
        <hr className="w-[100px] bg-slate-600 rounded-full h-1" />
      </h1>
      <div className="space-y-4">
        {loading ? (
         Array.from({length:4}).map(index=> <OrdersLoader key={index}/>)
        ) : orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:items-start md:start gap-4"
            >
              <div className='relative text-gray-600  w-full flex flex-wrap gap-4'>
                <p className="text-sm ">
                  Order ID: <span className="font-medium text-green-400">{order.id}</span>
                </p>
                <p>
                  Date:
                  <span className=" text-green-400">
                    {new Date(order.createdAt.seconds * 1000).toDateString()}
                  </span>
                </p>
                <p>
                  Payment: <span className="text-green-400">{order.paymentMethod}</span>
                </p>
                <p>
                  Status: <span className="text-green-400 capitalize">{order.status}</span>
                </p>
                <button
                  className="border absolute top-2 right-0 px-4 md:px-10 py-2 text-sm font-medium rounded-sm bg-green-500 hover:bg-transparent text-white hover:text-black"
                  onClick={() => setSelectedOrder(order)}
                >
                  View
                </button>
              </div>
              <div>
                {order.products.map((product, productIndex) => (
                  <div
                    key={product.id+productIndex}
                    className="py-2 flex items-start gap-6 text-sm border-b"
                  >
                    <img
                      className="w-16 sm:w-20"
                      src={product.imageUrls[0]}
                      alt={product.title}
                    />
                    <div>
                      <p className="sm:text-base font-medium">{product.title}</p>
                      <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                        <p>Rs. {product.variant.price}</p>
                        <p>Quantity: {product.Quantity}</p>
                        <p>Size: {product.variant.size}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No Orders Yet</p>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center ">
          <div className="bg-white rounded-md shadow-lg max-w-lg w-full p-6 space-y-4 relative">
            <h2 className="text-lg font-bold text-gray-800">Order Details</h2>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p>
              <strong>Shipping Address:</strong> {selectedOrder.shippingAddress}
            </p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p><strong>Total Price:</strong> Rs. {selectedOrder.totalPrice}</p>
            <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
            <h3 className="font-medium text-gray-700">Products:</h3>
            <ul className="space-y-2">
              {selectedOrder.products.map((product, index) => (
                <li key={index} className="flex items-start gap-4">
                  <img
                    src={product.imageUrls[0]}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-medium">{product.title}</p>
                    <p>Price: Rs. {product.variant.price}</p>
                    <p>Size: {product.variant.size}</p>
                    <p>Quantity: {product.Quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 w-full  text-black font-bold absolute -top-2 -right-[92%] py-2 rounded-md"
              onClick={closeModal}
            >
          <FaX size={30} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
