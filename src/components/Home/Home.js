import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from '../Footer/Footer';
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Pagination } from "@mui/material";
import usePagination from "../Pagination/Pagination";
import Container from '@mui/material/Container';

const Home = (props) => {
const [movies, setMovies] = useState([]);
const [items, setItems] = useState([]);
const navigate = useNavigate();

// pagination handling
    let [page, setPage] = useState(1);
    const PER_PAGE = 4;
    const count = Math.ceil(movies.length / PER_PAGE);
    const _DATA = usePagination(movies, PER_PAGE);
    const handlePaginationChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

useEffect(() => {
    fetchProduct();
}, []);
const fetchProduct = async () => {
    await axios
    .get(`http://127.0.0.1:8000/api/movies`)
    .then(({ data }) => {
        setMovies(data)
        // console.log(data)
    })
    .catch(({ response: { data } }) => {
        console.log(data)
    });
};

const handleBooking = (id) => {
    console.log(id)
    navigate("/BookingForm", { state: { movieId: id } });
};

const theme = createTheme();

return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    {<Navigation />}
    
<div className="Test">
<h1> Aurum Cinema </h1>
        <Grid container spacing={4}>
        {_DATA.currentData().map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={3}>
            <Card sx={{ maxWidth: 350, minHeight:800, maxHeight:820 }}>
                <CardMedia
                component="img"
                height="400"
                width= "50%"
                margin = "auto"
                image={`http://127.0.0.1:8000/storage/images/${item.image}`}
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
                <Button size="small" onClick={(e) => handleBooking(item.id)}>Book</Button>
                <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'right', width: '100%' }}>
                    {`RM ${item.price}`}
                </Typography>
                </CardActions>
            </Card>
            </Grid>
        ))}
        </Grid>
        <Container maxWidth="xxl">
                    <Pagination
                        id = 'homePagination'
                        count={count}
                        size="large"
                        page={page}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePaginationChange}
                    />
                </Container>
</div>
    {<Footer /> }
    </ThemeProvider>
);
};

export default Home;
