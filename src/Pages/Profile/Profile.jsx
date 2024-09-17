import React, { useEffect } from 'react'
import profile from '../../assets/defaultProfile.jpg'
import { Link, useSearchParams } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
const Profile = () => {
  let [searchParams,setSearchParams] = useSearchParams();

  return (
    <div className='container mx-auto Profile flex flex-col justify-center items-center text-sm text-black h-[90dvh]'>
      <img src={profile} alt="Profile photo" className='h-[150px] aspect-square rounded-full' />
      <div className="container flex min-w-[300px] max-w-[70vw] min-h-[50dvh] rounded px-5 py-3 gap-4 ">
        <div className="UserProfileSideBar py-2 w-[100px] overflow-x-hidden md:basis-1/4 rounded-md shadow-md flex flex-col gap-5 border-2 border-yellow-300">
         <Link to={'.'} className='px-3 font-medium cursor-pointer' onClick={()=>setSearchParams('?activepage=personal-information')}>Personal information</Link>
         <Link to={'settings'} className='px-3 font-medium cursor-pointer'onClick={()=>setSearchParams('?activepage=account-settings')} >Account Settings</Link>
         <Link to={'orders'} className='px-3 font-medium cursor-pointer' onClick={()=>setSearchParams('?activepage=orders')}>Orders</Link>
        </div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Profile
