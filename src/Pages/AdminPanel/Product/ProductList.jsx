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
    <div className="grid gap-2">
    <div className="grid border-none font-bold text-white mx-2 grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
       <p>Img</p>
       <p>title</p>
       <p>Category</p>
       <p>Price</p>
       <p className="text-right md:text-center cursor-pointer text-lg">X</p>
     </div>
     {products?.map((item)=>(
        <div className="grid text-white mx-2 grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
        <img 
          className="w-12" 
          src={item.imageUrls[0]} 
          alt={item.title} 
        />
        <p>{item.title}</p>
        <p>{item.category}</p>
        <p>{item.price}</p>
        <p className="text-right md:text-center cursor-pointer text-lg" onClick={()=>DeleteProduct(item.id)}>X</p>
      </div>
     ))}
       <div className="grid text-white mx-2 grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
       <img 
         className="w-12" 
         src="https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png" 
         alt="" 
       />
       <p>Kid Tapered Slim Fit Trouser</p>
       <p>Kids</p>
       <p>$38</p>
       <p className="text-right md:text-center cursor-pointer text-lg">X</p>
     </div>
   
       </div>
  )
}

export default ProductList
