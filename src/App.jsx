import React ,{ useEffect, useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
const {ObserveAuthState} = useAuth();
useEffect(()=>{
  ObserveAuthState();
},[])
  return (
    <div className='wrapper'>
      <Outlet/>
      <ToastContainer/>

    </div>
  )
}

export default App
