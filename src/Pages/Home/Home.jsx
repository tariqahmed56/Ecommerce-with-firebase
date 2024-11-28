import React, { useState , useEffect , memo, useCallback  , useContext} from 'react'
import {productDataContext} from '../../contexts/ProductDataContext' 
import Hero from '../../Components/Hero.jsx'
import { Link } from 'react-router-dom'
import Title from '../../Components/Title.jsx'
import menFashion from '../../assets/category/men-fashion.jpg'
import Card from '../../Components/Card.jsx'
import womenFashion from '../../assets/category/women-fashion.jpg'
import homeinterior from '../../assets/category/home-fashion.jpg'
const Home = () => {
  let [visibility,setVisibilty] = useState(true);
  const {productData} = useContext(productDataContext)
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
    path: 'store/men-fashion'
  },
  {
    id:2,
    name: "Women's Fashion",
    img:womenFashion,
    path: 'store/women-fashion'
  },
  
] 
  return (
    <div className='home flex flex-col relative'>
    <Hero/>
     <div className="Categories relative flex flex-col md:flex-row justify-center">    
      {categories.map((cat)=>(
        <Link to={cat.path} className='md:basis-1/2 basis-[100%] ' key={cat.id}>
        <div className="h-[200px] md:min-h-[400px] md:max-h-[600px] md:h-[500px] bg-cover bg-top relative" style={{backgroundImage:`url(${cat.img})`}} key={cat.id}> 
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
       {productData?.filter(item=>item.gender === "Male")?.slice(0,4)?.map(item=> <Link to={`store/men-fashion/${item.id}`} key={item.id}>
        <Card genre="Men's Fashion" img={item.imageUrls[0]}/>
       </Link>)}
      </div>
     </div>
     <div className="men py-10 grid gap-4 bg-black">
      <Title genre="Women's" textColor="text-white" intro="All the latest fashion trends and must-have products."/>
      <div className="cards grid justify-items-center items-center lg:grid-cols-4 gap-4 md:grid-col-3 sm:grid-cols-2 mt-3 justify-center mx-[20px]">
       {productData?.filter(item=>item.gender === "Female")?.slice(0,4)?.map(item=><Link to={`store/women-fashion/${item.id}`} key={item.id}><Card genre="Men's Fashion"  img={item.imageUrls[0]} /></Link>)}
      </div>
     </div>
     <div className="men py-10 grid gap-4 bg-white">
      <Title genre="Trending" textColor="text-black" intro="All the latest fashion trends and must-have products."/>
      <div className="cards grid justify-items-center items-center lg:grid-cols-4 gap-4 md:grid-col-3 sm:grid-cols-2 mt-3 justify-center mx-[20px]">
       {productData?.slice(5,9)?.map(item=>{
        let path = item.gender === "Male" ? `store/men-fashion/${item.id}` :`store/women-fashion/${item.id}`;
        return <Link to={path} key={item.id}><Card genre="Fashion Trends"  img={item.imageUrls[1]} /></Link>
       })}
      </div>
     </div>
       <button 
      className={`text-xl fixed bottom-[50px] right-[30px] transition-all duration-300 ${visibility ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} font-bold bg-white text-black w-14 h-14 rounded-full`} 
      onClick={scrollToTop}>↑</button>
    </div>
  )
}

export default memo(Home)
