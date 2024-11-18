import React from 'react'

const QuantitySelector = () => {
  return (
    <div className="flex items-center border rounded-lg mt-2 w-[120px]">
    <button className="w-1/3 py-2 text-center text-lg border-r hover:bg-gray-200">-</button>
    <span className="w-1/3 py-2 text-center">1</span>
    <button className="w-1/3 py-2 text-center text-lg border-l hover:bg-gray-200">+</button>
  </div>
  )
}

export default QuantitySelector
