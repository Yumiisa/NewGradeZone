
import React from 'react'
import {Avatar} from '@mui/material'
import { Link } from 'react-router-dom'
import { borderBottom } from '@mui/system'

const UserCard = ({user, handleClose}) => {
  const handleCloseAll =() =>{
    if(handleClose) handleClose()
  }
  return (
    <div >
      <div  style = {{display:"flex", padding:"10px", alignItems:"center", borderBottom:"1px solid rgb(149,149,231"}}>
      <Link to={`/profile/${user._id}`} 
      style = {{display:"flex", padding:"10px", alignItems:"center"}}
      onClick = {handleCloseAll}
      >

     <Avatar src={user.avatar}/>
    
    <div style={{marginLeft:'6px', color:"white"}}>
      <span style={{display:"block"}}>{user.fullname}</span>
      <small style={{color:"white"}}>{user.username}</small>
    </div>
    </Link>
    </div>
  </div>
  )
}

export default UserCard