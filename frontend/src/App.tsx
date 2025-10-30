import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ExperienceDetail from './pages/ExperienceDetail'
import Checkout from './pages/Checkout'
import Result from './pages/Result'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience/:id" element={<ExperienceDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}
