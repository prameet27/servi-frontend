import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
    
        if (!username || !password) {
            setError('Please enter both username and password')
            return
        }
    
        try {
            const res = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
    
            const data = await res.json()
    
            console.log('LOGIN RESPONSE:', data)
    
            if (!res.ok) {
                setError(data.error || 'Login Failed')
                return
            }
    
            const role = (data.role || '').trim().toLowerCase()
    
            login(data)
    
            if (role === 'admin') {
                navigate('/admin-dashboard')
            } else if (role === 'provider') {
                navigate('/provider-dashboard')
            } else {
                navigate('/guest-dashboard')
            }
            
            console.log('Login Role:', role)
        } catch (err) {
            console.error(err)
            setError('Server Error. Is Django running?')
        }
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9f8f5', padding: '24px' }}>
            <div style={{ background: '#fff', border: '1px solid #e8e6e0', borderRadius: '20px', padding: '48px', width: '100%', maxWidth: '420px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', color: '#1a1a1a' }}>Welcome Back</h2>
                <p style={{ color: '#888', marginBottom: '32px', fontSize: '15px' }}>Log in to your ServiFind account</p>

                {error && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
                        {error}
                    </div>
                )}

                {/* Username */}
<div style={{ marginBottom: '16px' }}>
    <label
        htmlFor="username"
        style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '6px' }}
    >
        Username
    </label>
    <input
        id="username"
        name="username"
        type="text"
        autoComplete="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Your username"
        style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e0ddd6', fontSize: '15px', outline: 'none' }}
    />
</div>

{/* Password */}
<div style={{ marginBottom: '24px' }}>
    <label
        htmlFor="password"
        style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '6px' }}
    >
        Password
    </label>
    <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="*********"
        style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e0ddd6', fontSize: '15px', outline: 'none' }}
    />
</div>  

                <button
                    onClick={handleLogin}
                    style={{
                        width: '100%',
                        padding: '13px',
                        background: '#1a6b4a',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer'
                    }}
                >
                    Log In
                </button>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#888' }}>
                    Don't have an account?{' '}
                    <Link to='/signup' style={{ color: '#1a6b4a', fontWeight: '600', textDecoration: 'none' }}>Sign Up</Link>
                </p>
            </div>
        </div>
    )
}