import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import managerServices from '../services/manager/manager.services';

const genres = [
  {
    id: 1,
    name: 'Animation'
  },
  {
    id: 2,
    name: 'Detective'
  },
  {
    id: 3,
    name: 'Drama'
  },
  {
    id: 4,
    name: 'Historical'
  },
  {
    id: 5,
    name: 'War'
  },
  {
    id: 6,
    name: 'Comedy'
  },
  {
    id: 7,
    name: 'Science fiction'
  },
  {
    id: 8,
    name: 'Adventure'
  },
  {
    id: 9,
    name: 'Romance'
  },
  {
    id: 10,
    name: 'Horror'
  },
  {
    id: 11,
    name: 'Action'
  }
];

function createData(
  id,
  title,
  description,
  genre_fk,
  price,
  duration,
  start_date,
  end_date,
  photo
) {
  return { id, title, description, genre_fk, price, duration, start_date, end_date, photo };
}

export default function EditMovie() {
  const { id } = useParams();
  const [photo, setPhoto] = useState('');
  const [currentMovie, setCurrentMovie] = useState(createData(-1, '', '', -1, 1, 1, '', '', ''));

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const editMovie = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let idk = '';
    console.log(photo);
    if (photo === '') {
      idk = currentMovie.photo;
    } else {
      idk = 'default.jpg';
    }
    console.log(idk);
    const movie = {
      Id: id,
      Title: data.get('title'),
      Description: data.get('description'),
      Genre: data.get('genre_fk'),
      Duration: data.get('duration'),
      StartDate: data.get('start_date'),
      EndDate: data.get('end_date'),
      Price: data.get('price'),
      Icon: idk
    };
    const formData = new FormData();
    formData.append('file', JSON.stringify(movie));
    formData.append('file', photo);
    managerServices.edit(formData).then((res) => {
      alert(res.status == 200 ? 'Filmas sėkmingai atnaujintas.' : 'Įvyko klaida.');
      window.location = 'http://localhost:3000/manager';
    });
  };

  useEffect(() => {
    //api call
    managerServices.getMovie(id).then((res) => {
      const movie = res.data;
      console.log(movie);
      setCurrentMovie(
        createData(
          id,
          movie.Title,
          movie.Description,
          movie.Genre,
          movie.Price,
          movie.Duration,
          movie.StartDate,
          movie.EndDate,
          movie.Icon
        )
      );
    });
  }, []);

  return (
    <Box>
      <Typography variant="h4" component="div" mb={3} align="center">
        Edit movie
      </Typography>
      <Box component="form" onSubmit={editMovie}>
        <Box display="flex" flexDirection={{ md: 'row', sm: 'column', xs: 'column' }}>
          <Box width={{ md: '70%', sm: '100%', xs: '100%' }} mr={5} mb={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="title"
                  name="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  required
                  autoFocus
                  value={currentMovie.title}
                  onChange={(event) =>
                    setCurrentMovie({ ...currentMovie, title: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  value={currentMovie.description}
                  onChange={(event) =>
                    setCurrentMovie({ ...currentMovie, description: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="genre-label">Genre</InputLabel>
                  <Select
                    labelId="genre-label"
                    id="genre_fk"
                    name="genre_fk"
                    label="Genre"
                    required
                    value={currentMovie.genre_fk}
                    onChange={(event) =>
                      setCurrentMovie({ ...currentMovie, genre_fk: event.target.value })
                    }>
                    {genres.map((genre) => (
                      <MenuItem key={genre.id} value={genre.id}>
                        {genre.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="price"
                  name="price"
                  label="Price, €"
                  type="number"
                  fullWidth
                  required
                  value={currentMovie.price}
                  onChange={(event) =>
                    setCurrentMovie({ ...currentMovie, price: event.target.value })
                  }
                  inputProps={{ min: 0, max: 300, step: 1 }}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="duration"
                  name="duration"
                  label="Duration (min)"
                  type="number"
                  fullWidth
                  required
                  value={currentMovie.duration}
                  onChange={(event) =>
                    setCurrentMovie({ ...currentMovie, duration: event.target.value })
                  }
                  inputProps={{ min: 10, max: 300, step: 10 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="start_date"
                  name="start_date"
                  label="Start date"
                  type="date"
                  fullWidth
                  required
                  value={currentMovie.start_date.split('T')[0]}
                  onChange={(event) =>
                    setCurrentMovie({ ...currentMovie, start_date: event.target.value })
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="end_date"
                  name="end_date"
                  label="End date"
                  type="date"
                  fullWidth
                  required
                  value={currentMovie.end_date.split('T')[0]}
                  onChange={(event) =>
                    setCurrentMovie({ ...currentMovie, end_date: event.target.value })
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box width={{ md: '30%', sm: '100%', xs: '100%' }} flexDirection="column">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="photo"
                  label="Photo"
                  name="upload-photo"
                  type="file"
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                  onChange={handlePhotoChange}
                />
              </Grid>
              {photo ? (
                <Grid item xs={12}>
                  <img src={URL.createObjectURL(photo)} width="100%" />
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <img src={'http://localhost:6310/Photos/' + currentMovie.photo} width="100%" />
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
        <br />
        <Box display={'flex'}>
          <Button type="submit" color="primary" variant="contained" sx={{ marginLeft: 'auto' }}>
            Edit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
