import React, { useContext, useEffect, useState } from "react";

import "./App.css";
import { Outlet } from "react-router-dom";
import { AuthContext, useAuth } from "./contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./config/firebaseconfig";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer.jsx"
import { productDataContext } from "./contexts/ProductDataContext";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
function App() {
  const [userId, setUserId] = useState(null);
  const {
    contextCategories,
    productData,
    setProductData,
    productLoading,
    setProductLoading,
     } = useContext(productDataContext);
     const {user,setUser} = useContext(AuthContext)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({...storedUser , cart:[] , orders:[]});
    }
    const cleanUp = onAuthStateChanged(auth, (isLoggedInUser) => {
      if(isLoggedInUser){

        const docRef = doc(db, "users", isLoggedInUser.uid);
        const unsubscribe = onSnapshot(docRef, (snap) => {
          if (snap.exists()) {
            setUser({...snap.data() , uid:snap.id});
          } else {
            console.error("User is not logged In");
            setUser(null); 
          }
        });
      }else{
        setUser(null)
      }
    });
  }, []);
  useEffect(() => {
    try {
      const productCollectionRef = collection(db, "products");
      setProductLoading(true);
      const unsubscribe = onSnapshot(productCollectionRef, (querySnapshot) => {
        const products = querySnapshot.docs.map((doc) => doc.data());
        setProductData(products);
        setProductLoading(false);
      });
    } catch (error) {
      alert("An error Occur while fetching Data");
    }
  }, []);
  return (
    <main className="wrapper">
      <Navbar />
      <Outlet />
      <ToastContainer />
      <Footer />
    </main>
  );
}

export default App;
