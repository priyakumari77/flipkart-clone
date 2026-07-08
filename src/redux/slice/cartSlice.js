

// import { createSlice } from "@reduxjs/toolkit";
// const initialState ={
//     item : []
// }

// function isEqual(obj1, obj2) {
//    return Object.keys(obj1).length === Object.keys(obj2).length &&
//       Object.keys(obj1).every(key => obj1[key] === obj2[key]);
// }


// const cartSlice = createSlice({
//     name :"cart",
//     initialState,
//     reducers:{
//         addToCart : (state,action)=>{
//             const newProduct = action.payload.product
//             const selectedProduct =action.payload.selectedProduct
//             console.log(action.payload)
//              const result = state.item.find((item)=>{
            
//                console.log(selectedProduct)
//                 return item.product.id === newProduct.id && isEqual(item.selectedProduct,selectedProduct)
//              })
//              if(result===undefined){
//                 state.item = [...state.item,{product:newProduct,qty:1, selectedProduct:{color:selectedProduct.color,size:selectedProduct.size}}]
//              }else{
//                 state.item = state.item.map((item)=>{
//                    if(item.product.id===newProduct.id && isEqual(item.selectedProduct,selectedProduct)){
//                      return {product:item.product,qty:item.qty+1 , selectedProduct:{color:selectedProduct.color,size:selectedProduct.size}}

//                    }else{
//                      return item
//                    }
//                 })
//              }
//              console.log(state.item)
//         },

//         decrementQty : (state,action)=>{
//          const selectedProduct = action.payload.selectedProduct
//               state.item = state.item.map((item)=>{
//                  if(item.product.id===action.payload.product.id && isEqual(item.selectedProduct,selectedProduct)){
//                     return {product:item.product,qty:item.qty-1, selectedProduct}
//                  }else{
//                     return item
//                  }
//               })
//         }
//     }


// })

// //removeItem---filter 
   

// export const {addToCart,decrementQty} = cartSlice.actions
// export default cartSlice.reducer