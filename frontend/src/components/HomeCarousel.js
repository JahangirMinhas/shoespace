import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Item from './Item.js'
import Box from '@mui/material/Box';

const images = [
    {
        id: 1,
        src: "/assets/imgs/slider/slider1.jpg",
        title: "slider1"
    },
    {
        id: 2,
        src: "/assets/imgs/slider/slider2.jpg",
        title: "slider2"
    }
];

function HomeCarousel(){
    images.forEach(image => console.log(image.src));
    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Carousel sx={{marginTop: '120px', width: '1400px'}}>
                {
                    images.map( item => <Item key={item.id} item={item} /> )
                }
            </Carousel>
        </Box>
    )
}

export default HomeCarousel;