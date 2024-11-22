import React, { useContext } from 'react';
import profile from '../../assets/defaultProfile.jpg';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {FaSignOutAlt} from 'react-icons/fa'
import { AuthContext } from '../../contexts/AuthContext';

const Profile = () => {
  const { LogOut , user } = useContext(AuthContext);
  const navigate = useNavigate();
  const HandleSingOut = () =>{
    LogOut();
      navigate('/')
  }
  return (
    <div className="container  mx-auto flex flex-col justify-center items-center text-sm text-gray-800 min-h-[90vh] py-10 px-4">
      <div className="flex flex-col items-center">
        <img src={profile} alt="Profile photo" className="h-[150px] w-[150px] rounded-full border-4 border-gray-300 shadow-md" />
        <h1 className="mt-4 text-xl font-semibold">{user ? user.email : "Welcome"}</h1>
        <button
        className="mt-6 px-5 py-2 whitespace-nowrap text-nowrap overflow-hidden flex items-center justify-center gap-1 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition-all duration-200 ease-in-out"
        onClick={HandleSingOut}
      > 
        <FaSignOutAlt/> Log Out
      </button>
      </div>
          
      <div className="container flex flex-col md:flex-row min-w-[300px] max-w-[90vw] min-h-[60vh] mt-6 rounded-lg shadow-lg overflow-hidden">
        <div className="UserProfileSideBar md:w-1/4 bg-gray-100 p-4 flex flex-col gap-4 text-gray-700 border-r-2 border-gray-200 shadow-inner">
          <Link to="." className="px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 hover:text-black rounded-lg">
            Contacts
          </Link>
          <Link to="settings" className="px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 hover:text-black rounded-lg">
            Account Settings
          </Link>
          <Link to="orders" className="px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 hover:text-black rounded-lg">
            Orders
          </Link>
        </div>

        <div className="px-1 md:p-6 flex-1">
          <Outlet />
        </div>
      </div>

     
    </div>
  );
};

export default Profile;
