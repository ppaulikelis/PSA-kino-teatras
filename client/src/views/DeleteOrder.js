import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';

export default function DeleteOrder() {
  return (
    <Box>
      <Typography variant="h4" component="div" mb={3} align="center">
        Are you sure you want to delete this order?
      </Typography>
      <br />
      <Box display={'flex'}>
        <Button color="error" variant="contained" sx={{ marginLeft: 'auto' }}>
          Delete
        </Button>
      </Box>
    </Box>
  );
}
