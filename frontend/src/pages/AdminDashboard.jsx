import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const { user, logout } = useAuth()   // ✅ add logout
  const navigate         = useNavigate()
  const [pending, setPending] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/login'); return }
    fetch('http://127.0.0.1:8000/api/services/pending/', {
      headers: { 'Authorization': `Token ${user.token}` }
    })
      .then(r => r.json())
      .then(setPending)
  }, [user])

  const handleAction = async (id, status) => {
    const res = await fetch(`http://127.0.0.1:8000/api/services/${id}/approve/`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${user.token}` },
      body:    JSON.stringify({ status })
    })
    if (res.ok) {
      setMessage(`✅ Service ${status}!`)
      setPending(prev => prev.filter(s => s.id !== id))
    }
  }

  // ✅ Logout handler
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>

      {/* Header with logout */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800' }}>
          Admin Dashboard
        </h1>

        {/* User info + logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Avatar circle */}
            <div style={{
              width: '38px', height: '38px',
              background: '#1a6b4a', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: '16px', fontWeight: '700'
            }}>
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', lineHeight: 1 }}>
                {user?.username}
              </p>
              <p style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                Administrator
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: '8px 18px',
              background: '#fef2f2',
              color: '#dc2626',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
            onMouseLeave={e => e.currentTarget.style.background = '#fef2f2'}
          >
            Sign Out
          </button>
        </div>
      </div>

      <p style={{ color: '#888', marginBottom: '40px' }}>
        Review and approve provider service listings.
      </p>

      {message && (
        <div style={{
          background: '#f0fdf4', border: '1px solid #bbf7d0',
          color: '#16a34a', padding: '12px', borderRadius: '8px',
          marginBottom: '24px', fontSize: '14px'
        }}>
          {message}
        </div>
      )}

      <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
        Pending Approvals
        <span style={{
          marginLeft: '10px', background: '#fef3c7',
          color: '#d97706', fontSize: '13px',
          padding: '2px 10px', borderRadius: '999px'
        }}>
          {pending.length}
        </span>
      </h2>

      {pending.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#aaa' }}>
          <p style={{ fontSize: '40px', marginBottom: '12px' }}>🎉</p>
          <p>No pending services. All caught up!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {pending.map(s => (
            <div key={s.id} style={{
              background: '#fff', border: '1px solid #e8e6e0',
              borderRadius: '16px', padding: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '4px' }}>
                    {s.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#888' }}>
                    By: <strong>{s.provider_name}</strong> · {s.category} · {s.location} · {s.price}
                  </p>
                  <p style={{ fontSize: '14px', color: '#555', marginTop: '8px' }}>
                    {s.description}
                  </p>
                  <p style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
                    📞 {s.phone}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <button
                    onClick={() => handleAction(s.id, 'approved')}
                    style={{
                      padding: '10px 20px', background: '#1a6b4a',
                      color: '#fff', border: 'none', borderRadius: '10px',
                      fontSize: '14px', fontWeight: '700', cursor: 'pointer'
                    }}
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => handleAction(s.id, 'rejected')}
                    style={{
                      padding: '10px 20px', background: '#dc2626',
                      color: '#fff', border: 'none', borderRadius: '10px',
                      fontSize: '14px', fontWeight: '700', cursor: 'pointer'
                    }}
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}