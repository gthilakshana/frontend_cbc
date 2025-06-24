// import { useState } from 'react',
import React from 'react'
import './App.css'
import HomePage from './pages/homePage'
import SignupPage from './pages/signUpPage'
import LoginPage from './pages/loginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminHomePage from './pages/adminHomePage'
import { Toaster } from 'react-hot-toast'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Toaster position="bottom-right" />

        <Routes path="/*">
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path='/admin/*' element={<AdminHomePage />} />
          <Route path='/*' element={<HomePage />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
