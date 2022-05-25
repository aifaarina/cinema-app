import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Copyright from "../Copyright/Copyright";
import Navigation from "../Navigation/Navigation";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
// import EditBooking from "../EditBooking";
import { Pagination } from "@mui/material";
import usePagination from "../Pagination/Pagination";
import Container from '@mui/material/Container';

export default function BookingList() {
    const [movies, setMovies] = useState([]);
    const [edit, setEdit] = useState(false);
    const [data, setUpdate] = useState(null);
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

    useEffect(()=>{
        fetchBooking();
    }, []);

    const fetchBooking = async() => {
        try {
            await axios.get(' http://127.0.0.1:8000/api/bookings/').then((response)=>{
                console.log(response.data.data);
                setMovies(response.data.data);
            });

        }catch(error) {
            console.log(error);
        }
    }

    const handleDelete = (e, item) => {
        e.preventDefault();
        if(window.confirm(`Delete this booking for ${item.name}`)){
            try {
                axios.delete(`http://127.0.0.1:8000/api/bookings/${item.id}`).then((response)=>{
                    console.log(response);
                    window.location.reload();
                });
            } catch (error) {
                console.log(error);
            }
        }

    }

    const handleUpdate = (e, item) => {
        e.preventDefault();
        setUpdate(item);
        setEdit(true);
    }

    const lists = _DATA.currentData().map((item) => (
        <TableRow
            key={item.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="center">{item.name}</TableCell>
            <TableCell align="center">{item.phone_no}</TableCell>
            <TableCell align="center">{item.movie.title}</TableCell>
            <TableCell align="center">{item.showtime.date}</TableCell>
            <TableCell align="center">{`RM ${item.movie.price}`}</TableCell>
            <TableCell align="center">{item.quantity}</TableCell>
            <TableCell align="center">{`RM ${item.total}`}</TableCell>
            <TableCell align="center">{item.created_at}</TableCell>
            <TableCell align="center">
                <Button onClick={(e) => {navigate ("/EditBooking", {state: {item}})}}>Update</Button>
                <Button onClick={(e) => { handleDelete(e, item) }}>Delete</Button>
            </TableCell>
        </TableRow>
    ));

    return(
        <div>
            {<Navigation />}
            <CssBaseline />
            <Box sx={{
                bgcolor: 'background.paper',
                pt: 2,
                pb: 6,
                mx: 5
            }}>
            
            
            <TableContainer component={Paper} md={4}>
            <Table size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Fullname</TableCell>
                        <TableCell align="center">Phone Number</TableCell>
                        <TableCell align="center">Movie</TableCell>
                        <TableCell align="center">Movie Time</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">Date Purchased</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lists}
                </TableBody>
            </Table>
            </TableContainer>
            <Container maxWidth="xxl">
                    <Pagination
                        count={count}
                        size="large"
                        page={page}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePaginationChange}
                    />
                </Container>
                <Copyright />
            </Box>
            {/* Total Order : <FormattedMoney value={getTotal()} /> */}
        </div>

    );
}