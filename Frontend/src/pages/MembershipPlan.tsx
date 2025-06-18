import React from "react";
import { plans } from "../data";
import Basic from "../assets/star.svg"
import Premium from "../assets/friend.svg"
import Tick from "../assets/tick.svg"
import { AppBar } from "../components/AppBar";



export const MembershipPlan:React.FC = () => {

  return (
    <div className="w-full mx-auto min-h-screen pb-10 bg-gray-50">
      <AppBar/>

      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center my-10">
        Membership Plan
      </h1>

      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-10 justify-center px-4">
        {
          plans?.map((plan,idx)=>(
            <div key={idx} className="flex flex-col w-full md:w-[45%] bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              {/* plans info */}
              <div className="flex justify-center mb-6">
                {
                  plan?.id === "1" ? 
                  <img src={Basic} alt="basic" className="w-10"/> :
                  <img src={Premium} alt="premium" className="w-10"/>
                }
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-semibold mb-1">{plan?.title}</div>
                <div className="text-gray-600 text-lg mb-4">{plan?.priceMonthly} <span className="mx-1">or</span>{" "}{plan?.priceYearly}</div>
                
                <button className="w-full bg-green-700 py-3 rounded-full text-white text-sm font-semibold hover:bg-green-600 transition-colors">
                  Get Started
                </button>
              </div>
              

              {/* features */}
              <div className="mt-8">
                {
                  plan?.id === "2" && (
                    <div className="flex flex-col justify-center items-center gap-5 mb-6">
                      <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                        <img src={Basic} alt="basic" className="w-4"/>
                        <span className="text-sm">{plan?.preFeatures}</span>
                      </div>
                      
                      <span className="bg-green-100 text-green-700 font-semibold px-4 py-1 rounded-full tracking-wide">PLUS</span>
                    </div>
                  )
                }

                {
                  plan?.features.map((feature,idx)=>(
                    <div key={idx} className="flex gap-3 items-center mb-2">
                      <img src={Tick} alt="tick" className="w-5 text-green-500"/>
                      {
                        (plan?.id ==="2" && idx==0) ? 
                        <span className="text-lg font-semibold">{feature}</span> :  
                        <span className="text-base text-gray-700">{feature}</span>
                      }
                    </div>
                  ))
                }
              </div>


            </div>
          ))
        }

      </div>
    </div>
  );
};
