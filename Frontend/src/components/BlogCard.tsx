import React from 'react';
import { IoIosMore, IoIosRemoveCircleOutline } from 'react-icons/io';
import { MdOutlineBookmarkAdd } from 'react-icons/md';
import { BlogProps, formatDateToDayMonthYear } from './Common';
import { useNavigate } from 'react-router-dom';



export const BlogCard:React.FC<BlogProps> = ({blog}) => {
    const navigate = useNavigate();


  return (
    <div className="w-full flex flex-row gap-10">
        {/* content*/}
        <div className="w-[80%] flex flex-col justify-between min-h-40">
            <div className='cursor-pointer' onClick={()=> navigate(`/blog/${blog.id}`)}>
                <div className="flex flex-row gap-2 items-center select-none">
                    {/* { JSON.stringify(blog, null, 4) } */}
                    <img src={blog?.author?.profileImage || 'https://avatar.iran.liara.run/username?username=author'} alt="author" className='w-5 h-5 object-cover rounded-full'/>
                    <div className='text-sm capitalize'>{blog?.author?.name || "Author"}</div>
                    <div className='text-sm text-gray-700'>{formatDateToDayMonthYear(blog.createdAt)}</div>
                </div>

                <div className={`w-full flex flex-col my-2`}>
                    <div className='text-xl font-bold'>{blog?.title}</div>
                    <div className='text-gray-700 '>
                        {/* {blog?.description.length > 100 ? `${blog?.description?.slice(0, 100)} ...` : blog?.description} */}
                    
                        {blog?.description?.split(' ').slice(0, 30).join(' ')} 
                        {blog?.description?.split(' ').length > 30 ? '...' : ''}
                    </div>
                </div>
            </div>

            <div className='flex flex-row justify-between items-center select-none'>
                <div className='flex items-center gap-2'>
                    <div className='bg-slate-200 px-2 rounded-full text-sm'>{blog?.topic || "demo"}</div>
                    <div className='text-sm'>{ "3 min read"}</div>
                </div>
                <div className={`flex gap-2`}>
                    <button className='text-gray-500 px-2 py-1 rounded-md'><MdOutlineBookmarkAdd fontSize={24}/></button>
                    <button className='text-gray-500 px-2 py-1 rounded-md'><IoIosRemoveCircleOutline fontSize={24}/></button>
                    <button className='text-gray-500 px-2 py-1 rounded-md'><IoIosMore fontSize={24}/></button>
                </div>
            </div>
        </div>

        {/* Image */}
        <div className='w-[20%] cursor-pointer select-none' onClick={()=> navigate(`/blog/${blog.id}`)}>
            <img src={blog?.coverImage} alt="blog" className='w-full h-full object-cover rounded-md bg-slate-200'/>
        </div>

    </div>
  )
}