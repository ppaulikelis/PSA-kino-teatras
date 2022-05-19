import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ClientAppBar from './ClientAppBar';
import Order from './Order';
import DeleteOrder from './DeleteOrder';
import SubscribeNews from './SubscribeNews';

export default function ClientDashboard() {
  return (
    <>
      <ClientAppBar />
      <Container>
        <Box py={3}>
          <Routes>
            <Route path="" element={<></>} />
            <Route path="/subscribenews" element={<SubscribeNews />} />
            {/* Order */}
            <Route path="/order" element={<Order />} />
            <Route path="/deleteorder" element={<DeleteOrder />} />
          </Routes>
        </Box>
      </Container>
    </>
  );
}
