import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import CardList from '../components/CardList.js'
import CollectionFilter from '../components/CollectionFilter.js'

const CollectionPage = () => {
  const { type } = useParams();
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/products/collections/${type}`).then(response => {
      setCollection(response.data);
    }).catch(error => {
      console.error('There was an error fetching the products!', error);
    })}, [type]);

  return (
    <>
        <CssBaseline />
        <CollectionFilter />
        <Box component="main" sx={{p: 3, mt: 15, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 3 }}>
          <Typography sx={{fontFamily: 'Montserrat', fontSize: '3em', fontWeight: 'bold'}}>
            {type.toUpperCase()} Collection
          </Typography>
          <Stack direction="row">
            <CardList items={collection} />
          </Stack>
        </Box>
    </>
  );
};

export default CollectionPage;