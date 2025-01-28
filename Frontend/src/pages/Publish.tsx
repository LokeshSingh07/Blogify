import React, { useEffect, useState } from "react"
import { AppBar } from "../components/AppBar"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";



type FormData = {
    title: string;
    description: string;
    coverImage?: string
}


export const Publish:React.FC = ()=>{
  
    const token = localStorage.getItem("token"); 
    const [loading, setLoading]  = useState(false);
    const navigate= useNavigate();
  
  
    const sendRequest = async(formData: FormData)=>{
        setLoading(true);
        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/blog/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Response: ", response.status, response.data);
            
            toast.success(response.data.message);

        }
        catch(err:any){
            console.log("Error: ", err);
            toast.error(err.response.data.message || "Something went wrong.");
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <div className="bg-[#f9fafb]">
        <AppBar/>

        <div className="w-[95%] md:w-[85%] lg:w-[80%] xl:w-[70%] mx-auto flex flex-col items-center justify-center mt-5 mb-20 text-black">

            <TextEditor sendRequest={sendRequest} loading={loading}/>
        </div>
    </div>
  )
}




type TextEditorProps = {
    sendRequest: (formData: FormData) => void;
    loading?: boolean;
};

function TextEditor({sendRequest, loading} : TextEditorProps){
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
    });

    
    useEffect(()=>{
        console.log(formData)
    },[formData])



    return (     
        <div className="w-[80%] grid grid-cols-1 gap-4 mt-8 bg-white p-5 rounded-lg">
            <input type="text" placeholder="Title" 
                onChange={(e)=>{
                    setFormData({
                        ...formData,
                        title: e.target.value
                    })
                }}
                className="w-full text-sm rounded-lg py-2 px-4 border"
            />

            <textarea required rows={8} placeholder="Write a blog..." 
                onChange={(e)=>{
                    setFormData({
                        ...formData,
                        description: e.target.value
                    })
                }} 
                className="w-full px-4 py-2 text-sm focus-outline-none text-gray-800 bg-[#f9fafb] border" 
            />            

            <button className="w-fit ml-auto text-white bg-black hover:bg-black/85 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={()=> {sendRequest(formData)}}
            >
                {loading ? "Publishing..." : "Publish Post"}
            </button>
        </div>
    )
}