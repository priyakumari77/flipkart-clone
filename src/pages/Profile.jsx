
import { useState,useEffect } from "react"
import ProfileDetails from "../components/ProfileDetails"
import Sidebar from "../components/Sidebar"
import "../css/profile.css"
import axios from "axios"
const Profile =(()=>{
 
    return(
        <div className="profile-main">
          
          <div className="inner-profile">
           
            <Sidebar/>
            <ProfileDetails/>

          </div>
            
            </div>
        
    )
})

export default Profile