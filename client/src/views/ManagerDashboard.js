import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import MovieList from './MovieList';
import MovieTheaterList from './MovieTheaterList';
import AddMovieTheater from './AddMovieTheater';
import MovieHallList from './MovieHallList';
import AddMovieHall from './AddMovieHall';
import EditMovieHall from './EditMovieHall';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';
import ManagerAppBar from './ManagerAppBar';
import AddSeats from './AddSeats';
import EditSeats from './EditSeats';
import SessionList from './SessionList';
import AddSession from './AddSession';
import EditSession from './EditSession';
import SeatTypeList from './SeatTypeList';
import AddSeatType from './AddSeatType';

export default function ManagerDashboard() {
  return (
    <>
      <ManagerAppBar />
      <Container>
        <Box py={3}>
          <Routes>
            {/* Movie */}
            <Route path="" element={<MovieList />} />
            <Route path="/movies/addmovie" element={<AddMovie />} />
            <Route path="/movies/editmovie/:id" element={<EditMovie />} />
            {/* Theater */}
            <Route path="/theaters" element={<MovieTheaterList />} />
            <Route path="/theaters/addtheater" element={<AddMovieTheater />} />
            <Route path="/moviehalls/:theaterid" element={<MovieHallList />} />
            {/* Movie Hall */}
            <Route path="/moviehalls/addmoviehall/:theaterid" element={<AddMovieHall />} />
            <Route path="/moviehalls/editmoviehall/:moviehallid" element={<EditMovieHall />} />
            {/* Seat */}
            <Route path="/moviehalls/addseats/:moviehallid" element={<AddSeats />} />
            <Route path="/moviehalls/editseats/:moviehallid" element={<EditSeats />} />
            {/* Session */}
            <Route path="/sessions" element={<SessionList />} />
            <Route path="/sessions/addsession" element={<AddSession />} />
            <Route path="/sessions/editsession/:id" element={<EditSession />} />
            {/* Seat type */}
            <Route path="/seattypes" element={<SeatTypeList />} />
            <Route path="/seattypes/addseattype" element={<AddSeatType />} />
          </Routes>
        </Box>
      </Container>
    </>
  );
}
