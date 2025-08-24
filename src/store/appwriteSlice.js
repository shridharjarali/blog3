import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialAuthService = {
    status : false,
    userData : null
}
 



export const authSlice = createSlice({
    name : "auth",
    initialState: initialAuthService,
    reducers :{
        login : (state,action) =>{
            state.status = true,
            state.userData = action.payload
        },
        logout : (state,action) =>{
            console.log("logout slice");
            state.status = false,
            state.userData = null
        }
    }
})

export const {login,logout} = authSlice.actions

export default authSlice.reducer