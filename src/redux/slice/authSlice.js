
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isLoggedin :false,
    token :null,
}

const authSlice = createSlice({
    name :'auth',
    initialState,
    reducers:{
        login :(state,action)=> {
            const token = action.payload
            state.isLoggedin=true
            state.token=token

            console.log(state)
         
        },

        logout:(state,action)=>{
            state.isLoggedin=false
            state.token=null
        }
    }
})

export const{login,logout}=authSlice.actions 
export default authSlice.reducer