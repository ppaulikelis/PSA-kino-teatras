import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import hallServices from '../services/manager/hall.services';

export default function AddMovieHall() {
  const { theaterid } = useParams();
  const navigate = useNavigate();
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const movieHall = {
      FkMovieTheatreId: theaterid,
      Number: data.get('number')
    };
    hallServices.add(movieHall).then((res) => {
      alert(res.status == 200 ? 'Movie hall added successfully.' : 'Error during add.');
    });
    navigate('/manager/moviehalls/addseats/xxxx');
  };

  return (
    <>
      <Typography variant="h4" component="div" mb={3} align="center">
        Add movie hall
      </Typography>
      <Box component="form" onSubmit={submit}>
        <TextField
          name="number"
          label="Number"
          type="number"
          inputProps={{ min: 1, max: 999, step: 1 }}
          fullWidth
          required
        />
        <br />
        <br />
        <Box display={'flex'}>
          <Button type="submit" color="primary" variant="contained" sx={{ marginLeft: 'auto' }}>
            Add
          </Button>
        </Box>
      </Box>
    </>
  );
}
