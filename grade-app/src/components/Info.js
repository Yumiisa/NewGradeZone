
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Avatar} from '@mui/material'
import  {useParams} from 'react-router-dom'
import '../styles/Info.css'
import { getProfileUsers } from '../redux/authslice'
// import { useGetProfileUsersQuery } from '../user/userSlice'
const Info = () => {
   
    const [userData,setUserData] = useState([])
    //  console.log(useParams())
     const {id} = useParams()
     const {token,register, user} = useSelector(state=>state.auth)
     const toke = token.access_token
     const dispatch = useDispatch()
    //  const { data, isLoading, isError, isSuccess } = useGetProfileUsersQuery(id);
    //    console.log(data)
    
     useEffect(() => {
            if(user && id === user._id)
           
           setUserData([user])
           else{
            dispatch(getProfileUsers(id,toke))
//             .then((result) => {
//     console.log('User profile fetched:', result.payload);
//   })
//   .catch((error) => {
//     console.error('Error fetching user profile:', error);
//   });
           }
     }, [ user, id,dispatch,toke])
    // console.log(userData)
    
  return (
  
    <div className='profileinfo'>
       {userData.length > 0 && userData.map(user =>(
        <div className='profileinfo-container' key = {user._id}>
            <div className="profileinfo-top">
                <img src={user.avatar} alt={user.username[0].toUpperCase()}/>
            </div>
            <div className='profileinfo-center'>
                <img className='profileinfo-centeravatar' src={user.avatar} alt={user.username[0].toUpperCase()}/>
                <button className='profileinfo-centerbutton'>ADD FRIENDS</button>
            </div>
        <div className='profileinfo-bottom'>
            <div className='profileinfo-bottomleft'>
                <div className='profileinfo-stat'>
                    <h6 className='profileinfo-statenumber'>{user.friends.length}</h6>
                    <h6 className="profileinfo-statedesc">FRIENDS</h6>
                </div>
                <div className='profileinfo-stat'>
                    <h6 className='profileinfo-statenumber'>{user.following.length}</h6>
                    <h6 className="profileinfo-statedesc">FOLLOWING</h6>
                </div>
            </div>
             <div className='profileinfo-bottomcenter'>
                <h3 className ='profileinfo-fullname'>{user.fullname}</h3>
                <h5 className ='profileinfo-username'>{user.username}</h5>
             </div>
             <div className='profileinfo-bottomright'>
                <div className='profileinfo-stat'>
                    <h6 className='profileinfo-statenumber'>{user.friends.length}</h6>
                    <h6 className="profileinfo-statedesc">Posts</h6>
                </div>
                </div>
           </div>
        </div>
       ))}
    </div>
  )
}

export default Info