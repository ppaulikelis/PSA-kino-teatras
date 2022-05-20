import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import orderTableServices from '../services/manager/orderTable.services';

export default function CreateOrder() {
  const navigate = useNavigate();

  useEffect(() => {
    const orderid = sessionStorage.getItem('orderid');
    if (orderid == null) {
      //api call
      const orderTable = {
        OrderDate: new Date(),
        IsPaid: null,
        AnswerDate: null,
        FkClientId: 1
      };
      orderTableServices.add(orderTable).then((res) => {
        const id = res.data;
        sessionStorage.setItem('orderid', id);
      });
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
