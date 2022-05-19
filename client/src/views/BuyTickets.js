import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ChairIcon from '@mui/icons-material/Chair';

function createMovie(Title, Id) {
  return { Title, Id };
}

function createSession(StarTime, Id, FkMovieId) {
  return { StarTime, Id, FkMovieId };
}

const seats = [
  [
    {
      Row: 0,
      Number: 0,
      Id: 97,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 0,
      Number: 1,
      Id: 122,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 0,
      Number: 2,
      Id: 123,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 0,
      Number: 3,
      Id: 124,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 0,
      Number: 4,
      Id: 125,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 0,
      Number: 5,
      Id: 126,
      FkMovieHallId: 11,
      FkChairTypeId: 2
    },
    {
      Row: 0,
      Number: 6,
      Id: 127,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 0,
      Number: 7,
      Id: 128,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 0,
      Number: 8,
      Id: 129,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 0,
      Number: 9,
      Id: 130,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 0,
      Number: 10,
      Id: 131,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 0,
      Number: 11,
      Id: 132,
      FkMovieHallId: 11,
      FkChairTypeId: 2
    }
  ],
  [
    {
      Row: 1,
      Number: 0,
      Id: 133,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 1,
      Number: 1,
      Id: 134,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 1,
      Number: 2,
      Id: 135,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 1,
      Number: 3,
      Id: 136,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 1,
      Number: 4,
      Id: 137,
      FkMovieHallId: 11,
      FkChairTypeId: 3
    },
    {
      Row: 1,
      Number: 5,
      Id: 138,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 1,
      Number: 6,
      Id: 139,
      FkMovieHallId: 11,
      FkChairTypeId: 2
    },
    {
      Row: 1,
      Number: 7,
      Id: 140,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 1,
      Number: 8,
      Id: 141,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 1,
      Number: 9,
      Id: 142,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 1,
      Number: 10,
      Id: 121,
      FkMovieHallId: 11,
      FkChairTypeId: 2
    },
    {
      Row: 1,
      Number: 11,
      Id: 120,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    }
  ],
  [
    {
      Row: 2,
      Number: 0,
      Id: 119,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 2,
      Number: 1,
      Id: 107,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 2,
      Number: 2,
      Id: 98,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 2,
      Number: 3,
      Id: 99,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 2,
      Number: 4,
      Id: 100,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 2,
      Number: 5,
      Id: 101,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 2,
      Number: 6,
      Id: 102,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 2,
      Number: 7,
      Id: 103,
      FkMovieHallId: 11,
      FkChairTypeId: 2
    },
    {
      Row: 2,
      Number: 8,
      Id: 104,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 2,
      Number: 9,
      Id: 105,
      FkMovieHallId: 11,
      FkChairTypeId: 2
    },
    {
      Row: 2,
      Number: 10,
      Id: 106,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 2,
      Number: 11,
      Id: 108,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    }
  ],
  [
    {
      Row: 3,
      Number: 0,
      Id: 118,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 3,
      Number: 1,
      Id: 109,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 3,
      Number: 2,
      Id: 110,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 3,
      Number: 3,
      Id: 111,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 3,
      Number: 4,
      Id: 112,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 3,
      Number: 5,
      Id: 113,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 3,
      Number: 6,
      Id: 114,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 3,
      Number: 7,
      Id: 115,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 3,
      Number: 8,
      Id: 116,
      FkMovieHallId: 11,
      FkChairTypeId: 2
    },
    {
      Row: 3,
      Number: 9,
      Id: 117,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 3,
      Number: 10,
      Id: 143,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    },
    {
      Row: 3,
      Number: 11,
      Id: 144,
      FkMovieHallId: 11,
      FkChairTypeId: -1
    }
  ]
];

export default function BuyTickets() {
  const [step, setStep] = useState(0);
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(-1);
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(-1);
  const [selectedSeat, setSelectedSeat] = useState(-1);

  useEffect(() => {
    //api calls
    setMovies([createMovie('Title 1', 1), createMovie('Title 2', 2)]);
    setSessions([createSession('Session 1', 1, 1), createSession('Session 2', 2, 2)]);
  }, []);

  const StepRenderer = () => {
    switch (step) {
      case 0:
        return (
          <MovieSelectStep
            movies={movies}
            currentMovie={currentMovie}
            setCurrentMovie={setCurrentMovie}
            chooseMovie={chooseMovie}
          />
        );
      case 1:
        return (
          <SessionSelectStep
            sessions={sessions}
            currentSession={currentSession}
            setCurrentSession={setCurrentSession}
            selectSession={selectSession}
            currentMovie={currentMovie}
          />
        );
      case 2:
        return (
          <SeatSelectionStep
            selectedSeat={selectedSeat}
            setSelectedSeat={setSelectedSeat}
            selectSeat={selectSeat}
          />
        );
    }
  };

  const chooseMovie = () => {
    setStep(1);
  };

  const selectSession = () => {
    setStep(2);
  };

  const selectSeat = () => {
    const ticket = {
      FkSessionId: currentSession,
      FkOrderTableId: sessionStorage.getItem('orderid'),
      FkSeatId: selectedSeat
    };
    console.log(ticket);
  };

  return (
    <>
      <Typography variant="h4" component="div" mb={1} align="center">
        Buy tickets
      </Typography>
      <Box>
        <StepRenderer />
      </Box>
    </>
  );
}

const MovieSelectStep = (props) => {
  const { movies, currentMovie, setCurrentMovie, chooseMovie } = props;
  return (
    <>
      <Typography variant="h5" component="div" mb={3} align="left">
        Step 1: select movie
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="snack-label">Movies</InputLabel>
        <Select
          labelId="movie-label"
          id="movie"
          value={currentMovie}
          onChange={(event) => setCurrentMovie(event.target.value)}
          label="Movie"
          required>
          {movies.map((movie, index) => (
            <MenuItem key={index} value={movie.Id}>
              {movie.Title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <br />
      <Box display={'flex'}>
        <Button
          color="primary"
          variant="contained"
          sx={{ marginLeft: 'auto' }}
          onClick={chooseMovie}
          disabled={currentMovie == -1}>
          Select
        </Button>
      </Box>
    </>
  );
};

const SessionSelectStep = (props) => {
  const { sessions, currentSession, setCurrentSession, selectSession, currentMovie } = props;
  return (
    <>
      <Typography variant="h5" component="div" mb={3} align="left">
        Step 2: select session
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="session-label">Sessions</InputLabel>
        <Select
          labelId="session-label"
          id="session"
          value={currentSession}
          onChange={(event) => setCurrentSession(event.target.value)}
          label="Sessions"
          required>
          {sessions
            .filter((session) => session.FkMovieId == currentMovie)
            .map((session, index) => (
              <MenuItem key={index} value={session.Id}>
                {session.StarTime}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <br />
      <br />
      <Box display={'flex'}>
        <Button
          color="primary"
          variant="contained"
          sx={{ marginLeft: 'auto' }}
          onClick={selectSession}
          disabled={currentSession == -1}>
          Select
        </Button>
      </Box>
    </>
  );
};

const SeatSelectionStep = (props) => {
  const { selectedSeat, setSelectedSeat, selectSeat } = props;
  return (
    <>
      <Typography variant="h5" component="div" mb={3} align="left">
        Step 3: select seats
      </Typography>
      <Grid container direction="row" alignItems="center">
        {seats.map((seatRow) =>
          seatRow.map((seat, columnIndex) => (
            <Seat
              key={columnIndex}
              seatType={seat.FkChairTypeId}
              isSelected={selectedSeat == seat.Id}
              setSelectedSeat={() => setSelectedSeat(seat.Id)}
            />
          ))
        )}
      </Grid>
      <br />
      <Box display={'flex'}>
        <Button
          color="primary"
          variant="contained"
          sx={{ marginLeft: 'auto' }}
          disabled={selectedSeat == -1}
          onClick={selectSeat}>
          Select
        </Button>
      </Box>
    </>
  );
};

const Seat = (props) => {
  const { seatType, isSelected, setSelectedSeat } = props;
  if (seatType == -1) {
    return (
      <Grid item xs={1} sx={{ backgroundColor: '#1976d2' }}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent="center"
          height={80}></Box>
      </Grid>
    );
  } else {
    return (
      <Grid item xs={1} sx={{ backgroundColor: isSelected ? 'yellow' : 'green' }}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent="center"
          height={80}
          onClick={setSelectedSeat}>
          <ChairIcon sx={{ color: 'white' }} />
          <Typography variant="p" component={'div'} align={'center'} color="white">
            Type: {seatType}
          </Typography>
        </Box>
      </Grid>
    );
  }
};
