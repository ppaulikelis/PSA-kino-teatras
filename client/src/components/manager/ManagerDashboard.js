import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import MovieList from './MovieList';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';
import ManagerAppBar from './ManagerAppBar';

export default function ManagerDashboard() {
  return (
    <>
      <ManagerAppBar />
      <Container>
        <Box py={3}>
          <Routes>
            <Route path="" element={<MovieList />} />
            <Route path="/movies/addmovie" element={<AddMovie />} />
            <Route path="/movies/editmovie/:id" element={<EditMovie />} />
          </Routes>
        </Box>
      </Container>
    </>
  );
}
