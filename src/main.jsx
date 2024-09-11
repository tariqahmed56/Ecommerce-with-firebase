import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react'
import './index.css'
import Women from './Pages/Women/Women.jsx'
import Men from './Pages/Men/Men.jsx'
import {
  createBrowserRouter ,
   createRoutesFromElements,
   RouterProvider ,
   Route
  } from 'react-router-dom';
import MainLayout from './MainLayout/MainLayout.jsx';
import Home from './Pages/Home/Home.jsx';
import Allproducts from './Pages/HomeLiving/Allproducts.jsx'
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>  
    <Route index element={<Home/>}/> 
    <Route path='store' element={<Allproducts/>}/>
    <Route path='men-fashion' element={<Men/>}/> 
    <Route path='women-fashion' element={<Women/>}/> 
    </Route>
  ))

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
