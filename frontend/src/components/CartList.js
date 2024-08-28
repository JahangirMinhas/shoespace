import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import CartItem from './CartItem.js'


const CartList = ({ items }) => (
    <Grid container spacing = {3}>
        {items.map((item, index) => (
        <Grid xs key={index}>
            <CartItem title={item.title} brand={item.brand} collection={item.collection} color={item.color} price={item.price} src={item.src} />
        </Grid>
        ))}
    </Grid>

);

export default CardList