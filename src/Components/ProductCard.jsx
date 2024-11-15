import React from 'react';
import product from '../assets/dummyProduct.webp';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaCartArrowDown, FaCartPlus } from 'react-icons/fa6';
import { Link, redirect, useNavigate } from 'react-router-dom';

const ProductCard = ({ imgUrl, discount, brand, title, isShippingFree, originalPrice, actualPrice , id , stock }) => {
  const navigate = useNavigate();

  function handleIconClick(event) {
    event.stopPropagation(); 
    const element = event.target;

    if (element.closest('.icon-cart')) {
      console.log('Add to cart');
    } else if (element.closest('.icon-heart')) {
      console.log('Add to wishlist');
    }
  }

  function handleCardClick() {
    // navigate('/single', {state:{id}}) 
  }

  return (
    <div onClick={handleCardClick} className="flex flex-col w-[200px] relative h-[340px] cursor-pointer text-black border border-gray-200 rounded-md">
{  stock === 0 && <div className="sold-out-tag absolute z-10 px-2  w-[100px] py-3 -translate-x-2 translate-y-[10px] rotate-[30deg] rounded-md text-white font-semibold bg-red-500 top-1 left-2">sold Out</div>}
      <AiOutlineHeart
        className="absolute icon-heart top-1 right-1 z-50 text-white cursor-pointer"
        size={25}
        onClick={handleIconClick}
      />
      <div className="imgContainer bg-gray-400 h-[75%] relative group overflow-hidden">
        <FaCartPlus
          className="absolute icon-cart z-40 bottom-1 right-2 cursor-pointer text-[blue]"
          size={30}
          onClick={handleIconClick}
        />
        <img
          src={imgUrl}
          alt="Product"
          className="absolute group-hover:scale-[1.05] duration-300 transition-all h-auto w-auto max-w-full mix-blend-multiply max-h-[100%] top-0 left-0 right-0 bottom-0 mx-auto"
        />
      </div>
      <h1 className="text-sm font-bold px-2">{brand}</h1>
      <p className="text-[12px] font-normal text-ellipsis px-2">{title}</p>
      {isShippingFree && (
        <p className="text-[10px] font-medium text-gray-500 text-ellipsis uppercase px-2">Delivery free</p>
      )}
      <div className="price flex gap-1 items-center px-2">
        <span>Rs.</span>
        <p className="originalPrice text-[13px] font-semibold text-red-600">{actualPrice}</p>
        <p className="originalPrice text-[13px] line-through">{originalPrice}</p>
      </div>
    </div>
  );
};

export default ProductCard;
