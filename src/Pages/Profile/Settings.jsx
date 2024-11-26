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
    <div className="contacts flex flex-col items-center justify-center gap-6 py-6 px-4 sm:px-6 md:px-8 lg:px-12">
  {/* Password Change Form */}
  <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6 w-full max-w-lg">
    <fieldset className="border border-gray-300 rounded-md px-6 py-4 shadow-sm">
      <legend className="font-medium text-lg sm:text-xl px-4 uppercase text-gray-600">
        Change <span className="text-gray-800">Password</span>
      </legend>
      <Input
        type="password"
        width="w-full"
        label="Old Password"
        value={passwords.oldPassword}
        placeholder="Old Password"
        name="oldPassword"
        onChange={handlepasswordsChange}
        className="mt-4"
      />
      <Input
        type="password"
        width="w-full"
        label="New Password"
        value={passwords.newPassword}
        placeholder="New Password"
        name="newPassword"
        onChange={handlepasswordsChange}
        className="mt-4"
      />
      <div className="mt-6 flex justify-end">
        <Button onClick={() => changePassword(passwords.oldPassword, passwords.newPassword)} text="Save Changes" />
      </div>
    </fieldset>

    {/* Divider */}
    <h1 className="font-medium text-lg text-center text-gray-500 relative flex items-center">
      <span className="flex-1 h-[1px] bg-gray-300"></span>
      <span className="px-4">OR</span>
      <span className="flex-1 h-[1px] bg-gray-300"></span>
    </h1>
  </form>

  {/* Add New Address Form */}
  <form action="#" className="w-full max-w-lg">
    <fieldset className="border border-gray-300 rounded-md px-6 py-4 shadow-sm">
      <legend className="font-medium text-lg sm:text-xl px-4 uppercase text-gray-600">
        Add New <span className="text-gray-800">Delivery Address</span>
      </legend>
      <textarea
        name="Address"
        id="Address"
        value={address}
        onChange={HandleAddressChange}
        placeholder="Add your Address"
        maxLength={100}
        minLength={30}
        rows={5}
        required
        className="w-full mt-4 border rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400"
      />
      <div className="mt-6 flex justify-end">
        <Button text="Submit" onClick={HandleAddressSubmit} isSubmitting={isSubmitting} />
      </div>
    </fieldset>
  </form>
</div>

  )
}

export default Settings
