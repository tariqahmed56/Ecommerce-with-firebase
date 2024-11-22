import { createContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseconfig";
import { toast } from "react-toastify";
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
      const successMessage = (message) => {
        toast.success(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };
    
      const errorMessage = (message) => {
        toast.error(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        });
      };
    return(
        <productDataContext.Provider value={{contextCategories ,  errorMessage , successMessage, setContextCategories , productData ,setProductData , productLoading , setProductLoading}}>
            {children}
        </productDataContext.Provider>
    )
}