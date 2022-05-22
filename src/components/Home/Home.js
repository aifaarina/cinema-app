import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Footer from '../Footer/Footer';
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'

const Home = (props) => {
const [movies, setMovies] = useState([]);
const [items, setItems] = useState([]);
const navigate = useNavigate();

useEffect(() => {
    fetchProduct();
}, []);
const fetchProduct = async () => {
    await axios
    .get(`http://127.0.0.1:8000/api/movies`)
    .then(({ data }) => {
        setMovies(data)
        console.log(data)
    })
    .catch(({ response: { data } }) => {
        console.log(data)
    });
};

const handleBooking = (id) => {
    let i = items.findIndex(({ _id }) => _id === id);
    navigate("/booking", { state: { booking: { statue: items[i] } } });
};

const theme = createTheme();

return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    {<Navigation />}
    
<div className="Test">
<h1> Cinema Booking Site </h1>
        <Grid container spacing={4}>
        {movies.map((item) => (
            <Grid item key={item._id} xs={12} sm={6} md={3}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt="green iguana"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.description}
                </Typography>
                </CardContent>
                <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
            </Grid>
        ))}
        </Grid>
</div>

      {/* {<Footer /> } */}
    </ThemeProvider>
);
};

export default Home;
