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
import {
  Button,
  TableFooter,
  TableHead,
  TablePagination,
  TextField,
  Typography
} from '@mui/material';
import { useTheme } from '@emotion/react';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from 'prop-types';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import managerServices from '../../services/manager/manager.services';

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

function createData(id, title, genre, startDate, endDate) {
  return { id, title, genre, startDate, endDate };
}

export default function MovieList() {
  const [movies, setMovies] = useState([]);
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

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    //api call
    managerServices.getMovies().then((res) => {
      const movieList = res.data;
      setMovies(
        movieList.map((movie) =>
          createData(movie.id, movie.title, movie.genre, movie.start_date, movie.end_date)
        )
      );
    });
  }, []);

  const removeMovie = () => {
    //api call
    managerServices.removeMovie(selectedId).then((res) => console.log(res));
    window.location.reload(false);
    setSelectedId(-1);
    setOpen(false);
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Ar tikrai norite pašalinti filmą?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Filmas bus pašalintas visam laikui
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Atšaukti
          </Button>
          <Button color="error" autoFocus onClick={removeMovie}>
            Pašalinti
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h4" component="div" mb={3} align="center">
        Filmų sąrašas
      </Typography>
      <TextField
        id="search"
        name="search"
        label="Ieškoti"
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: <SearchRoundedIcon />
        }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography component="div">Pavadinimas</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography component="div">Žanras</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography component="div">Pradžios data</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography component="div">Pabaigos data</Typography>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? movies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : movies
            ).map((movie) => (
              <TableRow key={movie.id}>
                <TableCell component="th" scope="row">
                  <Typography component="div">{movie.title}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="div">{movie.genre}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="div">
                    {new Date(movie.startDate).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="div">
                    {new Date(movie.endDate).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => navigate('movies/editmovie/' + movie.id)}>
                    <EditRoundedIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      handleClickOpen(movie.id);
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
                labelRowsPerPage="Eilutės puslapyje"
                rowsPerPageOptions={[5, 10, 25, { label: 'Visos', value: -1 }]}
                colSpan={3}
                count={movies.length}
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
          onClick={() => navigate('movies/addmovie')}
          sx={{ marginLeft: 'auto' }}>
          Pridėti
        </Button>
      </Box>
    </Box>
  );
}
