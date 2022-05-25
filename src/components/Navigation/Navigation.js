import React, { useState } from "react"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {NavLink} from "react-router-dom";
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';

import Home from "../Home/Home";

const Navigation = (props) => {
    return (
        // <AppBar position="fixed" sx={{ bgcolor: '' }}>
            <Toolbar>
                <TheaterComedyIcon sx={{ mr: 2 }} />
                <Typography variant="h6" color="inherit"  noWrap>
                    Aurum Cinema
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <NavLink to={'/'} style={{textDecoration:'none'}}>
                        <Button sx={{ my: 2, color: 'white', display: 'block'}}>
                            Home
                        </Button>
                    </NavLink>
                    <NavLink to={'/BookingList'} style={{textDecoration:'none'}}>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                            Bookings
                        </Button>
                    </NavLink>
                </Box>
            </Toolbar>
        // </AppBar>
    );
}
export default Navigation;