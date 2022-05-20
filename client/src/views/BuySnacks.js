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
import orderTableServices from '../services/manager/orderTable.services';

function createData(Title, Price, Type, Size, Id) {
  return { Title, Price, Type, Size, Id };
}

export default function BuySnacks() {
  const [snacks, setSnacks] = useState([]);
  const [currentSnack, setCurrentSnack] = useState(-1);
  const [currentAmmount, setCurrentAmmount] = useState(1);

  useEffect(() => {
    //api call
    console.log('wat');
    orderTableServices.getSnacks().then((res) => {
      console.log(res.data);
      const listSnacks = res.data;
      setSnacks(
        listSnacks.map((snack) =>
          createData(snack.Title, snack.Price, snack.Type, snack.Size, snack.Id)
        )
      );
      console.log(res.data);
    });
  }, []);

  const insertData = () => {
    const orderedSnack = {
      Amount: currentAmmount,
      FkSnackId: currentSnack,
      FkOrderTableId: sessionStorage.getItem('orderid')
    };
    orderTableServices.addSnacks(orderedSnack).then((res) => {
      alert(res.status == 200 ? 'Ordered snack added successfully.' : 'Error during add.');
    });
    console.log(orderedSnack);
  };

  return (
    <>
      <Typography variant="h4" component="div" mb={3} align="center">
        Buy snacks
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="snack-label">Snacks</InputLabel>
        <Select
          labelId="snack-label"
          id="snack"
          value={currentSnack}
          onChange={(event) => setCurrentSnack(event.target.value)}
          label="Snack"
          required>
          {snacks.map((snack, index) => (
            <MenuItem key={index} value={snack.Id}>
              {snack.Title + ' / ' + snack.Type + ' / ' + snack.Size + ' / ' + snack.Price + '€'}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <br />
      <Box component="form">
        <TextField
          name="amount"
          label="Amount"
          type="number"
          fullWidth
          required
          inputProps={{ min: 1, max: 30, step: 1 }}
          value={currentAmmount}
          onChange={(event) => setCurrentAmmount(event.target.value)}
        />
      </Box>
      <br />
      <Box display={'flex'}>
        <Button
          color="primary"
          variant="contained"
          sx={{ marginLeft: 'auto' }}
          onClick={insertData}>
          Add to order
        </Button>
      </Box>
    </>
  );
}
