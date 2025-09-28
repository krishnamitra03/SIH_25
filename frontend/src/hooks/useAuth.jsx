import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/auth'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const response = await authAPI.getCurrentUser()
      setUser(response.data.user)
      setProfile(response.data.profile)
    } catch (error) {
      console.error('Error fetching user:', error)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials)
      const { token, user: userData, profile: profileData } = response.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      
      setUser(userData)
      setProfile(profileData)
      
      toast.success('Login successful!')
      return { success: true, user: userData }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const registerStudent = async (data) => {
    try {
      const response = await authAPI.registerStudent(data)
      const { token, user: userData, student: profileData } = response.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      
      setUser(userData)
      setProfile(profileData)
      
      toast.success('Registration successful!')
      return { success: true, user: userData }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const registerCompany = async (data) => {
    try {
      const response = await authAPI.registerCompany(data)
      const { token, user: userData, company: profileData } = response.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      
      setUser(userData)
      setProfile(profileData)
      
      toast.success('Registration successful!')
      return { success: true, user: userData }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setProfile(null)
    toast.success('Logged out successfully!')
  }

  const changePassword = async (data) => {
    try {
      await authAPI.changePassword(data)
      toast.success('Password changed successfully!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Password change failed'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const updateProfile = (profileData) => {
    setProfile(profileData)
  }

  const value = {
    user,
    profile,
    loading,
    login,
    registerStudent,
    registerCompany,
    logout,
    changePassword,
    updateProfile,
    fetchUser,
    isAuthenticated: !!user,
    isStudent: user?.role === 'student',
    isCompany: user?.role === 'company',
    isAdmin: user?.role === 'admin',
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}


