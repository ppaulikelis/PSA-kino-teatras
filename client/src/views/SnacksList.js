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
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { Button, TableHead, Typography } from '@mui/material';
import snackServices from '../services/manager/hall.services';

function createData(Title, Price, Type, Size, Id) {
  return { Title, Price, Type, Size, Id };
}

export default function SnacksList() {
  const [snacks, setSnacks] = useState([]);
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = React.useState(-1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //api call
    snackServices.get().then((res) => {
      const snackList = res.data;
      setSnacks(
        snackList.map((snack) =>
          createData(snack.Title, snack.Price, snack.Type, snack.Size, snack.Id)
        )
      );
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
    snackServices.delete(selectedId).then((res) => {
      alert(res.status == 200 ? 'Snack deleted successfully.' : 'Error during deletion.');
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
          {'Are you sure you want to delete this snack?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Snack will be deleted permanently
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
        Snacks list
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography component="div">Title</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography component="div">Type</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography component="div">Price</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography component="div">Size</Typography>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {snacks.map((snack, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Typography component="div">{snack.Title}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="div">{snack.Type}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="div">{snack.Price}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="div">{snack.Size}</Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => navigate('editsnack/' + snack.Id)}>
                    <EditRoundedIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      selectDeletion(snack.Id);
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
          onClick={() => navigate('addsnack')}
          sx={{ marginLeft: 'auto' }}>
          Add
        </Button>
      </Box>
    </Box>
  );
}
