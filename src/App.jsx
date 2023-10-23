import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import  Articles  from './components/Articles'
function App() {
  return <>
  <Header />
  <Routes>
    <Route path='/articles' element={<Articles />} />

  </Routes>
  
  </>
}

export default App
