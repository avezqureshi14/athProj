import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='s-container'>
      <div className="s-row">
        
        <h2 className="s-logo">Admin Management</h2>
      </div>
      <div className="s-row">
        <div className="s-groups">
          <div className="s-group">
            <NavLink to='/' className='s-link' activeclassName='active'>Dashboard</NavLink>
          </div>

        <div className="s-group">
            <NavLink to='/users' className='s-link' activeclassName='active'>System Users</NavLink>
          </div>
          <div className="s-group">
            <NavLink to='/department' className='s-link' activeclassName='active'>LiveCare Centres</NavLink>
          </div>
          <div className="s-group">
            <NavLink to='/employee' className='s-link' activeclassName='active'>Doctors</NavLink>
          </div>
          <div className="s-group">
            <NavLink to='/activities' className='s-link' activeclassName='active'>ANNOUNCEMENTS</NavLink>
          </div>
          <div className="s-group">
            <NavLink to='/events' className='s-link' activeclassName='active'>Events</NavLink>
          </div>
          <div className="s-group">
            <NavLink to='/holidays' className='s-link' activeclassName='active'>Holidays</NavLink>
          </div>
          <div className="s-group">
            <NavLink to='/accounts' className='s-link' activeclassName='active'>AMBULANCES</NavLink>
          </div>
      </div>
    </div>
    </div>
  )
}

export default Sidebar
