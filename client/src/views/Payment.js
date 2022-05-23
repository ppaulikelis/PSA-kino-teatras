import * as React from 'react';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import orderTableServices from '../services/manager/orderTable.services';

export default function Payment() {
  const [open, setOpen] = useState(false);

  const cancel = () => {
    setOpen(false);
  };

  const confirm = () => {
    orderTableServices.confirm(sessionStorage.getItem('orderid')).then((res) => {
      const post1 = res.data.Value.post1.Value;
      const post2 = res.data.Value.post2.Value;
      const date = new Date(post1.OrderDate);

      alert('Date: ' + date.toLocaleDateString('en-US') + '  Is paid: ' + post1.IsPaid);
      if (post2) {
        alert('Email sent succesfully');
      } else {
        alert('Email failed to be sent');
      }
    });
    setOpen(false);
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={cancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Are you sure that you want to pay?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will be redirected to payment window
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={cancel}>
            Cancel
          </Button>
          <Button color="error" autoFocus onClick={confirm}>
            Pay
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h4" component="div" mb={3} align="center">
        Payment
      </Typography>
      <br />
      <Box display={'flex'}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
          Start payment
        </Button>
      </Box>
    </Box>
  );
}
