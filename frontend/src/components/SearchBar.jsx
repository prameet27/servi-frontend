import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const quickTags = ['Plumber', 'Electrician', 'House Cleaning', 'Grocery Delivery']

export default function SearchBar(){
    const [query, setQuery] = useState('')
    
    const [keyword, setKeyword] = useState('')
    const [location, setLocation] = useState('')
    const navigate = useNavigate()

    const handleSearch = () => {
        navigate(`/results?category=${keyword}&location=${location}`)
    }

    return (
        <div style= {{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'Center',
            marginTop: '32px'
        }}>
            <input type="text" placeholder="What service? (e.g. Plumbing)" value={keyword} onChange={e => setKeyword(e.target.value)} style={{
                padding: '14px 18px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                fontSize: '15px',
                width: '220px',
                outline: 'none',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)'
            }} />
            <button onClick={handleSearch} style={{ padding: '14px 28px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>Search</button>
        </div>
    )
}