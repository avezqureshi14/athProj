import React from 'react'
import { useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddUser = ({setOpen}) => {

    const navigate = useNavigate();
    
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [role, setRole] = useState('');
    const [roleType, setRoleType] = useState('');
    const [password, setPassword] = useState('');
    const [rPassword, setRPassword] = useState('');

    const addUserHandler = async(e) => {
        e.preventDefault();

        //if not password equal repeat password, then return
        if(password !== rPassword) {
            toast.error('Passwords does not match. please try again!');
            return;
        }

        try {

            await axios.post('api/users/add', {

                userId,
                firstName,
                lastName,
                email,
                mobile,
                role,
                roleType,
                password

            });
            toast.success('You have successfully added system User profile!');
            navigate('/users');
            setOpen(false);

        } catch(error) {
            toast.error('Add failed, please try again!');
        }

    }

  return (
    <div className='quick-container'>
        <form className='formAdd' onSubmit={addUserHandler}>
          <div className="card-quick">
            <div className="card-flex">
                <div className="card-row">
                    <label htmlFor="">User ID</label>
                    <input type="text" onChange={(e) => setUserId(e.target.value)} required placeholder='Enter User Id' />
                </div>
            </div>
            <div className="card-flex">
                <div className="card-row">
                <label htmlFor="">First Name</label>
                    <input type="text" onChange={(e) => setFirstName(e.target.value)} required placeholder='Enter first Name' />
                </div>
                <div className="card-row">
                <label htmlFor="">Last Name</label>
                    <input type="text" onChange={(e) => setLastName(e.target.value)} required placeholder='Enter last name' />
                </div>
            </div>
            <div className="card-flex">
                <div className="card-row">
                    <p>Email</p>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} required placeholder='example@role.livecare.lk' />
                </div>
                <div className="card-row">
                <label htmlFor="">Contact Number</label>
                    <input type="text" onChange={(e) => setMobile(e.target.value)} required placeholder='Enter contact number' />
                </div>
            </div>
            <div className="card-flex">
                <div className="card-row">
                <label htmlFor="">User Name</label>
                    <input type="text" onChange={(e) => setRole(e.target.value)} required placeholder='Enter user name' />
                </div>
                <div className="card-row">
                <label htmlFor="">User Roles</label>
                    <select name="" id="" onChange={(e) => setRoleType(e.target.value)}>
                        <option value="Doctor">Doctor</option>
                        <option value="Patient">Patient</option>
                        <option value="Licensed Practical Nurses">Licensed Practical Nurses</option>
                        <option value="Support Staff">Support Staff</option>
                        <option value="Customer Care">Customer Care</option>
                        <option value="Financial Management">Financial Management</option>
                        <option value="Allied Health Professionals">Allied Health Professionals</option>
                        <option value="Finance">Support Staff</option>
                        <option value="Physician's Assistants">Physician's Assistants</option>                        
                    </select>
                </div>
            </div>
            <div className="card-flex">
                <div className="card-row">
                    <input type="password" onChange={(e) => setPassword(e.target.value)} required placeholder='Password' />
                </div>
                <div className="card-row">
                    <input type="password" onChange={(e) => setRPassword(e.target.value)} required placeholder='Retype Password' />
                </div>
            </div>

            <div className="card-flex">
            <div className="card-row">
                <button className='add'>Add</button>
            </div>

            <div className="card-row">
                <button className='back' onClick={() => setOpen(false)}>Close</button>
            </div>
            
        </div>
      </div>
    </form>
</div>
  )
}

export default AddUser