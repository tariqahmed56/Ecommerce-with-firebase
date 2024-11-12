import React, { useEffect, useState } from 'react'
import {collection , onSnapshot} from 'firebase/firestore'
import { db } from '../../../config/firebaseconfig';
const ProductList = () => {
  const [products,setProducts] = useState([]);
  const readData = async () =>{
    try {
      let collectionRef = collection(db,"products");
      const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        const LocalProducts = [];
        querySnapshot.forEach((doc) => {
         LocalProducts.push(doc.data());
        });
        setProducts(LocalProducts);
      });
      
      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    readData();
  }, [])
  return (
    <div className='w-full text-white overflow-x-scroll sm:overflow-x-auto p-4'>
    <table className='bg-slate-900 shadow-md min-w-[600px] sm:w-[90%] mx-auto px-3 rounded-[30px] border border-gray-500'>
  <tr className='bg-[#2e2e53] rounded'>
    <th className='py-2 border border-gray-600 text-center'>S.No</th>
    <th className='py-2 border border-gray-600 text-center'>ID</th>
    <th className='py-2 border border-gray-600 text-center'>Name</th>
    <th className='py-2 border border-gray-600 text-center'>Price</th>
    <th className='py-2 border border-gray-600 text-center'>Stock</th>
    <th className='py-2 border border-gray-600 text-center'>Edit</th>
    <th className='py-2 border border-gray-600 text-center'>Delete</th>
  </tr>
  {products?.map((item, idx) => (
    <tr key={idx} className={`py-2 ${idx % 2 === 0 ? "bg-slate-700" : "bg-slate-500"}`}>
        <TableRow  value={idx+1} maxWidth={"50px"}/>
        <TableRow  value={item.id} maxWidth={"100px"} />
        <TableRow  value={item.title} maxWidth={"150px"} />
        <TableRow value={item.price} maxWidth={"70px"} />
        <TableRow value={item.variants.reduce((acc,curr)=>acc+ Number(curr.stock),0)} maxWidth={"70px"}/>
        <TableRow value={"Edit"} maxWidth={"70px"} id={item.id}/>
        <TableRow value={"Delete"} maxWidth={"70px"} id={item.id}/>
    </tr>
  ))}
</table>
    </div>
  )
}

export default ProductList

  function TableRow({value,maxWidth , id}){

   function Edit(){
    console.log("Product with Id " + id + " Edited");
   }
   function Delete(){
    console.log(`Product with ${id} Deleted `)
   }
   return <td className='text-center py-2 overflow-hidden text-ellipsis whitespace-nowrap px-2' 
   onClick={value === 'Delete' || value === "Edit" ? value === 'Edit' ? ()=> Edit() : ()=>Delete() : null  }
   style={{ maxWidth: maxWidth }}>{value}</td>

  }
