import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import apiClient from '../api/client'

const AuthContext = createContext(null)

const AUTH_STORAGE_KEY = 'scscore_auth'

function getInitialUser() {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Failed to restore auth session:', e)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }
  return null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser)
  const [loading] = useState(false)

  // Listen for unauthorized 401 events dispatched from apiClient
  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null)
    }
    window.addEventListener('scscore:unauthorized', handleUnauthorized)
    return () => {
      window.removeEventListener('scscore:unauthorized', handleUnauthorized)
    }
  }, [])

  const setAuthSession = useCallback((rawUserData) => {
    if (rawUserData) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(rawUserData))
      setUser(rawUserData)
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      setUser(null)
    }
  }, [])

  const login = useCallback(async (role, emailOrPhone, password) => {
    const response = await apiClient.post('/auth/login', {
      email_or_phone: emailOrPhone,
      password,
      role,
    })

    const rawUser = response.data
    // Raw user expected shape: { success, token, user_id, role, name, email }
    setAuthSession(rawUser)
    return rawUser
  }, [setAuthSession])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setUser(null)
  }, [])

  const role = user?.role || null
  const isAuthenticated = !!(user && (user.token || user.access_token))

  const value = {
    user,
    role,
    isAuthenticated,
    loading,
    login,
    logout,
    setAuthSession,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
