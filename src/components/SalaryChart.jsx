import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Salary Statistics',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: [3430, 4302, 2345, 4330, 4322, 2990, 1890],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Expense',
        data: [2500, 4302, 1900, 2654, 5434, 4564, 2200],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
const SalaryChart = () => {
  return (
    <>
      <Bar options={options} data={data}/>
    </>
  )
}

export default SalaryChart
