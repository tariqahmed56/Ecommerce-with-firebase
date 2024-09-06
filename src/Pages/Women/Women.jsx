import React from 'react'
import { useLocation } from 'react-router-dom';
import womenHero from '../../assets/women-fashion.jpg'
import Hero from '../../Components/Hero';
const Women = () => {
  const location = useLocation();
  console.log(location.pathname.split('/')[1])
  return (
    <div>
     <Hero imgUrl={womenHero}/>
    </div>
  )
}

export default Women
