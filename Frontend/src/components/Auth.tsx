import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { SignupInput } from '@nextian/blogify-common';
import axios from 'axios';
import toast from 'react-hot-toast';


interface ParamsType{
  type: "signup" | "signin"
}

function Auth({type}: ParamsType):React.ReactElement {
  // console.log("type: ", type);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      // window.location.href = "/blogs";
      navigate("/blogs");

      toast.success(resp.data.message);
    }
    catch (error: any) {
      console.log("error: ", error.response.data);
      toast.error(error.response.data.message);
    }
    setLoading(false);
  }


  return (
    <div className="w-[90%] sm:w-[50%] flex flex-col items-center justify-center mt-10 md:mt-0">
        <div className="text-3xl text-center font-bold">
            {type === "signup" ? "Create an Account" : "Login to Blogify"}
        </div>
        
        <div className="text-slate-600 ">
            {type === "signup" ? "Already have an account? " : "Don't have an account?"}
            <Link className="pl-2 text-blue-600" to={type === "signup" ? "/signin" : "/signup"}>{type === "signup" ? "Login" : "signup"}</Link>
        </div>

        {/* form */}
        <div className="w-full mt-7">
          {
            type === "signup" && (
              <LabelledInput 
                label="Name" 
                placeholder="Enter your Name"
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
            placeholder="m@example.com"
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
              className='absolute right-2 top-[30px] text-black hover:text-gray-900 text-xs bg-black bg-opacity-10 px-2 py-1 rounded-lg'
            >
              {showPassword ? <FaEyeSlash fontSize={18}/>  : <FaEye fontSize={18}/>}
            </button>
          </div>

          <button 
            type="button"
            onClick={sendRequest}
            className="w-full mt-5 text-white bg-black hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
              {
                loading ? 
                "Loading..." :
                type === "signup" ? "Sign Up" : "Sign in"
                
              }
          </button>
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
      <label className=''>{label}</label>
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