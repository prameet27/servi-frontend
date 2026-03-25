import SearchBar from '../components/SearchBar'
import CategoryGrid from '../components/CategoryGrid'

export default function Home(){
    return(
        <div style={{ minHeight: '100vh'}}>
            <div style={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                padding: '80px 24px 60px',
                textAlign: 'center',
                color: '#fff'
            }}>
                <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: '700', marginBottom: '16px', lineHeight: '1.2' }}>Find Trusted Local Services</h1>
                <p style={{ fontSize: '18px', opacity:0.85, maxWidth: '500px', margin: '0 auto' }}>
                    Connect with top-rated plumbers, elctricians, cleaners and more in your area
                </p>
                <SearchBar />
            </div>

            {/* Categories */}
            <div style={{ padding: '60px 24px', maxWidth: '1000px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
                    Browse by Category
                </h2>
                <p style={{ textAlign: 'center', color: '#64748b', fontSize: '15px' }}>
                    Pick a service category to find providers near you
                </p>
                <CategoryGrid />
            </div>
        </div>
    )
}