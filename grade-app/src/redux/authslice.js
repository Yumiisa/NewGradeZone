import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getDataApi, postDataApi } from '../utils/fetchDataApi'; 
import valid from "../utils/valid";

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) =>{
   
    try{
       thunkAPI.dispatch(showAlert({loading:true}))  
    const response = await postDataApi('login', data);
   let registeredUser= JSON.parse(localStorage.getItem('users')) || []
    console.log(response)
    const { access_token, user, msg } = response.data;
      
       if(!registeredUser.find(register =>register._id === user._id)){
          registeredUser = [...registeredUser, user]
       }
      
    
    const expirationTime = new Date(Date.now() + 60 * 1000)
    const expiration = expirationTime.getTime() 
    localStorage.setItem('token', JSON.stringify({access_token, expiration}));
    const token = JSON.parse(localStorage.getItem('token'))
    if (token && Date.now() < token.expiration) {
       localStorage.setItem('login', true);
      // localStorage.setItem('token', access_token);
       localStorage.setItem('users', JSON.stringify( registeredUser))
         localStorage.setItem('user', JSON.stringify( user))
      thunkAPI.dispatch(showAlert({success:msg}))
    }
    else {
          // Token is expired, show alert message
          localStorage.removeItem('token');
        localStorage.removeItem('expiration');
       localStorage.removeItem('users');
          thunkAPI.dispatch(showAlert({msg: 'Your session has expired, please login again.'}));
       }

    
    
   return user;
    }
    catch(error){
       
        thunkAPI.dispatch(showAlert({msg: "Wrong Password or Email"})) 
        return thunkAPI.rejectWithValue(error.response);
    }
    
})
//register
export const register = createAsyncThunk('reg/register', async (data, thunkAPI) =>{
   let registeredUser= JSON.parse(localStorage.getItem('users')) || []
    try{
       thunkAPI.dispatch(showAlert({loading:true}))  
      
  
      
       const check = valid(data)
      if(check.errLength > 0){
        thunkAPI.dispatch(showAlert( check.errMsg))
      }
       thunkAPI.dispatch(showAlert( {loading:true}))

       const response = await postDataApi('register',data);
   
    const { access_token, user, msg } = response.data;
  
       if(!registeredUser.find(register =>register._id ===user._id)){
          registeredUser = [...registeredUser, user]
       }
    const expirationTime = new Date(Date.now() + 60 * 1000)
    const expiration = expirationTime.getTime() 
    localStorage.setItem('token', JSON.stringify({access_token, expiration}));
    const token = JSON.parse(localStorage.getItem('token'))
    if (token && Date.now() < token.expiration) {
       localStorage.setItem('login', true);
      // localStorage.setItem('token', access_token);
    localStorage.setItem('users', JSON.stringify( registeredUser))
      localStorage.setItem('user', JSON.stringify( user))
     
      thunkAPI.dispatch(showAlert({success:msg}))
    }
    else {
          // Token is expired, show alert message
          localStorage.removeItem('token');
         localStorage.removeItem('expiration');
          localStorage.removeItem("users");
          thunkAPI.dispatch(showAlert({msg: 'Your session has expired, please login again.'}));
       }
   return user;
    }
    catch(error){
       
        thunkAPI.dispatch(showAlert({msg: "Wrong password or email"})) 
        return thunkAPI.rejectWithValue(error.response);
    }
    
})

export const refreshtoken = createAsyncThunk('auths/refreshtoken', async(_,{dispatch}) =>{
  const login =localStorage.getItem('login')
   
  if(login){
    dispatch(showAlert(true))
  }
   let registeredUser= JSON.parse(localStorage.getItem('users')) || []
  try{
    const res = await postDataApi("refresh_token")
   
      const { access_token, user}= res.data
      
       if(!registeredUser.find(register =>register._id === user._id)){
          registeredUser = [...registeredUser, user]
       }
      const expirationTime = new Date(Date.now() + 60 * 1000)
    const expiration = expirationTime.getTime() 
    localStorage.setItem('token', JSON.stringify({access_token, expiration}));
    const token = JSON.parse(localStorage.getItem('token'))
    if (token && Date.now() < token.expiration) {
      
      // localStorage.setItem('token', access_token);
       localStorage.setItem('users', JSON.stringify( registeredUser))
        localStorage.setItem('user', JSON.stringify( user))
      
      
    }
   
      return  user

  }catch(error){
     dispatch(showAlert(error))
  }
  
})

export const logout = createAsyncThunk(
  'logs/logout',
  async (_, { dispatch }) => {
    try {
      localStorage.removeItem('login');
      localStorage.removeItem('token');
      // localStorage.removeItem('users');
      const response = await postDataApi('logout');
      console.log(response)
      dispatch(showAlert({ msg: 'You have been logged out.' }));
       window.location.href = '/';
    } catch (error) {
       dispatch(showAlert({ error: error.response.data.msg }));
    }
  }
); 

export const getProfileUsers = createAsyncThunk(
    'profile/getProfileUsers',
    
    async({id,getUsers,thunkAPI}) =>{
        
          //let getUsers = JSON.parse(localStorage.getItem('users'));
              const toke = JSON.parse(localStorage.getItem('token'));
          const token = toke.access_token
          //  id = getUsers._id
          // console.log(getUsers)
          

        if(getUsers && getUsers.length > 0 && getUsers.every(user => user._id !== id)){
        try {
            
                const res = await getDataApi(`user/${id}`,token)
                   console.log(res)
                const { access_token, user}= res.data
              
                 //registerUser= {...registerUser,user}
                 return user
                 
           
        } catch (error) {
             return thunkAPI.rejectWithValue(error);
        }
       
      }
       else{
           console.log('user already exists');
        }
    }
    

)
const initialState = {
 users:{},
 alert:{},
 user:'',
  registerUser:'',
 register:{},
 loading:false,
 success:false,
 error:'',
 isLoggedIn: !!localStorage.getItem('login'),
token: "",
getUsers:[]
}

const authSlice =createSlice ({
    name:"auth",
    initialState,
    reducers: {
        
        showAlert: (state, action) => {
      state.alert = action.payload;
    },
    hideAlert: (state) => {
      state.alert = {};
    },
    
    },
    extraReducers:(builder) =>{
        builder
            .addCase(login.pending,(state)=>{
            state.loading=true
           })
           .addCase(login.fulfilled,(state,action) =>{
            state.loading = false;
            state.success = true;
            state.users = action.payload;
            state.token = JSON.parse(localStorage.getItem('token'))
            state.user= JSON.parse(localStorage.getItem("user")) 
            state.registerUser= JSON.parse(localStorage.getItem("users")) 
            state.isLoggedIn = true;
           })
           .addCase(login.rejected,(state,action) =>{
            state.loading = false;
            state.success = null;
            state.users =null;
            state.error = action.error.message;
           })

           .addCase(refreshtoken.pending,(state)=>{
            state.loading=true
           })
           .addCase(refreshtoken.fulfilled,(state,action) =>{
            state.loading = false;
            state.token = JSON.parse(localStorage.getItem('token'))
            state.users = action.payload;
            state.user = JSON.parse(localStorage.getItem("user")) 
             state.registerUser = JSON.parse(localStorage.getItem("users")) 
           
            

           })
           .addCase(refreshtoken.rejected,(state,action) =>{
            state.loading = false;
            state.error = action.error.message;
           })

             .addCase(register.pending,(state)=>{
            state.loading=true
           })
           .addCase(register.fulfilled,(state,action) =>{
            state.loading = false;
            state.success = true;
            state.register =  action.payload;
            state.token = JSON.parse(localStorage.getItem('token'))
            state.user= JSON.parse(localStorage.getItem("user")) 
            state.registerUser= JSON.parse(localStorage.getItem("users")) 
            state.isLoggedIn = true;
            
           })
           .addCase(register.rejected,(state,action) =>{
            state.loading = false;
            state.success = null;
            state.register = null;
            state.error = action.payload;
           })
          .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null; 
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfileUsers.pending,(state) =>{
            state.loading = true;
        })
        .addCase(getProfileUsers.fulfilled,(state, {payload}) =>{
               state.loading =false;
               if(payload){
                   state.getUsers=[...state.getUsers, payload]
               }
               
         } )
        .addCase(getProfileUsers.rejected, (state) => {
        state.loading = false;
        })

    }
})


 export const { showAlert, hideAlert} = authSlice.actions
export default authSlice.reducer