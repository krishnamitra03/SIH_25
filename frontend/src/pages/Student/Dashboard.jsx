import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { 
  Briefcase, 
  Users, 
  CheckCircle, 
  TrendingUp,
  Calendar,
  FileText,
  Building,
  GraduationCap
} from 'lucide-react'

const StudentDashboard = () => {
  const { profile } = useAuth()

  const stats = [
    {
      title: 'Total Applications',
      value: '12',
      change: '+2 this week',
      icon: FileText,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Interviews Scheduled',
      value: '3',
      change: 'Next: Tomorrow',
      icon: Calendar,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Offers Received',
      value: '1',
      change: 'Congratulations!',
      icon: CheckCircle,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Profile Views',
      value: '45',
      change: '+12 this week',
      icon: TrendingUp,
      color: 'text-orange-600 bg-orange-100'
    }
  ]

  const recentActivity = [
    {
      type: 'application',
      title: 'Applied for Software Developer Intern',
      company: 'TechCorp Solutions',
      time: '2 hours ago',
      status: 'Under Review'
    },
    {
      type: 'interview',
      title: 'Interview Scheduled',
      company: 'StartupXYZ',
      time: '1 day ago',
      status: 'Tomorrow at 2:00 PM'
    },
    {
      type: 'offer',
      title: 'Offer Received',
      company: 'GlobalTech Industries',
      time: '3 days ago',
      status: 'Pending Response'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {profile?.firstName}!
        </h1>
        <p className="text-blue-100">
          Here's what's happening with your placement journey
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === 'application' && <FileText className="h-5 w-5 text-blue-600" />}
                  {activity.type === 'interview' && <Calendar className="h-5 w-5 text-green-600" />}
                  {activity.type === 'offer' && <CheckCircle className="h-5 w-5 text-purple-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.company}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                  <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full btn-primary flex items-center justify-center">
              <Briefcase className="h-4 w-4 mr-2" />
              Browse Jobs
            </button>
            <button className="w-full btn-secondary flex items-center justify-center">
              <FileText className="h-4 w-4 mr-2" />
              View Applications
            </button>
            <button className="w-full btn-secondary flex items-center justify-center">
              <GraduationCap className="h-4 w-4 mr-2" />
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Profile Completion */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-gray-900">Profile Completion</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Profile completeness</span>
            <span className="text-sm font-medium text-gray-900">75%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <div className="text-sm text-gray-600">
            Complete your profile to get better job recommendations
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
