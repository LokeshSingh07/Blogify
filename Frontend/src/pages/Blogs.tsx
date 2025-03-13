import axios from "axios";
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { BlogCard } from "../components/BlogCard";
import { FiPlus } from "react-icons/fi";
import { AppBar } from "../components/AppBar";
import { Link, useNavigate } from "react-router-dom";


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

interface Blog {
    id: string;
    title: string;
    description: string;
    published: boolean;
    coverImage?: string; 
    authorId: string;
    createdAt: string;
    updatedAt: string;
    author: {
        name: string;
        profileImage: string;
    };
}


export const Blogs:React.FC = ()=>{

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [active, setActive] = useState<string>("forYou");
    const token = localStorage.getItem("token"); 
    const [loading, setLoading]  = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const limit = 10;
    const [hasMore, setHasMore] = useState<boolean>(true); 
    const navigate= useNavigate();


    const sendRequest = async()=>{
        if (!hasMore) return;
        setLoading(true);
        try{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/bulk?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Response: ", response.status, response.data);
            

            if (response.data.blog.length < limit) {
                setHasMore(false); // Stop requesting if less than limit
            }
            
            setBlogs((prev)=> [...prev, ...response.data.blog])
            // setBlogs(response.data.blog);
            // toast.success(response.data.message);

        }
        catch(err:any){
            console.log("Error: ", err);
            toast.error(err.response.data.message);
        }
        finally{
            setLoading(false);
        }
    }


    const handleScroll = ()=>{
        const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
        
        if(scrollTop + clientHeight >= scrollHeight-10 && !loading){
            setLoading(true);
            setPage(prev => prev+1);
        }
    }



    useEffect(()=>{
        if(!token){
            toast.error("You are not logged in");
            navigate("/signin");
            return;
        }

        sendRequest();
    },[page])

    useEffect(()=>{
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    },[])


    // if(loading){
    //     return <div className="w-screen h-screen">
    //         <Loading/>
    //     </div>;
    // }
    
  return(
    <div className="w-full mx-auto px-2">
        <AppBar/>

        <div className="w-full mx-auto text-center text-sm ">
            {/* <PiStarFourFill className="text-yellow-500"/> */}
            ✨Get unlimited access to the best of Blogify for less than $1/week.
            <Link to={'/membership'} className="font-semibold hover:underline"> Become a member</Link>
        </div>

        <div className="w-[95%] md:w-[85%] lg:w-[80%] xl:w-[70%] mx-auto flex flex-col items-center justify-center mt-5 text-black">
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

            <div className="py-10">
                {
                    hasMore && loading && 
                    ( <div className="flex items-center justify-center w-full py-4 ">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>)
                }

                {
                    !hasMore && (<div className="text-center text-gray-500">
                        You have reached to the end of page
                    </div>)
                }
            </div>
        </div>
    </div>
  )
}