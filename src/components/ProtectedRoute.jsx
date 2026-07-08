
import { useEffect } from "react";
import { replace, useNavigate } from "react-router-dom";

function ProtectedRoute({children}){
    const navigate=useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem("token")
    if(!token){
        navigate("/login",{replace:true});
    }
   

    },[])
    

    return children
}
export default ProtectedRoute 