import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import seatServices from '../services/manager/seat.serivces';

function createData(Title, Price, Id) {
  return { Title, Price, Id };
}

export default function EditSeats() {
  const [chairTypes, setChairTypes] = useState([]);
  const { moviehallid } = useParams();
  const numberOfRows = 4;
  const numberOfColumns = 12;
  const [seats, setSeats] = useState(
    new Array(numberOfRows).fill().map((row, rowIndex) => {
      return new Array(numberOfColumns).fill().map((column, columnIndex) => {
        return {
          Row: rowIndex,
          Number: columnIndex,
          FkChairTypeId: -1,
          FkMovieHallId: moviehallid
        };
      });
    })
  );

  useEffect(() => {
    //api call
    seatServices.getData().then((res) => {
      const chairTypes = res.data;
      console.log(chairTypes);
      setChairTypes(chairTypes.map((chair) => createData(chair.Title, chair.Price, chair.Id)));
    });

    seatServices.getSeats(moviehallid).then((res) => {
      const newSeats = res.data;
      console.log(newSeats);
      setSeats(newSeats);
    });
  }, []);

  const editSeat = () => {
    seatServices.edit(seats).then((res) => {
      alert(res.status == 200 ? 'Seats edited successfully.' : 'Error during edit.');
    });
  };

  const handleSeatChange = (row, column, type) => {
    const seat = seats[row][column];
    const newSeat = { ...seat, FkChairTypeId: type };
    setSeats(
      new Array(numberOfRows).fill().map((r, rowIndex) => {
        return new Array(numberOfColumns).fill().map((c, columnIndex) => {
          if (rowIndex == row && columnIndex == column) {
            return newSeat;
          } else {
            return seats[rowIndex][columnIndex];
          }
        });
      })
    );
  };

  return (
    <>
      <Typography variant="h4" component="div" align="center" mb={3}>
        Edit seats
      </Typography>
      <Box mb={3} sx={{ backgroundColor: '#1976d2' }}>
        <Typography variant="p" component="div" align="center" color="white" p={1}>
          Screen
        </Typography>
      </Box>
      <Grid container spacing={1}>
        {seats.map((seatRow, rowIndex) =>
          seatRow.map((seat, columnIndex) => (
            <Grid item xs={1} key={columnIndex}>
              <FormControl fullWidth>
                <InputLabel id="seat-label">Type</InputLabel>
                <Select
                  error={seat.FkChairTypeId == -1 ? false : true}
                  labelId="seat-label"
                  id="seat"
                  value={seat.FkChairTypeId}
                  onChange={(event) => handleSeatChange(rowIndex, columnIndex, event.target.value)}
                  label="Genre"
                  required>
                  {chairTypes.map((chairType, chairIndex) => (
                    <MenuItem key={chairIndex} value={chairType.Id}>
                      {chairType.Title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))
        )}
      </Grid>
      <br />
      <Box display={'flex'}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ marginLeft: 'auto' }}
          onClick={editSeat}>
          Edit
        </Button>
      </Box>
    </>
  );
}
