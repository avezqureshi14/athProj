import React from 'react'
import { useState } from 'react'
import bcrypt from 'bcryptjs'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Settings = () => {

  const navigate = useNavigate('');

  const adminInfo = localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null;
  console.log(adminInfo);

  const userOldPassword = adminInfo.adminPassword;
  console.log(userOldPassword);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewassword] = useState('');
  const [rNewPassword, setRNewPassword] = useState('');

  const updateHandler = async(e) => {
    e.preventDefault();

    async function compareIt(oldPassword) {

      const validPassword = await bcrypt.compare(oldPassword, userOldPassword);
      //check old password is correct
      if(validPassword !== true) {
        toast.error('Old password is not correct!');
        return;
      } else {

        //if new pass === retype new pass
        if(newPassword === rNewPassword) {
          try {

            const {data} = await axios.put('/api/admins/update', {
              _id: adminInfo._id,
              newPassword

            });

            localStorage.removeItem('adminInfo', JSON.stringify(data));
            toast.success('Password updated successfully!');
            navigate('/login');

          } catch(err) {

            toast.error('Password not updated!');

          }
        } else {

          toast.error('Password doesn`t match!');

        }

      }

    }

    compareIt(oldPassword);
  }


  return (
    <div className='l-container'>
      <div className="l-row">
        <form onSubmit={updateHandler}>
          <div className="l-groups">
            <h2 className="l-title">Settings</h2>
            <div className="l-group">
              <label htmlFor="ID">Admin ID</label>
              <input type="text" id='ID' readonly="readonly" required spellCheck='false' defaultValue={adminInfo.adminId} />
            </div>
            <div className="l-group">
              <label htmlFor="o_pass">Admin Old Password</label>
              <input type="password" onChange={(e) => setOldPassword(e.target.value)} id='o_pass' required />
            </div>
            <div className="l-group">
              <label htmlFor="n_pass">Admin New Password</label>
              <input type="password" onChange={(e) => setNewassword(e.target.value)} id='n_pass' required />
            </div>
            <div className="l-group">
              <label htmlFor="r_pass">Admin Retype New Password</label>
              <input type="password" onChange={(e) => setRNewPassword(e.target.value)} id='r_pass' required />
            </div>
            <div className="l-group">
              <button className='l-btn'>Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Settings