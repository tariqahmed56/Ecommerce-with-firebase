import React, { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { collection, addDoc, doc , setDoc } from "firebase/firestore"; 
import { db , storage } from "../../../config/firebaseconfig";
import {  ref, uploadBytesResumable, getDownloadURL , uploadBytes } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';


const ProductForm = ({ action, data }) => {
    const [uploading,setUploading] = useState(false);
  const [PreviewImages, setPreviewImages] = useState(null);
  const [Files,setFiles] = useState(null);
  const [productData, setProductData] = useState({
    title: data?.title ? data.title : "",
    category: data?.category ? data.category : "",
    brand: data?.brand ? data.brand : "",
    color: data?.color ? data.color : "",
    price: data?.price ? data.price : "",
    deliveryCharges: data?.deliveryCharges || "",
    sizes: ["XS", "S", "M", "L", "XL"],
    imageUrls: data?.imageUrls ? data?.imageUrls : [],
    description: data?.description || "",
  });
  useEffect(() => {
    const variants = productData.sizes.map((size, index) => {
      let object = { color: productData.color, size: size, stock: 0, Price: 0 };
      return object;
    });

    setProductData((prev) => {
      return { ...prev, variants };
    });
    console.log(productData);
  }, []);
  let Categories = ["A", "b", "c", "e"];
  const Gender = ["Male", "Female", "Neuter"]; 
  const handleFileChange =  (e) =>{
       const files = Array.from(e.target.files);
       setFiles(files);
       const imagePreviews = files.map((file) => {
        return URL.createObjectURL(file);
      });
      setPreviewImages(imagePreviews);
  };
  const handleChange = (event) =>{
    let {type , name , value , checked} = event.target;
    console.log(name)
    setProductData((prev)=>{
        let newData = {
            ...prev,
            [name] : value
        }
        return newData;
    });
    console.log(productData)
  }
  const successMessage = () => {
    toast.success("Product Successfully Added", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const ErrorMessage = (message) =>{
    toast.error(message, {
        position: "top-right",
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }

  const AddFormData = async (e) =>{
    e.preventDefault();
   
    try {
        setUploading(true)
        const docRef = await doc(collection(db, "products"));
        const productId = docRef.id;
          await uploadProductImages(Files, productId);

     await setDoc(docRef, {...productData , id: productId});
     setUploading(false);
     successMessage();
    } catch (error) {
        ErrorMessage("Something went wrong");
        console.log(error);
        }
        
       
  }
  async function uploadProductImages(files, Id) {
    if(files.length < 0){
ErrorMessage("Please please select images for Product");
return;
    }
    const imageUrls = [];
  
    for (const file of files) {
      // MAKING UNIQUE NAME
      const name = Date.now() + file.name;
      const storageRef = ref(storage, `products/${Id}/${name}`);
      // Upload 
     let uploadTask =  await uploadBytes(storageRef, file);
    //   GET URL
      const url = await getDownloadURL(storageRef);
      imageUrls.push(url);
    //   console.log(imageUrls)
    }
  
  
    setProductData((prev)=>{
        return {...prev,imageUrls:[...imageUrls]}
    })
  }

  return (
    <div className="w-full px-2 py-4 flex justify-start items-center relative">
    {uploading && <div className="bg-[#25232395] w-full h-full absolute inset-0 flex justify-center items-center text-xl text-white">Please Wait while uplaoding</div>}
      <form className="text-[#d3cf52] flex flex-wrap gap-4 w-full items-start" onSubmit={AddFormData}>
        <div className="form-part-1 md:w-[500px] bg-[#1E293B] border border-gray-700 ml-2 rounded-md p-3">
          <h1 className="uppercase text-xl font-medium text-center">
            {action} Product
          </h1>
          <div className=" text-sm text-[#ccc8c8] flex flex-col gap-1">
            <span>
              Product title: <sup>*</sup>
            </span>
            <input
              type="text"
              name="title"
              value={productData.title}
              onChange={(e) => handleChange(e)}
              className="bg-transparent outline-none border rounded-lg border-gray-700 text-white px-1 py-2"
            />
          </div>
          <div className="flex gap-2 flex-wrap w-full">
            <div className=" text-sm text-[#ccc8c8] flex flex-col gap-1 md:basis-[45%] basis-[90%] border-gray-600 rounded-md py-2">
              <span>
                Category: <sup>*</sup>
              </span>
              <select
                name="brand"
                value={productData.brand}
                onChange={(e) => handleChange(e)}
                className="bg-transparent cursor-pointer outline-none border rounded-lg border-gray-700 text-white px-1 py-2"
              >
                {Categories.map((cat) => (
                  <option value={cat} className="bg-gray-700">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className=" text-sm text-[#ccc8c8] flex flex-col gap-1 md:basis-[45%] basis-[90%] border-gray-600 rounded-md py-2">
              <span>
                Brand: <sup>*</sup>
              </span>
              <select
                name="category"
                value={productData.category}
                onChange={(e) => handleChange(e)}
                className="bg-transparent cursor-pointer outline-none border rounded-lg border-gray-700 text-white px-1 py-2"
              >
                {Categories.map((cat) => (
                  <option value={cat} className="bg-gray-700">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className=" text-sm text-[#ccc8c8] flex flex-col gap-1 ">
              <span>
                color: <sup>*</sup>
              </span>
              <input
                type="text"
                name="color"
                placeholder="please enter hax code of color"
                value={productData.color}
                onChange={(e) => handleChange(e)}
                className="bg-transparent outline-none border rounded-lg border-gray-700 text-white px-1 py-2"
              />
            </div>
            <div className=" text-sm text-[#ccc8c8] flex flex-col gap-1">
              <span>
                Base Price: <sup>*</sup>
              </span>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={(e) => handleChange(e)}
                className="bg-transparent outline-none border rounded-lg border-gray-700 text-white px-1 py-2"
              />
            </div>
          </div>
          <div className=" text-sm text-[#ccc8c8] flex flex-col gap-1">
            <span>
              Gender: <sup>*</sup>
            </span>
            <select
              name="gender"
              value={productData.gender}
              onChange={(e) => handleChange(e)}
              className="bg-transparent cursor-pointer outline-none border rounded-lg border-gray-700 text-white px-1 py-2"
            >
              {Gender.map((gen) => (
                <option value={gen} className="bg-gray-700">
                  {gen}
                </option>
              ))}
            </select>
          </div>
          <div className=" text-sm text-[#ccc8c8] flex flex-col gap-1">
            <span>
              Delivery Charges: <sup>*</sup>
            </span>
            <input
              type="number"
              name="deliveryCharges"
              value={productData.deliveryCharges}
              onChange={(e) => handleChange(e)}
              className="bg-transparent outline-none border rounded-lg border-gray-700 text-white px-1 py-2"
            />
          </div>
          <div className=" text-sm text-[#ccc8c8] flex flex-col gap-1">
            <span>
              Description: <sup>*</sup>
            </span>
            <textarea
              name="description"
              value={productData.description}
              onChange={(e) => handleChange(e)}
              className="bg-transparent outline-none border rounded-lg border-gray-700 text-white px-1 py-2"
            />
          </div>
        </div>
        <div className="form-part-2 md:w-[350px] flex flex-col justify-center items-center py-4 gap-2 bg-[#1E293B] rounded-md border border-gray-500">
          <label
            htmlFor="Images"
            className="upload-Images cursor-pointer flex flex-col text-[#ccc8c8] justify-center items-center rounded  border border-dashed border-yellow-400 w-[200px] relative h-[150px]"
          >
            <input type="file" multiple accept="image/*" id="Images" className="opacity-0 absolute"  onChange={(e)=>handleFileChange(e)}/>
            <FiUploadCloud size={40} color="yellow" />
            <p className="text-sm text-center">
              click here to{" "}
              <span className="text-yellow-400">Upload your Images</span>
            </p>
          </label>
          <p className="text-[10px] px-3
           text-white">
            You need to add at least 4 images. Pay attention to the quality of
            the pictures you add, comply with the background color standards.
            Pictures must be in certain dimensions. Notice that the product
            shows all the details
          </p>
          {PreviewImages &&
            <div 
          className="flex flex-wrap mt-2 gap-2 px-3"
          >
        {PreviewImages.map((preview, index) => (
          <div key={index}>
            <img
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-[100px] h-[100px] object-cover rounded-md"
            />
          </div>
        ))}

      </div>}
  <button type="submit" className="text-white px-3 py-2 rounded-md bg-yellow-500">click here</button>
        </div>
      </form>
      
    </div>
  );
};

export default ProductForm;
