import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiBellOn } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png"


export const AppBar: React.FC = ()=>{

    const username = localStorage.getItem("user");
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = ()=>{
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        toast.success("Logout Successfull");
        navigate('/signin')
    }

    // console.log(window.location.pathname)


  return (
    <div className="w-full flex flex-row justify-between items-center px-2 py-1 select-none">

        <div className="">
            <Link to={"/blogs"}>
                <img src={Logo} alt="Logo" className="w-24"/>
            </Link>
        </div>

        <div className="flex flex-row items-center gap-3">
            {
                window.location.pathname !== "/publish" && 
                <button className="bg-green-700 text-sm px-4 py-2 rounded-full text-white hover:bg-green-600"
                    onClick={()=> {navigate("/publish")}}    
                >
                    Create Blog
                </button>
            }
            
            <button className='hidden lg:block text-gray-500'><IoIosMore fontSize={22}/></button> 
            <button className='hidden lg:block text-gray-500'><CiBellOn fontSize={22}/></button>
            <button className='' onClick={()=> {setIsModalOpen(true)}}
            >
                <img src={`https://avatar.iran.liara.run/username?username=${username}`} alt="profile" className="w-8 bg-slate-50 rounded-full"/>
            </button>

        </div>

        {/* Logout Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                    <h3 className="text-lg font-semibold">Confirm Logout</h3>
                    <p className="text-gray-600 mt-2">Are you sure you want to logout?</p>

                    <div className="mt-4 flex justify-center space-x-4">
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}