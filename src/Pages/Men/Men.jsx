import React from 'react'
import { useLocation } from 'react-router-dom'
import menHero from '../../assets/men-fashion.jpg'
import Hero from '../../Components/Hero'
const Men = () => {
  const location = useLocation();
  console.log(location.pathname.split('/')[1])
  return (
    <div>
      <Hero imgUrl={menHero}/>
    </div>
  )
}

export default Men
