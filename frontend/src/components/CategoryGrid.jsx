import { useNavigate } from 'react-router-dom'

const categories = [
    { label: 'Plumbing', icon:'🔧' },
    { label: 'Electrical', icon: '⚡' },
    { label: 'Cleaning', icon: '🧹' },
    { label: 'Gardening', icon: '🌿' },
    { label: 'Painting', icon: '🎨' },
    { label: 'Mechanic', icon: '🚗' },
]

export default function CategoryGrid(){
    const navigate = useNavigate()

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '16px',
            marginTop: '48px',
            maxWidth: '900px',
            margin: '48px auto 0',
        }}>
            {categories.map(cat => (
                <div 
                    key={cat.label}
                    onClick={() => navigate(`/results?category=${cat.label}`)}
                    style={{
                        background: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '16px',
                        padding: '24px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.borderColor = '#6366f1'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.15)'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.borderColor = '#e2e8f0'
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'
                    }}
                >
                    <div style={{ fontSize: '32px', marginBottom: '10px'}}>{cat.icon}</div>
                    <div style={{ fontWeight: '600', fontSize: '14px', color: '#1e293b'}}>{cat.label}</div>
                </div>
            ))}
        </div>
    )
}