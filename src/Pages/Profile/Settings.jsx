import React, { useContext, useState } from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button';
import { AuthContext } from '../../contexts/AuthContext';
import { db } from '../../config/firebaseconfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { productDataContext } from '../../contexts/ProductDataContext';
const Settings = () => {
  let {changePassword , user } = useContext(AuthContext);
  let {errorMessage , successMessage } = useContext(productDataContext);
  let [isSubmitting , setIsSubmitting] = useState(false);
   let [passwords,setPasswords] = useState({
    oldPassword: "",
    newPassword: ""
  });
  const handlepasswordsChange = (e) =>{

   const update  = e.target.name;
   setPasswords(prev=>{
    let updatedState = {
      ...prev,
      [update] : e.target.value
    }
    return updatedState;
   })
  }
   let [address,setAddress] = useState('');
   function HandleAddressChange(e){
       setAddress(e.target.value)
   }
   async function HandleAddressSubmit(e){
    e.preventDefault();
    const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);
  try {
    if(userDoc.exists()){
      setIsSubmitting(true);
      let userData = userDoc.data();
      if(address){
        let userAddressArr = userData.addresses || [];
        await updateDoc(userRef,{addresses:[...userAddressArr , address]});
        // await updateDoc(userRef,{addresses:['Sodha boys Hostel Umerkot near boys degree college umerkot']}); //for Testing
        setIsSubmitting(false);
        successMessage('Address Added SuccessFully');
        // throw new Error('error')
      }

    }
  } catch (error) {
    setIsSubmitting(false);
    errorMessage('Something Went wrong')
     console.error(error);
  }
  
  }
  console.log(user)
  return (
    <div className="contacts shadow-md flex flex-col  gap-3 py-2 rounded-md  px-3 relative">
      <form onSubmit={(e)=>e.preventDefault()} className='flex flex-col gap-2 px-0 md:px-5'>
        <fieldset className='border border-gray-300 px-3 rounded py-2'>
          <legend className='font-normal text-xl px-2'>
          Change Password
          </legend>
      <Input type='password' label={'Old password'} value={passwords.oldPassword} width={'w-full'} placeholder='Old Password' name={'oldPassword'} onChange={handlepasswordsChange}/>
      <Input type='password' label={'New Password'} value={passwords.newPassword} placeholder='New Password' name={'newPassword'} onChange={handlepasswordsChange}/>
       <Button onClick={()=>changePassword(passwords.oldPassword,passwords.newPassword)} text={'Save Changes'}/>
        </fieldset>
        <h1 className='font-play text-xl font-semibold text-center leading-3 p-0 m-0 py-3 relative'><span className='inline-block w-1/3 h-[1px] bg-[#656060]  relative  mx-2 -top-[6px] '></span>OR <span className="inline-block w-1/3 h-[1px] bg-[#777373] relative mx-2 -top-[6px]"></span></h1>
      </form>
         <form action="#" className='px-0 md:px-5'>
          <fieldset className='border border-gray-300 px-3 rounded'>
          <legend className='text-xl font-regular  py-2 px-2'>Add Address</legend>
          <textarea name="Address" id="Address" value={address} onChange={HandleAddressChange}
           placeholder='Add your Address'
            maxLength={100} minLength={30}
             rows={5}
             required
             className='w-[80%] border rounded px-3 py-2 outline-none'/>
           <Button text={"Submit"} onClick={HandleAddressSubmit} isSubmitting={isSubmitting}/>
          </fieldset>

         </form>
      </div>
  )
}

export default Settings
