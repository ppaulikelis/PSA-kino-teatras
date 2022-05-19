import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import hallServices from '../services/manager/hall.services';

export default function EditMovieHall() {
  const { moviehallid } = useParams();
  const [movieHall, setMovieHall] = useState(createData(-1));
  const navigate = useNavigate();

  function createData(Number, Id, FkMovieTheatreId) {
    return { Number, Id, FkMovieTheatreId };
  }

  useEffect(() => {
    //api call
    hallServices.getHall(moviehallid).then((res) => {
      const hall = res.data;
      setMovieHall(createData(hall.Number, hall.Id, hall.FkMovieTheatreId));
    });
    setMovieHall(movieHall);
  }, []);

  const submit = (event) => {
    event.preventDefault();
    hallServices.edit(movieHall).then((res) => {
      alert(res.status == 200 ? 'Movie hall updated successfully.' : 'Error during edit.');
    });
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
          focused={true}
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
