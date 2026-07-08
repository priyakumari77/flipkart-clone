// import { useDispatch } from "react-redux"
// import { addToCart,decrementQty } from "../redux/slice/cartSlice"
// import { Navigate, useNavigate } from "react-router-dom"

// const Cartitem =({item})=>{

//     const dispatch = useDispatch()
//     console.log(item)
    
//     const navigate=useNavigate()

//     function getSelectedvarient(){
//     const variant = item.product.variants.find((e)=>e.color===item.selectedProduct.color)
//     console.log(variant)
//     return variant
// }
//     const variant = getSelectedvarient()


//    function getSelectedsizeobj(){
//      const variant = getSelectedvarient()
//     const size = variant.sizes.find((e)=>{
//         return e.size===item.selectedProduct.size
//      })
//      console.log(size)
//      console.log(variant)
//      return size
// }
 
//  const selectedSizeObj = getSelectedsizeobj()

//     return(

//          <div  className="product-card" key={item.id}>
            
//           <img src={variant.image} />
//           <h3 onClick={()=>{navigate("/product-detail", {state:{
//                       product: item.product,
//                       selectedVariant: {
//                         color: variant.color,
//                         size: selectedSizeObj.size,
//                       },
//                     }, })}}>{item.product.name}</h3>
//           <p>Price: ₹{item.product.price}</p>
//           <p>Size:{selectedSizeObj.size} | Color:{variant.color}</p>
          
//           <div className="increment-btn">
//          <button disabled = {item.qty===1}onClick={()=>{dispatch(decrementQty({product:item.product,selectedProduct:{
//             color:variant.color,
//             size:selectedSizeObj.size,
//          }}))}}>-</button>
//          {item.qty}
//          <button onClick={()=>{dispatch(addToCart({product:item.product,selectedProduct:{
//             color:variant.color,
//             size:selectedSizeObj.size,
//          }}))}}>+</button>
//          </div>
//         </div>
//     )
// }

// export default Cartitem




