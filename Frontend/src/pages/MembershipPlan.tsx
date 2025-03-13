import React from "react";
import { plans } from "../data";
import Basic from "../assets/star.svg"
import Premium from "../assets/friend.svg"
import Tick from "../assets/tick.svg"



export const MembershipPlan:React.FC = () => {

  return (
    <div className="w-screen mx-auto min-h-screen p-5">
      <div className="text-[48px] font-semibold font-[times-new-roman] ">Membership Plan</div>


      <div className="w-full mx-auto sm:w-[90%] lg:w-[70%] xl:w-[60%] flex flex-col md:flex-row gap-10 mt-10">
        {
          plans?.map((plan,idx)=>(
            <div key={idx} className="w-full lg:w-[60%] flex flex-col bg-white py-5 px-6 lg:px-8 border rounded-md shadow-md">
              {/* plans info */}
              <div className="flex justify-center mb-5">
                {
                  plan?.id === "1" ? 
                  <img src={Basic} alt="basic" className="w-8"/> :
                  <img src={Premium} alt="premium" className="w-8"/>
                }
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="text-2xl font-semibold">{plan?.title}</div>
                <div className="">{plan?.priceMonthly} or {plan?.priceYearly}</div>
                
                <button className="w-full bg-green-700 px-4 py-2 text-white rounded-full text-sm font-medium mt-5 hover:bg-green-600 transition-all">
                  Get Started
                </button>
              </div>
              

              {/* features */}
              <div className="mt-8">
                {
                  plan?.id === "2" && (
                    <div className="flex flex-col justify-center items-center gap-5 mb-5">
                      <div className="flex flex-row gap-2 items-center justify-center">  
                        <img src={Basic} alt="basic" className="w-4"/>
                        <span className="text-sm">{plan?.preFeatures}</span>
                      </div>

                      <div>PLUS</div>
                    </div>
                  )
                }

                {
                  plan?.features.map((feature,idx)=>(
                    <div key={idx} className="flex gap-2 items-center mb-2">
                      <img src={Tick} alt="tick" className="w-4 text-green-500"/>
                      {
                        (plan?.id ==="2" && idx==0) ? 
                        <span className="text-[16px]  font-semibold">{feature}</span> :  
                        <span className="text-[14px]">{feature}</span>
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
