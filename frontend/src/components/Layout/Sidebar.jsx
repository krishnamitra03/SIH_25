import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { cn } from '../../utils/helper.js'
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  Building2,
  PlusCircle,
  Users,
  BarChart3,
  Settings,
  LogOut,
  GraduationCap,
  Building
} from 'lucide-react'

const Sidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const studentNavItems = [
    { path: '/dashboard/student', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/student/profile', label: 'Profile', icon: User },
    { path: '/dashboard/student/jobs', label: 'Browse Jobs', icon: Briefcase },
    { path: '/dashboard/student/applications', label: 'My Applications', icon: FileText },
  ]

  const companyNavItems = [
    { path: '/dashboard/company', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/company/profile', label: 'Profile', icon: Building2 },
    { path: '/dashboard/company/post-job', label: 'Post Job', icon: PlusCircle },
    { path: '/dashboard/company/jobs', label: 'My Jobs', icon: Briefcase },
  ]

  const adminNavItems = [
    { path: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/admin/users', label: 'Users', icon: Users },
    { path: '/dashboard/admin/analytics', label: 'Analytics', icon: BarChart3 },
  ]

  const getNavItems = () => {
    switch (user?.role) {
      case 'student':
        return studentNavItems
      case 'company':
        return companyNavItems
      case 'admin':
        return adminNavItems
      default:
        return []
    }
  }

  const navItems = getNavItems()

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">Placement Portal</span>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            {user?.role === 'student' ? (
              <User className="h-5 w-5 text-blue-600" />
            ) : user?.role === 'company' ? (
              <Building className="h-5 w-5 text-blue-600" />
            ) : (
              <Settings className="h-5 w-5 text-blue-600" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {user?.role === 'student' ? 'Student' : 
               user?.role === 'company' ? 'Company' : 'Admin'}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 w-full transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
