import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import  Articles  from './components/articles/Articles'
import SingleArticlePage from './components/articles-single-page/Single-article-age'
function App() {
  return <>
  <Header />
  <Routes>
    <Route path='/articles' element={<Articles />} />
    <Route path='/articles/:article_id' element={<SingleArticlePage />} />
    <Route path='/articles/topic/:topic'></Route>
  </Routes>
  
  </>
}

export default App
