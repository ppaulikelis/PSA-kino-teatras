import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { Button, TableFooter, TableHead, TablePagination, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from 'prop-types';
import managerServices from '../services/manager/chairtype.services';

/*
const tempData = [
  {
    Id: 333,
    Name: 'VIP1',
    Price: 23.58
  }
];*/

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

function createData(Id, Title, Price) {
  return { Id, Title, Price };
}
export default function ChairTypeList() {
  const [chairTypes, setChairTypes] = useState([]);
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = React.useState(-1);
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const selectDeletion = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const cancelDelete = () => {
    setOpen(false);
  };
  useEffect(() => {
    //api call
    // setSeatTypes(tempData);
    managerServices.get().then((res) => {
      const ChairTypeList = res.data;
      setChairTypes(
        ChairTypeList.map((chairtype) => createData(chairtype.Id, chairtype.Title, chairtype.Price))
      );
    });
  }, []);

  const confirmDelete = () => {
    //api call
    managerServices.delete(selectedId).then((res) => {
      alert(res.status == 200 ? 'Chair type  deleted successfully.' : 'Error during deletion.');
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
          {'Are you sure you want to delete this seat type?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Chair type will be deleted permanently
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
        Chair type list
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography component="div">Title</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography component="div">Price</Typography>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chairTypes.map((chairType, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Typography component="div">{chairType.Title}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="div">{chairType.Price}</Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="error"
                    onClick={() => {
                      selectDeletion(chairType.Id);
                    }}>
                    <DeleteRoundedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                labelRowsPerPage="Rows per page"
                rowsPerPageOptions={[5, 10, 25, { label: 'Visos', value: -1 }]}
                colSpan={3}
                count={chairTypes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page'
                  },
                  native: true
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <br />
      <Box display={'flex'}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigate('addchairtype')}
          sx={{ marginLeft: 'auto' }}>
          Add
        </Button>
      </Box>
    </Box>
  );
}
