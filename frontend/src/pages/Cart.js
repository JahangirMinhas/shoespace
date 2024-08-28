import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Cart() {
    const [userData, setUserData] = useState({
        isLoggedIn: false,
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phoneNumber: ''
      });
    
      useEffect(() => {
        async function fetchUserData() {
          try {
            const response = await axios.get('http://localhost:3001/api/auth/status', { withCredentials: true });
            setUserData(response.data);
          } catch (error) {
            console.error('Error fetching authentication status:', error);
          }
        }
        fetchUserData();
      }, []);

    return (
        <Stack sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px'}}>
        <Typography sx={{fontFamily: 'Montserrat', fontSize: '3em', fontWeight: 'bold'}}>
        ShoeSpace
        </Typography>
        <Box component="form" sx={{bgcolor: 'white', marginTop: 3, border: '2px solid #DADBDB', padding: 5}} onSubmit={handleSubmit}>
        <Stack spacing={2}>
            <Typography sx={{fontFamily: 'Montserrat', fontSize: '2em', fontWeight: 'light'}}>
            Login
            </Typography>
            <TextField
            required
            label="Email"
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <AccountCircle />
                </InputAdornment>
                ),
            }}
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
            <TextField
            required
            label="Password"
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <LockIcon />
                </InputAdornment>
                ),
            }}
            type="password"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            <Button variant="contained"  onClick={handleSubmit} type="submit">Login</Button>
        </Stack>
        </Box>
    </Stack>
    );
}

export default Login;