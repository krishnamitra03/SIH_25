import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { 
  Briefcase, 
  Users, 
  Eye,
  TrendingUp,
  PlusCircle,
  Building,
  Calendar,
  CheckCircle
} from 'lucide-react'

const CompanyDashboard = () => {
  const { profile } = useAuth()

  const stats = [
    {
      title: 'Active Jobs',
      value: '5',
      change: '+1 this week',
      icon: Briefcase,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Total Applications',
      value: '127',
      change: '+23 this week',
      icon: Users,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Interviews Scheduled',
      value: '8',
      change: 'Next: Today',
      icon: Calendar,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Profile Views',
      value: '89',
      change: '+15 this week',
      icon: Eye,
      color: 'text-orange-600 bg-orange-100'
    }
  ]

  const recentApplications = [
    {
      student: 'John Doe',
      position: 'Software Developer Intern',
      appliedAt: '2 hours ago',
      status: 'Under Review',
      matchScore: 85
    },
    {
      student: 'Jane Smith',
      position: 'Full Stack Developer',
      appliedAt: '4 hours ago',
      status: 'Shortlisted',
      matchScore: 92
    },
    {
      student: 'Mike Johnson',
      position: 'Data Science Intern',
      appliedAt: '1 day ago',
      status: 'Interview Scheduled',
      matchScore: 78
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {profile?.companyName}!
        </h1>
        <p className="text-green-100">
          Manage your job postings and track applications
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
        {/* Recent Applications */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
          </div>
          <div className="space-y-4">
            {recentApplications.map((application, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{application.student}</p>
                  <p className="text-sm text-gray-600">{application.position}</p>
                  <p className="text-xs text-gray-500">{application.appliedAt}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-1">
                    {application.status}
                  </span>
                  <p className="text-xs text-gray-500">{application.matchScore}% match</p>
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
              <PlusCircle className="h-4 w-4 mr-2" />
              Post New Job
            </button>
            <button className="w-full btn-secondary flex items-center justify-center">
              <Briefcase className="h-4 w-4 mr-2" />
              Manage Jobs
            </button>
            <button className="w-full btn-secondary flex items-center justify-center">
              <Building className="h-4 w-4 mr-2" />
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Job Performance */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-gray-900">Job Performance</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Software Developer Intern</h3>
              <p className="text-sm text-gray-600">Posted 2 weeks ago</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">45</p>
              <p className="text-sm text-gray-600">Applications</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Data Science Intern</h3>
              <p className="text-sm text-gray-600">Posted 1 week ago</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">32</p>
              <p className="text-sm text-gray-600">Applications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboard
