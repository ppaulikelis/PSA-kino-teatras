import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManagerDashboard from './components/manager/ManagerDashboard';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={'Home page'} />
          <Route path="/manager/*" element={<ManagerDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
