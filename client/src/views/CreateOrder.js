import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateOrder() {
  const navigate = useNavigate();

  useEffect(() => {
    const orderid = sessionStorage.getItem('orderid');
    if (orderid == null) {
      //api call
      const res = 9999;
      sessionStorage.setItem('orderid', res);
    }
  }, []);
  return (
    <>
      <Typography variant="h4" component="div" mb={3} align="center">
        Create order
      </Typography>
      <Box display={'flex'} justifyContent={'center'}>
        <Button
          color="secondary"
          variant="contained"
          sx={{ mr: 1 }}
          onClick={() => navigate('buytickets')}>
          Buy tickets
        </Button>
        <Button
          color="primary"
          variant="contained"
          sx={{ ml: 1 }}
          onClick={() => navigate('buysnacks')}>
          Buy snacks
        </Button>
      </Box>
    </>
  );
}
