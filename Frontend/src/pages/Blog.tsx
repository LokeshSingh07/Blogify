import React from 'react'
import { useParams } from 'react-router-dom'
import { formatDateToDayMonthYear } from '../components/Common';
import Loading from '../components/Loading';
import { AppBar } from '../components/AppBar';
import { useBlog } from '../hooks';




function Blog(): React.ReactElement {
  const {id} = useParams();
  const {loading, blog} = useBlog({id: id || ""});


  if(loading){
    return <div className="w-screen h-screen">
      <Loading/>
    </div>;
  }

  return (
    <div className='w-full'>
      <AppBar/>
      
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
              <img src={`${blog?.author?.profileImage || "https://avatar.iran.liara.run/username?username=Anonymous"}`} alt="profile pic" className='w-10'/>
            </div>
            <div className='w-full'>
              <div className='capitalize'>{blog?.author?.name || "Anonymous"}</div>
              <div className='text-sm text-gray-600'>{blog?.author?.bio || "No bio available"}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Blog