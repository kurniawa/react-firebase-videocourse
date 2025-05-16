import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TestGetAllUser from './pages/TestGetAllUser';
import { Provider } from 'react-redux'; // Import Provider
import store from './store/store'; // Import store Anda (pastikan pathnya benar)
import ListView from './pages/ListView';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Bungkus seluruh aplikasi dengan Provider */}
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard type="PROFILE" />} />
            <Route path="/my-class" element={<Dashboard type="MY-CLASS" />} />
            <Route path="/my-order" element={<Dashboard type="MY-ORDER" />} />
            <Route path="/test-get-all-users" element={<TestGetAllUser />} />
            <Route path="/list-view" element={<ListView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);