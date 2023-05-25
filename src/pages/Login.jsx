import React from 'react'
import { useState } from 'react'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

const Login = () => {

  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    try {

      const {data} = await axios.post('/api/admins/login', {
        adminId,
        adminPassword
      });

      //console.log(data);

      if(data.adminIs === true) {
        localStorage.setItem('adminInfo', JSON.stringify(data));
        toast.success('You have successfully logged in as an Admin!');
        navigate('/');
      } else {
        toast.error('Invalid AdminId or AdminPassword');
      }

      } catch(err) {
      toast.error('Invalid AdminId or AdminPassword')
    }

  }

  useEffect(() => {
    if(localStorage.getItem('adminInfo')) {
      localStorage.getItem('adminInfo');
      navigate('/');
    }
  }, [navigate])

  return (
    <div className='l-container'>
      <div className="l-row">
        <form onSubmit={loginHandler}>
          <div className="l-groups">
            <h2 className="l-title">Admin Login</h2>
            <div className="l-group">
              <label htmlFor="ID">Admin ID</label>
              <input type="text" id='ID' onChange={(e) => setAdminId(e.target.value)} required spellCheck='false'/>
            </div>
            <div className="l-group">
              <label htmlFor="pass">Admin Password</label>
              <input type="password" onChange={(e) => setAdminPassword(e.target.value)} id='pass' required/>
            </div>
            <div className="l-group">
              <button className='l-btn'>Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
