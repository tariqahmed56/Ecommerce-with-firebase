import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FaEdit, FaSave } from "react-icons/fa";
import { db } from "../../config/firebaseconfig";
import { doc, updateDoc } from "firebase/firestore";

const Active = () => {
  const { user } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: user.mobileNumber || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || user?.email.split("@")[0] || "",
        email: user?.email || "",
        mobileNumber: user.mobileNumber || "",
      });
    }
  }, [user]);

  const handleEditIconClick = () => setEdit(true);

  const handleSaveIconClick = async () => {
    try {
      setIsUpdating(true);
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        mobileNumber: formData.mobileNumber,
        name: formData.name,
      });
      setIsUpdating(false);
      setEdit(false);
    } catch (error) {
      setIsUpdating(false);
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contacts relative flex flex-wrap container justify-between gap-[50px] py-3 px-4 bg-white rounded-lg  mx-auto">
      {/* Loader */}
      {isUpdating && (
        <div className="absolute z-20 w-full h-full inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-xl font-bold">
          Updating Data...
        </div>
      )}

      <div className="relative flex flex-col gap-4  md:basis-1/3 w-full">
        {edit ? (
          <FaSave
            size={25}
            onClick={handleSaveIconClick}
            className="absolute right-3 text-gray-500 hover:text-green-500 cursor-pointer"
          />
        ) : (
          <FaEdit
            size={25}
            onClick={handleEditIconClick}
            className="absolute right-3  text-gray-500 hover:text-blue-500 cursor-pointer"
          />
        )}
        <h1 className="text-xl font-semibold text-left text-gray-800 border-b pb-2 uppercase">
         <span className="text-gray-500">Personal</span> Information
        </h1>
        <div className="flex justify-between items-center">
          <h2 className="text-gray-700">Name</h2>
          {edit ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-2 py-1 w-1/2"
            />
          ) : (
            <p className="text-gray-800">{formData.name}</p>
          )}
        </div>
        <div className="border-t"></div>
        <div className="flex justify-between items-center">
          <h2 className="text-gray-700">Email</h2>
          <p className="text-gray-800">{formData.email}</p>
        </div>
        <div className="border-t"></div>
        <div className="flex justify-between items-center">
          <h2 className="text-gray-700">Mobile Number</h2>
          {edit ? (
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-2 py-1 w-1/2"
            />
          ) : (
            <p className="text-gray-800">{formData.mobileNumber || "N/A"}</p>
          )}
        </div>
      </div>

      {user?.addresses && (
        <div className="relative flex flex-col gap-4  md:basis-1/3 w-full">
          <h1 className="text-xl font-semibold text-left text-gray-800 border-b pb-2 uppercase">
          <span className="text-gray-500">Delivery</span> Addresses
          </h1>
          <ul className="space-y-4">
            {user.addresses.map((address, index) => (
              <li
                key={index}
                className="p-4 border border-gray-300 rounded bg-gray-50 shadow-sm"
              >
                <p className="text-gray-800">{address}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Active;
