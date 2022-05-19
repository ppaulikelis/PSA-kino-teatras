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

function createMovie(Title, Duration, StartDate, EndDate, Price, Icon, Genre, Id) {
  return { Title, Duration, StartDate, EndDate, Price, Icon, Genre, Id };
}

function createHall(TheatreAddress, Hall) {
  return { TheatreAddress, Hall };
}

export default function AddSession() {
  const [movies, setMovies] = useState([]);
  const [movieHalls, setMovieHalls] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(0);
  const [currentMovieHall, setCurrentMovieHall] = useState(0);

  useEffect(() => {
    sessionServices.getData().then((res) => {
      const hallList = res.data;
      setMovieHalls(hallList.map((hall) => createHall(hall.TheatreAddress, hall.Hall)));
      console.log(movieHalls);
      const movies = res.data[1];
      setMovies(
        movies.map((movie) =>
          createMovie(
            movie.Title,
            movie.Duration,
            movie.StartDate,
            movie.EndDate,
            movie.Price,
            movie.Icon,
            movie.Genre,
            movie.Id
          )
        )
      );
    });
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
