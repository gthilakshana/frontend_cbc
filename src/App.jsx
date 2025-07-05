import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/homePage';
import SignupPage from './pages/signUpPage';
import LoginPage from './pages/loginPage';
import AdminHomePage from './pages/adminHomePage';
import NotFoundPage from './pages/notfoundPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="bottom-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Home with nested routes */}
          <Route path="/*" element={<HomePage />} />

          {/* Admin with its own nested routes */}
          <Route path="/admin/*" element={<AdminHomePage />} />

          {/* Catch-all for unknown routes (fallback) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
