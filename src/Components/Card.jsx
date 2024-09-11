import React from 'react'
const Card = ({img,genre}) => {
  return (
    <div className='cursor-pointer h-[300px] w-[270px]  bg-cover relative flex justify-start items-end' style={{backgroundImage: `url(${img})`}}>
      <h1 className='text-[2.3rem] font-bold px-[10%] italic' style={{fontFamily: "Playfair Display"}}>{genre}</h1>
    </div>
  )
}

export default Card
