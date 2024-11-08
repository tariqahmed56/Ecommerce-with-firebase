import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../config/firebaseconfig";
import { useAuth } from "../../contexts/AuthContext";
const Login = () => {
  const { LoginUser , setUser , user , fetchUserById} = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleFormChange = (e) => {
    let feildToUpdate = e.target.name;
    setFormData((prev) => {
      let updatedState = {
        ...prev,
        [feildToUpdate]: e.target.value,
      };
      return updatedState;
    });
  };
  const handleLogin = async (e) => {
    LoginUser(formData.email, formData.password);
    console.log(formData)
  };
  
  return (
    <div className="h-[90dvh] text-black flex justify-center items-center">
      <div className="login shadow-md px-5 py-2">
        <form
          className="w-full max-w-xs mx-auto mt-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-xl font-bold mb-4">Log in to Your Account</h1>
          <Input
            type="email"
            label="Email"
            name={"email"}
            onChange={handleFormChange}
          />
          <Input
            type="password"
            label="password"
            name={"password"}
            onChange={handleFormChange}
          />

          {/* <p className="text-red-500 text-xl font-bold mb-2"></p> */}
          <div className="text-center">
            <Button text={"Login"} onClick={handleLogin} />

            <h3 className="text-xl font-bold mt-4 p-0">New Customer?</h3>

            <Link
              className="border-0 m-0 py-3 text-xl underline hover:text-red-400 block"
              to="/SignUp"
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
