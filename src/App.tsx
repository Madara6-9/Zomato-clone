import React from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Welcome from './components/Welcome'
import {Routes,Route} from "react-router-dom"
import EmailLogin from './components/EmailLogin'
import Main from './components/Main'
import Details from './components/Details'
import Guest from './components/Guest'

const App = () => {
  return (
    <>
    <Routes>
     <Route path='/' element={<Welcome/>}/>
     <Route path='/signup' element={<Signup/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/emailLogin' element={<EmailLogin/>}/>
     <Route path='/main' element={<Main/>}/>
     <Route path='/details' element={<Details/>}/>
     <Route path='/guest' element={<Guest/>}/>
    </Routes>
    </>
  )
}

export default App
