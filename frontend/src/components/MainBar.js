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

export default function MainBar() {
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
              />
              <IconButton type="button" sx={{ p: '10px' }}>
                <SearchIcon />
              </IconButton>
            </Paper>

            <Button variant="text" sx={{color: 'white'}} href="/">Home</Button>
            <Button variant="text" sx={{color: 'white'}} href="/collections/mens">Mens</Button>
            <Button variant="text" sx={{color: 'white'}} href="/collections/womens">Womens</Button>
            <Button variant="text" sx={{color: 'white'}} href="/collections/kids">Kids</Button>
          </Stack>

          <Stack spacing={2} direction="row">
            <Button variant="text" sx={{color: 'white'}} href="/login">Login</Button>
            <Button variant="text" sx={{color: 'white'}}>Sign Up</Button>
            <IconButton aria-label="add to cart">
              <ShoppingCartIcon sx={{color: 'white'}}/>
            </IconButton>
          </Stack>
          
        </Toolbar>
      </AppBar>
    );
  }