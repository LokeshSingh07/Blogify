import axios from "axios";
import React, { useEffect } from "react"
import toast from "react-hot-toast";
import { BlogCard } from "../components/BlogCard";
import { FiPlus } from "react-icons/fi";

const tabs = [
    {
        name: "For you",
        key: "forYou"
    },
    {
        name: "Following",
        key: "following"
    }
]

export const Blogs:React.FC = ()=>{

    const [blogs, setBlogs] = React.useState([]);
    const [active, setActive] = React.useState("forYou");
    const token = `Bearer ${localStorage.getItem("token")}`; 

    const sendRequest = async()=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/bulk`, {
                headers: {
                    Authorization: token
                }
            });
            console.log("Response: ", response.status, response.data);
            
            setBlogs(response.data.blog);
            toast.success(response.data.message);

        }
        catch(err:any){
            console.log("Error: ", err);
            toast.error(err.response.data.message);
        }
    }

    useEffect(()=>{
        sendRequest();
    },[])
    
  return(
    <div className="w-[95%] md:w-[85%] lg:w-[80%] xl:w-[70%] mx-auto flex flex-col items-center justify-center mt-5 mb-20 text-black">
        <div className="w-full flex flex-row gap-5 justify-start items-center">
            <button className="text-black px-3 py-2 rounded-md" onClick={()=> {}}><FiPlus fontSize={20}/></button>
            <div className="flex flex-row gap-5">
                {   
                    tabs.map((tab, index)=>{
                        return(
                            <div key={index}
                                className={`p-2 rounded-sm cursor-pointer  ${ active === tab.key ? "border-b-2 border-blue-500" : "bg-none text-gray-600 border-b-2 border-transparent"} hover:bg-gray-100`}
                                onClick={()=> { setActive(tab.key) }} 
                            >
                                {tab.name}
                            </div>
                        )
                    })
                }
            </div>
        </div>

        <div className="w-full grid grid-cols-1 gap-14 mt-10">
            {   
                blogs.map((blog:any, index:any)=>(
                    // @ts-ignore
                    <BlogCard key={index} blog={blog} />
                ))
            }
        </div>


    </div>
  )
}