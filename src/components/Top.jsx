import {Link, useNavigate} from 'react-router-dom'
import React from 'react'
import { FaCogs, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useEffect } from 'react'

const Top = () => {

  const navigate = useNavigate();

  const logoutHanlder = () => {
    localStorage.removeItem('adminInfo');
    toast.success('You have successfully logged out as an Admin!');
    navigate('/login');
  }

  useEffect(() => {
    if(!localStorage.getItem('adminInfo')) {
      localStorage.getItem('adminInfo');
      navigate('/login');
    }
  }, [navigate])

  return (


    <div className='t-container'>
      <div className="t-row">
        <div className="t-link">
          <Link to='/settings' className='t-settings'> <FaCogs />Settings</Link>
          <span className='t-logout' onClick={logoutHanlder}><FaLock />Logout</span>
        </div>
      </div>
    </div>


  )
}

export default Top
