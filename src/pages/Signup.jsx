
import { useEffect, useState } from "react"
import "../css/signup.css"
import axios from "axios"
import { Input } from "antd"
import { replace, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "../redux/slice/authSlice"
const Signup=()=>{


    const[email,setEmail]=useState('')
    const[loading,setloading] = useState(false)
    const[otpsended,setOtpsended] = useState(false)
    
  const navigate = useNavigate()
  const dispatch=useDispatch()

  const token = localStorage.getItem("token")
  useEffect(()=>{
    if(token){
        navigate("/" , {replace:true})
    }
  })
    async function sendOtp (){
         
       try {
           setloading(true)
          const res = await axios.post("https://flipkert-backend.onrender.com/user/otp-send",
             {
                 "email":email,

             }
    )
        console.log(res.data)
        if(res.data.success){
            setOtpsended(true)
            
        }
        
        setloading(false)
       } catch (error) {
        setloading(false)
        alert(error.response.data.message)
       }
    }

    async function verifyOtp(otp){
        try {
             setloading(true)
            const res = await axios.post("https://flipkert-backend.onrender.com/user/verify-otp" ,
             {
               "email":email,
               "otp":Number(otp),
              } )
            console.log(res.data)
            console.log(res.data.token)
            localStorage.setItem('token',res.data.token)
         dispatch(login(res.data.token))
            navigate("/")
    
            setloading(false)
        } catch (error) {
            setloading(false)
            console.log(error.response.data.message)

           
            
        }

    }
    return (
        <div className="signup-wrapper">
            <div className="signup-container">
            <div className="signup-left-section">
                <h2> Looks like you're new here!</h2>
                <h3>Sign up with your mobile number to get started</h3>
                <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png" alt="signup" />
                </div>
             <div className="signup-right-section">
                <form>
                    <h4>Enter Your Email</h4>
                    <input onChange={(e)=>{setEmail(e.target.value)}} type="text" />
                    <p className="account">By continuing, you agree to Flipkart's <span>Terms of Use </span> and <span> Privacy Policy.</span></p>
                    {!otpsended && <button onClick={(e)=> {
                        e.preventDefault()
                        sendOtp()
                      

                    }}>CONTINUE</button>}<br/>
                      {otpsended && <Input.OTP onChange ={(e)=>{verifyOtp(e)}}length={4} />}
                      {loading && <h3>loading...</h3>}
                </form>
                <button className="btn-section">
                        <span>Existing User? Log in</span>
                        </button>
             </div>
            </div>
        </div>
        
    )
}

export default Signup