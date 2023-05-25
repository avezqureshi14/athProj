import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddDepartment = ({setOpen}) => {

    const navigate = useNavigate();

    const [departmentName, setDepartmentName] = useState('');
    const [departmentHead, setDepartmentHead] = useState('');
    const [departmentEmail, setDepartmentEmail] = useState('');
    const [departmentPhone, setDepartmentPhone] = useState('');
    const [totalEmployee, setTotalEmployee] = useState(0); // 0 for default

    const addDepartmentHandler = async(e) => {
        e.preventDefault();

        try {

            await axios.post('api/departments/add', {

                departmentName,
                departmentHead,
                departmentEmail,
                departmentPhone,
                totalEmployee

            });
            toast.success('You have successfully added. Centres details!');
            navigate('/department');
            setOpen(false);

        } catch(error) {
            toast.error('Add failed, please try again!');
        }

    }

  return (
    <div className='quick-container'>
        <form className='formAdd' onSubmit={addDepartmentHandler}>
          <div className="card-quick">
            <div className="card-flex">
                <div className="card-row">
                    <label>Centre Name</label>
                    <input type="text" required onChange={(e) => setDepartmentName(e.target.value)} placeholder='Name' />
                </div>
            </div>
            <div className="card-flex">
                <div className="card-row">
                <label>Centre Location</label>
                    <input type="text" className='department-input' onChange={(e) => setDepartmentHead(e.target.value)} required placeholder='ex: colombo' />
                </div>
            </div>
            <div className="card-flex">
                <div className="card-row">
                <label>Centre E-Mail</label>
                    <input type="text" className='department-input' onChange={(e) => setDepartmentEmail(e.target.value)} required placeholder='example@gmail.com' />
                </div>
            </div>
            <div className="card-flex">
                <div className="card-row">
                <label>Centre HotLine</label>
                    <input type="text" className='department-input' onChange={(e) => setDepartmentPhone(e.target.value)} required placeholder='format: +94714552555' />
                </div>
            </div>
            <div className="card-flex">
                <div className="card-row">
                <label>Total Employee</label>
                    <input type="number" className='department-input' onChange={(e) => setTotalEmployee(e.target.value)} placeholder='Total Employee' min={0} defaultValue={0} required />
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

export default AddDepartment