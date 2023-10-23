import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import  Articles  from './components/Articles'
import SingleArticlePage from './components/Single-article-age'
function App() {
  return <>
  <Header />
  <Routes>
    <Route path='/articles' element={<Articles />} />
    <Route path='/articles/:article_id' element={<SingleArticlePage />} />

  </Routes>
  
  </>
}

export default App
