import React from 'react';
import { IoIosMore } from 'react-icons/io';
import { BlogProps, formatDateToDayMonthYear } from './Common';
import { useNavigate } from 'react-router-dom';
import { CiBookmarkPlus, CiCircleMinus } from 'react-icons/ci';



export const BlogCard:React.FC<BlogProps> = ({blog}) => {
    const navigate = useNavigate();


  return (
    <div className="w-full flex flex-row gap-10">
        {/* content*/}
        <div className="w-[80%] flex flex-col justify-between min-h-40">
            <div className='cursor-pointer' onClick={()=> navigate(`/blog/${blog.id}`)}>
                <div className="flex flex-row gap-2 items-center select-none">
                    {/* { JSON.stringify(blog, null, 4) } */}
                    <img src={blog?.author?.profileImage || 'https://avatar.iran.liara.run/username?username=Anonymous'} alt="author" className='w-5 h-5 object-cover rounded-full'/>
                    <div className='text-sm capitalize'>{blog?.author?.name || "Anonymous"}</div>
                    <span><Circle/></span>
                    <div className='text-sm text-gray-700'>{formatDateToDayMonthYear(blog.createdAt)}</div>
                </div>

                <div className={`w-full flex flex-col my-2`}>
                    <div className='text-xl font-bold'>{blog?.title}</div>
                    <div className='text-gray-700 '>
                        {blog?.description.length > 175 ? `${blog?.description?.slice(0, 175)} ...` : blog?.description}
                    </div>
                </div>
            </div>

            <div className='flex flex-row justify-between items-center select-none'>
                <div className='flex items-center gap-2'>
                    <div className='bg-slate-200 px-2 rounded-full text-sm'>{blog?.topic || "demo"}</div>
                    <div className='text-sm'>{Math.ceil(blog?.description?.length/200)} min read</div>
                </div>
                <div className={`flex items-center justify-center gap-5`}>
                    <button className='text-gray-500'><CiBookmarkPlus fontSize={22}/></button>
                    <button className='text-gray-500'><CiCircleMinus fontSize={22}/></button>
                    <button className='text-gray-500'><IoIosMore fontSize={22}/></button>
                </div>
            </div>
        </div>

        {/* Image */}
        <div className='w-[20%] cursor-pointer select-none flex flex-end' onClick={()=> navigate(`/blog/${blog.id}`)}>
            <img src={blog?.coverImage} alt="blog" className='w-full h-[60%] lg:w-[70%] lg:h-[70%] mx-auto object-cover rounded-md bg-slate-200'/>
        </div>

    </div>
  )
}




function Circle(){
    return <div className='w-1 h-1 rounded-full bg-slate-400'></div>
}