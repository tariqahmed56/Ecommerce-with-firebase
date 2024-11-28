import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../config/firebaseconfig'

const CategoryList = () => {
  const [categories,setCategories] = useState([]);
  const getCategories = async() =>{
      const catRef = collection(db,"categories");
      const catSnap = await getDocs(catRef);
      const cats = catSnap.docs.map((doc)=>doc.data());
      setCategories(cats);
  }
  useEffect(()=>{
    getCategories();
  },[])
  return (
<div className="flex justify-center text-white bg-gray-900 py-8">
  <table className="border-collapse border border-gray-700 w-full max-w-4xl text-center">
    <thead className="bg-gray-800 text-gray-200">
      <tr>
        <th className="border border-gray-700 px-4 py-2">SNo.</th>
        <th className="border border-gray-700 px-4 py-2">Category</th>
        <th className="border border-gray-700 px-4 py-2">Gender</th>
      </tr>
    </thead>
    <tbody className="bg-gray-700">
      {categories.map((cat, index) => (
        <tr
          key={index}
          className={`${
            cat.gender === "Male" ? "bg-gray-600" : "bg-gray-700"
          } hover:bg-gray-500`}
        >
          <td className="border border-gray-800 px-4 py-2">{index + 1}</td>
          <td className="border border-gray-800 px-4 py-2">{cat.category}</td>
          <td className="border border-gray-800 px-4 py-2">{cat.gender}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  )
}

export default CategoryList
