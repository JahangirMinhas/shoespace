import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import CardList from '../components/CardList.js'
import { useLocation } from 'react-router-dom';
import CollectionFilter from '../components/CollectionFilter.js'

const SearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (query) {
            axios.get(`http://localhost:3001/api/products/search`, {
                params: { query }
            }).then(response => {
                setProducts(response.data);
            }).catch(error => {
                console.error('There was an error fetching the products!', error);
            });
        }
    }, [query]);

  return (
    <>
        <CssBaseline />
        <CollectionFilter />
        <Box component="main" sx={{p: 3, mt: 15, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 3 }}>
          <Typography sx={{fontFamily: 'Montserrat', fontSize: '3em', fontWeight: 'bold'}}>
            Search Results for {query}
          </Typography>
          <Stack direction="row">
            <CardList items={products} />
          </Stack>
        </Box>
    </>
  );
};

export default SearchPage;