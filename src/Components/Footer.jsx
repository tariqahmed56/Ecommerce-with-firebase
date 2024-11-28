import React from 'react'
import logo from '../assets/logo.jpeg'
const Footer = () => {
  return (
    <div className='flex flex-col bg-black gap-4 py-6 justify-center items-center'>
   <h2 className='md:text-[1.9rem] text-[1.5rem] text-center font-bold'>Fashion guides, tips, and <span className='italic' style={{fontFamily: "Playfair Display"}}>the most wanted trends</span></h2>
    <div className="links grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 mt-6">
        {Array.from({length: 8},(_,index)=>(
            <a href="" className='cursor-pointer text-white underline text-sm hover:text-[green] ' key={index}>
                A guide to check work wear
            </a>
        ))}
    </div>
    <div className="logo flex justify-center items-center mt-10 w-full">
        <img src={logo} alt="" className='max-w-[300px] w-[90%]'/>
    </div>
    <div className="about mt-[20px] flex  w-full justify-center items-center flex-col gap-6">
        <h5 className='text-[#d1d249] font-bold'>About StyleSavvy</h5>
        <div className="links-about flex flex-wrap w-full gap-y-5 gap-[5%] justify-center px-[60px]">
        {Array.from({length: 8},(_,index)=>(
            <a href="" 
            className=' justify-between text-sm md:w-[100px] cursor-pointer text-white underline  hover:text-[green] ' key={index}>
                <span className='font-semibold'>Link</span> {index < 8 && <span>|</span>}
            </a>
            
        ))}
        </div>
    </div>
    </div>
  )
}

export default Footer
