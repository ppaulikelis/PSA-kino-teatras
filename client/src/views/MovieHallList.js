import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';
import { useNavigate, useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { Button, TableHead, Typography } from '@mui/material';
import hallServices from '../services/manager/hall.services';

function createData(Number, Id) {
  return { Number, Id };
}

export default function MovieHallList() {
  const { theaterid } = useParams();
  const [movieHalls, setMovieHalls] = useState([]);
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = React.useState(-1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //api call
    hallServices.get(theaterid).then((res) => {
      const hallList = res.data;
      setMovieHalls(hallList.map((hall) => createData(hall.Number, hall.Id)));
    });
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
    hallServices.delete(selectedId).then((res) => {
      alert(res.status == 200 ? 'Movie hall deleted successfully.' : 'Error during deletion.');
      window.location.reload(false);
    });
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
          {'Are you sure you want to delete this movie hall?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Movie hall will be deleted permanently
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
        Movie hall list
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography component="div">Number</Typography>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movieHalls.map((movieHall, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Typography component="div">{movieHall.Number}</Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => navigate('/manager/moviehalls/editmoviehall/' + movieHall.Id)}>
                    <EditRoundedIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      selectDeletion(movieHall.Id);
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
          onClick={() => navigate('/manager/moviehalls/addmoviehall/' + theaterid)}
          sx={{ marginLeft: 'auto' }}>
          Add
        </Button>
      </Box>
    </Box>
  );
}
