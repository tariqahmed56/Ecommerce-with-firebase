import React, { useContext, useState } from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { productDataContext } from '../../contexts/ProductDataContext'
const Signup = () => {
  const {CreateAccount} = useAuth();
  const [error,setError] = useState('');
  const { successMessage } = useContext(productDataContext);
  const [isSubmitting, setIsSubmitting] = useState('');
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
  const handleSignUp = async ()=>{
    setError('');
    await CreateAccount(formData.email,formData.password, setError  , successMessage , setIsSubmitting) ;
  }

  return (
    <div className='h-[90dvh] text-black flex justify-center items-center'>
    <div className="login shadow-md px-5 py-2">
<form className="w-full max-w-xs mx-auto mt-8" onSubmit={(e)=>e.preventDefault()}>
<h1 className="text-xl font-bold mb-4">Create Your Account</h1>
<Input type='email' label='Email' name={'email'} onChange={handleChange}/>
<Input type='password' label='password' name={'password'} onChange={handleChange}/>

{ error && <p className="text-red-500  font-medium mb-2">{error}</p>
}
<div className="text-center">
<Button onClick={handleSignUp} text={'Create Account'} isSubmitting={isSubmitting}/>  
  <h3 className="text-xl font-bold mt-4 p-0">already have an Account?</h3>
  
  <Link
    className="border-0 m-0 py-3 text-xl underline hover:text-red-400 block"
    to="/login"
  >
  then Sign Here
  </Link>
</div>
</form>
    </div>
  </div>
  )
}

export default Signup
