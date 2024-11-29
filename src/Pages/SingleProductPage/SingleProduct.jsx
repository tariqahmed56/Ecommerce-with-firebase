import React, { useState, useEffect, useContext, useRef } from "react";
import { CiHeart } from "react-icons/ci";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { productDataContext } from "../../contexts/ProductDataContext";
import QuantitySelector from "../../Components/QuantitySelector";
import { doc, setDoc, updateDoc ,getDoc, collection, addDoc, getDocs, query, where, Timestamp, onSnapshot} from "firebase/firestore"; 
import { db } from "../../config/firebaseconfig";
import { AuthContext } from "../../contexts/AuthContext";
import OrdersLoader from "../../Components/PlaceHolderLoaders/OrdersLoader";
import Button from "../../Components/Button";
import Input from '../../Components/Input.jsx'
import ReviewForm from "../../Components/ReviewForm.jsx";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { FaStar, FaUserCircle } from "react-icons/fa";

const SingleProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [gender,setGender] = useState(location.pathname.split('/')[2]);
  const { productId } = useParams();
  const {user} = useContext(AuthContext);
  const [Quantity,setQuantity] = useState(1);
  const { productData , successMessage , errorMessage} = useContext(productDataContext);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [relatedProducts,setRelatedProducts] = useState([]);
  const [inStock,setInstock] = useState(true);
  const mainImageRef = useRef();
  const [error,setError] = useState('');
  const [adding,setAdding] = useState(false);
  const [showReviewForm,setShowReviewForm] = useState(false);
  const [reviews,setReviews] = useState([])
    console.log(reviews)
  useEffect(() => {
    window.scrollTo({
      top: -100,
      behavior: "smooth",
    });
    const selectedProduct = productData?.find((item) => item.id === productId);
    const p = productData?.filter(item=> item.category === product?.category && item.id !== product?.id);
    setRelatedProducts(p)
    setProduct(selectedProduct);
    let totalStock = selectedProduct?.variants.reduce((acc,curr)=>acc+ Number(curr.stock),0);
    setInstock(()=>{
      return  (totalStock > 0)
    });
    const getReviews = async () => {
        const reviewsRef = collection(db,"reviews");
        const q = query(reviewsRef,where("productId", "==" ,productId));
         onSnapshot(q,(snaps)=>{
              let reviews = snaps.docs.map(doc=>doc.data());
              setReviews(reviews)
        })
    };
    getReviews()
  }, [productId, productData , location.pathname]);
  useEffect(()=>{
    setQuantity(1);
  },[selectedSize])
  

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const handleImageClick = (e) => {
    mainImageRef.current.src = e.target.src;
  };
 
  
  
async function addToCart() {
  if(!selectedSize){
    setError('Please Select a size.');
    return;
  }
  if(!user){
    alert("Please Login First.");
    return;
  }
  let productDetails = {
    id:productId,
        title: product.title,
        imageUrls:product.imageUrls,
         variant: product.variants.find(variant=>variant.size === selectedSize),
         Quantity: Quantity,
         brand: product.brand,
         deliveryCharges:  Number(product.deliveryCharges)
  }
   try {
    const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    setAdding(true)
    const userData = userDoc.data();
    let cart = userData.cart || [];
      
    const existingProductIndex = cart.findIndex(item => item.productId === productId);

    if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += Quantity;
    } else {
      cart.push({...productDetails })
    }
 
    await updateDoc(userRef, { cart });
    successMessage("Product Successfully Added to Cart.");
    setAdding(false);
  } 
   } catch (error) {
    errorMessage('Something Went Wrong.')
   }
  
};
 
const toggleRevievwFormVisbility =  () => {
  console.log(product);
  
  if(!user && !showReviewForm){
    let a = confirm('You Need to Login to give Review .Do you want to login?');
    if(a) navigate('/login');
    return;
  }
  setShowReviewForm(prev=>!prev);
  if(innerWidth < 850) window.scrollTo(0, 100);
};
const submitReview = async ({rating, description}) => {
  let userId = user.uid;
  const reviewsRef = collection(db, "reviews");
  const q = query(reviewsRef, where("productId", "==", productId), where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  
  // if user has already submit the the review it will update it otherwise it will just add a new review
  if (!querySnapshot.empty) {
    const existingReview = querySnapshot.docs[0]; 
    const reviewRef = doc(db, "reviews", existingReview.id);

    const updatedReview = {
      productId,
      userId,
      rating,
      description,
      updatedAt: Timestamp.now(), 
    };

    try {
      await setDoc(reviewRef, updatedReview);
      console.log("Review updated successfully!");
    } catch (error) {
      console.error("Error updating review: ", error);
    }

  } else {
    const newReview = {
      productId,
      userId,
      UserName: user.name,
      rating,
      description,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(), 
    };

    try {
      await setDoc(doc(reviewsRef), newReview);
      console.log("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review: ", error);
    }
  }
};



  return product ? (
    <>
    <div className="min-h-[100vh] text-black px-4 py-2 md:py-5 md:px-10 justify-center flex flex-col md:flex-row gap-3">
      <div className="w-full md:w-[50%] flex flex-col items-center lg:flex-row-reverse md:items-start  pt-10">
        <div className="md:min-h-[300px] relative h-auto w-[96%] md:w-[70%] flex  justify-center items-center">
        <img
          ref={mainImageRef}
          src={product?.imageUrls[0]}
          alt="Main image"
          className="w-full h-auto max-h-[500px] object-contain mix-blend-multiply"
        />
        </div>
        <div className="flex lg:flex-col gap-3 justify-center overflow-x-auto mx-2 p-2 md:p-0">
          {product?.imageUrls.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Thumbnail"
              onClick={handleImageClick}
              className="w-[80px] h-[80px] object-cover shadow-md cursor-pointer hover:ring-2 hover:ring-black "
            />
          ))}
        </div>
      </div>

      <div className="w-full md:w-[50%]  flex flex-col gap-1 md:px-6">
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-gray-200 text-sm rounded-full">{product.brand}</span>
          <span className="px-3 py-1 bg-gray-200 text-sm rounded-full">{product.category}</span>
        </div>

        <h1 className="text-xl font-semibold">{product?.title}</h1>

        <p className="text-lg font-semibold text-gray-800">
          Price: {' '}
          {selectedSize
            ? product.variants.find((variant) => variant.size === selectedSize).price
            : product?.price} <span className="text-sm">PKR</span>
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
        <div className="flex flex-wrap gap-4 items-center">
          <Button 
          disabled={!inStock}
          onClick={addToCart}
          text={'Add to Cart'}
          isSubmitting={adding}
          />            
          <CiHeart size={30} className="text-gray-700 cursor-pointer hover:text-black" />
          <Button 
          onClick={toggleRevievwFormVisbility}
          text={'Add Review'}
          theme={'text-white bg-blue-500'}
          />  
        </div>

        <div>
          <h4 className="text-lg font-semibold">Description:</h4>
          <p className="text-sm text-gray-700 mt-2">{product.description}</p>
        </div>
      </div>
    </div>
      <div className="container mx-auto  text-black  relative md:-top-10 my-3 px-2 flex md:items-start justify-center flex-col items-center">
      <h3 className="text-4xl  font-bold mb-2 py-2">Related Products</h3>
      <div className="flex md:justify-start justify-center gap-3 flex-wrap">
      {relatedProducts.map(p=>(
        <Link to={`/store/${gender}/${p.id}`}>
         <img src={p.imageUrls[0]} alt={p.title} className="w-[200px] h-[200px] object-cover rounded" />
        </Link>
      ))}
        </div>
    </div>
    {
      showReviewForm && 
    <div className="absolute text-black px-3 py-4 top-1/2 left-1/2 md:w-[70%] w-[300px] md:h-auto justify-center flex flex-col h-[60dvh] shadow-2xl rounded -translate-x-1/2 -translate-y-1/2 bg-white min-h-52 z-40 ">
    <IoIosCloseCircleOutline
    onClick={()=>setShowReviewForm(false)}
     size={40} className="right-2 top-[2px]  absolute text-blue-500 cursor-pointer caret-transparent"/>
     <h2 className="font-semiBold text-center text-2xl">Add Review</h2>
    <ReviewForm onSubmit={submitReview} color="blue"/>
    </div>
    }
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 w-full max-w-sm mx-auto">
      <div className="flex items-center space-x-3 mb-4">
        <FaUserCircle size={40} color="#6c757d" />
        <span className="text-lg font-semibold text-gray-700">{reviews[0].UserName}</span>
      </div>

      <div className="flex items-center mb-2">
        { [0].map((_, index) => (
          <FaStar
            key={index}
            size={20}
            color={index < reviews[0].rating ? "#000" : "#e4e5e9"} 
          />
        ))}
      </div>

      <p className="text-gray-600">{reviews[0].description}</p>
    </div>
    </>
  ) : (
   <OrdersLoader/>
  );
};

export default SingleProduct;