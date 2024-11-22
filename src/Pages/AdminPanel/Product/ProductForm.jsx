import React, { useContext, useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../../config/firebaseconfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import { productDataContext } from "../../../contexts/ProductDataContext";

const ProductForm = ({ action, data }) => {
  const {contextCategories, errorMessage , successMessage} = useContext(productDataContext)

  const [uploading, setUploading] = useState(false);
  const [PreviewImages, setPreviewImages] = useState(null);
  const [Files, setFiles] = useState(null);
  const [productData, setProductData] = useState({
    title: data?.title ? data.title : "",
    category: data?.category ? data.category : "",
    brand: data?.brand ? data.brand : "",
    color: data?.color ? data.color : "",
    price: data?.price ? data.price : "",
    deliveryCharges: data?.deliveryCharges || "",
    gender : data?.gender || "",
    sizes: ["XS", "S", "M", "L", "XL"],
    imageUrls: data?.imageUrls ? data?.imageUrls : [],
    description: data?.description || "",
  });
  useEffect(() => {
    if (!data?.variants) {
      const initialVariants = productData.sizes.map((size) => ({
        size,
        color: productData.color,
        stock: "0",
        price: productData.price,
      }));
      setProductData((prev) => ({ ...prev, variants: initialVariants }));
    }
  }, [productData.sizes, productData.color]);
  let [Categories,setCategories] = useState([]);
  let Brands = ["Mendeez","Zeroyya","Zara","Adidas","Nike","H&M"];
  const Gender = ["Select", "Male", "Female", "Neuter"];
  useEffect(()=>{
    setCategories(()=>{
    let dt = contextCategories?.filter((cat)=>cat.gender === productData.gender);
      let final = ["Select",...dt];
      return final
    })
  },[contextCategories,productData.gender])

  const handleFileChange = (e) => {
    // Only when Action is Add
    if(action === "add")
    {
      const files = Array.from(e.target.files);
      console.log(files)
      setFiles(files);
      const imagePreviews = files.map((file) => {
        return URL.createObjectURL(file);
      });
      setPreviewImages(imagePreviews);
    }else{
      // If Action is Edit
      ErrorMessage("You Can't update Images")
    }
  };
  
  const handleChange = (event) => {
    const { type, name, value } = event.target;

    if (name.startsWith("variant-")) {
      //    example value of name : varaint-S-price or varaint-XL-price
      const [_, size, field] = name.split("-");

      setProductData((prev) => {
        const numberValue = parseInt(value);
        const updatedVariants = prev.variants.map((variant) =>
          variant.size === size ? { ...variant, [field]: numberValue } : variant
        );
        return { ...prev, variants: updatedVariants };
      });
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const AddFormData = async (e) => {
    e.preventDefault();
    setUploading(true);
    //  if action is Add
    // window.scrollY(0,0)
    if(action==="add")
    {
      await writeProduct();
    } 
    else 
    {
      // action === "update"
      UpdateProductData()
    }
    
  };

  const writeProduct = async () => {
    try {
      const docRef = doc(collection(db, "products"));
      const productId = docRef.id;
      const imageUrls = await uploadProductImages(Files, productId);
      if (imageUrls.length === 0) {
        errorMessage("Failed to upload images. Try again.");
        setUploading(false);
        return;
      }

      const finalProductData = {
        ...productData,
        id: productId,
        imageUrls,
      };

      await setDoc(docRef, finalProductData);

      successMessage('Product SuccessFully added.');
    } catch (error) {
      ErrorMessage("Something went wrong");
      console.error("Error saving document:", error);
    } finally {
      setUploading(false);
    }
  }

  const UpdateData = async() =>{
    alert("Updated");
  }

  // Run This Function  Only , when the action is Add (action = Add)
  async function uploadProductImages(files, Id) {
    if (!files || files.length === 0) {
      errorMessage("Please select images for the product.");
      return [];
    }

    const uploadPromises = files.map(async (file) => {
      const name = Date.now() + file.name;
      const storageRef = ref(storage, `products/${Id}/${name}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    });

    try {
      const imageUrls = await Promise.all(uploadPromises);
      //   console.log( imageUrls);
      return imageUrls;
    } catch (error) {
      errorMessage("Error uploading images");
      console.error(error);
      return [];
    }
  }

  return (
    <div className="w-full px-2 py-4 flex justify-start items-center relative z-10">
      {uploading && (
        <div className="absolute inset-0 h-full w-full flex flex-col gap-7 justify-center items-center bg-[#23212198]">
          <span className="loader"></span>
          <h1 className="text-yellow-600">Uploading...</h1>
        </div>
      )}
      <form
        className="text-[#d3cf52] flex flex-wrap md:justify-center justify-start gap-4 w-full items-start "
        onSubmit={AddFormData}
      >
        <div className="form-part-1 w-full md:w-[50%] md:min-w-[300px] md:max-w-[600px] bg-[#1E293B] border border-gray-700 ml-2 rounded-md p-3">
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
              autoComplete="off"
              className="bg-transparent outline-none border rounded-lg border-gray-700 text-white px-1 py-1"
            />
          </div>
          <div className="flex gap-2 flex-wrap w-full">
            <div className=" text-sm text-[#ccc8c8] flex flex-col gap-1 md:basis-[45%] basis-[90%] border-gray-600 rounded-md py-1">
              <span>
                Category: <sup>*</sup>
              </span>
              <select
              id="category"
                name="category"
                disabled={productData.gender === ""}
                value={productData.category}
                onChange={(e) => handleChange(e)}
                className="bg-transparent cursor-pointer outline-none border rounded-lg border-gray-700 text-white px-1 py-1"
              >
                {Categories.map((cat) => (
                  <option value={cat.category} className="bg-gray-700" key={cat.category}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>
            <div className=" text-sm text-[#ccc8c8] flex flex-col gap-1 md:basis-[45%] basis-[90%] border-gray-600 rounded-md py-1">
              <span>
                Brand: <sup>*</sup>
              </span>
              <select
                name="brand"
                value={productData.brand}
                onChange={(e) => handleChange(e)}
                autoComplete="off"
                className="bg-transparent cursor-pointer outline-none border rounded-lg border-gray-700 text-white px-1 py-1"
              >
                {Brands.map((brand) => (
                  <option value={brand} className="bg-gray-700" key={brand}>
                    {brand}
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
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                className="bg-transparent outline-none border rounded-lg border-gray-700 text-white px-1 py-1"
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
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                className="bg-transparent outline-none border rounded-lg border-gray-700 text-white px-1 py-1"
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
              autoComplete="off"
              className="bg-transparent cursor-pointer outline-none border rounded-lg border-gray-700 text-white px-1 py-1"
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
              autoComplete="off"
              className="bg-transparent outline-none border rounded-lg border-gray-700 text-white px-1 py-1"
            />
          </div>
          <div className=" text-sm text-[#ccc8c8] flex flex-col gap-1">
            <span>
              Description: <sup>*</sup>
            </span>
            <textarea
              name="description"
              value={productData.description}
              rows={4}
              cols={40}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              className="bg-transparent outline-none border rounded-lg border-gray-700 text-white px-1 py-1"
            />
          </div>
        </div>
        <div className="form-part-2 sm:w-full md:w-[300px] flex flex-col justify-center items-center py-4 gap-2 bg-[#1E293B] rounded-md border border-gray-500">
          <label
            htmlFor="Images"
            className="upload-Images cursor-pointer flex flex-col text-[#ccc8c8] justify-center items-center rounded  border border-dashed border-yellow-400 w-[200px] relative h-[150px]"
          >
            <input
              type="file"
              multiple
              accept="image/*"
              id="Images"
              className="opacity-0 absolute"
              onChange={(e) => handleFileChange(e)}
            />
            <FiUploadCloud size={40} color="yellow" />
            <p className="text-sm text-center">
              click here to{" "}
              <span className="text-yellow-400">Upload your Images</span>
            </p>
          </label>
          <p
            className="text-[10px] px-3
           text-white"
          >
            You need to add at least 4 images. Pay attention to the quality of
            the pictures you add, comply with the background color standards.
            Pictures must be in certain dimensions. Notice that the product
            shows all the details.
          </p>
          {PreviewImages && (
            <div className="flex flex-wrap mt-2 gap-2 px-3">
              {PreviewImages.map((preview, index) => (
                <div key={index}>
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-[100px] h-[100px] object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {productData.color.length > 3 && (
          <div className="form-part-3 basis-[100%]  md:basis-[600px]  bg-[#1E293B] flex justify-center py-1 gap-3">
            <div className="variants ">
              <h3 className="text-center font-semibold mt-2">
                Product Variants
              </h3>
              {productData.variants.map((item, idx) => (
                <div className="variant" key={idx}>
                  <h3 className="text-white">
                    Stock and Price of {item.size} size
                  </h3>
                  <div className="fields-container flex gap-4">
                    <div className=" text-sm text-[#ccc8c8] flex flex-col gap-1 ">
                      <span>
                        Price: <sup>*</sup>
                      </span>
                      <input
                        type="number"
                        name={`variant-${item.size}-price`}
                        value={item.price}
                        onChange={(e) => handleChange(e)}
                        autoComplete="off"
                        className="bg-transparent outline-none border rounded-lg border-gray-700 text-white px-1 py-1"
                      />
                    </div>
                    <div className=" text-sm text-[#ccc8c8] flex flex-col gap-1 ">
                      <span>
                        Stock: <sup>*</sup>
                      </span>
                      <input
                        type="number"
                        name={`variant-${item.size}-stock`}
                        value={item.stock}
                        onChange={(e) => handleChange(e)}
                        autoComplete="off"
                        className="bg-transparent outline-none border rounded-lg border-gray-700 text-white px-1 py-1"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="submit"
                className="text-white mt-2 mx-auto px-3 py-1 w-[80%] rounded-md bg-[#dcd752] disabled:bg-[#d1cd4fcb] disabled:cursor-not-allowed"
                disabled={uploading}
              >
                Upload
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
export default ProductForm;