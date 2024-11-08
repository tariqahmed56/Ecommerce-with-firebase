import React ,{ useEffect, useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebaseconfig';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Navbar/Footer';
function App() {
  const { setUser , user,fetchUserById , setProfile} = useAuth();
  const [userId,setUserId]=useState(null)
   useEffect(()=>{
   const cleanUp =  onAuthStateChanged(auth,(isLoggedInUser)=>{
      if(isLoggedInUser){           
        // setUser(isLoggedInUser.uid);
        fetchUserById(isLoggedInUser.uid)    
      }else{
          setUser(null)
      }
  
  })
  return ()=>cleanUp();
   },[]);
   useEffect(()=>{
    if(user){
    }
   },[userId,user?.uid])
  return (
    <main className='wrapper'>
      <Navbar/>
      <Outlet/>
      <ToastContainer/>
      <Footer/>
    </main>
  )
}

export default App
