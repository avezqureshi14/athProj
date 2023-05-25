import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify'

import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import axios from 'axios';

const Projects = () => {

    const muiCache = createCache({
        key: "mui-datatables",
        prepend: true
    });

    const [projects, setProjects] = useState([]); //for default is empty

  useEffect(() => {

    const fetchData = async() => {
      const resultProjects = await axios.get('api/projects/all');

      //i want first the latest user to show
      //console.log(resultProjects);
      const resultProjectsData = resultProjects.data;
      //console.log(resultProjectsData);
      const sortResultProjectsData = resultProjectsData.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setProjects(sortResultProjectsData);
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
        { name: "PATIENT NAME", options: { filterOptions: { fullWidth: true } } },
        "REQUEST SERVICE",
        "ADDRESS",
        "GENDER",
        "CONTACT NUMBER",
        "PAYMENT METHOD",
        "AMOUNT",
        "STATUS"
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
        ["Gabby George", "Admin Panel", "$800", "Done", "Delivered"],
        ["Aiden Lloyd", "One Page For Portfolio", "$500", "Pending", "Submit"],
        ["Jaden Collins", "WebSite for Caffee", "$900", "Pending", "Submit"],
        ["Franky Rees", "Online Shop Fashion", "$2000", "Done", "Delivered"],
        ["Aaren Rose", 'e-Commerce WebSite for Mobile', "$2300", "Done", "Delivered"],
    ];*/

  return (
    <div className='pr-container'>
        <div className="pr-row">
            {
                projects.length === 0 ? (
                    <h3 className='no-data'>There are currently no patient records!</h3>
                ) : (
                <CacheProvider value={muiCache}>
                    <ThemeProvider theme={createTheme()}>
                        <MUIDataTable
                        title={"LIVE CHANNELING SUMMARY"}
                        data={
                            projects.map((project) => (
                                [project.clientName, project.project,project.address,project.gender,project.phone,project.method, 'Rs ' + (project.projectCost).toFixed(2), project.payment, project.status]
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

export default Projects