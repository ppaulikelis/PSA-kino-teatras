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
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { snackTypes, sizes } from '../constants';

function createData(Id, Title, Type, Price, Size) {
  return { Id, Title, Type, Price, Size };
}

const tempSnack = {
  Id: 333,
  Title: 'pavadinimas',
  Type: 2,
  Price: 11,
  Size: 3
};
export default function EditSnack() {
  const { id } = useParams();
  const [snack, setSnack] = useState(createData(-1, '', -1, -1, -1));

  useEffect(() => {
    //api call
    console.log(id);
    setSnack(tempSnack);
  }, []);

  const submit = (event) => {
    event.preventDefault();
    console.log(snack);
  };

  return (
    <>
      <Typography variant="h4" component="div" mb={3} align="center">
        Edit snack
      </Typography>
      <Box component="form" onSubmit={submit}>
        <TextField
          name="title"
          label="Title"
          type="text"
          fullWidth
          required
          value={snack.Title}
          onChange={(event) => setSnack({ ...snack, Title: event.target.value })}
        />
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel id="snacksType-label">Snack type</InputLabel>
          <Select
            labelId="snacksType-label"
            id="snacksType"
            value={snack.Type}
            onChange={(event) => setSnack({ ...snack, Type: event.target.value })}
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
          value={snack.Price}
          onChange={(event) => setSnack({ ...snack, Price: event.target.value })}
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
            value={snack.Size}
            onChange={(event) => setSnack({ ...snack, Size: event.target.value })}
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
            Edit
          </Button>
        </Box>
      </Box>
    </>
  );
}