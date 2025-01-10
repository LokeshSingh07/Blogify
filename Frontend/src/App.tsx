import { useState } from 'react';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Signup from './pages/Signup';
import { Signin } from './pages/Signin';
import Blog from './pages/Blog';
import Error from './pages/Error';
import { Toaster } from 'react-hot-toast';




function App() {
  

  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/blogs' element={<Blog/>}/>
          <Route path='/blog/:id' element={<Blog/>}/>

          <Route path='*' element={<Error/>}/>
        </Routes>

        <Toaster/>

      </BrowserRouter>
    </>
  )
}

export default App
