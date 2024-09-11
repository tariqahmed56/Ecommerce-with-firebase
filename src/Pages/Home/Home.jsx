import React, { useState , useEffect , memo, useCallback} from 'react'
import Hero from '../../Components/Hero.jsx'
import { Link } from 'react-router-dom'
import Title from '../../Components/Navbar/Title.jsx'
import menFashion from '../../assets/category/men-fashion.jpg'
import womenFashion from '../../assets/category/women-fashion.jpg'
import homeinterior from '../../assets/category/home-fashion.jpg'
import Card from '../../Components/Card.jsx'
import menCardImg from '../../assets/card.jpg'
import womenCardImg from '../../assets/card1.jpg'
const Home = () => {
  let [visibility,setVisibilty] = useState(true);
  let scrollThreshold = 300;
  const scrollToTop = () => {
    window.scrollTo({
      top:0,
      behavior: "smooth"
    })
  };
  let toggleVisibility = useCallback(()=>{
    console.log('srcoll.')
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > scrollThreshold) {
        setVisibilty(true);
      } else {
        setVisibilty(false);
      }
    
  },[visibility])
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  let categories = [
    {
    id:1,
    name:"Men's Fashion",
    img: menFashion,
    path: '/men-fashion'
  },
  {
    id:2,
    name: "Women's Fashion",
    img:womenFashion,
    path: '/women-fashion'
  },
  {
    id:3,
    name: "All Products",
    img:homeinterior,
    path:'store'
  }
] 
  return (
    <div className='home flex flex-col relative'>
    <Hero/>
     <div className="Categories relative flex flex-col md:flex-row justify-center">    
      {categories.map((cat)=>(
        <Link to={cat.path} className='md:basis-1/3 basis-[100%] '>
        <div className="h-[200px] md:h-[400px] bg-cover bg-top relative" style={{backgroundImage:`url(${cat.img})`}} key={cat.id}> 
        <p className='absolute top-9 left-5 decoration-white p-2 font-bold text-lg tracking-widest cursor-pointer'>0{cat.id}</p>
        <p className="text text-[2.5rem] absolute bottom-3 font-bold left-0 px-5 leading-[45px] flex md:flex-col gap-4 flex-wrap">
          <span className="block">{cat.name.split(' ')[0]}</span> 
          <span className='block'>{cat.name.split(' ')[1]}</span>
        </p>
        </div>
        </Link>
      ))}
     </div>
     <div className="men py-10 grid gap-4">
      <Title genre="Men's"  intro="Find the perfect t-shirt, your new go-to sneakers and more right here."/>
      <div className="cards grid justify-items-center items-center lg:grid-cols-4 gap-4 md:grid-col-3  sm:grid-cols-2 mt-3 justify-center mx-[20px]">
       {Array.from({length: 4}, (_,index)=> <Card genre="Men's Fashion" img={menCardImg} key={index + '@#$%FSC'}/>)}
      </div>
     </div>
     <div className="men py-10 grid gap-4 bg-black">
      <Title genre="Women's" textColor="text-white" intro="All the latest fashion trends and must-have products."/>
      <div className="cards grid justify-items-center items-center lg:grid-cols-4 gap-4 md:grid-col-3 sm:grid-cols-2 mt-3 justify-center mx-[20px]">
       {Array.from({length: 4}, (_,index)=> <Card genre="Men's Fashion" key={index + '0349504&87(&(*&$&&%^'} img={womenCardImg} />)}
      </div>
     </div>
     <div className="men py-10 grid gap-4 bg-white">
      <Title genre="Trending" textColor="text-black" intro="All the latest fashion trends and must-have products."/>
      <div className="cards grid justify-items-center items-center lg:grid-cols-4 gap-4 md:grid-col-3 sm:grid-cols-2 mt-3 justify-center mx-[20px]">
       {Array.from({length: 4}, (_,index)=> <Card genre="Fashion Trends" key={index + "bgjsbveiwb"} img={womenCardImg} />)}
      </div>
     </div>
       <button 
      className={`text-xl fixed bottom-[50px] right-[30px] transition-all duration-300 ${visibility ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} font-bold bg-white text-black w-14 h-14 rounded-full`} 
      onClick={scrollToTop}>↑</button>
    </div>
  )
}

export default memo(Home)
