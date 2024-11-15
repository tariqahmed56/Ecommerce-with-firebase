import React, { useState, useEffect, useContext } from "react";
import p1 from "../../assets/p1.webp";
import { CiHeart } from "react-icons/ci";
import { useLocation, useParams } from "react-router-dom";
import productDataProvider, { productDataContext } from "../../contexts/ProductDataContext";
const SingleProduct = () => {
  const params = useParams();
  const location = useLocation();
  const {productData} = useContext(productDataContext);
  let [product,setProduct] =useState(()=>{
   return productData.find(item=>item.id == params.productId)
  })  ;
  console.log(product)
  function ScrolltoTop() {
    window.scroll(0, 0);
  }
  useEffect(() => {
    ScrolltoTop();
  }, []);
  const [selectedSize, setSelectedSize] = useState("");
  function handleSizeSelection(size) {
    setSelectedSize(size);
  }
  function handleImageClick(e){
    let img = e.target;
    console.log(img.src);
  }
  return (
    <div className="min-h-[100dvh] text-black px-2 md:mx-auto md:w-[100vw] py-3 md:flex justify-center items-start gap-10">
      <div className="product-images flex-col flex gap-2 justify-start items-center">
        <img
          src={product.imageUrls[0]}
          alt="Product img"
          className=" w-[100vw]  h-[70vh] object-contain shadow-md py-2"
        />
        <div className="images flex flex-wrap gap-2  ">
         { product.imageUrls.map((img,index)=>(
           <img
           onClick={handleImageClick}
           key={index}
             src={img}
             alt="Product img"
             className="w-[100px] h-[80px] object-contain shadow-md py-2 cursor-pointer hover:border caret-transparent"
           />
         ))
          }
        
        </div>
      </div>
      <div className="productDetails mt-3">
        <div className="tags flex gap-3">
          <h3 className="border border-gray px-2 py-1 text-sm rounded-lg">
            Clothes
          </h3>
          <h3 className="border border-gray px-2 py-1 text-sm rounded-lg">
            Limelight
          </h3>
        </div>
        <h1 className="product-name text-[1.15rem] font-medium">
        {product.title}
         </h1>
        <p className="font-medium text-[1.05rem] mt-2">
          <span className="font-normal pr-2">PKR</span>{product.price}
        </p>
        <div className="sizes mt-2">
          <h4 className="uppercase font-medium text-[0.85rem] text-gray-800">
            Select a Size:
          </h4>
          <div className="available flex flex-wrap gap-2 ">
            {product.variants.filter(p=>p.stock > 0).map((varaint) => (
              <span
                key={varaint.size}
                className={`border size border-[gray] hover:border-black flex justify-center items-center rounded text-sm  cursor-pointer w-[150px] md:w-10 h-7 text-center ${
                  selectedSize === varaint.size
                    ? "bg-black text-white"
                    : "bg-transparent"
                }`}
                onClick={() => handleSizeSelection(varaint.size)}
              >
                {varaint.size}
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
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
          magnam voluptatum officia similique labore deserunt nobis, laudantium
          dolor eligendi eum perspiciatis, veritatis aut iusto facilis porro
          tempora veniam exercitationem. Optio?
        </p>
      </div>
    </div>
  );
};

export default SingleProduct;
