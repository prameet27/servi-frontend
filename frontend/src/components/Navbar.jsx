import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav style={{
      background: 'rgba(249,248,245,0.92)',
      backdropFilter: 'blur(4px)',
      borderBottom: '1px solid #e8e6e0',
      padding: '0 48px',
      height: '68px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>

      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '36px', height: '36px', background: '#1a6b4a',
          borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ fontSize: '18px' }}>📍</span>
        </div>
        <span style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a' }}>ServiFind</span>
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '32px' }}>
        {['Services', 'How It Works', 'Popular'].map(item => (
          <Link
            key={item}
            to="/results"
            style={{ color: '#555', textDecoration: 'none', fontWeight: '500', fontSize: '15px' }}
            onMouseEnter={e => e.target.style.color = '#1a6b4a'}
            onMouseLeave={e => e.target.style.color = '#555'}
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Auth Buttons */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button
          onClick={() => navigate('/login')}
          style={{
            background: 'transparent', border: 'none', color: '#333',
            fontSize: '15px', fontWeight: '500', cursor: 'pointer',
            padding: '8px 16px', borderRadius: '8px'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f0efeb'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          Log In
        </button>
        <button
          onClick={() => navigate('/signup')}
          style={{
            background: '#1a6b4a', border: 'none', color: '#fff',
            fontSize: '15px', fontWeight: '600', cursor: 'pointer',
            padding: '8px 20px', borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(26,107,74,0.3)'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#155c3e' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#1a6b4a' }}
        >
          Sign Up
        </button>
      </div>

    </nav>
  )
}