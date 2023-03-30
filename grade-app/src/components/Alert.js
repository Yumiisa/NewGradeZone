import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideAlert } from '../redux/authslice'
import Loading from './Loading'
import Toast from './Toast'

const Alert = () => {
    const {alert}=useSelector(state =>state.auth)
    console.log(alert)
    const dispatch= useDispatch()

    const close = () =>{
        dispatch(hideAlert())
    }
  return (
    <div>
        {alert.loading && <Loading/>}
       {alert.msg && <Toast msg={ {title:"Error", body:alert.msg}} 
      bgColor="rgb(172,15,15)" handleShow={close}/>} 
      {alert.success && <Toast msg={ {title:"Success", body:alert.success}} 
      bgColor="rgb(15,263,100)" handleShow={close}/>} 
        </div>
  )
}

export default Alert