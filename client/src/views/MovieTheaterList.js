import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { Button, TableHead, Typography } from '@mui/material';

const tempData = [
  {
    Id: 333,
    Address: 'Address'
  }
];

export default function MovieTheaterList() {
  const [movieTheaters, setMovieTheaters] = useState([]);
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = React.useState(-1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //api call
    setMovieTheaters(tempData);
  }, []);

  const selectDeletion = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const cancelDelete = () => {
    setOpen(false);
  };

  const confirmDelete = () => {
    //api call
    console.log(selectedId);
    setSelectedId(-1);
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
          {'Are you sure you want to delete this movie theater?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Movie theater will be deleted permanently
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
        Movie theater list
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography component="div">Address</Typography>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movieTheaters.map((movieTheater, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Typography component="div">{movieTheater.Address}</Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => navigate('/manager/moviehalls/' + movieTheater.Id)}>
                    <FormatListBulletedIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      selectDeletion(movieTheater.Id);
                    }}>
                    <DeleteRoundedIcon />
                  </IconButton>
                </TableCell>
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
          onClick={() => navigate('addtheater')}
          sx={{ marginLeft: 'auto' }}>
          Add
        </Button>
      </Box>
    </Box>
  );
}
