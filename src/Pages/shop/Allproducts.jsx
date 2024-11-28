import React, { useEffect, useState, useContext, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseconfig';
import { productDataContext } from '../../contexts/ProductDataContext';
import Sidebar from '../../Components/Sidebar';
import ProductCard from '../../Components/ProductCard';
import ProductsLoader from '../../Components/PlaceHolderLoaders/ProductsLoader';
import Button from '../../Components/Button'
const Allproducts = () => {
  const { contextCategories, productData, setProductData, productLoading, setProductLoading } = useContext(productDataContext);
  const location = useLocation();
  const { category } = useParams();
  const selectRef = useRef();

  const [gender, setGender] = useState('Neuter');
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    genders: [],
    brands: [],
    priceRange: [0, 15000],
  });
//  gender check on route change
  useEffect(() => {
    if (category === 'all-product') setGender('Neuter');
    else if (category === 'men-fashion') setGender('Male');
    else setGender('Female');
  }, [category]);
    // Data fetching 
  useEffect(() => {
    setFilteredData(productData);
  }, [productData,setProductData]);

  useEffect(() => {
    const filtereDataFunc = () => {
      const { categories, genders, brands, priceRange } = filters;
      const [minPrice, maxPrice] = priceRange;

      const filteredProducts = productData.filter((product) => {
        const categoryMatch = categories.length ? categories.includes(product.category) : true;
        const genderMatch = category === 'all-product' ?  true : product.gender === gender;
        const brandMatch = brands.length ? brands.includes(product.brand) : true;
        const priceMatch = Number(product.price) >= minPrice && Number(product.price) <= maxPrice;

        return categoryMatch && genderMatch && brandMatch && priceMatch;
      });

      setFilteredData(filteredProducts);
    };

    filtereDataFunc();
  }, [filters, productData]);

  // reset inputs and filters
  useEffect(() => {
    setFilters({
      categories: [],
      genders: [],
      brands: [],
      priceRange: [0, 15000],
    });
    let checkBoxes = document.querySelectorAll('.checkBox');
    checkBoxes.forEach((checkbox)=>{
      checkbox.checked = false;
    });
   selectRef.current = "Sort By"
  }, [location.pathname]);


  const HandleSortChange = (event) => {
    const sortType =  event.target?.value;
   if(sortType){
    selectRef.current = sortType;
   }
   console.log(selectRef)
    const sortedData = [...filteredData];
    if (sortType === 'High to Low') sortedData.sort((a, b) => Number(b.price) - Number(a.price));
    else if (sortType === 'Low to High') sortedData.sort((a, b) => Number(a.price) - Number(b.price));
    setFilteredData(sortedData);
  };
  const [isSideBarOpen,setIsSideBarOpen] = useState(false);
  function HandleSideBar(){
   setIsSideBarOpen(prev=>!prev);
  }

  return (
    <div className="text-black min-h-screen flex flex-col px-[30px]  ">
      {/* Breadcrumbs */}
      <div className=" font-light flex text-black gap-x-10 gap-y-5 py-7 flex-wrap">
        <Link to="/store/all-product"
         className="hover-effect-bread-crums font-play  text-xl tracking-[5px] md:pb-2 leading-3 text-nowrap"> store</Link>
          <Link to="/store/men-fashion"
           className="hover-effect-bread-crums font-play text-xl tracking-[5px] md:pb-2 leading-3 text-nowrap"> Men Fashion</Link>
          <Link to="/store/women-fashion" 
          className="hover-effect-bread-crums font-play text-xl tracking-[5px] md:pb-2 leading-3 text-nowrap"> Women Fashion</Link>
  
      </div>

      <div className="main-containt flex justify-start items-start w-full">
        <Sidebar closeSideBar={HandleSideBar} isSideBarOpen={isSideBarOpen}  gender={gender} allCategories={contextCategories} genre="Categories" filters={filters} setFilters={setFilters} />
        <div className="flex  gap-6  w-full flex-wrap ">
          <div className="w-full flex justify-center items-start gap-2 flex-wrap md:justify-end px-5">
            <button onClick={HandleSideBar}
             className='block md:hidden px-[60px] py-3 border  text-black font-play tracking-[5px] text-xl rounded-sm'>filters</button>
            <select
              className="sort-select text-black  px-3 py-3 outline-none border cursor-pointer font-play tracking-[3px] text-xl rounded-sm"
              onChange={HandleSortChange}
              value={selectRef.current}
              ref={selectRef}
            >
              <option value="Sort By" className="cursor-pointer uppercase">SORT BY PRICE</option>
              <option value="Low to High" className="cursor-pointer uppercase"> LOW TO HIGH</option>
              <option value="High to Low" className="cursor-pointer uppercase"> HIGH TO LOW</option>
            </select>
          </div>

          <div className="products flex justify-center flex-wrap gap-5 md:px-3  pb-7">
            {productLoading ? (
             Array.from({length:8}).map((_,index)=> <ProductsLoader key={index}/>)
            ) : (
             filteredData.length > 0 ? filteredData.map((item) => (
                <Link to={`/store/${category}/${item.id}`} key={item.id}>
                  <ProductCard
                    imgUrl={item.imageUrls[0]}
                    title={item.title}
                    brand={item.brand}
                    actualPrice={item.price}
                    originalPrice={Number(item.price) + 500}
                    stock={item.variants.reduce((acc, curr) => acc + Number(curr.stock), 0)}
                    isShippingFree={item.deliveryCharges == 0}
                    id={item.id}
                  />
                </Link>
              )) : <p className='text-xl text-center'>No Products matches the filters. Try Less filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Allproducts;
