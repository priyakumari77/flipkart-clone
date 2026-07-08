import { useDispatch, useSelector } from "react-redux"
import "../css/cart.css"
// import { addToCart, decrementQty } from "../redux/slice/cartSlice"
// import Cartitem from "../components/Cartitem"
import axios from "axios"
import { useEffect, useState } from "react"
import { Spin,message } from "antd"
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom"


const Cart =()=>{

  const[cart,setCart]=useState([])
  const[loading,setLoading]=useState(false)
  const[removeItemLoading,setRemoveLoading]=useState(false)
  const[messageApi,contextHolder]= message.useMessage({top:100})
  
  const navigate=useNavigate()

const totalPrice = cart.reduce((acc, item) => {
  return acc + (item.product.price*item.count);
}, 0);

console.log(totalPrice);
console.log(cart)


  async function fetchCart(){
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      const res = await axios.get("https://flipkert-backend.onrender.com/user/fetch-user",{headers:{
        authorization:token
      }})
      console.log(res.data)
      setCart(res.data.data.cart)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
   }

   useEffect(()=>{
   fetchCart()
   },[])


//remove from cart
 async function removeFromCart(item){
  try{
    const token = localStorage.getItem("token")
  const res = await axios.post("https://flipkert-backend.onrender.com/user/remove-from-cart",
    {
    "productId":item.product._id,
    "color":item.product.color, 
    "size":item.product.size, 
  },{headers:{authorization:token}})

  fetchCart()
  console.log(res.data)
  
   messageApi.success("item removed")

  }catch(error){
    console.log(error)
    messageApi.error("fail to remove")

  }
}

 async function clearCart(){
    
  try{
    setRemoveLoading(true)
    const token = localStorage.getItem("token")
    const res = await axios.get("https://flipkert-backend.onrender.com/user/clear-cart",{
      headers:{
        authorization:token
      }
    })
    console.log(res.data)
    fetchCart()
     setRemoveLoading(false)
     messageApi.success("Cart Cleared")

  }catch(error){
    console.log(error)
    setRemoveLoading(false)

  }
 }

 async function placeOrder(){
  try {
    const token=localStorage.getItem("token")
    const res = await axios.get("https://flipkert-backend.onrender.com/user/place-order-from-cart",{headers:{
      authorization :token
    }})
    console.log(res.data)
    clearCart()
    messageApi.success("order placed")
    navigate("/orders")
  } catch (error) {
    console.log(error)
    
  }
 }

 
  async function addProductToCart(item){
    try {
      setRemoveLoading(true)
      const token = localStorage.getItem("token")
      const res = await axios.post("https://flipkert-backend.onrender.com/user/add-to-cart",{
            "productId":item.product._id,
         "color":item.product.color, 
        "size":item.product.size, 
          
      },{
        headers:{authorization:token}
      })
      setCart(res.data.data)
      messageApi.success(`You've changed ${item.product.name} QUANTITY to ${item.count+1}`)
      
      console.log(res.data)
      setRemoveLoading(false)
    } catch (error) {
      console.log(error)
      setRemoveLoading(false)
    }

   }   



// const cartItems = useSelector((state)=>state.cart.item)
// console.log(cartItems)


 async function processingPayment(){
  const token = localStorage.getItem("token")
  setLoading(true)
  const { data } = await axios.post(
      
      "https://flipkert-backend.onrender.com/user/create-payment-order",
      {
        amount: Number(totalPrice),
        currency: "INR",
        receipt: "receipt#1",
        notes: {},
      },
      { headers: {
        authorization:token,
      } }
    );
  
    setLoading(false)

    console.log(data) 

    const options = {
      key: "rzp_test_B9RwKdpPVSHcZx",
      amount: data.data.amount,
      currency: data.data.currency,
      name: "flipkart",
      description: "abcd",
      order_id: data.data.id,
      handler: async (response) => {
        let verifyResponse = await axios.post(
          "https://flipkert-backend.onrender.com/user/verify-payment",
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          },
          { headers: {
            authorization:token,
          } }
        );
        // Payload.paymentId = response.razorpay_payment_id;
        if (verifyResponse.data.success) {
          await placeOrder();
          // console.log("Order Response", response);
          // setOrder(JSON.stringify(response.data.data));
          navigate("/orders");
          messageApi.success("Order Placed successfully!", {
            // position: "top-center",
            // timeout: 3000,
          });
        } else {
          // router.push("/paymentFailed");

          messageApi.error("Failed to place the order. Please try again.", {
            position: "top-center",
            timeout: 3000,
          });
        }
      },
      prefill: {
        name: "Priya Kumari",
        email: "priya@gmail.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
}
    return(


     <div className="product-page">
      <h3>CART PAGE</h3>
      
      <div>
      <button onClick={()=>{clearCart()}}    style={{cursor:'pointer', padding:'5px 10px', fontWeight:"bold",marginRight:"10px" }}>Clear Cart</button>
     

      </div>

      <div className="cartMain-priceDetail">
     <div className="cart-main">
     
     {contextHolder}


    {cart.map((item,index)=>{
      return <div className ="product-card" key={index}>
        <img onClick={()=>{{navigate(`/product-detail/${item.product._id}`)}}}src={item.product.image} alt="" />
        <h3 onClick={()=>{{navigate(`/product-detail/${item.product._id}`)}}}> {item.product.name}</h3>
       <p> {item.product.size}</p>
       <p>{item.product.color}</p>
        <p>price:₹{item.product.price*item.count}</p>
        {/* {<p>Price : ₹{item.totalAmount}</p>} */}
        {/* <p>count:{item.count}</p> */}
        
        {/* <button onClick={()=>removeFromCart(item)}><MdDeleteForever size={20} /></button> */}
       <div  className ="ID-btn">
       <button onClick={()=>{removeFromCart(item)}}>-</button>
        <p>{item.count}</p>
        <button onClick={()=>{addProductToCart(item)}}>+</button>
        </div>
    
      </div>
    })}

   <Spin size='large' fullscreen spinning={loading}/>
   <Spin size='large' fullscreen spinning={removeItemLoading}/>
   

    </div>
  
  <div className="price-detail">
    <h2>PRICE DETAILS</h2><hr/>
    <div className="price">
      <p>Price</p>
      <p> ₹{totalPrice}</p>
    </div>
    <div className="discount">
    <p>Discount</p> 
    <p>₹0</p>
   </div>
   <div className="total-price">
    <h3>TOTAL PRICE</h3>
    <h3> ₹{totalPrice}</h3>
   </div>
     <button onClick={()=>{processingPayment()}} className ="place-order-btn">PLACE ORDER</button>

     {/* <button onClick={()=>{processingPayment()}}>Processing Payment</button> */}
  </div>
  </div>
    </div>
    )
}
export default Cart




// card-no : 2305 3242 5784 8228



























{/* {cartItems.map((item) => (
        <div className="product-card" key={item.id}>
          <img src={item.product.imgurl} />
          <h3>{item.product.name}</h3>
          <p>Price: ₹{item.product.price}</p>
          <p>Qty: {item.qty}</p>
          <div className="increment-btn">
         <button disabled = {item.qty===1}onClick={()=>{dispatch(decrementQty(item.product))}}>-</button>
         {item.qty}
         <button onClick={()=>{dispatch(addToCart(item.product))}}>+</button>
         </div>
        </div>
        <Cartitem item = {item}/>
      ))} */}
