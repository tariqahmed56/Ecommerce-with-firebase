import React ,{ useEffect, useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

function App() {
const {ObserveAuthState} = useAuth();
useEffect(()=>{
  ObserveAuthState();
},[])
  return (
    <div className='wrapper'>
      <Outlet/>
    </div>
  )
}

export default App
