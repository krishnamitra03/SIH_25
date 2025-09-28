import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { 
  Users, 
  Building, 
  Briefcase,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Calendar,
  BarChart3
} from 'lucide-react'

const AdminDashboard = () => {
  const { profile } = useAuth()

  const stats = [
    {
      title: 'Total Students',
      value: '1,247',
      change: '+23 this month',
      icon: Users,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Partner Companies',
      value: '89',
      change: '+5 this month',
      icon: Building,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Active Jobs',
      value: '156',
      change: '+12 this week',
      icon: Briefcase,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Placement Rate',
      value: '87%',
      change: '+2% this year',
      icon: TrendingUp,
      color: 'text-orange-600 bg-orange-100'
    }
  ]

  const recentActivity = [
    {
      type: 'student',
      title: 'New student registered',
      details: 'John Doe - Computer Science',
      time: '2 hours ago',
      icon: Users
    },
    {
      type: 'company',
      title: 'Company verification pending',
      details: 'TechStart Solutions',
      time: '4 hours ago',
      icon: Building
    },
    {
      type: 'job',
      title: 'New job posted',
      details: 'Software Developer Intern - TechCorp',
      time: '6 hours ago',
      icon: Briefcase
    },
    {
      type: 'placement',
      title: 'Student placed',
      details: 'Jane Smith - GlobalTech Industries',
      time: '1 day ago',
      icon: CheckCircle
    }
  ]

  const pendingTasks = [
    {
      title: 'Company Verifications',
      count: 12,
      priority: 'high',
      icon: Building
    },
    {
      title: 'User Account Issues',
      count: 3,
      priority: 'medium',
      icon: Users
    },
    {
      title: 'Job Moderation',
      count: 8,
      priority: 'low',
      icon: Briefcase
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, Admin!
        </h1>
        <p className="text-purple-100">
          Here's an overview of your placement portal
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <Icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">Pending Tasks</h2>
          </div>
          <div className="space-y-4">
            {pendingTasks.map((task, index) => {
              const Icon = task.icon
              const priorityColor = task.priority === 'high' ? 'text-red-600 bg-red-100' : 
                                   task.priority === 'medium' ? 'text-yellow-600 bg-yellow-100' : 
                                   'text-green-600 bg-green-100'
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${priorityColor}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{task.title}</p>
                      <p className="text-xs text-gray-500">{task.count} pending</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">Placement Trends</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">This Month</span>
              <span className="text-lg font-semibold text-green-600">+15%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">This Quarter</span>
              <span className="text-lg font-semibold text-blue-600">+8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">This Year</span>
              <span className="text-lg font-semibold text-purple-600">+12%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">System Health</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Server Status</span>
              <span className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Users</span>
              <span className="text-lg font-semibold text-gray-900">234</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
