import React, { useCallback, useContext, useEffect, useState } from 'react'
import url from '../../assets/home-fashion.jpg';
import Hero from '../../Components/Hero';
import Sidebar from '../../Components/Sidebar';
import ProductCard from '../../Components/ProductCard';
import { Link, useParams } from 'react-router-dom';
import { productDataContext } from '../../contexts/ProductDataContext';
import ProductsLoader from '../../Components/PlaceHolderLoaders/ProductsLoader';
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../../config/firebaseconfig';

const Allproducts = () => {
  const {category} = useParams();
  let gender = category !== "all-product" ? category.split('-')[0] === "men" ? "Male" : "Female" : "Neuter"; 
  const {contextCategories , productData , setProductData , productLoading , setProductLoading} = useContext(productDataContext);
  
  const [filters, setFilters] = useState({
    categories: [],
    genders: [],
    brands: [],
    priceRange:[0,15000]
  });
   useEffect(()=>{
    function fetchProducts() {
      const productCollectionRef = collection(db, "products");
      try {
        setProductLoading(true);
    
        let unsubscribe; 
    
        if (category !== "all-product") {
          console.log(category);
          console.log(gender);
          const q = query(productCollectionRef, where("gender", "==", gender));
    
          unsubscribe = onSnapshot(q, (querySnapshot) => {
            const products = querySnapshot.docs.map((doc) => (doc.data()));
            setProductData(products);
            setProductLoading(false);
          });
        } else {
          console.log("Fetching all products");
    
          unsubscribe = onSnapshot(productCollectionRef, (querySnapshot) => {
            const products = querySnapshot.docs.map((doc) => (doc.data()));
            console.log(products)
            setProductData(products);
            setProductLoading(false);
          });
        }
    
        return unsubscribe; // Return the unsubscribe function for cleanup
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductLoading(false); // Ensure loading state is updated
      }
    }
   
      return fetchProducts();
   },[category]);
   const filtereDataFunc = useCallback(()=>{
    const filteredProducts = productData.filter((product) => {
      const { categories, genders, brands, priceRange } = filters;
      
// These conditions check if a filter is chosen or not.
// - If no filter is chosen, it acts like all items are allowed (no effect).
// - If a filter is chosen, it checks if the item matches the chosen values using the `includes` method.

      const categoryMatch = categories.length ? categories.includes(product.category) : true;
      const genderMatch = genders.length ? genders.includes(product.gender) : true;
      const brandMatch = brands.length ? brands.includes(product.brand) : true;
      const [minPrice, maxPrice] = priceRange;
      const priceMatch = Number(product.price) >= minPrice && Number(product.price)<= maxPrice;
    
      return categoryMatch && genderMatch && brandMatch && priceMatch;
    });
    console.log(filteredProducts)
   },[filters.categories,filters.brands,filters.priceRange]);
  

  
  
  
  return (
    <div className='text-black min-h-screen flex flex-col px-[30px]'>
      <div className="py-3 font-bold">path history goes here</div>
      <div className="main-containt flex">
     <Sidebar gender={gender} allCategories={contextCategories} genre={"Categories"} filters={filters} setFilters={setFilters}/>
     <div className="flex flex-col gap-6">
      <div className=" w-full flex justify-end px-5">
        <select className='bg-gray-300 px-3 py-3 outline-none border cursor-pointer'>
        <option value="Price Low to High"  className='cursor-pointer uppercase'>
            SORT BY
          </option>
        <option value="Price Low to High"  className='cursor-pointer uppercase'>
              PRICE LOW TO HIGH
          </option>
          <option value="Price High to Low" className='cursor-pointer uppercase'>
           PRICE HIGH TO LOW
          </option>
         
          <option value="Date Old To New" className='cursor-pointer'>
          DATE OLD TO NEW
          </option>
          <option value="Date New To Old" className='cursor-pointer'>
            DATE NEW TO OLD
          </option>
        </select>
      </div>
     <div className="products flex flex-wrap gap-5 items-center justify-center pb-7 ">
    {productLoading ? <ProductsLoader/> : productData?.map((item)=>(
      <Link to={`/store/${category}/${item.id}`}>
      <ProductCard
      key={item.id}
      imgUrl={item.imageUrls[0]}
      title={item.title}
      brand={item.brand}
      actualPrice={item.price}
      originalPrice={Number(item.price) + 500}
      stock={item.variants.reduce((acc,curr)=>acc+Number(curr.stock),0)}
      id={item.id}
    />
      </Link>
    ))}
     </div>
      </div>
      </div>
     </div>
  )
}

export default Allproducts
