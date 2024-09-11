import React from 'react'
import App from '../App'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Navbar/Footer'

const MainLayout = () => {
  return (
    <div className='wrapper'>
        <Navbar/>
        <App/>
        <Footer/>
    </div>
  )
}

export default MainLayout
