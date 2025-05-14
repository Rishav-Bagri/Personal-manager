import { useNavigate } from "react-router-dom"

export  function Navbar(){
    const navigate=useNavigate()
    return <div className="bg-purple-100  flex justify-between items-center h-15 border-b-1 border-gray-200 px-15">
        
        <div onClick={()=>{navigate("/")}} className="text-3xl text-pink-600 font-sans font-bold  cursor-pointer ">
            P.M
        </div>
        <div className=" flex text-pink-500 font-semibold">
            <div onClick={()=>{navigate("/features")}} className="p-5 cursor-pointer">
                features
            </div >
            <div className="p-5">
                login
            </div>
            <div className="p-5">
                user
            </div>
        </div>
    </div>
}