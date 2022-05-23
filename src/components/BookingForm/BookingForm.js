import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../Copyright/Copyright";
import { Card, CardMedia, CardContent, Select } from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

const BookingForm = () => {
const location = useLocation () 
const navigate = useNavigate ()
const [movie, setMovie] = useState ({
    'title' :" ", 
    'description':" ",
    'image':" ",
    'price':" ",
})
const [movieTime, setMovieTime] = useState ([

])
const movieId = location.state.movieId 
// console.log (movieId)
useEffect(() => {
    fetchMovie();
}, []);
const fetchMovie = async () => {
    await axios
    .get(`http://127.0.0.1:8000/api/movies/${movieId}`)
    .then(({ data }) => {
        let obj = {
            'title' :data.data[0].title, 
            'description':data.data[0].description,
            'image':data.data[0].image,
            'price':data.data[0].price,
        }
        setMovie(obj);
        setMovieTime(data.data[0].showtime)
        console.log(data.data[0].showtime);
    })
    .catch(({ response: { data } }) => {
        console.log(data);
    });
};

const handleChangeQty = (e) => {
    if (!parseInt(e.target.value)) {
        e.target.value = 1
    }
    if (e.target.value < 0) {
        e.target.value = 1
    }
    if (e.target.value > 5) {
        e.target.value = 5
        return
    }
}

const handleSubmit = async(event) => {
    event.preventDefault();
    console.log("Test")
    const data = new FormData (event.currentTarget)
    console.log(data.get("showtime_id"))
    await axios.post('http://127.0.0.1:8000/api/bookings', data)
    .then(({data})=> {
        console.log(data)
        navigate("/")
    })
    .catch(({error}) => {
        console.log(error)
    })
};

const showtime = movieTime.map((time) => (
<MenuItem key = {time.id} value = {time.id} > 
{time.date + " " + time.time} 
</MenuItem>
)) 
return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Navigation />
        <Box
        sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}
        >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LocalGroceryStoreIcon />
        </Avatar>
        <Typography id="purchaseform_h1" component="h1" variant="h5">
            Movie Booking Details
        </Typography>
        <Box component="form" noValidate={false} onSubmit={handleSubmit}>
            <Grid item xs={12} sm={6} md={3} sx={{ m: 4 }}>
            <Card
                sx={{
                height: "fit-content",
                display: "flex",
                flexDirection: "column",
                }}
            >
                <CardMedia
                component="img"
                sx={{
                    padding: "5px",
                    height: "100%",
                }}
                src={
                    movie.image
                }
                alt={movie.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {movie.title}
                </Typography>
                <Typography>{movie.description}</Typography>
                <Typography sx={{ mt: 2 }}>
                </Typography>
                </CardContent>
                <Grid item xs={12} sm={6}>
                <TextField
                    name="quantity"
                    required
                    fullWidth
                    type="number"
                    id="quantity"
                    label="Quantity"
                    inputProps={{ inputMode: "numeric", min: 1, max: 5 }}
                    onChange = {(e) => {handleChangeQty(e)}}
                />
                </Grid>
            </Card>
            </Grid>
            <Grid id="purchaseform" container spacing={2}>
            <Grid item xs={12}>
                <TextField
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                required
                fullWidth
                name="phone_no"
                label="Phone Number"
                type="text"
                id="phone_no"
                autoComplete="phone_no"
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                <InputLabel id="movie_time">Pick your time</InputLabel>
                <Select
                    name="showtime_id"
                    labelId="showtime_id"
                    id="showtime_id"
                    label="showtime"
                    required
                >
                    {showtime}
                </Select>
                </FormControl>
            </Grid>
            </Grid>
            <Button
                id="purchaseform_button"
                type="submit"
                sx={{ mt: 3, mb: 5 }}
            >
                Click here to book now
            </Button>
            {/* {item.date_added ? (
            <Button type="submit" sx={{ mt: 3, mb: 5 }}>
                Edit
            </Button>
            ) : (
            <Button
                id="purchaseform_button"
                type="submit"
                sx={{ mt: 3, mb: 5 }}
            >
                Click here to book now
            </Button>
            )} */}
        </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
    </Container>
)
};

export default BookingForm;
