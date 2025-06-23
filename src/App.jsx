// import { useState } from 'react',
import React from 'react'
import './App.css'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>

        <Routes path="/*">
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
