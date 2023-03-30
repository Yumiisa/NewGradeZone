import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../redux/authslice'
import '../styles/Login.css'

const Login = () => {
  const navigate = useNavigate()
     const dispatch = useDispatch()
     const initialState = {email:'', password:''}
    const [showpass, setShowpass] = useState(false)
    const [userData,setUserData] = useState({initialState})
    const {email,password} = userData
    const {token,alert} = useSelector(state=>state.auth)
    useEffect(() => {
    if(token){
      navigate('/')
    }
    }, [token,navigate])
    const handleChange = (e) => {
      const {name, value} = e.target;
      setUserData({...userData, [name]:value})
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      setUserData({email,password})
      dispatch(login(userData))
    }
  return (
    <div className='login'>
        <div className='login-container'>
       <h3 className='login-header'>Grade Zone Network</h3>
       <h6 className='login-subheader'>Login</h6>
     
        <form className='login-dataform' onSubmit={handleSubmit}>
        <input className='login-dataformemail'
         type="email" 
        value={email}
        name = 'email'
        onChange={ handleChange}
        placeholder='type your email'/>
        <input className='login-dataformpass'
        type={showpass ? "type":'password'}
        value={password}
        name = "password"
        onChange={ handleChange}
         placeholder='Type your password'/>
         <small className='login-showpass' onClick={()=>setShowpass(!showpass)}>{showpass ? "Hide" : "Show"}</small>
        <button className='login-dataformbtn'
        type='submit'>Log In</button>
          <p className='login-small'>Do not have account <Link to='/register'>create HERE</Link> </p>
        </form>
   
       </div>
    </div>
  )
}

export default Login