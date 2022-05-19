import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { genres } from '../constants';
import subscriptionServices from '../services/manager/subscription.services';

export default function SubscribeNews() {
  const [showSelect, setShowSelect] = useState(false);
  const [currentSelect, setCurrentSelect] = useState(-1);
  const userId = 1;

  const selectSubscribe = () => {
    setShowSelect(true);
  };

  const selectDecision = () => {
    console.log(currentSelect);
    subscriptionServices.addSubscription(currentSelect, userId).then((res) => {
      alert(res.status == 200 ? 'Subscription added successfully.' : 'Error during add.');
    });
  };

  return (
    <>
      <Typography variant="h4" component="div" mb={3} align="center">
        Subscribe news
      </Typography>
      {showSelect ? (
        <>
          <FormControl fullWidth>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre"
              name="genre"
              label="Genre"
              required
              value={currentSelect}
              onChange={(event) => setCurrentSelect(event.target.value)}>
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
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
              onClick={selectDecision}
              sx={{ marginLeft: 'auto' }}>
              Subscribe
            </Button>
          </Box>
        </>
      ) : (
        <Box display={'flex'}>
          <Button
            color="primary"
            variant="contained"
            onClick={selectSubscribe}
            sx={{ marginLeft: 'auto' }}>
            Subscribe
          </Button>
        </Box>
      )}
    </>
  );
}
