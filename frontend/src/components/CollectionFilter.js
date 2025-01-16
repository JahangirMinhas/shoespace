import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Slider,
  List,
  Toolbar,
  ListItem,
} from '@mui/material';

function CollectionFilter({ filters, onFilterChange }) {
  const [brands] = useState(['Jordan', 'Nike', 'New Balance']);
  const marks = [
    { value: 0, label: '$0' },
    { value: 500, label: '$500' },
  ];

  const handleBrandChange = (event) => {
    const { checked, name } = event.target;
    const updatedBrands = checked
      ? [...filters.brands, name]
      : filters.brands.filter((brand) => brand !== name);
    onFilterChange('brands', updatedBrands);
  };

  const handlePriceChange = (event, newValue) => {
    onFilterChange('priceRange', newValue);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        gap: 20,
        '& .MuiDrawer-paper': { width: 280, boxSizing: 'border-box', padding: 2, mt: 5 },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', p: 1 }}>
        <List>
          <Typography sx={{ fontFamily: 'Montserrat', fontSize: '2em', fontWeight: 'bold' }}>
            Refine Results
          </Typography>
          <Typography sx={{ fontFamily: 'Montserrat', fontSize: '1em', fontWeight: 'regular', m: 2 }}>
            Brands
          </Typography>
          {brands.map((brand) => (
            <ListItem key={brand} dense>
              <FormControlLabel
                control={
                  <Checkbox
                    name={brand}
                    checked={filters.brands.includes(brand)}
                    onChange={handleBrandChange}
                  />
                }
                label={brand}
              />
            </ListItem>
          ))}
          <Typography sx={{ fontFamily: 'Montserrat', fontSize: '1em', fontWeight: 'regular', m: 2 }}>
            Price Range
          </Typography>
          <Box sx={{ m: 2 }}>
            <Slider
              marks={marks}
              value={filters.priceRange}
              onChange={handlePriceChange}
              step={5}
              max={500}
              valueLabelDisplay="auto"
            />
          </Box>
        </List>
      </Box>
    </Drawer>
  );
}

export default CollectionFilter;
