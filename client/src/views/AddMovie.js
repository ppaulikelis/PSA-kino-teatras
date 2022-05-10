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
import managerServices from '../services/manager/manager.services';
import { useNavigate } from 'react-router-dom';

const data = [
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

export default function AddMovie() {
  const [genres, setGenres] = useState([]);
  const [currentGenre, setCurrentGenre] = useState('');
  const [photo, setPhoto] = useState('');
  const navigate = useNavigate();

  const handleGenreChange = (event) => {
    setCurrentGenre(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const movie = {
      Title: data.get('title'),
      Description: data.get('description'),
      Genre: currentGenre,
      Duration: data.get('duration'),
      StartDate: data.get('start-date'),
      EndDate: data.get('end-date'),
      Price: data.get('price'),
      Icon: 'default.jpg'
    };

    const formData = new FormData();
    formData.append('file', JSON.stringify(movie));
    formData.append('file', photo);
    managerServices.add(formData).then((res) => {
      alert(res.data);
      navigate('/manager');
    });
  };

  useEffect(() => {
    //api call
    setGenres(data);
  }, []);

  return (
    <Box>
      <Typography variant="h4" component="div" mb={3} align="center">
        Add movie
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
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
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="genre-label">Genre</InputLabel>
                  <Select
                    labelId="genre-label"
                    id="genre"
                    value={currentGenre}
                    onChange={handleGenreChange}
                    label="Genre"
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
                  label="Price, €"
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
                  label="Duration (min)"
                  type="number"
                  fullWidth
                  required
                  inputProps={{ min: 10, max: 300, step: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="start-date"
                  name="start-date"
                  label="Start date"
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
                  label="End date"
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
                  label="Photo"
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
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
