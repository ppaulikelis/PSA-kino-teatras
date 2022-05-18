import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';

export default function AddSession() {
  const [movies, setMovies] = useState([]);
  const [movieHalls, setMovieHalls] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(0);
  const [currentMovieHall, setCurrentMovieHall] = useState(0);

  useEffect(() => {
    setMovies([]);
    setMovieHalls([]);
  }, []);

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const session = {
      StartTime: data.get('startTime'),
      FkMovieId: currentMovie,
      FkMovieHallId: currentMovieHall
    };
    console.log(session);
  };

  return (
    <>
      <Typography variant="h4" component="div" mb={3} align="center">
        Add session
      </Typography>
      <Box component="form" onSubmit={submit}>
        <FormControl fullWidth>
          <InputLabel id="title-label">Title</InputLabel>
          <Select
            labelId="title-label"
            id="title"
            value={currentMovie}
            onChange={(event) => setCurrentMovie(event.target.value)}
            label="Title"
            required>
            {movies.map((movie, index) => (
              <MenuItem key={index} value={movie.Id}>
                {movie.Title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel id="hall-label">Hall</InputLabel>
          <Select
            labelId="hall-label"
            id="hall"
            value={currentMovieHall}
            onChange={(event) => setCurrentMovieHall(event.target.value)}
            label="Hall"
            required>
            {movieHalls.map((movieHall, index) => (
              <MenuItem key={index} value={movieHall.Id}>
                {movieHall.Number}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <TextField focused name="startTime" label="Start time" type="time" fullWidth required />
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
