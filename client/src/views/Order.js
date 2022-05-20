import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button, TableHead, Typography } from '@mui/material';
import orderTableServices from '../services/manager/orderTable.services';

export default function Order() {
  const [movieObjects, setMovieObjects] = useState([]);
  const [snackObjects, setSnackObjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //api call
    orderTableServices.getOrder(sessionStorage.getItem('orderid')).then((res) => {
      const { tickets, snacks } = res.data;
      setMovieObjects(tickets);
      setSnackObjects(snacks);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h4" component="div" mb={3} align="center">
        Order list
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography component="div">Name</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography component="div">Count</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography component="div">Info</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography component="div">Price</Typography>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movieObjects.map((movieObject, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Typography component="div">{movieObject.Title}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="div"></Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="div">
                    Starts: {movieObject.StartTime} <br></br>Ticket info:{' '}
                    {'Row: ' +
                      movieObject.Row +
                      ' Number: ' +
                      movieObject.Number +
                      ' Type: ' +
                      movieObject.ChairType}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="div">{movieObject.Price}</Typography>
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ))}
            {snackObjects.map((snackObject, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Typography component="div">{snackObject.Title}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="div">{snackObject.Count}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="div">
                    Type: {snackObject.Type} <br></br>Size: {snackObject.Size}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="div">{snackObject.Price}</Typography>
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Box display={'flex'}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigate('payment')}
          sx={{ marginLeft: 'auto' }}>
          Pay
        </Button>
      </Box>
    </Box>
  );
}
