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
  } 
  from 'react-router-dom';
import MainLayout from './MainLayout/MainLayout.jsx';
import Home from './Pages/Home/Home.jsx';
import Allproducts from './Pages/HomeLiving/Allproducts.jsx';
import Login from './Pages/Auth/Login.jsx';
import Signup
 from './Pages/Auth/Signup.jsx';
 import Profile from './Pages/Profile/Profile.jsx'
import Cart from './Pages/Cart/Cart.jsx'
import WishList from './Pages/WishList/WishList.jsx'
import Active from './Pages/Profile/Active.jsx'
import Settings from './Pages/Profile/Settings.jsx'
import Orders from './Pages/Profile/Orders.jsx'
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>  
    <Route index element={<Home/>}/> 
    <Route path='store' element={<Allproducts/>}/>
    <Route path='men-fashion' element={<Men/>}/> 
    <Route path='women-fashion' element={<Women/>}/> 
    <Route path='Login' element={<Login/>}/> 
    <Route path='signup' element={<Signup/>}/>
    <Route path='profile' element={<Profile/>}>
    <Route index element={<Active/>}/>
    <Route path='settings' element={<Settings/>}/>
    <Route path='orders' element={<Orders/>}/>
    </Route>
    <Route path='cart' element={<Cart/>}/>
    <Route path='wishlist' element={<WishList/>}/>
    </Route>
  ))

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
