import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function GuestDashboard(){
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f9f8f5',
            padding: '40px'
        }}>
            <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#fff',
                padding: '20px 30px',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                marginBottom: '30px'
            }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: "#1a1a1a"}}>Welcome, {user?.username || 'Guest'}</h2>
                    <p style={{ margin: '5px 0 0', color: '#777', fontSize: '14px'}}>Guest Dashboard</p>
                </div>

                <button
                onClick={handleLogout}
                style={{ 
                    padding: '10px 18px',
                    background: '#dc2626',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '600'
                }}>
                    Sign Out
                </button>
            </div>
            <div style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
            }}>
                <h3 style={{ marginBottom: '10px' }}>
                    Browse Services
                </h3>
                <p style={{ color: '#555' }}>
                    You can search and explore service providers here.
                </p>
            </div>
        </div>
    )
}