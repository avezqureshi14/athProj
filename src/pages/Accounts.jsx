import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import axios from 'axios';

const Accounts = () => {

  const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
  });

  const [accountsNumber, setAccountsNumber] = useState(0); //for default is 0
  const [accounts, setAccounts] = useState([]); //for default is empty

  useEffect(() => {

    const fetchData = async() => {
      const resultAccounts = await axios.get('api/accounts/all');

      //i want first the latest user to show
      console.log(resultAccounts);
      const resultAccountsData = resultAccounts.data;
      //console.log(resultAccountsData);
      const sortResultAccountsData = resultAccountsData.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setAccounts(sortResultAccountsData);
      console.log(sortResultAccountsData);


      const resultAccountsNumber = await axios.get('api/accounts/countAccounts');
      //console.log(resultAccountsNumber);
      setAccountsNumber(resultAccountsNumber.data);
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
      { name: "VEHICLE NUMBER", options: { filterOptions: { fullWidth: true } } },
      "DRIVER",
      "CONTACT NUMBER",
      "BRANCH",
      "JOINED DATE",
      "TYPE",
      "STATUS",
      "SALARY"
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
    ["ricpe-3242", "Google", "25.09.2022", "VISA", "PENDING", "$4500.00"],
    ["ricpe-55844", "BT Technology", "20.05.2022", "PAYPAL", "Approved", "$1340.00"],
    ["ricpe-32234", "Endava", "21.04.2022", "SKRILL", "Approved", "$800.00"],
    ["ricpe-96756", "Amazon", "05.03.2022", "BITCOIN", "PENDING", "$12430.00"],
  ];*/

  return (
    <div className='u-container'>
      <div className="u-row accounts">
        <div className="u-badge">
          <span className='u-total'>Total Ambulances</span>
          <h1 className="u-totalNumber">{accountsNumber?.count}</h1>
        </div>
      </div>
      <div className="u-row">
        {
          accounts.length === 0 ? (
            <h3 className='no-data'>Details of Ambulances are loading please wait!</h3>
          ) : (
            <CacheProvider value={muiCache}>
              <ThemeProvider theme={createTheme()}>
                  <MUIDataTable
                  title={"AMBULANCE VEHICLE DETAILS"}
                  data={
                    accounts.map((account) => (
                      [account.invoiceNo,account.driver,account.phone, account.clients, account.createdAt?.slice(0, 10), account.type, account.status === true ? ('Available') : ('Not Available'), account.amount]
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
    </div>
  )
}

export default Accounts