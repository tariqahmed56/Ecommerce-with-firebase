import React, { useState, Suspense, useEffect, useContext } from "react";
import { useLoaderData, Await, defer } from "react-router-dom";
import menStyle from "../../assets/menswiper/men-style.webp";
import trousers from "../../assets/menswiper/men-trousers.webp";
import banner3 from '../../assets/menswiper/Men-Suits.webp';
import banner1 from "../../assets/menswiper/banner.webp";
import banner2 from "../../assets/menswiper/slider-img.webp";
import ProductCard from "../../Components/ProductCard";
import Sidebar from "../../Components/Sidebar";
import Carousel from "../../Components/Carousel";
import Sort from "../../Components/Sort";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseconfig";
import SidebarLoader from "../../Components/PlaceHolderLoaders/SideBarLoader";
import ProductsLoader from "../../Components/PlaceHolderLoaders/ProductsLoader";
import { productDataContext } from "../../contexts/ProductDataContext";
export function loader() {
  const productCollectionRef = collection(db, "products");
  const categoriesCollectionRef = collection(db, "categories");

  return defer({
    products: getDocs(productCollectionRef).then((snapshot) => snapshot.docs.map((doc) => doc.data())),
    categories: getDocs(categoriesCollectionRef).then((snapshot) => snapshot.docs.map((doc) => doc.data())),
  });
}


const Men = () => {
    const {productData,contextCategories , setContextCategories , setProductData} = useContext(productDataContext);

  const { products, categories } = useLoaderData();
  // const [productData,setProductData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  useEffect(()=>{
    setProductData(async ()=>{
       let dt = await products; 
       console.log(dt)
       return dt;
    });
    console.log(productData)
   setContextCategories(async ()=>{
   let ct = await categories ;
  console.log(ct)
  return ct;
  })

  console.log(contextCategories)
  // let [dt , ct] = Promise.all([products,categories]);
  // console.log(dt,ct)
  },[])
  return (
    <div className="w-full text-black">
      <Carousel images={[menStyle, banner3, banner1, banner2, trousers]} />
      <div className="flex justify-start w-[75%] mx-auto">
        <button
          style={{ fontFamily: "Playfair Display" }}
          className="px-10 text-xl tracking-[5px] py-3 md:hidden border border-[gray] hover:bg-black hover:text-white"
          onClick={toggleSidebar}
        >
          filters
        </button>
      </div>

      <div className="container mx-auto flex py-5 relative">
        <div
          className={`transition-all duration-300 ease-in-out
            md:relative md:left-0
            ${isSidebarOpen ? "left-0" : "-left-full"} 
            absolute top-0 h-full md:w-auto w-3/4 bg-white z-50 md:z-auto`}
        >
          <Suspense fallback={<SidebarLoader />}>
            <Await resolve={categories}>
              {(loadedCategories) => (
                <Sidebar genre={"Men's Fashion"} gender={"Male"} data={loadedCategories} />
              )}
            </Await>
          </Suspense>
        </div>

        <div className="flex flex-col items-center gap-2 relative w-full">
          <div className="Sortwraper self-end">
            <Sort />
          </div>

          <Suspense fallback={<ProductsLoader />}>
            <Await resolve={products}>
              {(loadedProducts) => {
                
              return  <div className="flex flex-wrap justify-center items-center gap-4 w-full">
                  {loadedProducts.length !== 0 ? (
                    loadedProducts.map((item, index) => (
                      <ProductCard
                        key={index}
                        imgUrl={item.imageUrls[0]}
                        title={item.title}
                        brand={item.brand}
                        actualPrice={item.price}
                        originalPrice={Number(item.price) + 500}
                        stock={item.variants.reduce((acc,curr)=>acc+Number(curr.stock),0)}
                      />
                    ))
                  ) : null}
                </div>
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Men;
