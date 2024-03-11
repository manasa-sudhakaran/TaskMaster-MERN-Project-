import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Box, Grid, Card } from '@mui/material';
import DrawerLeft from './DrawerLeft';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Analytics = () => {
  const open = useSelector((state) => state.drawer.open);
  const [projectsData, setProjectsData] = useState({
    // labels: ['Estimation time', 'Actual Time'],
    datasets: [
      {
        label: 'Estimation Time',
        data: [],
        backgroundColor: "#00FFFF",
        borderColor: "#00FFFF",
        borderWidth: 1,
        barThickness: 20,
      },
      {
        label: 'Actual Time',
        data: [],
        backgroundColor: "#F7BEC0",
        borderColor: "#F7BEC0",
        borderWidth: 1,
        barThickness: 20,
      },
    ],
  });

  const [tasksData, setTasksData] = useState({
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [
      {
        label: ' Tasks',
        data: [0, 0, 0],
        backgroundColor: [
          '#E3963E',
          '#6495ED',
          '#50C878',
        ],
        borderColor: [
          '#E3963E',
          '#6495ED',
          '#50C878',
        ],
        borderWidth: 1,
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        // display: false
      },
      scales: {
        x: { 
          categoryPercentage: 1, 
          barPercentage: 1 
        }
    }
  }
  }
  const optionspie = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    }
  }

  const mainContentStyle = {
    transition: 'margin 0.5s ease',
    marginLeft: open ? "200px" : "0px", // Adjust this value based on your drawer's width
    padding: '30px 73px',
    backgroundColor: '#eaecfb',
    height: '100vh',
};

  useEffect(() => {
    // Replace 'your_api_endpoint' with your actual API endpoint
    const token = localStorage.getItem('token')
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('http://localhost:3005/analyticsapi/analytics', { headers: { Authorization: `Bearer ${token}` } }); // Add your token here
        const { projects, tasks } = response.data;

        console.clear()
        console.log(projects, "projects   ")
        // Projects Data
        setProjectsData({
          ...projectsData,
          labels: projects.map(project => project.projectName),
          datasets: [
            // ...projectsData.datasets,
            {
              ...projectsData.datasets[0],
              data: projects.map(project => project.estimationTime),
            },
            {
              ...projectsData.datasets[1],
              data: projects.map(project => project.actualTime),
            },
          ],
        });

        // Tasks Data
        setTasksData({
          ...tasksData,
          datasets: [
            {
              ...tasksData.datasets[0],
              data: [tasks.pending, tasks.inProgress, tasks.completed],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();

    console.log(projectsData, "project data value")
  }, []);

  return (
    <div style={{backgroundColor: ' #f5f7ff',height:"100vh", overflowX:"hidden"}}>
      <DrawerLeft />
      <Box style={mainContentStyle}>
        <Grid container spacing={3} style={{display: 'flex', flexDirection: 'row', margin: '12px 37px'}}>
          <Grid item xs={12} sm={6}  style={{paddingLeft: "16px", paddingTop: "16px",}}>
            <Card sx={{width: "530px", height: "430px", backgroundColor: "#fff", borderRadius: "15px"}}>
              <Box style={{margin:20, display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <h2 style={{display: "flex", justifyContent: "center", fontSize: "18px"}}>Projects Analytics</h2>
                <div style={{height: "500px", width: "400px", display: "flex", justifyContent: "center", margin: "38px"}}>
                  <Bar data={projectsData} options={options}  style={{width: "400px", minHeight: "273px",display: "flex", justifyContent: "center"}}/>
                </div>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}  style={{paddingLeft: "16px", paddingTop: "16px",}}>
            <Card sx={{width: "530px", height: "430px", backgroundColor: "#fff", borderRadius: "15px"}}>
              <Box style={{margin:20, display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <h2 style={{display: "flex", justifyContent: "center", fontSize: "18px"}}>Tasks Analytics</h2>
                <div style={{height: "360px", width: "590px", display: "flex", justifyContent: "center", marginTop: "-45px"}}>
                  <Pie data={tasksData} options={optionspie} style={{width: "300px", height: "300px",display: "flex", justifyContent: "center"}}/>
                </div>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default React.memo(Analytics);