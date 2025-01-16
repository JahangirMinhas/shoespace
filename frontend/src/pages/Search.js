import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import CardList from '../components/CardList.js';
import { useLocation } from 'react-router-dom';
import CollectionFilter from '../components/CollectionFilter.js';

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: [0, 500],
  });

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/search`, {
          params: {
            query,
            brands: filters.brands.length > 0 ? filters.brands : undefined,
            minPrice: filters.priceRange[0],
            maxPrice: filters.priceRange[1],
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('There was an error fetching the products!', error);
      }
    };
    if (query) {
      fetchFilteredProducts();
    }
  }, [query, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <>
      <CssBaseline />
      <CollectionFilter filters={filters} onFilterChange={handleFilterChange} />
      <Box component="main" sx={{ p: 3, mt: 15, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 3 }}>
        <Typography sx={{ fontFamily: 'Montserrat', fontSize: '3em', fontWeight: 'bold' }}>
          Search Results for "{query}"
        </Typography>
        <Stack direction="row">
          <CardList items={products} />
        </Stack>
      </Box>
    </>
  );
};

export default SearchPage;
