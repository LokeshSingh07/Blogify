import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { SignupInput } from '@nextian/blogify-common';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';


interface ParamsType{
  type: "signup" | "signin"
}

function Auth({type}: ParamsType):React.ReactElement {
  // console.log("type: ", type);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const [showPassword, setShowPassword] = React.useState(false);
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  })
  

  const sendRequest = async ()=>{
    setLoading(true);
    try {
      const resp  = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/${type=="signin"? "signin" : "signup"}`, postInputs);

      console.log("Response : ", resp.status, resp.data);
      
      const token = resp.data.jwt;
      localStorage.setItem("token", token);
      localStorage.setItem("user", resp?.data?.user?.name);
      // window.location.href = "/blogs";
      navigate("/blogs");

      toast.success(resp.data.message);
    }
    catch (error: AxiosError | any) {
      console.log("error: ", error.response.data);
      toast.error(error.response.data.message);
    }
    setLoading(false);
  }

  // if user already login sent to blogs page
  useEffect(()=>{
    if(token){
      navigate("/blogs");
    }
  },[token])

  return (
    <div className="sm:w-[50%] md:w-[40%] lg:w-[70%] flex flex-col items-center justify-center px-4 md:px-5 py-5 border rounded-xl shadow-sm bg-white m-5">
        <div className="text-3xl text-center font-bold">
            {type === "signup" ? "Join Blogify" : "Welcome back"}
        </div>

        <div className='text-[15px] text-[#807884] text-center mt-2'>
          {
            type == 'signin' ?
            "Sign in to access your personalized homepage, follow your favorite authors and publications, and more." :
            "Create an account to personalize your homepage, follow your favorite authors and publications, applaud stories you love, and more." 
          }
        </div>
        
        {/* Signin */}
        <div className="w-full flex flex-col gap-3 my-6">
          <button className="w-full mx-auto flex items-center justify-center gap-2 py-2 px-4 border rounded-md text-gray-700 border-gray-300 hover:bg-gray-100">
            <span className="material-icons"><FaGoogle/></span> 
            <span className='text-sm font-semibold'>{type==='signin' ? "Sign in with Google" : "Sign up with Google"}</span>
          </button>
        </div>
       
        {/* divider */}
        <div className='w-full flex items-center justify-center'>
          <div className='flex-1 h-[1px] bg-slate-200'></div>
          <div className="text-center text-gray-500 text-xs whitespace-nowrap">
            {
              type === "signin" ? "OR SIGN IN WITH EMAIL" : "OR SIGN UP WITH EMAIL"
            }
          </div>
          <div className='flex-1 h-[1px] bg-slate-200'></div>
        </div>
       
        {/* form */}
        <div className="w-full mt-7">
          {
            type === "signup" && (
              <LabelledInput 
                label="Full Name" 
                placeholder="John Doe"
                onchange={(e)=> (
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value
                  })
                )}
              />
            )
          }
          
          <LabelledInput 
            label="Email" 
            type='email'
            placeholder="john@example.com"
            onchange={(e)=> (
              setPostInputs((c) => ({
                ...c,
                email: e.target.value
              }))
            )}
          />

          <div className='relative'>
            <LabelledInput 
              label="Password" 
              type={showPassword ? "text" : "password"}
              placeholder=""
              onchange={(e)=> (
                setPostInputs((c) => ({
                  ...c,
                  password: e.target.value
                }))
              )}
            />
            <button 
              type="button" 
              onClick={()=>setShowPassword(!showPassword)}
              className='absolute right-2 top-[26px] text-black hover:text-gray-900 text-xs bg-black bg-opacity-10 px-2 py-1 rounded-lg'
            >
              {showPassword ? <FaEyeSlash fontSize={18}/>  : <FaEye fontSize={18}/>}
            </button>

            {
              postInputs?.password.length > 0 && postInputs.password.length < 8 && (
                <div className='text-red-500 text-xs '>
                  Password must be at least 8 characters
                </div>
              ) 
            }
          </div>

          <button 
            type="button"
            onClick={sendRequest}
            className="w-full mt-5 text-white bg-black hover:bg-black/85 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
              {
                loading ? 
                "Loading..." :
                type === "signup" ? "Sign Up" : "Sign In"
                
              }
          </button>
        </div>


        <div className="text-slate-600 ">
            {type === "signup" ? "Already have an account? " : "No account?"}
            <Link className="pl-2 font-semibold text-black hover:underline" to={type === "signup" ? "/signin" : "/signup"}>{type === "signup" ? "Login" : "Create one"}</Link>
        </div>
    </div>
  )
}



type LabelledInputType = {
  label: string,
  type?: string,
  placeholder: string,
  onchange?: (e: React.ChangeEvent<HTMLInputElement>)=>void
}

function LabelledInput({label, type, placeholder, onchange}: LabelledInputType):React.ReactElement{
  return (
    <div className="flex flex-col mb-3">
      <label className='text-sm font-semibold'>{label}</label>
      <input 
        type={type || "text"} 
        placeholder={placeholder}
        onChange={onchange}
        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 w-full'
      />
    </div>
  )
}




export default Auth