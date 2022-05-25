import React from "react";
import Copyright from "../Copyright/Copyright";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
    return(
        <div className="Footer">
        <Box sx={{ bgcolor: ' ', p: 1 }} component="footer">
                <Typography variant="h7" align="center" gutterBottom>
                    Aurum Cinema of dream 
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    All Rights Reserved.
                </Typography>
                <Copyright />
            </Box>
            </div>
    )
}
export default Footer;