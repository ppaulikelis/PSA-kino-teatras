import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import orderTableServices from '../services/manager/orderTable.services';

export default function DeleteOrder() {
  const confirmDelete = () => {
    orderTableServices.delete(sessionStorage.getItem('orderid')).then((res) => {
      alert(res.status == 200 ? 'Order deleted sucessfully.' : 'Error during delete.');
      if (res.status == 200) {
        sessionStorage.removeItem('orderid');
      }
    });
  };

  return (
    <Box>
      <Typography variant="h4" component="div" mb={3} align="center">
        Are you sure you want to delete this order?
      </Typography>
      <br />
      <Box display={'flex'}>
        <Button
          color="error"
          onClick={confirmDelete}
          variant="contained"
          sx={{ marginLeft: 'auto' }}>
          Delete
        </Button>
      </Box>
    </Box>
  );
}
