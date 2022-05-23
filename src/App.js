import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home/Home';
import React, { useState } from 'react';
import {BrowserRouter, Routes, Route}  from "react-router-dom"; 
import BookingForm from './components/BookingForm/BookingForm';

function App() {
  
  return(
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path= "/BookingForm" element={<BookingForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
