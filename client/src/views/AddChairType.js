import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import managerServices from '../services/manager/chairtype.services';

export default function AddChairType() {
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const chairtype = {
      Title: data.get('title'),
      Price: data.get('price')
    };
    //   console.log(chairtype);
    managerServices.add(chairtype).then((res) => {
      alert(res.status == 200 ? 'Movie added successfully.' : 'Error during add.');
    });
  };

  return (
    <>
      <Typography variant="h4" component="div" mb={3} align="center">
        Add chair type
      </Typography>
      <Box component="form" onSubmit={submit}>
        <TextField name="title" label="Title" type="text" fullWidth required />
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
