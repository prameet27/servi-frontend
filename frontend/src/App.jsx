import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Results from './pages/Results'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProviderDashboard from './pages/ProviderDashboard'
import AdminDashboard from './pages/AdminDashboard'
import GuestDashboard from './pages/GuestDashboard'
import './index.css'

function Layout() {
  const location = useLocation()

  // ✅ Hide Navbar and Footer on these pages
  const hiddenRoutes = ['/admin-dashboard', '/provider-dashboard', '/guest-dashboard']
  const hideLayout   = hiddenRoutes.includes(location.pathname)

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/"                   element={<Home />} />
        <Route path="/results"            element={<Results />} />
        <Route path="/login"              element={<Login />} />
        <Route path="/signup"             element={<Signup />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        <Route path="/admin-dashboard"    element={<AdminDashboard />} />
        <Route path="/guest-dashboard" element={<GuestDashboard />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}