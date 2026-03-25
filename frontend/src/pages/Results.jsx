import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'

export default function Results(){
    const [services, setServices] = useState([])
    const [filtered, setFiltered] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [location, setLocation] = useState('')
    const [sortBy, setSortBy] = useState('rating')
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() => {
        const category = searchParams.get('category') || ''
        setSearch(category)
        setLoading(true)
        fetch(`http://127.0.0.1:8000/api/services?category=${category}`)
            .then(r => r.json())
            .then(data => { setServices(data); setLoading(false) })
            .catch(() => setLoading(false))
    }, [searchParams])

    useEffect(() => {
        let results = [...services]

        if (search){
            results = results.filter(s => 
                s.name.toLowerCase().includes(search.toLowerCase()) ||
                s.category.toLowerCase().includes(search.toLowerCase()) ||
                s.description.toLowerCase().includes(search.toLowerCase())
            )
        }

        if(location){
            results = results.filter(s => 
                s.location.toLowerCase().includes(location.toLowerCase())
            )
        }

        if(sortBy === 'rating') results.sort((a,b) => b.rating - a.rating)
        if(sortBy === 'reviews') results.sort((a,b) => b.reviews - a.reviews)
        if(sortBy === 'price') results.sort((a,b) => {
            const pa = parseFloat(a.price.replace(/[^0-9.]/g, ''))
            const pb = parseFloat(b.price.replace(/[^0-9.]/g, ''))
            return pa-pb
        })

        setFiltered(results)
    }, [services, search, location, sortBy])

        /*const location = searchParams.get('location') || ''
        setLoading(true)
        /*fetch('http://127.0.0.1:8000/api/services?category=${category}§location=${location}')
            .then(r => r.json())
            .then(data => { setServices(data); setLoading(false) })
            .catch(() => setLoading(false))
    }, [searchParams]) */
    return(
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
            <button 
                onClick={() => navigate('/')}
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#6366f1',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    ← Back to Home
            </button>

            {/* Search and Filter Bar */}
            <div style={{ 
                background: '#fff', border: '1px solid #e8e6e0', borderRadius: '16px', padding: '20px 24px',
                marginBottom: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                
                <input type="text" placeholder="Search Services" value={search} onChange={e => setSearch(e.target.value)} style={{ flex:1, minWidth: '180px', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e0ddd6', fontSize: '14px', outline: 'none' }} />
                <input type="text" placeholder="Filter By Location" value={location} onChange={e => setLocation(e.target.value)} style={{ flex: 1, minWidth: '160px', padding: '10px 14px', borderRadius: '10px', border: '1px solid #eoddd6', fontSize: '14px', outline: 'none' }} />
                <select 
                    value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #e0ddd6', fontSize: '14px', background: '#fff', cursor: 'pointer', outline: 'none' }}>
                        <option value="rating">Sort: Top Rated</option>
                        <option value="reviews">Sort: Most Reviews</option>
                        <option value="price">Sort: Lowest Price</option>
                </select>
            </div>

            {/* Results Count */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a' }}>
                    { search || 'All' } Services 
                    { location ? ` in ${location}` : ''}
                </h2>
                <span style={{ color: '#999', fontSize: '14px' }}>
                    {loading ? 'searching...' : `${filtered.length} provider${filtered.length !== 1 ? 's' : ''} found`}
                </span>
            </div>
            {/* Cards Grid */}
            {loading ? (
                <p style={{ textAlign: 'center', color: '#aaa', marginTop: '80px', fontSize: '16px' }}>Loading Services ... </p>
            ) : filtered.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '80px'}}>
                    <p style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</p>
                    <p style={{ color: '#999', fontSize: '16px'}}>No Services Found. Try a different search or location.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                    {filtered.map(s => <ServiceCard key={s.id} service={s} />)}
                </div>
            )}
        </div>
    )
}