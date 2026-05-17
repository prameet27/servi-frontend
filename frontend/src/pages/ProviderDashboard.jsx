import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function ProviderDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [myServices, setMyServices] = useState([])
  const [form, setForm] = useState({
    name: '',
    category: '',
    location: '',
    description: '',
    price: '',
    phone: ''
  })
  const [message, setMessage] = useState('')

  // =====================
  // AUTH CHECK + LOAD DATA
  // =====================
  useEffect(() => {
    if (!user || user.role !== 'provider') {
      navigate('/login')
      return
    }

    fetch('http://127.0.0.1:8000/api/services/mine/', {
      headers: {
        Authorization: `Token ${user.token}`
      }
    })
      .then(async r => {
        if (!r.ok) throw new Error(await r.text())
        return r.json()
      })
      .then(setMyServices)
      .catch(err => console.error("MY SERVICES ERROR:", err))
  }, [user, navigate])

  // =====================
  // CREATE SERVICE
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('http://127.0.0.1:8000/api/services/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${user.token}`
      },
      body: JSON.stringify(form)
    })

    const data = await res.json()

    if (res.ok) {
      setMessage('✅ Service submitted! Waiting for admin approval.')
      setMyServices(prev => [...prev, data])
      setForm({
        name: '',
        category: '',
        location: '',
        description: '',
        price: '',
        phone: ''
      })
    } else {
      setMessage('❌ Error: ' + JSON.stringify(data))
    }
  }

  // =====================
  // STYLES
  // =====================
  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1px solid #e0ddd6',
    fontSize: '14px',
    outline: 'none',
    marginTop: '6px'
  }

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '600',
    color: '#444'
  }

  const statusColor = (s) =>
    s === 'approved' ? '#16a34a' : s === 'rejected' ? '#dc2626' : '#d97706'

  const statusBg = (s) =>
    s === 'approved'
      ? '#f0fdf4'
      : s === 'rejected'
      ? '#fef2f2'
      : '#fffbea'

  // =====================
  // RENDER
  // =====================
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>

      {/* ================= HEADER ================= */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          padding: '12px 16px',
          background: '#fff',
          border: '1px solid #e8e6e0',
          borderRadius: '12px'
        }}
      >
        <div>
          <p style={{ fontWeight: '700', margin: 0 }}>
            👤 {user?.username}
          </p>
          <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>
            Role: {user?.role}
          </p>
        </div>

        <button
          onClick={() => {
            logout()
            navigate('/login')
          }}
          style={{
            padding: '8px 14px',
            background: '#dc2626',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Sign Out
        </button>
      </div>

      {/* ================= TITLE ================= */}
      <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '4px' }}>
        Provider Dashboard
      </h1>
      <p style={{ color: '#888', marginBottom: '40px' }}>
        Welcome, {user?.username}! Post your services below.
      </p>

      {/* ================= FORM ================= */}
      <div
        style={{
          background: '#fff',
          border: '1px solid #e8e6e0',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '40px'
        }}
      >
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>
          Post a New Service
        </h2>

        {message && (
          <div
            style={{
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              background: message.startsWith('✅')
                ? '#f0fdf4'
                : '#fef2f2',
              color: message.startsWith('✅') ? '#16a34a' : '#dc2626',
              border: `1px solid ${
                message.startsWith('✅') ? '#bbf7d0' : '#fecaca'
              }`
            }}
          >
            {message}
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}
        >
          {[
            { label: 'Service Name', key: 'name', placeholder: "John's Plumbing" },
            { label: 'Category', key: 'category', placeholder: 'Plumbing' },
            { label: 'Location', key: 'location', placeholder: 'Sydney, NSW' },
            { label: 'Price', key: 'price', placeholder: '$80/hr' },
            { label: 'Phone', key: 'phone', placeholder: '0412 345 678' }
          ].map(f => (
            <div key={f.key}>
              <label style={labelStyle}>{f.label}</label>
              <input
                value={form[f.key]}
                onChange={e =>
                  setForm(prev => ({ ...prev, [f.key]: e.target.value }))
                }
                placeholder={f.placeholder}
                style={inputStyle}
              />
            </div>
          ))}

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Description</label>
            <textarea
              value={form.description}
              onChange={e =>
                setForm(prev => ({ ...prev, description: e.target.value }))
              }
              placeholder="Describe your service..."
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          style={{
            marginTop: '20px',
            padding: '12px 28px',
            background: '#1a6b4a',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          Submit for Approval
        </button>
      </div>

      {/* ================= SERVICES ================= */}
      <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
        My Listings
      </h2>

      {myServices.length === 0 ? (
        <p style={{ color: '#aaa' }}>No services posted yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {myServices.map(s => (
            <div
              key={s.id}
              style={{
                background: '#fff',
                border: '1px solid #e8e6e0',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <p style={{ fontWeight: '700', fontSize: '16px' }}>
                  {s.name}
                </p>
                <p style={{ color: '#888', fontSize: '13px' }}>
                  {s.category} · {s.location} · {s.price}
                </p>
              </div>

              <span
                style={{
                  background: statusBg(s.status),
                  color: statusColor(s.status),
                  padding: '4px 14px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}