import { createContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseconfig";
export let productDataContext = createContext();
export default function productDataProvider ({children}) {
    let [contextCategories,setContextCategories] = useState([]);
    const categoriesCollectionRef = collection(db, "categories");
    let [productData,setProductData] = useState([]);
    let [productLoading,setProductLoading] = useState(false);
      useEffect(()=>{
        function getCategories() {
            const unsubscribeCategories = onSnapshot(categoriesCollectionRef, (snapshot) => {
              const categories = snapshot.docs.map((doc) => doc.data());
              setContextCategories(categories);
            });
          };
        getCategories();
      },[])
    
    

    return(
        <productDataContext.Provider value={{contextCategories , setContextCategories , productData ,setProductData , productLoading , setProductLoading}}>
            {children}
        </productDataContext.Provider>
    )
}