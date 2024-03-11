  import React, {useState, useEffect} from 'react'
  import DrawerLeft from './DrawerLeft';
  import {Grid, Card, CardContent, Button, Box, Avatar, Modal, TextField} from '@mui/material';
  import Calendar from 'react-calendar';
  import { useNavigate } from 'react-router-dom';
  import 'react-calendar/dist/Calendar.css';
  import './custom.css';
  import ListItem from '@mui/material/ListItem';
  import ListItemButton from '@mui/material/ListItemButton';
  import ListItemIcon from '@mui/material/ListItemIcon';
  import ListItemText from '@mui/material/ListItemText';
  import WorkIcon from '@mui/icons-material/Work';
  import TaskIcon from '@mui/icons-material/Task'
  import AnalyticsIcon from '@mui/icons-material/Analytics'
  import NotificationsIcon from '@mui/icons-material/Notifications';
  import OpenInFullIcon from '@mui/icons-material/OpenInFull';
  import projectimg from "../img/projectimage.jpg";
  import userimg from "../img/userimage.jpg";
  import analyticsimg from "../img/analytics.jpg";
  import taskimg from "../img/taskimage.jpg"
  import Snackbar from '@mui/material/Snackbar';
  import { useSelector, useDispatch } from 'react-redux';
  import { addNotification,  loadNotifications} from './notificationsSlice'
  import io from 'socket.io-client';

  let socket;

  const DashboardForm = () => {

      const navigate = useNavigate();

      const [date, setDate] = useState(new Date());
      const onChange = date => {setDate(date);};

      const [profile,setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        designation:'',
        description: ''
      });
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [name, setName] = useState('');
      const [email, setEmail] = useState('')
      const [designation, setDesignation] = useState('');
      const [description, setDescription] = useState('');
      const [token,setToken] = useState('')
      const [profileEditModal, setProfileEditModal] = useState(false)
      const [snackbarOpen, setSnackbarOpen] = useState(false)
      const [notificationsDisplay, setNotificationsDisplay] = useState([])

      const open = useSelector((state) => state.drawer.open);
      const { notifications } = useSelector((state)=>state.notifications)
      const dispatch = useDispatch();
      
      const fetchProfile = async(token) => {
        try{
          const response = await fetch('http://localhost:3005/profile/profile',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
           if(!response.ok){
            throw new Error('Failed to fetch profile');
           }

           const data = await response.json()
           setProfile(data)
           const fullName = data.firstName + " " + data.lastName
           console.log(fullName)
           console.log(profile, 'Profile');
           console.log(data, "Profile data response")
           setName(fullName);
           setDesignation(data.designation)
           setDescription(data.description)
           setEmail(data.email)
           setFirstName(data.firstName)
           setLastName(data.lastName)
        } catch (error) {
          console.error("Error fetching profile: catch", error)
        }
      }

      useEffect(() =>{
        const storedToken = localStorage.getItem('token');
        if(storedToken){
          setToken(storedToken)
          fetchProfile(storedToken)
      }
      socket = io('http://localhost:3005');
          const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
          dispatch(loadNotifications(savedNotifications));
          console.clear()
          console.log(savedNotifications)
          socket.on('notification', (notification) => {
          dispatch(addNotification(notification));
          console.log(notification, "Notifications")
          console.log(typeof(notification), "Notification Type")
          setSnackbarOpen(true);
          setTimeout(() => setSnackbarOpen(false), 5000); 
          const currentNotifications = [...savedNotifications, notification];
          localStorage.setItem('notifications', JSON.stringify(currentNotifications));
          setNotificationsDisplay({currentNotifications})
          });
      return () => {
        socket.off('notification');
      };
      },[dispatch])


      const updateProfile = async (e) => {
        const profileData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          designation:designation,
          description: description
        }
        const fullName = profileData.firstName + " " + profileData.lastName
        setName(fullName)
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:3005/profile/profile', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profileData)
          });
    
          if (!response.ok) {
            throw new Error('Failed to update profile');
          }
    
          const updatedProfile = await response.json();
          setProfile(updatedProfile);
          alert('Profile updated successfully!');
          setProfileEditModal(false)
          console.log("updated Profile", profile)
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      };

      const handleNavigation = (path) => {
        navigate(path)
      }

      const handleClose = () => {
        setProfileEditModal(false)
      }

      const mainContentStyle = {
        transition: 'margin 0.5s ease',
        marginLeft: open ? "200px" : "0px", 
        padding: '30px 73px',
        backgroundColor: '#eaecfb',
        height: '100vh',
    };

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      maxHeight:700,
      bgcolor: 'background.paper',

      boxShadow: '0.5px',
      overflow: 'auto',

    };

    return (
      <div style={{backgroundColor: ' #f5f7ff',height:"100vh", overflowX:"hidden"}}>
        <DrawerLeft />
        {console.log("isDrawerOpenVal:", open)}
          <Box style={mainContentStyle}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card style={{height: '300px', maxWidth: '400px',borderRadius: "15px"}} elevation={10}>
                    <CardContent>
                    <Box style={{height: "110px",margin: "-16px", width: "400px",borderRadiusTop:"15px", backgroundColor: "#c6c6c6"}}></Box>
                    <Avatar src={userimg} alt="" style={{fontSize: "100px", marginTop: "-60px", marginLeft: "135px", width: "105px", height: "90px"}} />
                      <div style={{marginTop: "-20px", display: "flex",flexDirection:"column", justifyContent: "center", alignContent: "center", alignItems: "center"}}>
                          <Box style={{height: "100px", display: "flex",flexDirection:"column", justifyContent: "center", alignContent: "center", alignItems: "center"}}>
                            <h4 style={{fontSize:"22px"}}>{name}</h4>
                            <p style={{marginTop: "-20px", fontSize: "14px"}}>{designation}</p>
                            <p style={{marginTop: "-10px", fontSize: "12px"}}>Bio: {description}</p>
                          </Box>
                          <Button onClick={() => setProfileEditModal(true)}  style={{ marginTop: "10px", backgroundColor: "#00bcd4",width: "225px", color: "#ffffff", fontWeight: 600, textTransform: "none"}}>Edit</Button>
                        </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card style={{height: '300px', maxWidth: '400px', borderRadius: "15px"}} elevation={10}>
                    <CardContent onClick={() => handleNavigation("/project")} style={{cursor: "pointer"}}>
                      <div>
                        <Grid container spacing={1} style={{display:"flex", flexDirection: "row"}}>
                          <Grid item style={{display:"flex", flexDirection: "row"}} xs={6}>
                            <ListItem key="project" disablePadding>
                              <ListItemButton style={{backgroundColor: "white"}}>
                                <ListItemIcon>
                                  <WorkIcon style={{color: "#00bcd4"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Project" style={{marginLeft: "-10px"}}/>
                              </ListItemButton>
                            </ListItem>
                          </Grid>
                          <Grid item xs={6} style={{display: "flex", justifyContent: "flex-end"}}>
                            <Button onClick={() => handleNavigation("/project")}>
                              <OpenInFullIcon  style={{fontSize: "20px"}}/>
                            </Button>
                          </Grid>
                        </Grid>
                        <Grid container spacing={1} style={{display:"flex", flexDirection: "row"}}>
                          <Grid item xs={12} style={{display: "flex", flexDirection: "row"}}>
                            <Box style={{border: "1px solid #c5c3c3", height: "175px", width: "320px",margin: "20px", borderRadius: "15px"}}>
                                <img src={projectimg} alt="" style={{width: "320px", height: "175px", borderRadius: "15px"}}/>
                            </Box>
                          </Grid>
                        </Grid>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card style={{height: '300px', maxWidth: '400px', borderRadius: "15px"}} elevation={10}>
                    <CardContent>
                          <Calendar
                              onChange={onChange}
                              value={date}
                              style={{width: "450px", height: "300px"}}
                          />

                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card style={{height: '300px', maxWidth: '400px',borderRadius: "15px"}} elevation={10}>
                    <CardContent onClick={() => handleNavigation("/analytics")} style={{cursor: "pointer"}}>
                      <div>
                      <Grid container spacing={1} style={{display:"flex", flexDirection: "row"}}>
                          <Grid item style={{display:"flex", flexDirection: "row"}} xs={6}>
                            <ListItem key="analytics" disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <AnalyticsIcon style={{color: "#00bcd4"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Analytics" style={{marginLeft: "-10px"}}/>
                              </ListItemButton>
                            </ListItem>
                          </Grid>
                          <Grid item xs={6} style={{display: "flex", justifyContent: "flex-end"}}>
                            <Button onClick={() => handleNavigation("/analytics")}>
                              <OpenInFullIcon style={{fontSize: "20px"}}/>
                            </Button>
                          </Grid>
                        </Grid>
                        <Grid container spacing={1} style={{display:"flex", flexDirection: "row"}}>
                          <Grid item xs={12} style={{display: "flex", flexDirection: "row"}}>
                            <Box style={{border: "1px solid #c5c3c3", height: "175px", width: "320px",margin: "20px", borderRadius: "15px"}}>
                                <img src={analyticsimg} alt="" style={{width: "320px", height: "175px", borderRadius: "15px"}}/>
                            </Box>
                          </Grid>
                        </Grid>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card style={{height: '300px', maxWidth: '400px', borderRadius: "15px"}} elevation={10}>
                    <CardContent onClick={() => handleNavigation("/task")} style={{cursor: "pointer"}}>
                      <div>
                        <Grid container spacing={1} style={{display:"flex", flexDirection: "row"}}>
                          <Grid item style={{display:"flex", flexDirection: "row"}} xs={6}>
                            <ListItem key="task" disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <TaskIcon style={{color: "#00bcd4"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Task" style={{marginLeft: "-10px"}}/>
                              </ListItemButton>
                            </ListItem>
                          </Grid>
                          <Grid item xs={6} style={{display: "flex", justifyContent: "flex-end"}}>
                            <Button onClick={() => handleNavigation("/task")}>
                              <OpenInFullIcon style={{fontSize: "20px"}}/>
                            </Button>
                          </Grid>
                        </Grid>
                        <Grid container spacing={1} style={{display:"flex", flexDirection: "row"}}>
                          <Grid item xs={12} style={{display: "flex", flexDirection: "row"}}>
                            <Box style={{border: "1px solid #c5c3c3", height: "175px", width: "320px",margin: "20px", borderRadius: "15px"}}>
                                <img src={taskimg} alt="" style={{width: "320px", height: "175px", borderRadius: "15px"}}/>
                            </Box>
                          </Grid>
                        </Grid>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card style={{height: '300px', maxWidth: '400px',borderRadius: "15px"}} elevation={10}>
                    <CardContent>
                      <div>
                      <Grid container spacing={1} style={{display:"flex", flexDirection: "row"}}>
                          <Grid item style={{display:"flex", flexDirection: "row"}} xs={6}>
                            <ListItem key="notification" disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <NotificationsIcon style={{color: "#00bcd4"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Notification" style={{marginLeft: "-10px"}}/>
                              </ListItemButton>
                            </ListItem>
                          </Grid>
                          <Grid item xs={6} style={{display: "flex", justifyContent: "flex-end"}}>
                          </Grid>
                        </Grid>
                        <Grid container spacing={1} style={{display:"flex", flexDirection: "row"}}>
                          <Grid item xs={12} style={{display: "flex", flexDirection: "row"}}>
                            <Box style={{border: "1px solid #c5c3c3", height: "175px", width: "320px",margin: "20px", borderRadius: "15px", overflowY: "auto", display: "flex", flexDirection: "column-reverse", justifyContent: "start"}}>
                                {console.log("Notifications type for display::", typeof(notifications), notifications)}
                                {console.log("Notifications store in useState", typeof(notificationsDisplay), notificationsDisplay)}
                                {notifications && notifications.map((notification) => {
                                  return (
                                    <Box style={{backgroundColor: "#cdbae761", borderBottom: "1px solid #cdbae7"}}>
                                  <p style={{margin: "5px", fontWeight: 600}}>{notification.message}</p>
                                  </Box>
                                  )
                                  })}
                            </Box>
                          </Grid>
                        </Grid>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
            <>
            <Modal open={profileEditModal} onClose={handleClose}>
          <Box sx={style}>
              <div style={{margin: '20px 50px' }}>
                  <h4 style={{marginTop: '10px', marginBottom: '10px', fontSize: '16px'}}> Add Profile Details</h4>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>First Name</label>
                      <TextField  hiddenLabel onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder='first name' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>Last Name</label>
                      <TextField  hiddenLabel onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder='last name' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>Email</label>
                      <TextField  hiddenLabel disabled placeholder={email} value={email}  variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>Designation</label>
                      <TextField  hiddenLabel onChange={(e) => setDesignation(e.target.value)} value={designation} placeholder='designation' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>About</label>
                      <TextField  hiddenLabel onChange={(e) => setDescription(e.target.value)} value={description} placeholder='about' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <Button onClick={(e) => updateProfile(e)} fullWidth variant='contained' style={{backgroundColor: '#48b6d7', textTransform: 'none'}}>Save</Button>
                  </div>
              </div>
          </Box> 
        </Modal>
            </>
            <>
              <Snackbar
                open={snackbarOpen}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{
                  marginTop: "40px",
                  '& .MuiPaper-root': {
                   backgroundColor: "#cdbae7", border: "1px solid #cdbae7", color: "black", borderRadius: "15px",
                   fontWeight: 600,
                }}}
                style={{fontWeight: 600}}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={notifications.length > 0 ? notifications[notifications.length - 1].message : ''}
              />
            </>
      </div>
    )
  }

  export default DashboardForm