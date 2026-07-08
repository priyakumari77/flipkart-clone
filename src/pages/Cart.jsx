import { useSelector } from "react-redux"
import "../css/cart.css"
import Cartitem from "../components/Cartitem"
const Cart =()=>{

//     const cartItems =[
//         {
//             id:1,
//             name:"Bag",
//             price:2000,
//             qty:1,
//             image:"https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFnfGVufDB8fDB8fHww"
//     },
//     {
//         id:2,
//         name:"Shoes",
//         price:2800,
//         qty:1,
//         image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8fDA%3D"

//     },
//     {
//         id:3,
//         name:"Shirt",
//         price:1500,
//         qty:1,
//         image:"https://plus.unsplash.com/premium_photo-1679056833568-96112bcab545?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hpcnRzfGVufDB8fDB8fHww"
//     },
// ]

const cartItems = useSelector((state)=>state.cart.item)
console.log(cartItems)

    return(

     <div className="product-page">
      <h3>CART PAGE</h3>
     <div className="cart-main">


     
      {cartItems.map((item) => (
        // <div className="product-card" key={item.id}>
        //   <img src={item.product.imgurl} />
        //   <h3>{item.product.name}</h3>
        //   <p>Price: ₹{item.product.price}</p>
        //   <p>Qty: {item.qty}</p>
        //   <div className="increment-btn">
        //  <button disabled = {item.qty===1}onClick={()=>{dispatch(decrementQty(item.product))}}>-</button>
        //  {item.qty}
        //  <button onClick={()=>{dispatch(addToCart(item.product))}}>+</button>
        //  </div>
        // </div>
        <Cartitem item = {item}/>
      ))}
    </div>

    </div>
    )
}
export default Cart