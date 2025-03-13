import React from "react";
import toast from "react-hot-toast";
import { CiBellOn } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png"


export const AppBar: React.FC = ()=>{

    const username = localStorage.getItem("user");
    const navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        toast.success("Logout Successfull");
        navigate('/signin')
    }

    // console.log(window.location.pathname)


  return (
    <div className="w-full flex flex-row justify-between items-center px-5 py-1 select-none">

        <div className="">
            <Link to={"/blogs"}>
                <img src={Logo} alt="Logo" className="w-24"/>
            </Link>
        </div>

        <div className="flex flex-row items-center gap-3">
            {
                window.location.pathname !== "/publish" && 
                <button className="bg-green-700 text-sm px-4 py-2 rounded-full text-white"
                    onClick={()=> {navigate("/publish")}}    
                >
                    Create Blog
                </button>
            }
            
            <button className='text-gray-500'><IoIosMore fontSize={22}/></button> 
            <button className='text-gray-500'><CiBellOn fontSize={22}/></button>
            <button className='' onClick={()=> {handleLogout()}}
            >
                <img src={`https://avatar.iran.liara.run/username?username=${username}`} alt="profile" className="w-8 bg-slate-50 rounded-full"/>
            </button>

        </div>
    </div>
  )
}