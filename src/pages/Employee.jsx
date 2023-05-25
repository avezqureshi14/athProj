import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import AddEmployee from '../components/AddEmployee';
import axios from 'axios';

const Employee = () => {

  const [employee, setEmployee] = useState([]); //for default is empty
  //count
  const [countEmployee, setCountEmployee] = useState(0); //for default is 0

  useEffect(() => {

    const fetchData = async() => {
      const resultEmployee = await axios.get('api/employee/all');

      //i want first the latest user to show
      //console.log(resultEmployee);
      const resultEmployeeData = resultEmployee.data;
      //console.log(resultEmployeeData);
      const sortResultEmployeeData = resultEmployeeData.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setEmployee(sortResultEmployeeData);

      const resultCountEmployee = await axios.get('api/employee/countEmployee');
      //console.log(resultCountEmployee);
      setCountEmployee(resultCountEmployee.data);
    }

    fetchData();

  }, []);

  const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
  });

  const [open, setOpen] = useState(false);
  
    const [responsive, setResponsive] = useState("vertical");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
  
    const columns = [
      "DOCTOR ID",
      { name: "DOCTOR NAME", options: { filterOptions: { fullWidth: true } } },
      "SPECIALIZATION",
      "ADDRESS",
      "EMAIL",
      "CONTACT NUMBER",
      "AVAILABILITY"
    ];
  
    const options = {
      search: searchBtn,
      download: downloadBtn,
      print: printBtn,
      viewColumns: viewColumnBtn,
      filter: filterBtn,
      filterType: "dropdown",
      responsive,
      tableBodyHeight,
      tableBodyMaxHeight,
      onTableChange: (action, state) => {
        console.log(action);
        console.dir(state);
      }
    };

    /*const data = [
      ["John Perera", "Jaden", "MALABE","test@gmail.com", "+94714552565", "Available"],
      ["John Perera","John", "MALABE", "test@gmail.com", "+94714552565", "Available"],
      ["John Perera", "Kamal", "MALABE","test@gmail.com", "+94714552565", "Available"],
      ["John Perera", "Janith", "MALABE","test@gmail.com", "+94714552565", "Available"],
      ["John Perera", "WC Perera", "MALABE", "test@gmail.com", "+94714552565", "Available"],
    ];*/

  return (
    <div className='u-container'>
      <div className="u-row">
        <button className="u-btn" onClick={() => setOpen(true)}>Add New</button>
      </div>
      <div className="u-row">
        <div className="u-badge">
          <span className='u-total'>Total Doctors</span>
          <h1 className='u-totalNumber'>{countEmployee?.count}</h1>
        </div>
      </div>
      <div className="u-row">
      {
            employee.length === 0 ? (
              <h3 className='no-data'>There are currently no doctors!</h3>
            ) : (
      <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
        <MUIDataTable
          title={"DOCTORS PROFILES"}
          data={
            employee.map((employ) => (
              [employ.employeeId, employ.firstName + ' ' + employ.lastName, employ.specialization, employ.email, employ.address, employ.phone, employ.availability]
            ))
          }
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </CacheProvider>
            )}
      </div>
      {open && <AddEmployee setOpen ={setOpen} />}
    </div>
  )
}

export default Employee
