import React from 'react';
import { BlogProps, formatDateToDayMonthYear } from './Common';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ClipboardCheck } from 'lucide-react';



export const BlogCard:React.FC<BlogProps> = ({blog}) => {
    const navigate = useNavigate();

    const share = async()=>{
        try{
            await navigator.clipboard.writeText(`${window?.location?.origin}/blog/${blog?.id}`);
            toast.success("Blog link copied to clipboard.");
        }
        catch (error) {
            // console.error("Error copying blog link to clipboard:", error);
            toast.error("Failed to copy the link. Please try again.");
        }
    }
 
  return (
    <div className="w-full flex flex-row gap-10 p-4 hover:shadow-lg rounded-lg">
        {/* content*/}
        <div className="w-3/4 md:w-2/3 flex flex-col min-h-40">
            <div className='cursor-pointer' onClick={()=> navigate(`/blog/${blog.id}`)}>
                <div className="flex flex-row gap-2 items-center select-none">
                    {/* { JSON.stringify(blog, null, 4) } */}
                    <img src={blog?.author?.profileImage || 'https://avatar.iran.liara.run/username?username=Anonymous'} alt="author" className="w-8 h-8 rounded-full mr-3"/>
                    <div className='font-medium capitalize'>{blog?.author?.name || "Anonymous"}</div>
                </div>

                <div className={`w-full flex flex-col my-2`}>
                    <div className='text-xl md:text-2xl font-bold mb-3 hover:text-blog-accent transition-colors line-clamp-1'>{blog?.title}</div>
                    <div className='text-gray-600 mb-4 line-clamp-2 md:line-clamp-2'>
                        {/* {blog?.description.length > 175 ? `${blog?.description?.slice(0, 175)} ...` : blog?.description} */}
                        {blog?.description}
                    </div>
                </div>
            </div>

            <div className='flex flex-row justify-between items-center select-none'>
                <div className="flex items-center text-sm text-gray-500">
                    <span className='text-sm text-gray-700'>{formatDateToDayMonthYear(blog.createdAt)}</span>
                    <span className="mx-2">·</span>
                    <span>{Math.ceil(blog?.description?.length/200)} min read</span>
                    <span className="mx-2">·</span>
                    <span className='bg-gray-100 text-gray-700 py-1 px-3 rounded-full text-xs'>{blog?.topic || "Design"}</span>
                </div>
                <div className={`relative flex items-center justify-center gap-5`}>
                    <button className="w-full text-left px-3 py-1 text-gray-500 hover:bg-gray-100" 
                        onClick={() => share()}
                    >
                        <ClipboardCheck className='h-5 w-5'/>
                    </button>
                </div>
            </div>
        </div>

        {/* Image */}
        <div className='w-1/4 md:w-1/3 cursor-pointer select-none flex flex-end' onClick={()=> navigate(`/blog/${blog.id}`)}>
            <img src={blog?.coverImage} alt="blog" className='w-full h-full max-h-[35vh] object-cover rounded-lg' loading='lazy'/>
        </div>

    </div>
  )
}