import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";




export const AppBar: React.FC = ()=>{

    const username = localStorage.getItem("user");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); 

    const handleLogout = ()=>{
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        toast.success("Logout Successfull");
        navigate('/signin')
    }

    // console.log(window.location.pathname)


    const linkClass = (path: string) =>
        `pb-1 border-b-2 ${
        location.pathname === path
            ? "border-green-600 text-green-600"
            : "border-transparent text-gray-600 hover:text-green-600 hover:border-green-600"
        } transition-colors`;

    

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-row justify-between items-center px-2 py-3 select-none">

        {(username && window.location.pathname != '/') && 
            (<div className="w-full flex flex-row items-center justify-between gap-5">
                <div className="">
                    <Link to="/" className="blog-title text-2xl font-bold text-green-700">Blogify</Link>
                </div>

                <div className="flex items-center gap-5">
                    {
                        window.location.pathname !== "/publish" && 
                        <button className="bg-green-700 text-sm px-4 py-2 rounded-full text-white hover:bg-green-600"
                            onClick={()=> {navigate("/publish")}}    
                        >
                            Create Blog
                        </button>
                    }
                    
                    <button className='bg-slate-200 w-10 h-10 rounded-full p-1' onClick={()=> {setIsModalOpen(true)}}
                    >
                        <img src={`https://avatar.iran.liara.run/username?username=${username}`} alt="profile" className="w-8 bg-slate-50 rounded-full"/>
                    </button>
                </div>

            </div>)
        }

        {(window.location.pathname == '/' || window.location.pathname == '/membership') && 
            (<div className="w-full">                
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="blog-title text-2xl font-bold text-green-700">Blogify</Link>
                    </div>

                    {/* Navigation Links - Desktop */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className={linkClass("/")}>Home</Link>
                        <Link to="/membership" className={linkClass("/membership")}>Membership</Link>
                        <Link to="/explore" className={linkClass("/explore")}>Explore</Link>
                        <Link to="/about" className={linkClass("/about")}>About</Link>
                    </div>

                    {/* Search and Actions */}
                    {
                        !username ? 
                        <div className="flex items-center space-x-4">
                            <Link to={'/signin'} className="px-4 text-gray-600 hover:text-blog-accent">Sign In</Link>
                            <Link to={'/signup'} className="bg-green-700 text-sm px-4 py-2 rounded-md text-white hover:bg-green-600">Get Started</Link>
                        </div> : 
                        <div className="flex items-center space-x-4">
                            <Link to={'/blogs'} className="bg-green-700 text-sm px-4 py-2 rounded-md text-white hover:bg-green-600">continue reading</Link>
                        </div>
                    }
                </div>
            </div>)
        }

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