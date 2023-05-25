import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Holidays = () => {

  const [holidays, setHolidays] = useState([]); //for default is empty

  useEffect(() => {

    const fetchData = async() => {
      const resultHolidays = await axios.get('api/holidays/all');

      //i want first the latest user to show
      //console.log(resultHolidays);
      const resultHolidaysData = resultHolidays.data;
      //console.log(resultHolidaysData);
      //const sortResultHolidaysData = resultHolidaysData.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setHolidays(resultHolidaysData);
    }

    fetchData();

  }, []);

  return (
    <div className='h-container'>
      <div className="h-row">
        <h3 className="h-title">Holidays</h3>
      </div>
      <div className="h-row">
        <div className="h-table">
            <table>
              <thead>
                <tr>
                  <th>DAY</th>
                  <th>DATE</th>
                  <th>HOLIDAY</th>
                </tr>
              </thead>
              <tbody>
                {
                  holidays === 0 ? (
                    <h3 className='no-data'>There are currently no Holidays!</h3>
                  ) : (
                      holidays.map((holiday) => (
                        <tr>
                          <td>{holiday.day}</td>
                          <td>{holiday.date}</td>
                          <td>{holiday.holiday}</td>
                        </tr>
                      ))
                  )
                }
              </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default Holidays