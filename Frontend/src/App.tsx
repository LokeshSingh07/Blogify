import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Signup from './pages/Signup';
import { Signin } from './pages/Signin';
import Blog from './pages/Blog';
import Error from './pages/Error';
import { Toaster } from 'react-hot-toast';
import { Blogs } from './pages/Blogs';
import { MembershipPlan } from './pages/MembershipPlan';
import { Publish } from './pages/Publish';




function App() {
  

  return (
    <div className='max-w-5xl mx-auto'>
      <BrowserRouter>
        
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/blog/:id' element={<Blog/>}/>
          <Route path='/publish' element={<Publish/>}/>
          <Route path='/membership' element={<MembershipPlan/>}/>

          <Route path='*' element={<Error/>}/>
        </Routes>

        <Toaster/>

      </BrowserRouter>
    </div>
  )
}

export default App
