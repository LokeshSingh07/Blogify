import React from 'react'
import { Quote } from '../components/Quote'
import Auth from '../components/Auth'




function Signup(): React.ReactElement {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-center h-screen">
      <div className="w-full h-full flex justify-center items-center bg-[#f9fafb]">
        <Auth type="signup"/>
      </div>
      
      <div className="invisible lg:visible h-full flex justify-center items-center ">
        <Quote/>
      </div>
    </div>
  )
}

export default Signup