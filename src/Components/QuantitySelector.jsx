import React, { useState } from 'react'

const QuantitySelector = ({maxValue , isSizeSelected , setError , value , setValue}) => {

  function Increament(){
    //Error Case
    if(!isSizeSelected){
      setError("Please Select a Size");
      return;
    }else{
      setError("");
      if(maxValue > value){
        setValue(prev=>++prev);
      }
    }
  }
  function Decreament(){
    if(value === 1) return;
    setValue(prev=>prev-1)
  }
  return (
    <div className="flex items-center border rounded-lg mt-2 w-[120px]">
    <button onClick={Decreament}
    className="w-1/3 py-2 text-center text-lg border-r hover:bg-gray-200 disabled:cursor-not-allowed disabled:pointer-events-none" >-</button>
    <span className="w-1/3 py-2 text-center">{value}</span>
    <button onClick={Increament}
     className="w-1/3 py-2 text-center text-lg border-l hover:bg-gray-200 disabled:cursor-not-allowed disabled:pointer-events-none">+</button>
  </div>
  )
}

export default QuantitySelector
