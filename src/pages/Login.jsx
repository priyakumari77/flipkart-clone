import "../css/login.css"
import { useNavigate } from "react-router-dom"
import Signup from "./Signup"
import { useEffect, useState } from "react"
import axios from "axios"
import { Input } from "antd"
import { useDispatch } from "react-redux"
import{login,logout} from "../redux/slice/authSlice"
const Login =()=>{


    const[email,setEmail] = useState('')
    const[otpsended,setOtpsended] = useState(false)
    const[loading,setloading] = useState(false)
    const[otp,setOtp] = useState("")
    const navigate = useNavigate()
    const dispatch =useDispatch()

    const token = localStorage.getItem("token");
    useEffect(()=>{
        if(token){
            navigate("/")
        }
    },[])
    

     async function sendOtp(){
        
        try {
            setloading(true)
            const res = await axios.post("https://flipkart-backend-0rv2.onrender.com//user/resend-otp",{
                "email" : email,
            })
            console.log(res.data)
            
        // for otp autofill
        const recvOtp = res.data.data;
         setOtp(`${recvOtp}`)
       

            // alert(res.data.data)
            if(res.data.success){
                setOtpsended(true)
            }
            setloading(false)
        } catch (error) {
            setloading(false)
            console.log(error.response.data.message)
            
        }
     }

     async function verifyOtp(otp){
        try {
            setloading(true)
             const res = await axios.post("https://flipkart-backend-0rv2.onrender.com//user/verify-otp",{
                "email" : email,
                 "otp": Number(otp),
             })
             console.log(res.data)
             console.log(res.data.token)
             localStorage.setItem("token" , res.data.token)

             dispatch(login(res.data.token))
             navigate("/")
             
             
             
             setloading(false)
        } catch (error) {
            console.log(error.response.data.message)
            setloading(false)
        }
     }
    return(
        <div className="login_wrapper">

        <div className="login_container"> 
       
       <div className="left_section">

       <h2>Login</h2>
       <p>Get access to your Orders, Wishlist and Recommendations</p>
       <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png" alt="login" />
       </div>
       <div className="right_section">
        <form>
            <h3>Email</h3>
            <input onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Enter your Email"  />
            <p>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.
            </p>
            {!otpsended && <button onClick={(e)=>{
                e.preventDefault()
                sendOtp()
            }}> Request OTP </button> }
            {otpsended && <Input.OTP onChange ={(e)=>{verifyOtp(e)}} value ={otp}length={4} />}
          
          {otpsended &&   <button onClick={((e)=>{ e.preventDefault() 
                verifyOtp(otp)})}>Submit otp</button>}

         
            {loading && <h3>loading...</h3>}

            <p className="create-account" onClick={()=>navigate("/signup")}>
                New to Flipkart? <span>  Create an account </span> 
               
            </p>
        </form>
         
       </div>
        </div>

        </div>
    )
}

export default Login