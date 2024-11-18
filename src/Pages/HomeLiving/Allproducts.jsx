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
    const fetchProducts = () => {
      const productCollectionRef = collection(db, 'products');
      setProductLoading(true);
      const unsubscribe = onSnapshot(productCollectionRef, (querySnapshot) => {
        const products = querySnapshot.docs.map((doc) => doc.data());
        setProductData(products);
        setFilteredData(products);
        setProductLoading(false);
      });

      return () => unsubscribe();
    };

    fetchProducts();
  }, []);

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
   selectRef.current.value = "Sort By"
  }, [location.pathname]);


  const HandleSortChange = (event) => {
    const sortType =  event.target.value;

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
    <div className="text-black min-h-screen flex flex-col px-[30px]">
      {/* Breadcrumbs */}
      <div className=" font-light flex text-black gap-3 py-7">
        <Link to="/store/all-product" className="hover-effect-bread-crums font-play text-xl tracking-[5px] pb-2"> store</Link>
        {category === 'men-fashion' ? (
          <Link to="/store/men-fashion" className="hover-effect-bread-crums font-play text-xl tracking-[5px] pb-2"> Men Fashion</Link>
        ) : category === 'women-fashion' ? (
          <Link to="/store/women-fashion" className="hover-effect-bread-crums font-play text-xl tracking-[5px] pb-2"> Women Fashion</Link>
        ) : null}
      </div>

      <div className="main-containt flex w-full">
        <Sidebar closeSideBar={HandleSideBar} isSideBarOpen={isSideBarOpen}  gender={gender} allCategories={contextCategories} genre="Categories" filters={filters} setFilters={setFilters} />
        <div className="flex flex-col gap-6  w-full">
          <div className="w-full flex justify-evenly md:justify-end px-5">
            <button onClick={HandleSideBar} className='block md:hidden px-10 py-1 border  text-black font-play tracking-[5px] text-xl rounded-sm'>filters</button>
            <select
              className="sort-select px-3 py-3 outline-none border cursor-pointer font-play tracking-[3px] text-xl rounded-sm"
              onChange={HandleSortChange}
              ref={selectRef}
            >
              <option value="Sort By" className="cursor-pointer uppercase">SORT BY PRICE</option>
              <option value="Low to High" className="cursor-pointer uppercase"> LOW TO HIGH</option>
              <option value="High to Low" className="cursor-pointer uppercase"> HIGH TO LOW</option>
            </select>
          </div>

          <div className="products flex flex-wrap gap-5 items-center justify-center pb-7">
            {productLoading ? (
              <ProductsLoader />
            ) : (
              filteredData.map((item) => (
                <Link to={`/store/${category}/${item.id}`} key={item.id}>
                  <ProductCard
                    imgUrl={item.imageUrls[0]}
                    title={item.title}
                    brand={item.brand}
                    actualPrice={item.price}
                    originalPrice={Number(item.price) + 500}
                    stock={item.variants.reduce((acc, curr) => acc + Number(curr.stock), 0)}
                    isShippingFree={item.deliveryCharges === 0}
                    id={item.id}
                  />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allproducts;
