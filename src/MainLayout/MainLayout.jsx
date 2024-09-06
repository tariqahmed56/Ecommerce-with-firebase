import React from 'react'
import App from '../App'
import Navbar from '../Components/Navbar/Navbar'

const MainLayout = () => {
  return (
    <div className='wrapper'>
        <Navbar/>
        <App/>
    </div>
  )
}

export default MainLayout
