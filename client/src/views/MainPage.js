import { Container, Typography } from '@mui/material';
import React from 'react';
import MainAppBar from './MainAppBar';
import MovieIcon from '@mui/icons-material/Movie';

export default function MainPage() {
  return (
    <>
      {' '}
      <MainAppBar />
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <MovieIcon sx={{ fontSize: '500px', color: '#1976d2' }} />
        <Typography variant="h2" component="div" align="center">
          Kino teatro valdymo sistema
        </Typography>
      </Container>
    </>
  );
}
