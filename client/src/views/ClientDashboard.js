import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ClientAppBar from './ClientAppBar';
import CreateOrder from './CreateOrder';
import SubscribeNews from './SubscribeNews';
import BuySnacks from './BuySnacks';
import BuyTickets from './BuyTickets';

export default function ClientDashboard() {
  return (
    <>
      <ClientAppBar />
      <Container>
        <Box py={3}>
          <Routes>
            <Route path="" element={<></>} />
            <Route path="/subscribenews" element={<SubscribeNews />} />
            <Route path="/createorder" element={<CreateOrder />} />
            <Route path="/createorder/buysnacks" element={<BuySnacks />} />
            <Route path="/createorder/buytickets" element={<BuyTickets />} />
          </Routes>
        </Box>
      </Container>
    </>
  );
}
