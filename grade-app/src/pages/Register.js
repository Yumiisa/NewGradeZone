import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../redux/authslice'
import '../styles/Register.css'

const Register = () => {
  const initialState = {email:"", password:"",fullname:"",username:"", confirmPassword:"",gender:"male"}
   const [userData,setUserData] =useState(initialState)
      const [showpass, setShowpass]=useState(false)
    const [showCfpass, setShowCfpass]=useState(false)
   const {email, password,fullname,username, confirmPassword,gender} =userData
    const handleChange = (e) => {
      const {name,value} = e.target;
       setUserData({...userData,[name]:value})
    }
    const  dispatch = useDispatch()
    const navigate = useNavigate()
   const {token,alert} = useSelector(state=>state.auth)
   console.log(alert)
    useEffect(() => {
    if(token){
      navigate('/')
    }
    }, [token,navigate])
    const handleSubmit = (e) => {
      e.preventDefault()
      setUserData({email, password,fullname,username, confirmPassword,gender})
      dispatch(register(userData))
    }
 
  return (
   <div className='register'>
        <div className='register-container'>
       <h3 className='register-header'>Grade Zone Network</h3>
       <h6 className='register-subheader'>register</h6>
     
        <form className='register-dataform' onSubmit={handleSubmit}>
        <input className='register-dataformemail'
         type="text" 
        value={fullname}
        name ="fullname"
        onChange={handleChange}
        style={{backgroundColor:`${alert.fullname? '#fa8e96':''}`}}
        placeholder= {alert.fullname ?`${alert.fullname}`:'Enter your fullname'}
        />
          

         <input className='register-dataformemail'
         type="text" 
        value={username.toLowerCase().replace(/ /g, '')}
        name = 'username'
        onChange={handleChange}
         style={{backgroundColor:`${alert.fullname? '#fa8e96':''}`}}
        placeholder= {alert.username ?`${alert.username}`:'Enter your Username'}/>

        <input className='register-dataformemail'
         type="email" 
        value={email}
        name ='email'
        onChange={handleChange}
         style={{backgroundColor:`${alert.fullname? '#fa8e96':''}`}}
        placeholder= {alert.email ?`${alert.email}`:'Enter your Email'}/>

        <input className='register-dataformpass'
        type={showpass ? "type":'password'}
        value={password}
        name = 'password'
        onChange={handleChange}
         style={{backgroundColor:`${alert.fullname? '#fa8e96':''}`}}
         placeholder= {alert.password ?`${alert.password}`:'Enter your Password'}/>
      
        <small className='register-showpass' onClick={()=>setShowpass(!showpass)}>{showpass ? "Hide" : "Show"}</small>
         <input className='register-dataformpass'
        type={showCfpass ? "type":'password'}
        value={confirmPassword}
        name ="confirmPassword"
         style={{backgroundColor:`${alert.fullname? '#fa8e96':''}`}}
        onChange={handleChange}
         placeholder= {alert.confirmPassword ?`${alert.confirmPassword}`:'Confirm your password'}/>
          
         <select className='register-dataformselect' value={gender} name="gender"onChange={handleChange}>
            <option value='male'>Male</option>
            <option value="female">Female</option>
            <option value='other'>Other</option>
         </select>
        <small className='register-showcfpass' onClick={()=>setShowCfpass(!showCfpass)}>{showCfpass ? "Hide" : "Show"}</small>
        <button className='register-dataformbtn'
        type='submit'>Log In</button>
        <p className='register-small'>  Already have account <Link to='/login'>LogIn HERE</Link> </p>
        </form>
   
       </div>
    </div>
  )
}

export default Register