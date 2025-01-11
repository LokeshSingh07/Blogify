import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { formatDateToDayMonthYear } from '../components/Common';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';


interface Author {
  name: string;
  bio: string | null;
  profileImage: string;
}
interface Blog {
  title: string;
  description: string;
  createdAt: string;
  author: Author;
}


function Blog(): React.ReactElement {
  const {id} = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); 
  const navigate = useNavigate();
  console.log(blog);

  const sendRequest = async(id: string)=>{
    try{  
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(response);
      setBlog(response.data.blog);
    }
    catch(err: any){
      console.log(err);
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

  if(loading){
    return <div className="w-screen h-screen">
      <Loading/>
    </div>;
  }

  return (
    <div className='w-[95%] md:w-[85%] lg:w-[80%] xl:w-[70%] mx-auto flex flex-row items-start justify-center mt-16 mb-20 gap-10'>
      <div className='w-[85%]'>
        <div className='text-4xl font-bold'>{blog?.title}</div>
        {/* @ts-ignore */}
        <div className='text-sm text-gray-600 mt-4 select-none'>Posted on {formatDateToDayMonthYear(blog?.createdAt)}</div>
        <div className='text-lg mt-10'>{blog?.description}</div>
      </div>

      <div className='w-[15%] select-none'>
        <div>Author</div>
        <div className='flex flex-row items-center gap-2 mt-5'>
          <div className=''>
            <img src={`${blog?.author?.profileImage}`} alt="profile pic" className='w-10'/>
          </div>
          <div className='w-full'>
            <div className='capitalize'>{blog?.author?.name}</div>
            <div className='text-sm text-gray-600'>{blog?.author?.bio || "No bio available"}</div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Blog