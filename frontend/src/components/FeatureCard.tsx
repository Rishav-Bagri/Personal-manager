import { useNavigate } from "react-router-dom"

export function FeatureCard({title,details,to}){
    const navigate=useNavigate()
    return <div onClick={()=>{navigate(to)}} className="cursor-pointer m-2 p-7 rounded w-vwh h-40 bg-purple-100">
        <div className="text-3xl font-bold text-pink-500 uppercase">
            {title}
        </div>
        <p className="text-normal font-semibold mt-5 ml-5 text-pink-400 ">
            {details}
        </p>
    </div>
}