import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router' 
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Categories from './pages/Categories'
import Detail from './pages/Detail'
import OwnedBooks from './pages/OwnedBooks'
import Register from './pages/Register'
import Recommended from './pages/Recommended'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/categories/:id/books" element={<Categories/>} />
          <Route path="/books/:id" element={<Detail/>} />
          <Route path="/ownedBooks" element={<OwnedBooks />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recommended" element={<Recommended />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
