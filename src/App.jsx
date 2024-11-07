import React ,{ useEffect, useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebaseconfig';
function App() {
const {ObserveAuthState , setUser , user,fetchUserById} = useAuth();
let uid = "";
 useEffect(()=>{
  onAuthStateChanged(auth,available=>{
    if(available){           
        uid=available.uid;
    }else{
        setUser(null)
    }
})
 },[]);
 useEffect(()=>{
  if(user){
    fetchUserById(user.uid) ;    
  }
 },[user?.uid])
  return (
    <div className='wrapper'>
      <Outlet/>
      <ToastContainer/>

    </div>
  )
}

export default App
