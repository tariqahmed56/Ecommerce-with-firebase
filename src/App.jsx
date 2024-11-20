import React ,{ useContext, useEffect, useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './config/firebaseconfig';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Navbar/Footer';
import { productDataContext } from './contexts/ProductDataContext';
import { collection, onSnapshot } from 'firebase/firestore';
function App() {
  const { setUser , user,fetchUserById , setProfile} = useAuth();
  const [userId,setUserId]=useState(null)
  const { contextCategories, productData, setProductData, productLoading, setProductLoading } = useContext(productDataContext);
   useEffect(()=>{
   const cleanUp =  onAuthStateChanged(auth,(isLoggedInUser)=>{
      if(isLoggedInUser){           
        fetchUserById(isLoggedInUser.uid);  
      }else{
          setUser(null)
      }
  
  })
  return ()=>cleanUp();
   },[]);
   useEffect(()=>{
    try {
      const productCollectionRef = collection(db, 'products');
    setProductLoading(true);
    const unsubscribe = onSnapshot(productCollectionRef, (querySnapshot) => {
      const products = querySnapshot.docs.map((doc) => doc.data());
      setProductData(products);
      setProductLoading(false);
    }); 
    } catch (error) {
      alert('An error Occur while fetching Data');
    }
    

   },[])
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
