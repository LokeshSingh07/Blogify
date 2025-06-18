import React from 'react';
import Auth from '../components/Auth';
import { Quote } from '../components/Quote';


export const Signin: React.FC = ()=>{
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-center h-screen">
      <div className="w-full h-full flex justify-center items-center bg-[#f9fafb]">
        <Auth type="signin"/>
      </div>
      
      <div className="hidden h-full lg:flex justify-center items-center">
        <Quote/>
      </div>

    </div>
  )
}