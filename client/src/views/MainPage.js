import { Container, Typography } from '@mui/material';
import React from 'react';

export default function MainPage() {
  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <img src="logo512.png" maxWidth="500px" />
      <Typography variant="h2" component="div" align="center">
        Kino teatro valdymo sistema
      </Typography>
    </Container>
  );
}
