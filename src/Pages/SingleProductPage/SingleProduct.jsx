import React, { useState , useEffect } from "react";
import p1 from "../../assets/p1.webp";
const SingleProduct = () => {
  function ScrolltoTop(){
    window.scroll(0,0)
  }
  useEffect(()=>{
    ScrolltoTop()
  },[])
  const [selectedSize,setSelectedSize] = useState('');
  function handleSizeSelection(size){
    setSelectedSize(size);
  }
  return (
    <div className="min-h-[100dvh] text-black px-2 md:mx-auto md:w-[90vw] py-3 mx-2 md:flex justify-between items-start gap-10">
      <div className="product-images flex-col md:flex-row flex gap-2 justify-start items-center">
        <img
          src={p1}
          alt=""
          className="md:w-[100%] w-full  h-[70vh] object-contain shadow-md py-2"
        />
        <div className="images flex flex-row flex-wrap gap-2 md:flex-col md:w-[200px]">
          <img
            src={p1}
            alt=""
            className="w-[100px] h-[80px] object-contain shadow-md py-2 cursor-pointer hover:border caret-transparent"
          />
          <img
            src={p1}
            alt=""
            className="w-[100px] h-[80px] object-contain shadow-md py-2 cursor-pointer hover:border caret-transparent"
          />
          <img
            src={p1}
            alt=""
            className="w-[100px] h-[80px] object-contain shadow-md py-2 cursor-pointer hover:border caret-transparent"
          />
          <img
            src={p1}
            alt=""
            className="w-[100px] h-[80px] object-contain shadow-md py-2 cursor-pointer hover:border caret-transparent"
          />
        </div>
      </div>
      <div className="productDetails mt-3">
        <div className="tags flex gap-3">
          <h3 className="border border-gray px-2 py-1 text-sm rounded-lg">Clothes</h3>
          <h3 className="border border-gray px-2 py-1 text-sm rounded-lg">Limelight</h3>
        </div>
        <h1 className="product-name text-[1.25rem] font-semibold">
          Embroidered Lace Mock Two-Piece Gown with Jacket
        </h1>
        <p className="font-bold text-[1.05rem] mt-2">$229.00</p>
        <div className="sizes">
          <h4 className="uppercase font-semibold text-[1rem] text-gray-800">
            Select a Size:
          </h4>
          <div className="available flex flex-wrap gap-2 ">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <span
                key={size}
                className={`border size border-[gray] hover:border-black flex justify-center items-center rounded text-sm  cursor-pointer w-[150px] md:w-12 h-12 text-center ${selectedSize === size ? "bg-black text-white" : "bg-transparent"}`}
              onClick={()=>handleSizeSelection(size)}>
                {size}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3">
          <h4 className="uppercase font-semibold text-[1rem] text-gray-800 mb-1">
            Quantity:
          </h4>
          <div className="quantity w-[80%] border border-black rounded flex cursor-pointer">
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
        <button className="w-[80%] md-w-[320px] py-3 text-xl bg-black text-white shadow-md rounded mt-2">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
