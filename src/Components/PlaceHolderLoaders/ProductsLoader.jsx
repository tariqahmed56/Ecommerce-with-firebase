import React from "react"
export default function ProductsLoader  () {
  return  <div className="flex flex-wrap justify-center items-center gap-4 w-full">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="w-40 h-40 bg-gray-200 animate-pulse"></div>
      ))}
    </div>
}