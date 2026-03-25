import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'

export default function Signup(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSignup = (e) => {
        e.preventDefault()
        alert('Account created for ${name}!')
        navigate('/')
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9f8f5', padding: '24px' }}>
            <div style={{ background: '#fff', border: '1px solid #e8e6e0', borderRadius: '20px', padding: '48px', width: '100%', maxWidth: '420px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', color: '#1a1a1a' }}>Create Account</h2>
                <p style={{ color: '#888', marginBottom: '32px', fontSize: '15px' }}> Join 50,000+ households on ServiFind</p>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '6px' }}>Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='John Smith' style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e0ddd6', fontSize: '15px', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '6px'}}>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e0ddd6', fontSize: '15px', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '6px' }}>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='*********' style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', borderRadius: '1px solid #e0ddd6', fontSize: '15px', outline: 'none' }} />
                </div>
                <button onClick={handleSignup} style={{ width: '100%', padding: '13px', background: '#1a6b4a', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>Create Account</button>
                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#888' }}>Already have an Account?{' '}
                    <Link to='/login' style={{ color: '#1a6b4a', fontWeight: '600', textDecoration: 'none' }}>Log In</Link>
                </p>
            </div>
        </div>
    )
}