import React from 'react'
import App from '../App'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Navbar/Footer'
import { AuthContextProvider } from '../contexts/AuthContext'

const MainLayout = () => {
  return (
    <AuthContextProvider>
         <div className='wrapper'>
        <Navbar/>
        <App/>
        <Footer/>
    </div>
    </AuthContextProvider>
  
  )
}

export default MainLayout
