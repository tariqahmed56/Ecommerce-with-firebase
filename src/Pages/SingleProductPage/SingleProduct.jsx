import React, { useState, useEffect, useContext, useRef } from "react";
import p1 from "../../assets/p1.webp";
import { CiHeart } from "react-icons/ci";
import { useLocation, useParams } from "react-router-dom";
import productDataProvider, { productDataContext } from "../../contexts/ProductDataContext";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseconfig";
const SingleProduct = () => {
  const {productId} = useParams();
  const location = useLocation();
  const {productData , setProductData} = useContext(productDataContext);
  let main = useRef();
  console.log(productData);
  let [product,setProduct] =useState(null)  ;
  function ScrolltoTop() {
    window.scroll(0, 0);
  }
  useEffect(() => {
    ScrolltoTop();
      let p = productData?.find((item)=>item.id === productId);  
        setProduct(p);
        console.log(product);
       
  }, [productId]);
   const [selectedSize, setSelectedSize] = useState("");
  function handleSizeSelection(size) {
    setSelectedSize(size);
  }
  function handleImageClick(e){
    let img = e.target;
    console.log(img.src);
    main.current.src = img.src;
  }
  return (
    product ? 
    <div className="min-h-[100dvh] text-black px-2 md:mx-auto md:w-[100vw] py-3 md:flex justify-center items-start gap-10">
      <div className="product-images flex-col w-[600px] flex gap-2 justify-start items-center">
        <img
          src={product?.imageUrls[0]}
          alt="Product img"
          className=" max-w-full max-h-auto min-h-[60vh] object-cover  shadow-md"
          ref={main}
        />
        <div className="images flex flex-wrap gap-2  ">
         { product?.imageUrls?.map((img,index)=>(
          <div className="w-[100px] h-[80px] relative">
            <img
            onClick={handleImageClick}
            key={index}
              src={img}
              alt="Product img"
              className="w-full h-full  object-cover shadow-md  cursor-pointer hover:border caret-transparent"
            />
          </div>
         ))
          }
        
        </div>
      </div>
      <div className="productDetails mt-3">
        <div className="tags flex gap-3">
          <h3 className="border border-gray px-2 py-1 text-sm rounded-lg">
            {product.brand}
          </h3>
          <h3 className="border border-gray px-2 py-1 text-sm rounded-lg">
            {product.category}
          </h3>
        </div>
        <h1 className="product-name text-[1.15rem] font-medium px-3 text-wrap">
        {product?.title}
         </h1>
        <p className="font-medium text-[1.05rem] mt-2">
          <span className="font-normal pr-2">PKR</span>{selectedSize ? product.variants.find((vr)=>vr.size === selectedSize).price : product?.price}
        </p>
        <div className="sizes mt-2">
          <h4 className="uppercase font-medium text-[0.85rem] text-gray-800">
            Select a Size:
          </h4>
          <div className="available flex flex-wrap gap-2 ">
            {product?.variants.filter(p=>p?.stock > 0).map((varaint) => (
              <span
                key={varaint?.size}
                className={`border size border-[gray] hover:border-black flex justify-center items-center rounded text-sm  cursor-pointer w-[150px] md:w-10 h-7 text-center ${
                  selectedSize === varaint?.size
                    ? "bg-black text-white"
                    : "bg-transparent"
                }`}
                onClick={() => handleSizeSelection(varaint?.size)}
              >
                {varaint?.size}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3">
          <h4 className="uppercase font-semibold text-[0.75rem] text-gray-800 mb-1">
            Quantity:
          </h4>
          <div className="quantity w-[80%] sm:w-[200px] border border-black rounded flex cursor-pointer">
            <div className="border-r-[1px] border-black basis-1/3 flex justify-center items-center text-sm font-semibold  h-7">
              -
            </div>
            <div className="basis-1/3 flex justify-center items-center text-sm font-semibold h-7">
              1
            </div>
            <div className="border-l-[1px] border-black basis-1/3 flex justify-center items-center text-sm font-semibold  h-7">
              +
            </div>
          </div>
        </div>
        <div className="flex w-full justify-start gap-4 items-center">
          <button className="w-[75%] md:w-[200px] py-2 text-sm bg-[#2c2b2b] text-white shadow-md rounded mt-2">
            Add to Cart
          </button>
          <CiHeart size={30} className="w-[30px] cursor-pointer" />
        </div>
        <h2 className="font-semibold mt-2">Description:</h2>
        <p className="border border-gray-600 text-wrap w-[90%] md:w-[350px] rounded px-2 py-2 text-sm">
          {product.description}
        </p>
      </div>
    </div>
    : <h1 className="text-black text-xl">loading...</h1>
  );
};

export default SingleProduct;
