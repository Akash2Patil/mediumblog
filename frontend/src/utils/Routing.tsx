import { Routes, Route } from 'react-router-dom'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import Blog from '../pages/Blog'
import Blogs from '../pages/Blogs'
import Home from '../pages/Home'
import Published from '../pages/Published'

const Routing = () => {
  return (
    
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/published' element={<Published/>}/>
    </Routes>
    
  )
}

export default Routing
