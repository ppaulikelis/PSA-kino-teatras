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
import { useParams } from 'react-router-dom';
import sessionServices from '../services/manager/session.services';

function createMovie(Title, Id) {
  return { Title, Id };
}

function createHall(TheatreAddress, Hall, HallId) {
  return { TheatreAddress, Hall, HallId };
}

function createSession(Id, StartTime, FkMovieHallId, FkMovieId) {
  return { Id, StartTime, FkMovieHallId, FkMovieId };
}

export default function EditSession() {
  const { id } = useParams();
  const [movies, setMovies] = useState([createMovie('', -1)]);
  const [movieHalls, setMovieHalls] = useState([createHall('', -1, -1)]);
  const [session, setCurrentSession] = useState(createSession(-1, '', -1, -1));

  useEffect(() => {
    console.log(id);
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
    sessionServices.getSession(id).then((res) => {
      const session = res.data;
      console.log(session);
      setCurrentSession(
        createSession(session.Id, session.StartTime, session.FkMovieHallId, session.FkMovieId)
      );
    });
  }, []);

  const editSession = (event) => {
    event.preventDefault();
    sessionServices.editSession(session).then((res) => {
      alert(res.status == 200 ? 'Session updated successfully.' : 'Error during edit.');
    });
  };

  return (
    <>
      <Typography variant="h4" component="div" mb={3} align="center">
        Edit session
      </Typography>
      <Box component="form" onSubmit={editSession}>
        <FormControl fullWidth>
          <InputLabel id="title-label">Title</InputLabel>
          <Select
            labelId="title-label"
            id="title"
            value={session.FkMovieId}
            onChange={(event) => setCurrentSession({ ...session, FkMovieId: event.target.value })}
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
            value={session.FkMovieHallId}
            onChange={(event) =>
              setCurrentSession({ ...session, FkMovieHallId: event.target.value })
            }
            label="Hall"
            required>
            {movieHalls.map((movieHall, index) => (
              <MenuItem key={index} value={movieHall.HallId}>
                {movieHall.Hall}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <TextField
          focused
          name="startTime"
          label="Start time"
          type="time"
          fullWidth
          required
          value={session.StartTime}
          onChange={(event) => setCurrentSession({ ...session, StartTime: event.target.value })}
        />
        <br />
        <br />
        <Box display={'flex'}>
          <Button type="submit" color="primary" variant="contained" sx={{ marginLeft: 'auto' }}>
            Edit
          </Button>
        </Box>
      </Box>
    </>
  );
}
