import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const tempMovieHall = {
  Number: 1,
  Id: 666,
  FkMovieTheatreId: 333
};

export default function EditMovieHall() {
  const { moviehallid } = useParams();
  const [movieHall, setMovieHall] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    //api call
    console.log(moviehallid);
    setMovieHall(tempMovieHall);
  }, []);

  const submit = (event) => {
    event.preventDefault();
    console.log(movieHall);
  };

  return (
    <>
      <Typography variant="h4" component="div" mb={3} align="center">
        Edit movie hall
      </Typography>
      <Box component="form" onSubmit={submit}>
        <TextField
          name="number"
          label="Number"
          type="number"
          inputProps={{ min: 1, max: 999, step: 1 }}
          fullWidth
          value={movieHall.Number}
          onChange={(event) => setMovieHall({ ...movieHall, Number: event.target.value })}
          required
        />
        <br />
        <br />
        <Box display={'flex'} justifyContent={'right'}>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ mr: 1 }}
            onClick={() => navigate('/manager/moviehalls/editseats/' + moviehallid)}>
            Edit seats
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Edit
          </Button>
        </Box>
      </Box>
    </>
  );
}
