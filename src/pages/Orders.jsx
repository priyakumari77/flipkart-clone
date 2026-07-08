import { useState,useEffect } from "react"
import "../css/orders.css"
import axios from "axios"
import { FaCircle } from "react-icons/fa6";
import { Spin } from "antd";
function Orders(){

     const[loading,setLoading]=useState(false)
    const[orders,setOrder]=useState([])

     async function fetchUserOrder(){
        try {
            setLoading(true)
            const token = localStorage.getItem("token")
            const res = await axios.get("https://flipkart-backend-0rv2.onrender.com//user/fetch-user",
                {headers:{
        authorization:token
      }})
      console.log(res.data)
      console.log(res.data.data.order)
      setOrder(res.data.data.order)

      setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchUserOrder()
    },[])


    return (
    <div className="orders-page">
       
      <Spin size='large' fullscreen spinning={loading}/>
      
      {orders.map((order) =>
        order.products.map((item, index) => (
          <div key={index} className="order-card">
            <div className="product-image">
              <img src={item.product.image} />
            </div>
            
            <div className="product-details">
                <div className="order-id">
              <p>order id:{order._id}</p>
            </div>
              <h4>{item.product.name}</h4>
              <p>Color: {item.product.color || "N/A"} {item.product.size && ` | Size: ${item.product.size}`}</p>
              <p className="price">₹{item.product.price}</p>
            </div>
            <div className="delivery-info">
              <p className="delivered"><FaCircle size={10}/> Delivered on {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</p>
              <p>Your item has {order.orderStatus}</p>
             
            </div>
          </div>

        ))
      )}
    </div>
  );
 
}
export default Orders

