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
import { Card, CardMedia, CardContent, Select } from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { MenuItem } from "@mui/material";

export default function EditBooking(props) {
    const { state } = useLocation();
    const {data, setUpdate} = props;
    const [movieTime, setMovieTime] = useState ([]);
    const [total, setTotal] = useState(state.item.total);
    const navigate = useNavigate();

    const handleChangeQty = (e) => {
        if (!parseInt(e.target.value)) {
            e.target.value = 1
        }
        if (e.target.value < 0) {
            e.target.value = 1
        }
        if (e.target.value > 5) {
            e.target.value = 5
        }
        let totalPrice = state.item.movie.price * e.target.value;
        setTotal(totalPrice);
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const updateData = new FormData (e.currentTarget)
        updateData.append('total', total);
        updateData.append('_method', 'PATCH')
        for(var pair of updateData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]);
         }
        await axios.post(`http://127.0.0.1:8000/api/bookings/${state.item.id}`, updateData)
        .then(({data})=> {
            console.log(data)
            navigate("/BookingList")
        })
        .catch(({error}) => {
            console.log(error)
        })
    };

    useEffect(() => {
        fetchShowtime();
    },[])

    const fetchShowtime = async () => {
        await axios
        .get(`http://127.0.0.1:8000/api/movies/${state.item.movie.id}`)
        .then(({ data }) => {
            setMovieTime(data.data[0].showtime)
        })
        .catch(({ response: { data } }) => {
            console.log(data.message);
        });
    };

    const showtime = movieTime.map((time) => (
        <MenuItem key = {time.id} value = {time.id} > 
        {time.date + " " + time.time} 
        </MenuItem>
    )) 

    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline />
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
                Edit Booking
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
                    <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {state.item.movie.title}
                    </Typography>
                    <Typography>{state.item.movie.description}</Typography>
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
                        defaultValue={state.item.quantity}
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
                    defaultValue={state.item.name}
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
                    defaultValue={state.item.phone_no}
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
                        defaultValue={state.item.showtime.id}
                    >
                        {showtime}
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        Total:
                    </Typography>
                    <TextField
                        disabled
                        fullWidth
                        name="total"
                        type="text"
                        id="total"
                        value={`RM${total}`}
                        variant="standard"
                        InputProps={{
                            inputProps: {
                                style: { textAlign: "center" },
                            }
                        }}
                        />
                </Grid>

                </Grid>
                <Button
                    id="purchaseform_button"
                    type="submit"
                    sx={{ mt: 3, mb: 5 }}
                >
                    Click here to Update
                </Button>
            </Box>
            </Box>
        </Container>
    );
}