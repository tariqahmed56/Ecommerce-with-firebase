import React from 'react'
import AdminNav from '../../Components/AdminNav'
import { Outlet } from 'react-router-dom'
const AdminLayout = () => {
  return (
    <div className='min-h-[100dvh] text-black flex relative'>
     <AdminNav/>
     <div className="bg-[#0F172A] w-full">
      <Outlet/>
     </div>
    </div>
  )
}

export default AdminLayout
