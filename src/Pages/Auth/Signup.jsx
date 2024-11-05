import React, { useState } from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { Link } from 'react-router-dom'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../config/firebaseconfig'
import { useAuth } from '../../contexts/AuthContext'
const Signup = () => {
  const {CreateAccount} = useAuth();
  const [formData,setFormData] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e) =>{
    let feildToUpdate = e.target.name;
    setFormData(prev=>{
      let updatedState = {
        ...prev,
        [feildToUpdate] : e.target.value
      }
      return updatedState;
    })
  }
  const handleResgisterAccount =async (e) =>{
    e.preventDefault();
    CreateAccount(formData.email,formData.password)
  }
  return (
    <div className='h-[90dvh] text-black flex justify-center items-center'>
    <div className="login shadow-md px-5 py-2">
<form className="w-full max-w-xs mx-auto mt-8" onSubmit={(e)=>e.preventDefault()}>
<h1 className="text-xl font-bold mb-4">Create Your Account</h1>
<Input type='email' label='Email' name={'email'} onChange={handleChange}/>
<Input type='password' label='password' name={'password'} onChange={handleChange}/>

{/* <p className="text-red-500 text-xl font-bold mb-2"></p> */}

<div className="text-center">
<Button text={'Create Account'} onClickhandler={(e)=>handleResgisterAccount(e)}/>
  
  <h3 className="text-xl font-bold mt-4 p-0">already have an Account?</h3>
  
  <Link
    className="border-0 m-0 py-3 text-xl underline hover:text-red-400 block"
    to="/login"
  >
  then Login here
  </Link>
</div>
</form>
    </div>
  </div>
  )
}

export default Signup
