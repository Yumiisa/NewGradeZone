import { configureStore } from "@reduxjs/toolkit";

import { profileAPi } from "../user/userSlice";

import authReducer from './authslice'

import profileReducer from './authslice'

export const store = configureStore({
    reducer : {
        auth: authReducer,
        
       
    },
    
})
