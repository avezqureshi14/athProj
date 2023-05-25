import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



export const AddEmployee = ({setOpen}) => {

    const navigate = useNavigate();

    const [employeeId, setEmployeeId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [availability, setAvailability] = useState('');

    const addEmployeeHandler = async(e) => {
        e.preventDefault();

        try {

            await axios.post('api/employee/add', {

                employeeId,
                firstName,
                lastName,
                address,
                specialization,
                email,
                phone,
                availability

            });
            toast.success('You have successfully added. Doctor profile!');
            navigate('/employee');
            setOpen(false);

        } catch(error) {
            toast.error('Add failed, please try again!');
        }
    }

  return (
    <div className='quick-container'>
    <form className='formAdd' onSubmit={addEmployeeHandler}>
      <div className="card-quick">
        <div className="card-flex">
            <div className="card-row">
                <label>Doctor ID</label>
            <input type="text" required onChange={(e) => setEmployeeId(e.target.value)} placeholder='Doctor ID' />
            </div>
        </div>
        <div className="card-flex">
            <div className="card-row">
            <label>First Name</label>
            <input type="text" required onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />
            </div>
            <div className="card-row">
            <label>Last Name</label>
            <input type="text" required onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
            </div>
        </div>
        <div className="card-flex">
                <div className="card-row">
                <label>Address</label>
                    <input type="text" required onChange={(e) => setAddress(e.target.value)} placeholder='Address' />
                </div>
                <div className="card-row">
                <label>Specialization</label>
                    <select name="" id="" onChange={(e) => setSpecialization(e.target.value)}>
                        <option value="Emergency Medicine">Emergency Medicine</option>
                        <option value="Diagnostic Radiology">Diagnostic Radiology</option>
                        <option value="Family Medicine">Family Medicine</option>
                        <option value="Anesthesiology">Anesthesiology</option>
                        <option value="Physician">Physician</option>                       
                    </select>
                </div>
            </div>
        <div className="card-flex">
            <div className="card-row">
            <label>E-Mail</label>
                <input type="text" onChange={(e) => setEmail(e.target.value)} required placeholder='E-mail' />
            </div>
            <div className="card-row">
            <label>Contact Number</label>
                <input type="text" required onChange={(e) => setPhone(e.target.value)} placeholder='Contact Number' />
            </div>
        </div>
        <div className="card-flex">
        <div className="card-row">
        <label>Status</label>
                    <select name="" id="" onChange={(e) => setAvailability(e.target.value)}>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                    </select>
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

export default AddEmployee