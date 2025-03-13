import sign from "../assets/sign.jpg"

export const Quote:React.FC = ()=>{
    return (
      <div className="w-full h-full text-black">
        <img src={sign} className="object-cover h-screen"/>
      </div>
    )
  }