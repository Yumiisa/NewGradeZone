import React, { useEffect, useState } from 'react'
import {IconButton,Avatar} from '@mui/material'
import HomeIcon from "@material-ui/icons/Home";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExploreIcon from "@material-ui/icons/Explore";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import '../styles/Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout, showAlert } from '../redux/authslice';
import { Link, useLocation } from 'react-router-dom';
import { getDataApi } from '../utils/fetchDataApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserCard from './UserCard';
import loading from '../assets/200w.webp'

const Header = () => {
    const dispatch =useDispatch()
    const [search,setSearch]=useState('')
      const [error, setError] = useState(null);
     const [users,setUsers]=useState([])
     const [load,setLoad] = useState(false)

   const {alert,token,register,registerUser, user} = useSelector(state=>state.auth)
   const toke = token.access_token
   
  
   console.log(registerUser)
 
  //  useEffect(() => {
  //  if (search && token){
  //   getDataApi(`search?username=${search}`,token)
  //   .then(res =>setUsers(res.data.users))
  //   .catch(err =>{
  //       setError(err.response.data.msg)
  //       toast.error(err.response.data.msg);
  //   //  console.log({error:err.response.data.msg})
  //   })
  //  }else{
  //   setUsers([])
  //  }
  //  }, [search,token,dispatch])


  const  pathname  = useLocation();
  // console.log(pathname)

const isActive = (path) => {
  if(path === pathname) return  'active' 
};

const handleCLose =()=>{
  setSearch("")
  setUsers([])
}

const handleSearch = async (e) =>{
 e.preventDefault()
 if(!search) return;
 try {
    setLoad(true)
     const res =  await getDataApi(`search?username=${search}`,toke) 
    //  console.log(token)
        setUsers(res.data.users)
        setLoad(prev =>!prev)
 } catch (error) {
        //  setError(error.response.data.msg)
        // toast.error(error.response.data.msg);
  
 }
}
  
  return (
   
    <div className='header'>
       {error && <p style={{display:"none"}}>{error}</p>}
        <div className='header-right'>
           <h3>Social Network</h3>
        </div>
        <form className='header-center' onSubmit={handleSearch}>
            <input type='text' placeholder='Search Profiles' 
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
             />
            <SearchIcon  style = {{opacity: users.length>0 ? "0" :"1" }}/>
            <span className='header-centersearchclose' onClick = {handleCLose}
            style = {{opacity: users.length>0 ? "1" :"0" }}
            >&times;</span>
            <button type='submit' style={{display:'none'}}>Search</button>
        
             <div className='header-searchusers'>
             {load && <img src={loading} alt="loading ..." style={{width:'58px', height:'48px'}}/>}
            {
           search && users.length > 0 && users.map(user => (
                <Link to={`profile/${user._id}` } key={user._id}>
                    <UserCard user={user} key={user._id} handleCLose={handleCLose}/>
                </Link>
            ))
         }
        </div>
        
        </form>
       
        
        <div className ='header-left'>
            <Link to={`/profile/${user._id}`}>
              <div className= 'header-leftAvatar'>
                <Avatar src={user.avatar}/>
                <h4>{user.fullname}</h4>
             </div>
            </Link>
            
            <Link to="/">
            <IconButton>
              <HomeIcon className={isActive( '/')}/> 
            </IconButton>
            </Link>
            <Link to='/message'>
            <IconButton>
              <MessageIcon className={isActive('/message')}/> 
            </IconButton>
            </Link>
             <Link to='/notifications' >
            <IconButton>
              <NotificationsIcon className='notice'/> 
            </IconButton>
             </Link>
             <Link to='/explore'>
                <IconButton>
              <ExploreIcon className={isActive('/explore')}/> 
            </IconButton>
             </Link>
             
             <IconButton onClick={()=>dispatch(logout())}>
              < ExitToAppIcon  /> 
            </IconButton>
              
        </div>
        <ToastContainer 
        
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        closeButton={false}
        style={{ backgroundColor: '#rgb(172,15,15)', borderRadius: '8px', color: '#ffffff', fontSize: '16px' }}
        toastStyle={{ backgroundColor: 'rgb(172,15,15)', borderRadius: '8px', color: '#ffffff', fontSize: '16px', borderBottom: 'none' }}
        />
    </div>
  )
}

export default Header