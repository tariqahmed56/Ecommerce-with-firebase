import React, { useState } from 'react'
import Input from '../../../Components/Input'
import Button from '../../../Components/Button.jsx'
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../../../config/firebaseconfig.js';
const AddCategory = () => {
  let [Error , setError] = useState('');
  let [isSubmitting,setIsSubmitting] = useState(false);
  let [FormData,setFromData] = useState({
    gender: "",
    category: ""
  })
  const HandleForm = async (e) => {
    e.preventDefault();
    if(isValid()){
      try {
        setIsSubmitting(true);
        const collectionRef =collection(db,`categories`);
      await addDoc(collectionRef, {...FormData});
      setIsSubmitting(false)
      console.log(FormData);
      } catch (error) {
        setIsSubmitting(false)
        alert('something Went Wrong, Check Your Internet and Try again.')
      }
    }else{
      alert("All fields are required")
    }
  }
  const ChangeHandler = (e) => {
    let {name , value} = e.target ; 
    setFromData((prev)=>{
      return {...prev , [name]:value }
    });
  }
  function isValid() {
    if (FormData.gender && FormData.category) {
      setError(""); 
      return true;
    }
  
    if (!FormData.gender && !FormData.category) {
      setError("Gender and Category Name are required");
    } else if (!FormData.gender) {
      setError("Gender is required");
    } else {
      setError("Category Name is required");
    }
  
    return false;
  }
  
  return (
    <div className='Add-Category w-full flex justify-center items-center text-white flex-col h-full gap-2'>
      <h1 className='font-semibold text-xl'>Add Category</h1>
      <form action='#'>
       <select 
       name='gender' 
       onChange={ChangeHandler}
        className='bg-transparent text-white border text-sm border-gray-700 px-3 py w-[400px] py-2 mb-2 rounded'>
        <option className='bg-slate-800' value={''}>Select Gender</option>
        <option className='bg-slate-800' value={'Male'}>Male</option>
        <option className='bg-slate-800' value={'Female'}>Female</option>
       </select>
        <Input type="text" label="category" width={'w-[400px]'} 
        name={"category"} value={FormData.category} onChange={ChangeHandler}
        placeholder='Type Category Name ... '
        className='bg-transparent text-white mb-2 border-gray-300 border rounded'
        />
        <Button text={"Add Category"} width={'100%'} onClick={HandleForm}/>
      </form>
    </div>
  )
}

export default AddCategory
