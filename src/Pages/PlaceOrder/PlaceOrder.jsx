import React, { useContext, useEffect, useState } from "react";
import Input from "../../Components/Input";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebaseconfig";
import { productDataContext } from "../../contexts/ProductDataContext";
import Button from "../../Components/Button";
import { v4 as uuidv4 } from "uuid";

const PlaceOrder = () => {
  const { user } = useContext(AuthContext);
  const { successMessage, errorMessage } = useContext(productDataContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [addresses,setAddresses] = useState(user?.addresses || []);
  const [showSuggestion,setShowSuggestion] = useState(false);
  const { shippingCost, price } = location.state;

  const initializeFormData = (user) => ({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    mobileNumber: user?.mobileNumber || "",
    paymentMethod: "COD", // Cash On Delivery
  });

  const [formData, setFormData] = useState(() => initializeFormData(user));

  useEffect(() => {
    setFormData(initializeFormData(user));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const validateForm = () => {
    const { name, email, address, mobileNumber } = formData;
    if (!name || !email || !address || !mobileNumber) {
      errorMessage("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const orderId = uuidv4();
    const orderData = {
      userName: formData.name,
      products: [...user.cart],
      shippingAddress: formData.address,
      totalPrice: price,
      paymentMethod: formData.paymentMethod,
      phone: formData.mobileNumber,
      userId : user.uid,
      orderId : orderId
    };

    try {
      await addOrder(orderData, user.uid);
      successMessage("Order placed successfully!" , 1500);
      navigate("/profile/orders");
    } catch (error) {
      console.error(error);
      errorMessage("Failed to place the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addOrder = async (orderData, userId) => {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.exists() ? userDoc.data() : {};

    const newOrderData = {
      ...orderData,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedOrders = userData.orders ? [...userData.orders, newOrderData] : [newOrderData];

    await updateDoc(userRef, { cart: [], orders: updatedOrders });
  };
  const closeSuggestion = (val) =>{
    setFormData((prev)=>({...prev,address:val}));
    setShowSuggestion(false);
  }
  const openSuggestion = () => setShowSuggestion(true);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col-reverse lg:flex-row justify-evenly gap-8 py-8 lg:pt-14 min-h-[80vh] border-t container mx-auto px-4 text-black"
    >
      <div className="flex flex-1 flex-col w-full lg:max-w-[400px]">
        <div className="text-xl sm:text-2xl">
          <div className="inline-flex gap-2 items-center mb-4">
            <p className="text-gray-500">
              DELIVERY <span className="text-gray-700 font-medium">INFORMATION</span>
            </p>
            <p className="flex-grow h-[2px] bg-gray-700" />
          </div>
        </div>
        <Input
          onChange={handleChange}
          value={formData.name}
          name="name"
          label="Name"
          placeholder="e.g., Tariq Ahmed"
        />
        <Input
          onChange={handleChange}
          value={formData.email}
          name="email"
          label="Email"
          type="email"
          placeholder="Email address"
        />
      <span onClick={openSuggestion}>
      <Input
          onChange={handleChange}
          value={formData.address}
          name="address"
          label="Address"
          placeholder="Street, flat no, city, province"
        />
      </span>
       {
       showSuggestion && <ul className="savedAddresses bg-sky-100">
        {addresses.map((ad)=><li className="border border-gray-400 text-black px-2" onClick={()=>closeSuggestion(ad)}>{ad}</li>)}
        </ul>
        }
       
        <Input
          onChange={handleChange}
          value={formData.mobileNumber}
          name="mobileNumber"
          label="Phone"
          type="number"
          placeholder="Phone"
        />
        <div className="mt-10">
          <div className="inline-flex gap-2 items-center mb-4">
            <p className="text-gray-500">
              PAYMENT <span className="text-gray-700 font-medium">METHOD</span>
            </p>
            <p className="flex-grow h-[2px] bg-gray-700" />
          </div>
          <div className="flex items-center gap-3 border p-3 rounded cursor-pointer">
            <p className="w-4 h-4 border rounded-full bg-green-400" />
            <p className="text-gray-500 text-sm font-medium">CASH ON DELIVERY</p>
          </div>
          <div className="w-full mt-8 flex justify-center">
            <Button text={"PLACE ORDER"} isSubmitting={loading} />
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
            <p>{price}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>{shippingCost}</p>
          </div>
          <hr />
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>{shippingCost + price} PKR</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
