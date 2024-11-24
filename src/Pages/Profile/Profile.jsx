import React, { useContext } from 'react';
import profile from '../../assets/defaultProfile.jpg';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Profile = () => {
  const {user } = useContext(AuthContext);
 
  return (
    <div className="container  mx-auto flex flex-col justify-center items-center text-sm text-gray-800  py-5 px-4">     
      <div className="container flex flex-col md:flex-row min-w-[300px] max-w-[90vw] min-h-[60vh] mt-6 rounded-lg  overflow-hidden">
        <div className="px-1 md:p-6 flex-1">
          <Outlet/>
        </div>
      </div>

     
    </div>
  );
};

export default Profile;
