import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManagerDashboard from './views/ManagerDashboard';
import CssBaseline from '@mui/material/CssBaseline';
import MainPage from './views/MainPage';
import ClientDashboard from './views/ClientDashboard';

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/manager/*" element={<ManagerDashboard />} />
          <Route path="/client/*" element={<ClientDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
