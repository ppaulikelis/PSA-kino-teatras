import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';

const snackTypes = [
  {
    id: 1,
    name: 'Drink'
  },
  {
    id: 2,
    name: 'Other'
  },
  {
    id: 3,
    name: 'Sweet'
  },
  {
    id: 4,
    name: 'Salty'
  }
];

const sizes = [
  {
    id: 1,
    name: 'large'
  },
  {
    id: 2,
    name: 'medium'
  },
  {
    id: 3,
    name: 'small'
  }
];
export default function AddSnack() {
  const [currentSnackType, setCurrentSnackType] = useState('');
  const [currentSize, setCurrentSize] = useState('');
  const handleSnackTypeChange = (event) => {
    setCurrentSnackType(event.target.value);
    console.log(currentSnackType);
  };
  const handleSizeChange = (event) => {
    setCurrentSize(event.target.value);
    console.log(currentSize);
  };
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const snack = {
      Title: data.get('title'),
      Type: currentSnackType,
      Price: data.get('price'),
      Size: currentSize
    };
    console.log(snack);
  };

  return (
    <>
      <Typography variant="h4" component="div" mb={3} align="center">
        Add snack
      </Typography>
      <Box component="form" onSubmit={submit}>
        <TextField name="title" label="Title" type="text" fullWidth required />
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel id="snacksType-label">Snack type</InputLabel>
          <Select
            labelId="nacksTyp-label"
            id="snacksType"
            value={currentSnackType}
            onChange={handleSnackTypeChange}
            label="snackType"
            required>
            {snackTypes.map((snacksType) => (
              <MenuItem key={snacksType.id} value={snacksType.id}>
                {snacksType.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <TextField
          id="price"
          name="price"
          label="Price, €"
          type="number"
          fullWidth
          required
          inputProps={{ min: 0, max: 300, step: 1 }}
        />
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel id="size-label">Size</InputLabel>
          <Select
            labelId="size-label"
            id="size"
            value={currentSize}
            onChange={handleSizeChange}
            label="Size"
            required>
            {sizes.map((size) => (
              <MenuItem key={size.id} value={size.id}>
                {size.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
