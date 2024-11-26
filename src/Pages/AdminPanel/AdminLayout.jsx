import React, { useState } from 'react'
import AdminNav from '../../Components/AdminNav'
import { Outlet } from 'react-router-dom'
const AdminLayout = () => {
  const [isSidebarExpanded,setSidebarExpanded] = useState(false);
  const handleClick = () =>{
    setSidebarExpanded(false);
  }
  return (
    <div className='min-h-screen text-black flex relative'>
     <AdminNav isSidebarExpanded={isSidebarExpanded} setSidebarExpanded={setSidebarExpanded}/>
     <div className="bg-[#0F172A] w-full" onClick={handleClick}>
      <Outlet />
     </div>
    </div>
  )
}

export default AdminLayout
