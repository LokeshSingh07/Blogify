import React, { useEffect, useState } from "react"
import { AppBar } from "../components/AppBar"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";



type FormDataType = {
    title: string;
    description: string;
    coverImage?: string
}


export const Publish:React.FC = ()=>{
  
    const token = localStorage.getItem("token"); 
    const [loading, setLoading]  = useState(false);
    const navigate= useNavigate();
  
  
    const sendRequest = async(formData: FormDataType, file:File | null)=>{
        setLoading(true);
        try{
            // create Form data class
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);
            if(file){
                data.append("coverImage", file);
            }

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/blog`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", // Important for file uploads
                }
            });
            // console.log("Response: ", response.status, response.data);
            
            toast.success(response.data.message);
            navigate('/blogs')
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
    sendRequest: (formData: FormDataType, file:File | null) => void;
    loading?: boolean;
};

function TextEditor({sendRequest, loading} : TextEditorProps){
    const [formData, setFormData] = useState<FormDataType>({
        title: "",
        description: "",
        coverImage: ""
    });

    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const canPublish = formData.title !== "" && formData.description !== "" && formData.coverImage !== "";

    
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>)=>{
        const selectedFile = e.target.files ? e.target.files[0] : null;
        // console.log(file);
        if(selectedFile){
            setFile(selectedFile);      // store file
            setFileName(selectedFile.name);
            setFormData((prev) => ({
                ...prev,
                coverImage: selectedFile.name,
            }));

             // Image Preview
            const reader = new FileReader();
            // console.log("Reader : ", reader);
            reader.onloadend = ()=>{
                if(selectedFile.type.startsWith('image/')){      // image preview
                    setImagePreview(reader.result as string)
                }
            }
            reader.readAsDataURL(selectedFile);
        }
    }



    return (     
        <div className="w-full lg:w-[80%] grid grid-cols-1 gap-4 mt-8 bg-white p-5 rounded-lg">
            <input required type="text" placeholder="Title" 
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

            {/* Image */}
            <div className="">
                <input required type="file" accept="image/*"
                    placeholder="click to upoad image"
                    onChange={handleFileChange}
                    className="w-full text-sm rounded-lg py-2 px-4 border"
                />
                {/* Image preview */}
                {
                    imagePreview && (
                        <div className="flex flex-col justify-center items-center mt-4 w-full bg-slate-50 rounded-lg p-5">
                            <h3>Image : {fileName}</h3>
                            <img src={imagePreview} alt="cover image preview" className="w-40 h-40 object-cover mt-2 p-2 bg-gray-100 rounded-lg"/>
                        </div>
                    )
                }
            </div>


            {/* publish button */}
            <button className={`w-fit ml-auto text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${canPublish
             ? "bg-black hover:bg-black/85" : "bg-black/50 cursor-not-allowed"}`}
                onClick={()=> {sendRequest(formData, file)}}
                disabled={!canPublish}
            >
                {loading ? "Publishing..." : "Publish Post"}
            </button>
        </div>
    )
}