import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const HorizontalCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  maxWidth: 600,
  margin: theme.spacing(2),
}));

const Media = styled(CardMedia)({
  width: 160,
});

const Content = styled(CardContent)({
  flex: 1,
});

export default function CartItem({ title, brand, collection, color, price, src }) {
    src = '/assets/imgs/products/'.concat(src)
    return (
        <HorizontalCard>
            <Media
            component="img"
            image="https://via.placeholder.com/160"
            alt="Placeholder"
            />
            <Content>
            <Typography variant="h5" component="div">
                Horizontal Card Title
            </Typography>
            <Typography variant="body2" color="text.secondary">
                This is a description of the horizontal card. It shows the content beside the image.
            </Typography>
            </Content>
        </HorizontalCard>
    );
};