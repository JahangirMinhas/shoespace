import HomeCarousel from '../components/HomeCarousel.js';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import new_arrivals from '../collections/new.json'
import CardList from '../components/CardList.js'

function Home() {
  return (
    <> 
      <HomeCarousel />
      <Stack sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px'}}>
          <Typography sx={{fontFamily: 'Montserrat', fontSize: '2em', fontWeight: 'light'}}>
              New Arrivals
          </Typography>
          <Stack spacing={2} direction="row">
            <CardList items={new_arrivals} />
          </Stack>
      </Stack>
    </>
  );
}

export default Home;