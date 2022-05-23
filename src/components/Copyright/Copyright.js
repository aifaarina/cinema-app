import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React, { Component }  from 'react';

const Copyright = () => {
    return (
        <div style={{marginBottom:0}}>
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://mui.com/">
                    Aurum Cinema
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
    );
}


export default Copyright;