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

const data = [
  {
    id: 1,
    name: 'Komedija'
  },
  {
    id: 2,
    name: 'Siaubo'
  },
  {
    id: 3,
    name: 'Istorinis'
  }
];

const movieData = {
  name: 'Guardians of the galaxy',
  describtion: 'Filmas apie herojus',
  genre: 1,
  price: 10,
  duration: 120,
  startDate: '2022-04-01',
  endDate: '2022-04-30',
  photo: 'https://qph.cf2.quoracdn.net/main-qimg-1f7d7ca14a61615a35d0f0ecf1522a65.webp'
};

function createData(id, name, describtion, genre, price, duration, startDate, endDate, photo) {
  return { id, name, describtion, genre, price, duration, startDate, endDate, photo };
}

export default function EditMovie() {
  const { id } = useParams();
  const [genres, setGenres] = useState([]);
  const [photo, setPhoto] = useState('');
  const [currentMovie, setCurrentMovie] = useState(createData(-1, '', '', -1, 1, 1, '', '', ''));

  const handlePhotoChange = (event) => {
    let url = URL.createObjectURL(event.target.files[0]);
    setPhoto(url);
    console.log(url);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      describtion: data.get('describtion'),
      genre: data.get('genre'),
      price: data.get('price'),
      duration: data.get('duration'),
      startDate: data.get('start-date'),
      endDate: data.get('end-date'),
      photo: photo
    });
  };

  useEffect(() => {
    //api call
    setGenres(data);
    //api call
    setCurrentMovie(
      createData(
        id,
        movieData.name,
        movieData.describtion,
        movieData.genre,
        movieData.price,
        movieData.duration,
        movieData.startDate,
        movieData.endDate,
        movieData.photo
      )
    );
    console.log(id);
  }, []);

  return (
    <Box>
      <Typography variant="h4" component="div" mb={3} align="center">
        Redaguoti filmą
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={{ md: 'row', sm: 'column', xs: 'column' }}>
          <Box width={{ md: '70%', sm: '100%', xs: '100%' }} mr={5} mb={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  name="name"
                  label="Pavadinimas"
                  variant="outlined"
                  fullWidth
                  required
                  autoFocus
                  value={currentMovie.name}
                  onChange={(event) =>
                    setCurrentMovie({ ...currentMovie, name: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="describtion"
                  name="describtion"
                  label="Aprašymas"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  value={currentMovie.describtion}
                  onChange={(event) =>
                    setCurrentMovie({ ...currentMovie, describtion: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="genre-label">Žanras</InputLabel>
                  <Select
                    labelId="genre-label"
                    id="genre"
                    name="genre"
                    label="Žanras"
                    required
                    value={currentMovie.genre}
                    onChange={(event) =>
                      setCurrentMovie({ ...currentMovie, genre: event.target.value })
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
                  label="Kaina, €"
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
                  label="Trukmė (min)"
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
                  id="start-date"
                  name="start-date"
                  label="Pradžios data"
                  type="date"
                  fullWidth
                  required
                  value={currentMovie.startDate}
                  onChange={(event) =>
                    setCurrentMovie({ ...currentMovie, startDate: event.target.value })
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="end-date"
                  name="end-date"
                  label="Pabaigos data"
                  type="date"
                  fullWidth
                  required
                  value={currentMovie.endDate}
                  onChange={(event) =>
                    setCurrentMovie({ ...currentMovie, endDate: event.target.value })
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
                  label="Nuotrauka"
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
              <Grid item xs={12}>
                <img src={currentMovie.photo} width="100%" />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <br />
        <Box display={'flex'}>
          <Button type="submit" color="primary" variant="contained" sx={{ marginLeft: 'auto' }}>
            Atnaujinti
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
