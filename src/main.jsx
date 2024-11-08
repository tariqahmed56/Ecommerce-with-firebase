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
import SingleProduct from './Pages/SingleProductPage/SingleProduct.jsx'
import AdminLayout from './Pages/AdminPanel/AdminLayout.jsx'
import Dashboard from './Pages/AdminPanel/Dashboard.jsx';
import AdminOrders  from './Pages/AdminPanel/AdminOrders.jsx';
import Users from './Pages/AdminPanel/Users.jsx'
import AddProduct from './Pages/AdminPanel/Product/AddProduct.jsx'
import ProductList from './Pages/AdminPanel/Product/ProductList.jsx'
import AddCategory from './Pages/AdminPanel/Categories/AddCategory.jsx'
import CategoryList from './Pages/AdminPanel/Categories/CategoryList.jsx'
import ForLoggedInUser from './Components/Protection/ForLoggedInUser.jsx'
import PrivateRoutes from './Components/Protection/PrivateRoutes.jsx'

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>  
    <Route index element={<Home/>}/> 
    <Route path='store' element={<Allproducts/>}/>
    <Route path='men-fashion' element={<Men/>}/> 
    <Route path='women-fashion' element={<Women/>}/> 
    <Route path='single' element={<SingleProduct/>} />
    <Route path='Login' element={<Login/>}/> 
    <Route path='signup' element={<Signup/>}/>
    <Route element={<ForLoggedInUser/>}>
    <Route path='profile' element={<Profile/>}>
    <Route index element={<Active/>}/>
    <Route path='settings' element={<Settings/>}/>
    <Route path='orders' element={<Orders/>}/>
    </Route>
    </Route>
    <Route path='cart' element={<Cart/>}/>
    <Route path='wishlist' element={<WishList/>}/>
    <Route element={<PrivateRoutes/>}>
    <Route path='admin-panel' element={<AdminLayout/>}>
    <Route index element={<Dashboard/>}/>
    <Route path='orders' element={<AdminOrders/>}/>
    <Route path='users' element={<Users/>}/>
    <Route path='add-product' element={<AddProduct/>}/>
    <Route path='product-list' element={<ProductList/>}/>
    <Route path='add-category' element={<AddCategory/>}/>
    <Route path='category-list' element={<CategoryList/>}/>
    </Route>
    </Route>
    </Route>
  ))

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>
)
