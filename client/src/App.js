import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManagerDashboard from './views/ManagerDashboard';
import CssBaseline from '@mui/material/CssBaseline';
import MainPage from './views/MainPage';

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/manager/*" element={<ManagerDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
