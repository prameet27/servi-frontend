import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('servifind_user')
        return saved ? JSON.parse(saved) : null
    })

    const login = (userData) => {
        const normalizedUser = {
            token: userData.token || userData.Token || '',
            username: userData.username || '',
            role: (userData.role || userData.Role || 'guest').trim().toLowerCase()
        }

        localStorage.setItem('servifind_user', JSON.stringify(normalizedUser))
        setUser(normalizedUser)

        console.log('AUTH SAVED USER:', normalizedUser)
    }

    const logout = () => {
        localStorage.removeItem('servifind_user')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)