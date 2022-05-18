import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export default function AddMovieTheater() {
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const theater = {
      Address: data.get('address')
    };
    console.log(theater);
  };

  return (
    <>
      <Typography variant="h4" component="div" mb={3} align="center">
        Add movie theater
      </Typography>
      <Box component="form" onSubmit={submit}>
        <TextField name="address" label="Address" type="text" fullWidth required />
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
