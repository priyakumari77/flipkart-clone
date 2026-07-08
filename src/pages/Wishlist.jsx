import axios from "axios"
import "../css/wishlist.css"
import React, { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Wishlist =()=>{

  const[wishlist,setWishlist] = useState([])
  const[loading,setLoading] = useState(false)
  const[messageApi,contextHolder]= message.useMessage({top:100})
  
  const navigate = useNavigate()




   async function fetchUser(){
    try {
      // setLoading(true)
      const token = localStorage.getItem("token")
      const res = await axios.get("https://flipkert-backend.onrender.com/user/fetch-user",{headers:{
        authorization:token
      }})
      console.log("Hiiiiiiiiiiii");
      
      console.log("Response data",res.data.data.wishlist);
      setWishlist(res.data.data.wishlist);
      console.log("Wishlist", wishlist);
      
      // setLoading(false)
    } catch (error) {
      console.log(error)
      // setLoading(false)
    }
   }

   useEffect(()=>{
   fetchUser()
   },[])


 
  //   async function fetchAddWishlist(item){
  //   try {
  //     const token = localStorage.getItem('token')
  //     const res = await axios.post("https://flipkert-backend.onrender.com/user/add-to-wishlist",{
  //   "productId":item._id,
  //   "color":item.product.color, 
  //    },
  //   {
  //     headers:{
  //       authorization:token,
  //     }
  //   })
  //   console.log(res.data)
  //   setWishlist(res.data.wishlist)
      
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(()=>{
  //   fetchAddWishlist()
  // },[])


     async function removeFromWishlist(item){
    try {
      console.log("Hiiiiiiiiiiiiiiiiiiiiiiiiiiii");
      
      const token = localStorage.getItem('token')
      const res = await axios.post("https://flipkert-backend.onrender.com/user/remove-from-wishlist",
        {
    "productId":item._id,
    "color":item.color, 
    
},
{
  headers:{
    authorization:token,
  }
})
 
 console.log(res.data)
 fetchUser()
 messageApi.success("Item removed")
 
 
    } catch (error) {
       console.log(error)
    }
   }


    return (
      <div className="wishlist-page">
         {contextHolder}
        
       <h3>My Wishlist ({wishlist.length})</h3>
       {wishlist.length===0 ? (
        <p>Your Wishlist is empty</p>
       ):(
        wishlist.map((item,index)=>(
          <div className="wishlist-wrapper" key={index}>
             <img onClick={()=>{navigate(`/product-detail/${item._id}`)}} src={item.image}/>


       <div className="wishlist-content">
            <h4>{item.name}</h4>
            <h4>price : {item.price}</h4>
            
            <div>
              {/* <button onClick={()=>{fetchAddWishlist(item)}}>add to wishlist</button> */}
              <button><MdDelete onClick={()=>{removeFromWishlist(item)}}/></button>

              </div>
              
            </div>

          </div>
          
        ))
       )}
       
       


       </div>
      

     
    )
}

export default Wishlist