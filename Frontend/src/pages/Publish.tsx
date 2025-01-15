import React from "react"
import { AppBar } from "../components/AppBar"



export const Publish:React.FC = ()=>{
  

  return (
    <div className="bg-[#f9fafb]">
        <AppBar/>

        <div className="w-[95%] md:w-[85%] lg:w-[80%] xl:w-[70%] mx-auto flex flex-col items-center justify-center mt-5 mb-20 text-black">

            <TextEditor/>
        </div>
    </div>
  )
}




function TextEditor(){
    return (     
        <div className="w-[80%] grid grid-cols-1 gap-4 mt-8 bg-white p-5 rounded-lg">
            <input type="text" placeholder="Title" className="w-full text-sm rounded-lg py-2 px-4 border"/>

            <textarea id="editor" rows={8} className="w-full px-4 py-2 text-sm focus-outline-none text-gray-800 bg-[#f9fafb] border" placeholder="Write a blog..." required ></textarea>
            

            <button className="w-fit ml-auto text-white bg-black hover:bg-black/85 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                Publish Post
            </button>
        </div>
    )
}