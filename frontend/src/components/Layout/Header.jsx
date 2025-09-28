import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Bell, Search } from 'lucide-react'

const Header = () => {
  const { user, profile } = useAuth()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const getUserName = () => {
    if (user?.role === 'student' && profile) {
      return `${profile.firstName} ${profile.lastName}`
    }
    if (user?.role === 'company' && profile) {
      return profile.companyName
    }
    return 'Admin'
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {getGreeting()}, {getUserName()}!
          </h1>
          <p className="text-sm text-gray-600">
            Welcome to your {user?.role} dashboard
          </p>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Avatar */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">
                {getUserName().charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{getUserName()}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
