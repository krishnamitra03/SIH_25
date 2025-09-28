import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  if (!isAuthenticated) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />
          
          {/* Page Content */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout
