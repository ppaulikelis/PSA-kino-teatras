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
import sessionServices from '../services/manager/session.services';

function createMovie(Title, Id) {
  return { Title, Id };
}

function createHall(TheatreAddress, Hall, HallId) {
  return { TheatreAddress, Hall, HallId };
}

export default function AddSession() {
  const [movies, setMovies] = useState([createMovie('', -1)]);
  const [movieHalls, setMovieHalls] = useState([createHall('', -1, -1)]);
  const [currentMovie, setCurrentMovie] = useState(-1);
  const [currentMovieHall, setCurrentMovieHall] = useState(-1);

  useEffect(() => {
    sessionServices.getHalls().then((res) => {
      const hallList = res.data;
      setMovieHalls(
        hallList.map((hall) => createHall(hall.TheatreAddress, hall.Hall, hall.HallId))
      );
      console.log(hallList);
    });
    sessionServices.getMovies().then((res) => {
      const movieList = res.data;
      setMovies(movieList.map((movie) => createMovie(movie.Title, movie.Id)));
      console.log(movieList);
    });
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
    sessionServices.addSession(session).then((res) => {
      alert(res.status == 200 ? 'Session added successfully.' : 'Error during add.');
    });
  };

  return (
    <>
      <Typography variant="h4" component="div" mb={3} align="center">
        Add session
      </Typography>
      <Box component="form" onSubmit={submit}>
        <FormControl fullWidth>
          <InputLabel id="title-label">Movie title</InputLabel>
          <Select
            labelId="title-label"
            id="title"
            value={currentMovie}
            focused
            onChange={(event) => setCurrentMovie(event.target.value)}
            label="Movie title"
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
          <InputLabel id="hall-label">Theatre address and hall</InputLabel>
          <Select
            labelId="hall-label"
            id="hall"
            value={currentMovieHall}
            focused
            onChange={(event) => setCurrentMovieHall(event.target.value)}
            label="Theatre address and hall"
            required>
            {movieHalls.map((movieHall, index) => (
              <MenuItem key={index} value={movieHall.HallId}>
                {movieHall.TheatreAddress + ' | ' + movieHall.Hall}
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
