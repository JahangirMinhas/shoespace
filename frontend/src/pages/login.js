import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event){
    }
  return (
    <Stack sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px'}}>
        <Typography sx={{fontFamily: 'Montserrat', fontSize: '3em', fontWeight: 'bold'}}>
            ShoeSpace
        </Typography>
        <Box component="form" sx={{bgcolor: 'white', marginTop: 3, border: '2px solid #DADBDB', padding: 5}}>
            <Stack spacing={2}>
                <Typography sx={{fontFamily: 'Montserrat', fontSize: '2em', fontWeight: 'light'}}>
                    Login
                </Typography>
                    <TextField
                        required
                        label="Username"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        onChange={e => setUsername(e.target.value)}
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
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSubmit}>Login</Button>
            </Stack>
        </Box>
    </Stack>
  );
}

export default Login;