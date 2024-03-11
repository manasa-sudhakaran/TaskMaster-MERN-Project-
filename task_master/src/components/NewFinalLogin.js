import React, {useState} from 'react';
import { TextField, Button, Checkbox, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import login from "../img/frontpage.jpg"
import logo from "../img/Logo.png";
import './custom.css';

const NewFinalLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); 
    
        try {
          const response = await fetch('http://localhost:3005/login', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to login');
          }
    
          const data = await response.json();
          console.log('Login successful:', data);
          if(data.token) {
            localStorage.setItem("token", data.token)
            navigate('/dashboard')
          }
        } catch (error) {
          console.error('Error logging in:', error);
        }
      };

  return (
    <div style={{backgroundColor:'#ffffff', height: '100vh', display: 'flex' , flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
        <Box style={{width: "100%", height: "10vh" }}>
            <Grid container spacing={1} style={{display:"flex",flexDirection:"row"}}>
                <Grid item xs={6} style={{display: "flex", flexDirection: "row"}}>
                    <img src={logo} alt='' style={{width: "110px", height: "110px",display:"flex", marginTop: "-27px", marginLeft: "20px"}}/>
                    <h4 style={{display:"flex", alignItems:"start", marginTop:"2px", marginLeft:"-25px", color: '#7c35fa', fontSize: "26px", fontFamily:"math"}}>Task Master</h4>
                </Grid>
            </Grid>
        </Box>
      <Box style={{width: "80vw", height: "80vh"}}>
      <Grid container spacing={1} style={{display:"flex",flexDirection:"row",height: "80vh", width:"80vw"}}>
          <Grid item xs={6} style={{display: "flex", flexDirection: "row", margin: "auto"}}>
            <img src={login} alt='' style={{width: "540px", height: "420px",display:"flex", alignItems: "center", marginTop: "35px"}}/>
          </Grid>
          <Grid item xs={6} style={{display: "flex", flexDirection: "row", margin: "auto"}}>
          <Box style={{width: 500, display:"flex",flexDirection:"column", marginLeft: "30px",borderLeft: "1px solid #a9a9a9"}}>
              <div style={{margin: '20px 39px 20px 132px',display:"flex", flexDirection: "column",justifyContent: "center", width:"auto"}}>
                  <h4 style={{marginTop: '10px', marginBottom: '10px', fontSize: '25px', marginLeft: "-14px"}}><span className='blog-title-emoji' style={{fontSize: "25px"}}>👋</span> Welcome Back!</h4>
                  <p style={{marginTop: '10px', marginBottom: '10px', fontSize: '16px', marginLeft:"3px", fontWeight: 700, color:"#a9a9a9"}}> Login to continue</p>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <TextField fullWidth onChange={(e) => setEmail(e.target.value)} hiddenLabel placeholder='Enter your e-mail' variant='outlined'  style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <TextField fullWidth onChange={(e) => setPassword(e.target.value)}  hiddenLabel placeholder='password' variant='outlined'  style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'row', marginTop: '20px',justifyContent: 'space-between'}}>
                      <div style={{display: 'flex'}}>
                          <Checkbox defaultChecked sx={{color: '#48b6d7','&.Mui-checked': {color: '#46b6d7',fontSize: '16px'}}}/>
                          <p style={{fontSize: '12px'}}>Remember Me</p>
                      </div>
                      <div style={{display: 'flex'}}>
                          <p style={{color: '#48b6d7', fontSize: '12px'}}> Forgot Password?</p>
                      </div>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <Button fullWidth onClick={handleLogin} variant='contained' style={{backgroundColor: '#48b6d7', textTransform: 'none'}}>Continue</Button>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '10px', alignItems: "center", fontSize: "14px", color: "black"}}>
                      <p>New to TaskMaster? <span style={{fontSize: "16px", fontWeight: 500, color: "#0000ffb0",textDecoration: "underline", cursor: "pointer"}}onClick={() => navigate('/')}>Sign Up!</span></p>
                  </div>
              </div>
          </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default NewFinalLogin