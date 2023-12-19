import { Children, useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { AuthContext, AuthProvider } from './Auth/AuthContext'
import Login from './components/Login/Login'
import Layout from './components/layout/layout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import CreateUser from './components/CreateUser/CreateUser'

function App() {

  const {isLogged} = useContext(AuthContext);

  console.log(isLogged);
  

  return (
    
    <AuthProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}/>
        <Route path='/register' element={<CreateUser/>}/>
        </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App
