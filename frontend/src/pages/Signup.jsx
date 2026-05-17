import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole]         = useState('guest')
  const [phone, setPhone]       = useState('')
  const [error, setError]       = useState('')
  const { login }               = useAuth()
  const navigate                = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
  
    console.log("Role Sent:", role)
  
    // Build payload first
    const payload = {
      username: username.trim(),
      email: email.trim(),
      password,
      role: role.trim().toLowerCase(),
    }
  
    // Only add phone for providers
    if (role === 'provider') {
      payload.phone = phone.trim()
    }
  
    try {
      const res = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
  
      const data = await res.json()
  
      // Handle backend errors
      if (!res.ok) {
        console.log("REGISTER ERROR:", data)
  
        if (data.phone) {
          setError(data.phone[0])
        } else if (data.username) {
          setError(data.username[0])
        } else if (data.email) {
          setError(data.email[0])
        } else {
          setError('Registration failed')
        }
  
        return
      }
  
      const userRole = (data.role || data.Role || 'guest').trim().toLowerCase()
  
      login(data)
  
      if (userRole === 'provider') {
        navigate('/provider-dashboard')
      } else if (userRole === 'admin') {
        navigate('/admin-dashboard')
      } else {
        navigate('/guest-dashboard')
      }
  
      console.log('Register Role:', userRole)
  
    } catch (err) {
      console.error(err)
      setError('Server error. Is Django running?')
    }
  }

  const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e0ddd6', fontSize: '15px', outline: 'none' }
  const labelStyle = { fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '6px' }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9f8f5', padding: '24px' }}>
      <div style={{ background: '#fff', border: '1px solid #e8e6e0', borderRadius: '20px', padding: '48px', width: '100%', maxWidth: '420px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', color: '#1a1a1a' }}>Create account</h2>
        <p style={{ color: '#888', marginBottom: '32px', fontSize: '15px' }}>Join 50,000+ households on ServiFind</p>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        {/* Role selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>I am a...</label>
          <div style={{ display: 'flex', gap: '10px' }}>
          {['guest', 'provider'].map(r => (
  <button
    type="button"
    key={r}
    onClick={() => {
      console.log("ROLE BUTTON CLICKED:", r)
      setRole(r)
    }}
    style={{
      flex: 1,
      padding: '10px',
      borderRadius: '10px',
      cursor: 'pointer',
      border: role === r ? '2px solid #1a6b4a' : '1px solid #e0ddd6',
      background: role === r ? '#e8f5ee' : '#fff',
      color: role === r ? '#1a6b4a' : '#555',
      fontWeight: role === r ? '700' : '500',
      fontSize: '14px'
    }}
  >
    {r === 'guest' ? '👤 Guest' : '🔧 Provider'}
  </button>
))}
          </div>
          <p style={{ fontSize: '12px', color: '#999', marginTop: '6px' }}>
            {role === 'guest' ? 'Browse and contact service providers' : 'List your services (requires admin approval)'}
          </p>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="johnsmith" style={inputStyle} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" style={inputStyle} />
        </div>

        {role === 'provider' && (
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Phone</label>
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="0412 345 678" style={inputStyle} />
          </div>
        )}

        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
        </div>

        <button onClick={handleSignup} style={{ width: '100%', padding: '13px', background: '#1a6b4a', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>
          Create Account
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#888' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#1a6b4a', fontWeight: '600', textDecoration: 'none' }}>Log In</Link>
        </p>
      </div>
    </div>
  )
}