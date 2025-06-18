import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BlogProps } from "../components/Common";


interface Blog {
    title: string;
    description: string;
    createdAt: string;
    author: {
        name: string;
        profileImage: string,
        bio: string | null
    }
}



export const useBlog = ({id}: {id:string})=>{
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token"); 
    const navigate = useNavigate();
    
    const sendRequest = async(id: string)=>{
        try{  
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        //   console.log(response);
          setBlog(response.data.blog);
        }
        catch(err: any){
        //   console.log(err);
          toast.error("Internal server error");
        }
        finally{
          setLoading(false);
        }
    }


    useEffect(()=>{
        if (token === null) {
          toast.error("User not authenticated");
          setLoading(false);
          navigate("/");
          return;
        }
    
        if(id) sendRequest(id);
        else setLoading(false);
    },[id])

    
    return {
        blog,
        loading
    }     
}



export const useBlogs = ()=>{
    const [blogs, setBlogs] = useState<BlogProps>();
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token"); 
    const navigate= useNavigate();

    const sendRequest = async()=>{
        setLoading(true);
        try{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/bulk`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log("Response: ", response.status, response.data);
            
            setBlogs(response.data.blog);
            toast.success(response.data.message);

        }
        catch(err:any){
            // console.log("Error: ", err);
            toast.error(err.response.data.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(!token){
            toast.error("You are not logged in");
            navigate("/signin");
            return;
        }

        sendRequest();
    },[])

 return {
    blogs,
    loading
 }
}