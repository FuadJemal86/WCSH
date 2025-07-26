import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* 404 (for not found pages) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
