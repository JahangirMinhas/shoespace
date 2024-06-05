import React from 'react';
import {
    Drawer,
    Box,
    Typography,
    FormControl,
    FormControlLabel,
    Checkbox,
    Slider,
    List,
    Toolbar,
    ListItem,
    ListItemText,
  } from '@mui/material';

function CollectionFilter(){
    const filters = {
        brands: ['Jordan', 'Nike', 'New Balance'],
        price: [0, 500],
    };
    
    const marks = [
        {
            value: 0,
            label: '$0',
        },
        {
            value: 500,
            label: '$500',
        }
    ]

    return (
        <Drawer variant="permanent" sx={{ flexShrink: 0, gap: 20, '& .MuiDrawer-paper': {width: 280, boxSizing: 'border-box', padding: 2, mt: 5}}}>
            <Toolbar />
            <Box sx={{ overflow: 'auto', p: 1 }}>
                <List>
                    <Typography sx={{fontFamily: 'Montserrat', fontSize: '2em', fontWeight: 'bold'}}>
                        Refine Results
                    </Typography>
                    <Typography sx={{fontFamily: 'Montserrat', fontSize: '1em', fontWeight: 'regular', m: 2}}>
                        Brands
                    </Typography>
                    {filters.brands.map((brand) => (
                        <ListItem key={brand} dense>
                            <FormControlLabel control={<Checkbox />} label={brand} />
                        </ListItem>
                    ))}
                    <Typography sx={{fontFamily: 'Montserrat', fontSize: '1em', fontWeight: 'regular', m: 2}}>
                        Price Range
                    </Typography>
                    <Box sx={{ m: 2 }}>
                        <Slider marks={marks} defaultValue={500} step={5} max={500} valueLabelDisplay="auto"/>
                    </Box>
                </List>
            </Box>
        </Drawer>
    )
}

export default CollectionFilter;