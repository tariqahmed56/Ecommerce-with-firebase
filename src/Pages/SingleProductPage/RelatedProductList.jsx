import React from 'react'
import { Link } from 'react-router-dom'

const RelatedProductList = ({relatedProducts , gender}) => {
  return (
    <div className="container  lg:px-10  py-4 mx-auto  text-black  relative  px-2 flex  justify-center flex-col items-center">
      <h3 className="text-2xl  font-normal mb-2 font-outfit max-w-[280px] md:max-w-full"><span className="text-gray-600">Related</span> Products</h3>
      <div className="flex md:justify-start  w-full justify-center gap-3 flex-wrap">
      {relatedProducts.map(p=>(
        <Link to={`/store/${gender}/${p.id}`} className="shadow-md rounded-lg">
         <img src={p.imageUrls[0]} alt={p.title} className="w-[200px] h-[200px] object-cover rounded" />
        </Link>
      ))}
        </div>
    </div>
  )
}

export default RelatedProductList
