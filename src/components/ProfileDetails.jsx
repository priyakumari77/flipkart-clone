
import { useState,useEffect } from "react"
import "../css/profileDetails.css"
import axios from "axios"
const ProfileDetails =()=>{
     
    const[piEdit,setpiEdit]=useState(false)
    const[addressEdit,setAddressEdit]=useState(false)
    const[numberEdit,setNumberEdit]=useState(false)

    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[phNumber,setphNumber]=useState('')
    const[address,setAddress]=useState('')


    async function fetchUser(){
    try {
     
      const token = localStorage.getItem("token")
      const res = await axios.get("https://flipkert-backend.onrender.com/user/fetch-user",{headers:{
        authorization:token
      }})
      console.log(res.data)
      setEmail(res.data.data.email)
      setName(res.data.data.username)
      setAddress(res.data.data.address)
      setphNumber(res.data.data.phone)
    } catch (error) {
      console.log(error)
      
    }
   }

   useEffect(()=>{
   fetchUser()
   },[])


   

   async function updateUserName(){
    try {
        const token = localStorage.getItem("token")
        const res = await axios.post("https://flipkert-backend.onrender.com/user/user-details-update",{
            "username":name
        },{headers:{authorization:token}})
        console.log(res.data)
        setpiEdit(false)
    } catch (error) {
        console.log(error)
    }
  }
    
  async function updatephNumber(){
    try{
        const token=localStorage.getItem("token")
        const res= await axios.post("https://flipkert-backend.onrender.com/user/user-details-update",{
            "phone":phNumber
        },{headers:{authorization:token}})
        console.log(res.data)
        setNumberEdit(false)
    }catch(error){
      console.log(error)
    }
   }
  
  async function updateAddress(){
    try {
        const token=localStorage.getItem("token")
        const res=await axios.post("https://flipkert-backend.onrender.com/user/user-details-update",{
            "address":address
        },{headers:{authorization:token}})
        console.log(res.data)
        console.log(res.data.data.address)
        setAddressEdit(false)
    } catch (error) {
        console.log(error.response.data.message)
    }
 }



 
    return(
        <div className="profile-details">
            <div className="edit">
            <h4>Personal Information</h4>
            <button className="edit-button" onClick={()=>{setpiEdit(!piEdit)}}>{piEdit?"Cancel":"Edit"}</button>
            </div>
            <div className="info-row">
                <input disabled={!piEdit}onChange={(e)=>{setName(e.target.value)}} value={name} type="text" placeholder="Enter your name"/>
                
              {piEdit &&  <button className ="save-button" onClick={()=>{updateUserName()}}>SAVE</button>}
            </div>

            <div>
                <h4>Email Address</h4>
                <input disabled={true} defaultValue={email} type="email"/>
                
            </div>

            <div>

          <div className="edit">
              
                <h4>Mobile Number</h4>
                  <button className="edit-button" onClick={()=>{setNumberEdit(!numberEdit)}}>{numberEdit?"Cancel":"Edit"}</button>
     
                </div>
                <div className="info-row">
                <input disabled={!numberEdit} onChange={(e)=>{setphNumber(e.target.value)}} value={phNumber} type="tel"/>
                {numberEdit && <button  className ="save-button" onClick={()=>{updatephNumber()}}>SAVE</button>}
                </div>

            </div>
            
          <div> 
            <div className="edit">
                <h4>Address</h4>
                <button className="edit-button"  onClick={()=>{setAddressEdit(!addressEdit)}}>{addressEdit?"Cancel":"Edit"}</button>
                </div>
              <div className="info-row">
                <input disabled={!addressEdit}onChange={(e)=>{setAddress(e.target.value)}} value={address} type="text"/>
                {addressEdit && <button  className ="save-button" onClick={()=>{updateAddress()}}>SAVE</button>}
                </div>
            </div>
            
            <div>
                <h3>FAQs</h3>
            </div>

            <div>
                <h4>What happens when I update my email address (or mobile number)?</h4>
                <p>Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
            </div>

             <div>
                <h4>When will my Flipkart account be updated with the new email address (or mobile number)?</h4>
                <p>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
            </div>

             <div>
                <h4>What happens to my existing Flipkart account when I update my email address (or mobile number)?</h4>
                <p>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
            </div>
            
            <div>
                <h4>Does my Seller account get affected when I update my email address?</h4>
                <p>Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
            </div>
            
            
        </div>
    )
}

export default ProfileDetails