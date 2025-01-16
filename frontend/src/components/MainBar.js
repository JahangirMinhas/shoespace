import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function MainBar() {
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/logout', {}, { withCredentials: true });
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = async (query) => {
    if (searchQuery){
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

    return (
      <AppBar sx={{zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'black', color: 'white', p: 2}}>
        <Toolbar>
          <Stack spacing={2} direction="row" sx={{flexGrow: '1'}}>
            <Typography sx={{ fontFamily: 'Montserrat', fontSize: '2rem', fontWeight: 'bold'}}>
              ShoeSpace
            </Typography>

            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
              <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton
              type="button"
              sx={{ p: '10px' }}
              onClick={() => handleSearch(searchQuery)}
            >
              <SearchIcon />
            </IconButton>
            </Paper>

            <Button variant="text" sx={{color: 'white'}} href="/">Home</Button>
            <Button variant="text" sx={{color: 'white'}} href="/collections/mens">Mens</Button>
            <Button variant="text" sx={{color: 'white'}} href="/collections/womens">Womens</Button>
            <Button variant="text" sx={{color: 'white'}} href="/collections/kids">Kids</Button>
          </Stack>

          <Stack spacing={2} direction="row">
            {userData.isLoggedIn ? (
              <>
                <Button variant="text" sx={{color: 'white'}}>Welcome {userData.firstName}</Button>
                <Button variant="text" sx={{color: 'white'}} onClick={handleLogout}>Log Out</Button>

                <IconButton aria-label="add to cart">
                  <ShoppingCartIcon sx={{color: 'white'}}/>
                </IconButton>
              </>
            ) : (
              <>
                <Button variant="text" sx={{color: 'white'}} href="/login">Login</Button>
                <Button variant="text" sx={{color: 'white'}} href="/signup">Sign Up</Button>
              </>
            )}
          </Stack>
          
        </Toolbar>
      </AppBar>
    );
  }