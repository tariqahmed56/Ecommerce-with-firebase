import React, { useState } from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button';
const Settings = () => {
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
  const ChangePassword = () =>{
       alert('password changed')
  }
  return (
    <div className="contacts shadow-md flex flex-col  gap-3 py-2 rounded-md border border-gray-400 px-3">
      <h2 className='font-normal text-xl'>Change Password </h2>
      <form onSubmit={(e)=>e.preventDefault()}>
      <Input type='password' label={'Old password'} value={passwords.oldPassword} placeholder='Old Password' name={'oldPassword'} onChange={handlepasswordsChange}/>
      <Input type='password' label={'New Password'} value={passwords.newPassword} placeholder='New Password' name={'newPassword'} onChange={handlepasswordsChange}/>
       <Button onClick={ChangePassword} text={'Save Changes'}/>
      </form>
      </div>
  )
}

export default Settings
