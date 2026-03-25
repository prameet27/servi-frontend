import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Results from './pages/Results'
import Login from './pages/Login'
import Signup from './pages/Signup'
import './index.css' 

export default function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element = {<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
