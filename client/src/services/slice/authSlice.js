import {createSlice} from "@reduxjs/toolkit"
const initialState={
    isAuth:false
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        isLogged:(state,action)=>{
            state.isAuth=true
        },
        resetState:(state,auth)=>{
            return initialState
        }
    }

})
export const {isLogged,resetState}=authSlice.actions
export default authSlice.reducer