import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';

export default function Payment() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const cancelPaying = () => {
    setOpen(false);
  };

  const confirmPayment = () => {
    setOpen(false), navigate('paypalboundary');
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={cancelPaying}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Are you sure that you want to pay?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will be redirected to payment window
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={cancelPaying}>
            Cancel
          </Button>
          <Button color="error" autoFocus onClick={confirmPayment}>
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
