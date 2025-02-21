import './App.css'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { Routes, Route } from 'react-router-dom'

function App () {
  return (
    <main>
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<h1>No existe</h1>} />
      </Routes>
    </main>
  )
};

export default App
