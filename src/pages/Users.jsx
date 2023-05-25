import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import AddUser from '../components/AddUser';
import axios from 'axios'

const Users = () => {


  const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
  });

  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]); //for default is empty

    useEffect(() => {

    const fetchData = async() => {
      const resultUsers = await axios.get('api/users/all');

      //i want first the latest user to show
      //console.log(resultUsers);
      const resultUsersData = resultUsers.data;
      //console.log(resultUsersData);
      const sortResultUsersData = resultUsersData.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setUsers(sortResultUsersData);
    }

    fetchData();

  }, []);
  
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);

  const columns = [
      "USER ID",
      { name: "NAME", options: { filterOptions: { fullWidth: true } } },
      "CREATED DATE",
      "EMAIL",
      "USER NAME",
      "PASSWORD",
      "ROLE TYPE"
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
      },
  };

  /*const data = [
      ["Miljan Peric", "23.09.2022", "Boss", "SUPER ADMIN"],
      ["John Deep", "23.09.2022", "Full-Stack WebDeveloper", "EMPLOYEE"],
      ["Ana Simic", "23.09.2022", "HR", "HR ADMIN"]
  ];*/

  return (
    <div className='u-container'>
      <div className="u-row">
        <button className="u-btn" onClick={() => setOpen(true)}>Add New</button>
      </div>
      <div className="u-row">
        {
          users.length === 0 ? (
            <h3 className='no-data'>There are currently no users!</h3>
          ) : (
            <CacheProvider value={muiCache}>
              <ThemeProvider theme={createTheme()}>
                  <MUIDataTable
                  title={"LIVECARE SYSTEM USERS"}
                  data={
                    users.map((user) => (
                      [user.userId,user.firstName + ' ' + user.lastName, user.createdAt?.slice(0, 10),user.email,user.role, user.password, user.roleType]
                    ))
                  }
                  columns={columns}
                  options={options}
                  />
              </ThemeProvider>
          </CacheProvider>
          )
        }
        
      </div>
      {open && <AddUser setOpen={setOpen} />}
    </div>
  )
}

export default Users