import React, {useState} from 'react'
import { Card, TextField, Button, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const navigate = useNavigate()

      const handleCheckboxChange = (e) => {
        setAcceptedTerms(e.target.checked);
      };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert('You must accept the terms and conditions to sign up.');
      return;
    }

    const formData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    }

    try {
      const response = await fetch('http://localhost:3005/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      alert(data.message);
      navigate('/login') 
    } catch (error) {
      alert(error.message); 
    }
  };

  return (
    <div style={{backgroundColor:'#ffffff', height: '100vh', display: 'flex' , justifyContent: 'center', alignItems: 'center'}}>
        <Card style={{width: '500px', height: '500px', }} elevation={20}>
            <div style={{margin: '20px 50px' }}>
                <h4 style={{marginTop: '10px', marginBottom: '10px', fontSize: '17px'}}> Begin your journey</h4>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '20px'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label style={{fontSize: '16px', fontWeight: 700}}>First Name</label>
                        <TextField  hiddenLabel onChange={(e) => setFirstName(e.target.value)} placeholder='Input first name' variant='outlined' style={{backgroundColor: '#f4f6f7', marginRight: '15px'}} />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label style={{fontSize: '16px', fontWeight: 700}}>Last Name</label>
                        <TextField  hiddenLabel onChange={(e) => setLastName(e.target.value)} placeholder='Input last name' variant='outlined' style={{backgroundColor: '#f4f6f7', marginLeft: '-1px'}} />
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                    <label style={{fontSize: '16px', fontWeight: 700}}>Email</label>
                    <TextField  hiddenLabel onChange={(e) => setEmail(e.target.value)} placeholder='example.email@gmail.com' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                    <label style={{fontSize: '16px', fontWeight: 700}}>Password</label>
                    <TextField  hiddenLabel onChange={(e) => setPassword(e.target.value)} placeholder='Enter atleast 8+ characters' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '20px'}}>
                    <Checkbox  onChange={handleCheckboxChange}    sx={{color: '#48b6d7', marginLeft: "-10px", '&.Mui-checked': {color: '#46b6d7'}}}/>
                    <p style={{fontSize: '12px'}}>By signing up, I agree with the <span style={{color: '#48b6d7'}}>Terms of Use & Privacy Policy</span></p>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                    <Button onClick={handleSubmit} fullWidth variant='contained' style={{backgroundColor: '#48b6d7', textTransform: 'none'}}>Register</Button>
                </div>
            </div>
        </Card>
    </div>
  )
}

export default SignupForm