import React, { useState, useEffect, useContext, useRef, Suspense } from "react";
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
import RelatedProductList from "./RelatedProductList.jsx";
import ReviewsList from "./ReviewsList.jsx";
import SocialShare from "../../Components/SocialShare.jsx";

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
  const [isReviewSubmitting,setIsReviewSubmitting] = useState(false)
    // console.log(relatedProducts)
  useEffect(() => {
    window.scrollTo({
      top: -100,
      behavior: "smooth",
    });
    const selectedProduct = productData?.find((item) => item.id === productId);
    const p = productData?.filter(item=> item.category === selectedProduct.category);
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
const submitReview = async ({rating, description , userName}) => {
  let userId = user.uid;
  const reviewsRef = collection(db, "reviews");
  const q = query(reviewsRef, where("productId", "==", productId), where("userId", "==", userId));
  setIsReviewSubmitting(true)
  const querySnapshot = await getDocs(q);
  
  // if user has already submit the the review it will update it otherwise it will just add a new review
  if (!querySnapshot.empty) {
    const existingReview = querySnapshot.docs[0]; 
    const reviewRef = doc(db, "reviews", existingReview.id);

    const updatedReview = {
      userName,
      productId,
      userId,
      rating,
      description,
      updatedAt: Timestamp.now(), 
    };

    try {
      setIsReviewSubmitting(true)
      await setDoc(reviewRef, updatedReview);
      console.log("Review updated successfully!");
      setIsReviewSubmitting(false)
      setShowReviewForm(false)
      toast.success("Review Updated.")

    } catch (error) {
      setIsReviewSubmitting(false);
      toast.error("something went wrong. try again")
      console.error("Error updating review: ", error);
    }

  } else {
    const newReview = {
      productId,
      userId,
      userName,
      rating,
      description,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(), 
    };

    try {
      setIsReviewSubmitting(true)
      await setDoc(doc(reviewsRef), newReview);
      console.log("Review submitted successfully!");
      toast.success("Review Updated.")
      setIsReviewSubmitting(false)
      setShowReviewForm(false)

    } catch (error) {
      console.error("Error submitting review: ", error);
      toast.error("something went wrong. try again")
      setIsReviewSubmitting(false)
    }
  }
  setIsReviewSubmitting(false);
};


return (
  product ? (
  <div className="container mx-auto flex flex-col gap-3 mb-3 bg-white">
   
    <div className="text-black px-4 font-outfit py-2 md:py-5 md:px-10 flex flex-col md:flex-row gap-3">
      <div className="w-full md:w-1/2 flex flex-col items-center lg:flex-row-reverse md:items-start gap-4 overflow-x-auto pt-10">
        <div className="md:min-h-[300px] relative h-auto w-[96%] md:w-[70%]">
           <Suspense fallback={"loading.."}>
          <img
            ref={mainImageRef}
            src={product?.imageUrls[0]}
            alt="Main image"
            className="w-full max-h-[80vh] h-[80dvh] object-cover mix-blend-multiply z-30"
          />
           </Suspense>
        </div>
        <div className="flex lg:flex-col gap-3 justify-center overflow-x-auto mx-2">
          {product?.imageUrls.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={product?.title}
              onClick={handleImageClick}
              className="w-20 h-20 object-cover shadow-md cursor-pointer hover:ring-2 hover:ring-black"
            />
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col gap-3 md:px-6">
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-gray-200 text-sm rounded-full">{product?.brand}</span>
          <span className="px-3 py-1 bg-gray-200 text-sm rounded-full">{product?.category}</span>
        </div>
         <SocialShare productUrl={location.pathname} productName={product?.title}/>
        <h1 className="text-xl font-semibold">{product?.title}</h1>

        <p className="text-lg font-semibold text-gray-800">
          Price:{" "}
          {selectedSize
            ? product.variants.find((variant) => variant.size === selectedSize).price
            : product?.price}{" "}
          <span className="text-sm">PKR</span>
        </p>

        {inStock ? (
          <div>
            <h4 className="text-sm font-medium text-gray-700">Select a Size:</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {product?.variants
                .filter((variant) => variant.stock > 0)
                .map((variant) => (
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
            {error && <span className="text-red-500 text-base font-mono font-bold">{error}</span>}
          </div>
        ) : (
          <p className="text-red-500 font-bold">Out of Stock</p>
        )}

        <div>
          <h4 className="text-sm font-medium text-gray-700">Quantity:</h4>
          <QuantitySelector
            value={Quantity}
            setValue={setQuantity}
            setError={setError}
            isSizeSelected={selectedSize !== ""}
            maxValue={selectedSize ? product.variants.find((variant) => variant.size === selectedSize).stock : false}
          />
        </div>
        {selectedSize && <p>Available stock: {product.variants.find((variant) => variant.size === selectedSize).stock}</p>}

        <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
          <Button
            disabled={!inStock}
            onClick={addToCart}
            text={"Add to Cart"}
            isSubmitting={adding}
            theme={"bg-green-500"}
          />
          <CiHeart size={30} className="text-gray-700 cursor-pointer hover:text-black" />
          <Button
            onClick={toggleRevievwFormVisbility}
            text={"Add Review"}
            theme={"text-white bg-blue-500"}
          />
        </div>

        <div>
          <h4 className="text-lg font-semibold">Description:</h4>
          <p className="text-sm text-gray-700 mt-2">{product?.description}</p>
        </div>
      </div>
    </div>
    {relatedProducts.length > 0 && <RelatedProductList relatedProducts={relatedProducts} gender={gender} />}
   {reviews.length > 0 && <ReviewsList reviews={reviews} productTitle={product?.title} />}
  
    {/* Review PopUp */}
    <div
      className={`${
        showReviewForm ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0"
      } transition-all duration-300 absolute text-black px-3 py-4 top-1/2 left-1/2 md:w-[70%] w-[300px] shadow-2xl rounded transform -translate-x-1/2 -translate-y-1/2 bg-white min-h-52 z-40`}
    >
      <IoIosCloseCircleOutline
        onClick={() => setShowReviewForm(false)}
        size={40}
        className="absolute right-2 top-2 text-blue-500 cursor-pointer"
      />
      <h2 className="font-semibold text-center text-2xl">Add Review</h2>
      <ReviewForm onSubmit={submitReview} color="blue" isSubmitting={isReviewSubmitting} />
    </div>
  </div>)
  : 
  (
    <div className="h-screen flex justify-center items-center">
      <div className="loader"></div>
    </div>
  )
);

       
      
};

export default SingleProduct;