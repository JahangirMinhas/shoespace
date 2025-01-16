import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

export default function ProdCard({ title, collection, color, price, src }) {
    src = '/assets/imgs/products/'.concat(src)
    return (
      <Card sx={{width: 300}}>
        <CardMedia
          component="img"
          alt={title}
          image={src}
          sx={{
            height: 250,
            objectFit: 'cover',
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {collection} <br />
            {color} <br /><br />
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{fontWeight: 'bold'}}>
            ${price}
          </Typography>
        </CardContent>
        <CardActions>
            <Button variant="contained" sx={{bgcolor: 'black', color: 'white'}}>Add to Cart</Button>
        </CardActions>
      </Card>
    );
  }