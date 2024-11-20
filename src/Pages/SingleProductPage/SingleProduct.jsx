import React, { useState, useEffect, useContext, useRef } from "react";
import { CiHeart } from "react-icons/ci";
import { useParams, useLocation } from "react-router-dom";
import { productDataContext } from "../../contexts/ProductDataContext";
import QuantitySelector from "../../Components/QuantitySelector";
import { doc, setDoc, updateDoc ,getDoc} from "firebase/firestore"; 
import { db } from "../../config/firebaseconfig";
import { AuthContext } from "../../contexts/AuthContext";

const SingleProduct = () => {
  const { productId } = useParams();
  const {user} = useContext(AuthContext);
  const [Quantity,setQuantity] = useState(1);
  const { productData } = useContext(productDataContext);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [inStock,setInstock] = useState(true);
  const mainImageRef = useRef();
  const [error,setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
    const selectedProduct = productData?.find((item) => item.id === productId);
    setProduct(selectedProduct);
    let totalStock = selectedProduct?.variants.reduce((acc,curr)=>acc+ Number(curr.stock),0);
    setInstock(()=>{
      return  (totalStock > 0)
    });
  }, [productId, productData]);
  useEffect(()=>{
    setQuantity(1);
  },[selectedSize])
  

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const handleImageClick = (e) => {
    mainImageRef.current.src = e.target.src;
  };
  console.log(product)

  
async function addToCart() {
  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);
  let productDetails = {
    id:productId,
        title: product.title,
        imageUrls:product.imageUrls,
         variant: product.variants.find(variant=>variant.size === selectedSize),
         Quantity: Quantity,
         brand: product.brand,
         deliveryCharges:  Number(product.deliveryCharges)
  }
  if (userDoc.exists()) {
    const userData = userDoc.data();
    let cart = userData.cart || [];
      
    const existingProductIndex = cart.findIndex(item => item.productId === productId);

    if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += Quantity;
    } else {
      cart.push({...productDetails })
    }
 
    await updateDoc(userRef, { cart });
  } else {
     let a = prompt("You need to login before using this feature.");
     alert(a);
  }
}

  return product ? (
    <div className="min-h-[100vh] text-black px-4 py-6 md:px-10 flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-[50%] flex flex-col lg:flex-row-reverse items-center gap-4">
        <div className="md:h-[500px] h-auto md:w-[70%] flex  justify-center items-center bg-[#717070]">
        <img
          ref={mainImageRef}
          src={product?.imageUrls[0]}
          alt="Main image"
          className="w-full h-auto max-h-[500px] object-contain shadow-lg "
        />
        </div>
        <div className="flex lg:flex-col gap-3 overflow-x-auto mx-2 p-2">
          {product?.imageUrls.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Thumbnail"
              onClick={handleImageClick}
              className="w-[80px] h-[80px] object-cover rounded-lg shadow-md cursor-pointer hover:ring-2 hover:ring-black"
            />
          ))}
        </div>
      </div>

      <div className="w-full md:w-[50%] flex flex-col gap-1 md:px-6">
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-gray-200 text-sm rounded-full">{product.brand}</span>
          <span className="px-3 py-1 bg-gray-200 text-sm rounded-full">{product.category}</span>
        </div>

        <h1 className="text-xl font-semibold">{product?.title}</h1>

        <p className="text-lg font-semibold text-gray-800">
          PKR{" "}
          {selectedSize
            ? product.variants.find((variant) => variant.size === selectedSize).price
            : product?.price}
        </p>

      { inStock &&
        <div>
        
        <h4 className="text-sm font-medium text-gray-700">Select a Size:</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {product?.variants.filter((variant) => variant.stock > 0).map((variant) => (
            <span
              key={variant.size}
              onClick={() => handleSizeSelection(variant.size)}
              className={`px-4 py-2 border rounded-lg text-sm cursor-pointer transition-all ${
                selectedSize === variant.size
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-black"
              }`}
            >
              {variant.size}
            </span>
          ))}
        </div>
        {error && <span className="text-red-500 text-xl font-mono font-bold">{error}</span>}
      </div>}

        <div>
          <h4 className="text-sm font-medium text-gray-700">Quantity:</h4>
           <QuantitySelector 
           value={Quantity} 
           setValue={setQuantity}
            setError={setError} 
            isSizeSelected={selectedSize !== '' ? true : false}
            maxValue={selectedSize ? product.variants.find(variant=>variant.size === selectedSize).stock : false}
            />
        </div>
          {selectedSize && <p>Available stock : {product.variants.find(variant=>variant.size === selectedSize).stock}</p>}
          {!inStock && <p className="text-red-500 font-play font-bold">Out of Stock</p>}
        <div className="flex gap-4 items-center">
          <button 
          disabled={!inStock}
          onClick={addToCart}
          className="w-full md:w-auto px-6 py-3 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-[#504e4e]">
            Add to Cart
          </button>
          <CiHeart size={30} className="text-gray-700 cursor-pointer hover:text-black" />
        </div>

        <div>
          <h4 className="text-lg font-semibold">Description:</h4>
          <p className="text-sm text-gray-700 mt-2">{product.description}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-[100vh]">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
    </div>
  );
};

export default SingleProduct;