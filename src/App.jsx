import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import  Articles  from './components/articles/Articles'
import SingleArticlePage from './components/articles-single-page/Single-article-age'
import Home from './components/home/Home'
import { UserContext, UserProvider } from './components/users/UserContext'
function App() {
  return <>
      <UserProvider>
  <Header />
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/articles' element={<Articles />} />
    <Route path='/articles/:article_id' element={<SingleArticlePage />} />
    <Route path='/articles/topic/:topic'></Route>
  </Routes>

      </UserProvider>
  
  </>
}

export default App
