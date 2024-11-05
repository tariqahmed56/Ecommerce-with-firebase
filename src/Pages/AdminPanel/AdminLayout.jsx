import React from 'react'
import AdminNav from '../../Components/AdminNav'
import { Outlet } from 'react-router-dom'
const AdminLayout = () => {
  return (
    <div className='min-h-[100dvh] text-black flex '>
     <AdminNav/>
      <Outlet/>
    </div>
  )
}

export default AdminLayout
