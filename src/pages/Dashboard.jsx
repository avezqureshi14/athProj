import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FaAmbulance, FaCalendar, FaHotel, FaIdCard, FaUserAlt } from 'react-icons/fa';
import Projects from '../components/Projects';
import RevenueChart from '../components/RevenueChart';
import SalaryChart from '../components/SalaryChart';

const Dashboard = () => {

  //count
  const [users, setUsers] = useState(0); //for default is 0
  const [holidays, setHolidays] = useState(0); //for default is 0
  const [accountsNumber, setAccountsNumber] = useState(0); //for default is 0
  const [events, setEvents] = useState(0); //for default is 0


  useEffect(() => {
    const fetchData = async() => {

      const resultUsers = await axios.get('/api/users/countUsers');
      //console.log(resultUsers);
      setUsers(resultUsers.data);

      const resultHolidays = await axios.get('/api/holidays/countHolidays');
      //console.log(resultHolidays);
      setHolidays(resultHolidays.data);


      const resultAccountsNumber = await axios.get('/api/accounts/countAccounts');
      //console.log(resultAccountsNumber);
      setAccountsNumber(resultAccountsNumber.data);

      const resultEvents = await axios.get('/api/events/countEvents');
      //console.log(resultEvents);
      setEvents(resultEvents.data);
    }

    fetchData();
  }, []);

  const adminInfo = localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null

  return (
    <div className='d-container'>
      <div className="d-row">
        <h1 className="d-title">Welcome {adminInfo.adminName}</h1>
      </div>
      <div className="d-row">
        <div className="d-groups">
          <div className="d-group">
            <div className="d-badge">{users?.count}</div>
            <div className="d-content">
              <FaUserAlt />
              <span className='d-subtitle'>System Users</span>
            </div>
          </div>
          <div className="d-group">
            <div className="d-badge">{holidays?.count}</div>
            <div className="d-content">
              <FaHotel />
              <span className='d-subtitle'>Holidays</span>
            </div>
          </div>
          <div className="d-group">
            <div className="d-badge">{events?.count}</div>
            <div className="d-content">
              <FaCalendar />
              <span className='d-subtitle'>Events</span>
            </div>
          </div>
          <div className="d-group">
            <div className="d-badge">{accountsNumber?.count}</div>
            <div className="d-content">
              <FaAmbulance />
              <span className='d-subtitle'>Ambulance</span>
            </div>
          </div>
        </div>
      </div>
      <div className="d-row">
        <div className="d-charts">
          <div className="d-chart">
            <SalaryChart />
          </div>
          <div className="d-chart">
            <RevenueChart />
          </div>
        </div>
        <div className="d-projects">
          <Projects />
        </div>
      </div>
    </div>
  )
}

export default Dashboard