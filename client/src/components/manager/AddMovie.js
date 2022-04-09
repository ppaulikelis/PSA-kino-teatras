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
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';

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

export default function AddMovie() {
  const [genres, setGenres] = useState([]);
  const [currentGenre, setCurrentGenre] = useState('');
  const [photo, setPhoto] = useState('');

  const handleGenreChange = (event) => {
    setCurrentGenre(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      describtion: data.get('describtion'),
      genre: currentGenre,
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
  }, []);

  return (
    <Box>
      <Typography variant="h4" component="div" mb={3} align="center">
        Pridėti filmą
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
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="genre-label">Žanras</InputLabel>
                  <Select
                    labelId="genre-label"
                    id="genre"
                    value={currentGenre}
                    onChange={handleGenreChange}
                    label="Žanras"
                    required>
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
                  inputProps={{ min: 0, max: 300, step: 1 }}
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
                  required
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
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <InsertPhotoRoundedIcon color="primary" sx={{ fontSize: '300px' }} />
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
        <br />
        <Box display={'flex'}>
          <Button type="submit" color="primary" variant="contained" sx={{ marginLeft: 'auto' }}>
            Pridėti
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
