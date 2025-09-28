import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { 
  GraduationCap, 
  Building, 
  Users, 
  Briefcase, 
  CheckCircle, 
  ArrowRight,
  Star,
  Shield,
  Zap
} from 'lucide-react'

const Home = () => {
  const { isAuthenticated } = useAuth()

  const features = [
    {
      icon: Briefcase,
      title: 'Job Matching',
      description: 'AI-powered job recommendations based on your skills and preferences'
    },
    {
      icon: Users,
      title: 'Mentor Approval',
      description: 'Streamlined approval process with faculty mentor integration'
    },
    {
      icon: CheckCircle,
      title: 'Application Tracking',
      description: 'Real-time tracking of your application status and interview schedules'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Role-based access control ensuring data privacy and security'
    }
  ]

  const stats = [
    { number: '500+', label: 'Active Students' },
    { number: '50+', label: 'Partner Companies' },
    { number: '200+', label: 'Job Opportunities' },
    { number: '95%', label: 'Placement Rate' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Placement Portal</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-500 hover:text-gray-900">Features</a>
              <a href="#about" className="text-gray-500 hover:text-gray-900">About</a>
              <a href="#contact" className="text-gray-500 hover:text-gray-900">Contact</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn-primary">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-gray-500 hover:text-gray-900">
                    Sign In
                  </Link>
                  <Link to="/register/student" className="btn-primary">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Streamline Your
              <span className="block text-yellow-300">Placement Journey</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Connect students with opportunities, streamline applications, and track progress 
              all in one comprehensive platform designed for technical education institutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register/student" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join as Student
              </Link>
              <Link to="/register/company" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Partner with Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built specifically for technical education institutions with features that matter
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Placement Process?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of students and companies already using our platform to streamline their placement journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register/student" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
              Start as Student
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link to="/register/company" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center">
              Join as Company
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <GraduationCap className="h-6 w-6 text-blue-400" />
                <span className="ml-2 text-lg font-semibold">Placement Portal</span>
              </div>
              <p className="text-gray-400">
                Streamlining placement processes for technical education institutions.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Students</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-white">Track Applications</a></li>
                <li><a href="#" className="hover:text-white">Get Recommendations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Companies</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Post Jobs</a></li>
                <li><a href="#" className="hover:text-white">Manage Applications</a></li>
                <li><a href="#" className="hover:text-white">Find Talent</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Placement Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
