import  React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import WorkIcon from '@mui/icons-material/Work';
import TaskIcon from '@mui/icons-material/Task'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer, closeDrawer  } from './drawerSlice';
import logo from "../img/appbar.png"

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  backgroundcolor: "#F5F5F5"
}));

export default function DrawerLeft() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = useSelector((state) => state.drawer.open);
  const handleDrawerOpen = (e) => {
    dispatch(openDrawer());
  };

  const handleDrawerClose = (e) => {
    dispatch(closeDrawer());
  };

  const handleNavigationDrawer = (path) => {
    navigate(path)
  }

  const handleLogoutFunc = (loginpath) => {
    localStorage.removeItem('notifications');
    navigate(loginpath);
  }
  return (
    <Box sx={{ display: 'flex', height: '60px' }}>
      <CssBaseline />
            <AppBar position="static" 
            open={open}
            style={{backgroundColor: "#ffffff", color: "black"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            size="small"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} alt='' style={{width: "100px", height: "80px",display:"flex", marginTop: "15px", marginLeft: "-30px"}}/>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, color: '#7c35fa', fontWeight: 600, fontFamily: "math", fontSize: "29px", marginLeft: "-27px"  }}
          >
            TaskMaster
          </Typography>
          <Box sx={{ flexGrow: 1, height: '60px' }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="small"
              aria-label="show 17 new notifications"
              color="inherit"
              style={{margin: "10px"}}
            >
            </IconButton>
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <PowerSettingsNewIcon style={{color: "#ff2c2c"}} onClick={() => handleLogoutFunc("/login")} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: "#ffffff"
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton
          onClick={handleDrawerClose}
          >
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box sx={{overflow: 'auto', flexGrow: 1}}>
          <List>
              <ListItem key="dashbaoard" disablePadding style={{height:"80px"}}>
                <ListItemButton
                onClick={() => {handleNavigationDrawer("/dashboard")}}>
                  <ListItemIcon>
                    <DashboardIcon style={{color: "#00bcd4"}}/>
                  </ListItemIcon>
                  <ListItemText primary="Dashbaord" />
                </ListItemButton>
              </ListItem>

              <ListItem key="project" disablePadding style={{height:"80px"}}>
                <ListItemButton
                onClick={() => {handleNavigationDrawer("/project")}}>
                  <ListItemIcon>
                    <WorkIcon style={{color: "#00bcd4"}}/>
                  </ListItemIcon>
                  <ListItemText primary="Project" />
                </ListItemButton>
              </ListItem>

              <ListItem key="analytics" disablePadding style={{height:"80px"}}>
                <ListItemButton onClick={() => handleNavigationDrawer("/analytics")}>
                  <ListItemIcon>
                    <AnalyticsIcon style={{color: "#00bcd4"}}/>
                  </ListItemIcon>
                  <ListItemText primary="Analytics" />
                </ListItemButton>
              </ListItem>

              <ListItem key="task" disablePadding style={{height:"80px"}}>
                <ListItemButton
                onClick={() => {handleNavigationDrawer("/task")}}>
                  <ListItemIcon>
                    <TaskIcon style={{color: "#00bcd4"}}/>
                  </ListItemIcon>
                  <ListItemText primary="Task" />
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
        <Box sx={{flexGrow: 1}}></Box>
        <List>
          <ListItem key="Logout" disablePadding style={{height:"80px", display: "flex", justifyContent: "flex-end"}}>
            <ListItemButton
            onClick={() => {handleLogoutFunc('/login')}}>
              <ListItemIcon>
                <PowerSettingsNewIcon style={{color: "#ff2c2c"}}/>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main 
      open={open}
      >
        <DrawerHeader />
      </Main>
    </Box>
  );
}
