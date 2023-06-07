import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/home'


import { Routes, Route } from 'react-router-dom'

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home name="Julien" age={20} />} />
      </Routes>
    </BrowserRouter>

  )
  }

export default App
