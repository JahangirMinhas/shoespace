import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [passwordError, setPasswordError] = useState('');

    async function handleSubmit(event){
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        setPasswordError('');

        const formData = {
            email,
            password,
            firstName,
            lastName,
            address,
            phoneNumber
        };

        try {
            const response = await axios.post('http://localhost:3001/api/signup', formData);
            navigate('/login');
        } catch (error) {
            console.error('Error while sending sign up data to server', error);
        }

    }
  return (
    <Stack sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px'}}>
        <Typography sx={{fontFamily: 'Montserrat', fontSize: '3em', fontWeight: 'bold'}}>
            ShoeSpace
        </Typography>
        <Box component="form" sx={{bgcolor: 'white', marginTop: 3, border: '2px solid #DADBDB', padding: 5}}>
            <Stack spacing={2}>
                <Typography sx={{fontFamily: 'Montserrat', fontSize: '2em', fontWeight: 'light'}}>
                    Sign Up
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
                        variant="outlined"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                    <TextField
                        required
                        label="Confirm Password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        type="password"
                        onChange={e => setConfirmPassword(e.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                    <br />
                    <Stack direction="row" spacing={2}>
                        <TextField
                            required
                            label="First Name"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <TextField
                            required
                            label="Last Name"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            onChange={e => setLastName(e.target.value)}
                        />
                    </Stack>
                    <br />
                    <Stack direction="row" spacing={2}>
                        <TextField
                            required
                            label="Address"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            onChange={e => setAddress(e.target.value)}
                        />
                        <TextField
                            required
                            label="Phone Number"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            onChange={e => setPhoneNumber(e.target.value)}
                        />
                    </Stack>
                    <Button variant="contained" onClick={handleSubmit}>Login</Button>
            </Stack>
        </Box>
    </Stack>
  );
}

export default SignUp;