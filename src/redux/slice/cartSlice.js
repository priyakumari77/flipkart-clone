

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   item: []
}

function isEqual(obj1, obj2) {
   return Object.keys(obj1).length === Object.keys(obj2).length &&
      Object.keys(obj1).every(key => obj1[key] === obj2[key]);
}

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addToCart: (state, action) => {
         const newProduct = action.payload.product // item
         const selectedProduct = action.payload.selectedProduct // obj of color and size {color:"Red",size:"M"} === {color:"Red",size:"M"}
         console.log(action.payload)
         const result = state.item.find((item) => {

            return item.product.id === newProduct.id && isEqual(item.selectedProduct, selectedProduct) // item.selectedProduct === selectedProduct
         })
         console.log(result, 'result');
         if (result === undefined) {
            state.item = [...state.item, { product: newProduct, qty: 1, selectedProduct }]
         } else {
            state.item = state.item.map((item) => {
               if (item.product.id === newProduct.id && isEqual(item.selectedProduct, selectedProduct)) {
                  return { product: item.product, qty: item.qty + 1, selectedProduct }

               } else {
                  return item
               }
            })
         }

      },

      decrementQty: (state, action) => {
         const selectedProduct = action.payload.selectedProduct;

         state.item = state.item.map((item) => {
            if (item.product.id === action.payload.product.id && isEqual(item.selectedProduct, selectedProduct)) {
               return { product: item.product, qty: item.qty - 1, selectedProduct }
            } else {
               return item
            }
         })
      }
   }


})


//removeItem---filter 


export const { addToCart, decrementQty } = cartSlice.actions
export default cartSlice.reducer