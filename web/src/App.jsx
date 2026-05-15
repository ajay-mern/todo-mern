import React from 'react'
import { Login } from '../pages/Login'
import { Todos } from "../pages/Todo"
import { Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar'
import Home from '../pages/Home'
import { Signup } from '../pages/Signup'
import PrivateRoute from './components/PrivateRoute'

const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Home />} />
        <Route path='/todos' element={<PrivateRoute element={<Todos />} />} />
      </Routes>
    </>
  )
}

export default App