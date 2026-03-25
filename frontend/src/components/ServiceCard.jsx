export default function ServiceCard({ service }){
    return (
        <div style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            transition: 'all 0.2s',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px'
            }}>
                <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1e293b' }}>{service.name}</h3>
                <span style={{
                    background: '#f0fdf4',
                    color: '#16a3a4',
                    fontSize: '13px',
                    fontWeight: '600',
                    padding: '4px 10px',
                    borderRadius: '999px'
                }}>
                    ⭐ {service.rating}
                </span>
            </div>
            <div style={{ fontSize: '13px', color: '#63661', fontWeight: '600', marginBottom: '8px' }}>{service.category}</div>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px', lineHeight: '1.6'}}>{service.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '13px', color: '#64748b', marginBottom: '16px'}}>
                <span>📍 {service.location}</span>
                <span>💰 {service.price}</span>
                <span>💬 {service.reviews}</span>
            </div>
            <a href={`tel:${service.phone}`} style={{
                display: 'inline-block',
                background:'#6366f1',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none'
            }}>
                📞 {service.phone}
            </a>
        </div>
    )
}