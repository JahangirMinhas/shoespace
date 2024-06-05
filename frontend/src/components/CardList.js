import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import ProdCard from './ProdCard.js'


const CardList = ({ items }) => (
    <Grid container spacing = {3}>
        {items.map((item, index) => (
        <Grid xs key={index}>
            <ProdCard title={item.title} collection={item.collection} color={item.color} price={item.price} src={item.src} />
        </Grid>
        ))}
    </Grid>

);

export default CardList