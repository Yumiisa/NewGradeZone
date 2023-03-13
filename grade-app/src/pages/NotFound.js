import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/NotFound.css'

const NotFound = () => {
  return (
    <div className='notfound'>
        <h2 className='notfound-text'>NotFound</h2>
        <p className='notfound-found'>Go to Home pages
        <Link to="/">Here</Link>
        </p>
    </div>
  )
}

export default NotFound