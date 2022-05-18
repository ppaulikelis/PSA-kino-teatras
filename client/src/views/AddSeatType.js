import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export default function AddSeatType() {
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const seattype = {
      Name: data.get('name'),
      Price: data.get('price')
    };
    console.log(seattype);
  };

  return (
    <>
      <Typography variant="h4" component="div" mb={3} align="center">
        Add seat type
      </Typography>
      <Box component="form" onSubmit={submit}>
        <TextField name="name" label="Name" type="text" fullWidth required />
        <br />
        <br />
        <TextField name="price" label="Price" type="text" fullWidth required />
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
