import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { Button, TableHead, Typography } from '@mui/material';

const tempFilmai = [
  {
    Id: 333,
    Title: 'Filmas1',
    StartTime: '1:38',
    Price: 6.5,
    Count: 6
  }
];

const tempUzkandziai = [
  {
    Id: 333,
    Title: 'Cola',
    Type: 'drink',
    Price: 12.58,
    Count: 4
  }
];

export default function Order() {
  const [movieObjects, setMovieObjects] = useState([]);
  const [snackObjects, setSnackObjects] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //api call
    setMovieObjects(tempFilmai);
    setSnackObjects(tempUzkandziai);
  }, []);

  const cancelDelete = () => {
    setOpen(false);
  };

  const confirmDelete = () => {
    //api call
    console.log();
    setOpen(false);
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to delete this order?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Order will be deleted permanently
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button color="error" autoFocus onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
                <Typography component="div">Sum</Typography>
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
                  <Typography component="div">{movieObject.Count}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="div">
                    Starts: {movieObject.Count} <br></br>Ticket price: {movieObject.Price}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="div">{movieObject.Count * movieObject.Price}</Typography>
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
                    Type: {snackObject.Type} <br></br>Price: {snackObject.Price}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="div">{snackObject.Count * snackObject.Price}</Typography>
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
