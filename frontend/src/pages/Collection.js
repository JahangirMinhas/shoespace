import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import CardList from '../components/CardList.js';
import CollectionFilter from '../components/CollectionFilter.js';

const CollectionPage = () => {
  const { type } = useParams();
  const [collection, setCollection] = useState([]);
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: [0, 500],
  });

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/collections/${type}`, {
          params: {
            brands: filters.brands.length > 0 ? filters.brands : undefined,
            minPrice: filters.priceRange[0],
            maxPrice: filters.priceRange[1],
          },
        });
        setCollection(response.data);
      } catch (error) {
        console.error('There was an error fetching the filtered products!', error);
      }
    };
    fetchFilteredProducts();
  }, [type, filters]);

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
