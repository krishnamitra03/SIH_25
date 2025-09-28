import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, ArrowLeft } from 'lucide-react'

const About = () => {
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
            
            <Link to="/" className="flex items-center text-gray-500 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Placement Portal</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                Placement Portal is designed to revolutionize the internship and placement process 
                for technical education institutions. We believe that the journey from "looking 
                for an internship" to "signing a placement offer" should be seamless, transparent, 
                and efficient for all stakeholders.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">The Problem We Solve</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Traditional placement processes are fragmented and inefficient:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Notices scattered across WhatsApp groups</li>
                <li>Resumes traveling by email with no tracking</li>
                <li>Multiple office visits for approvals</li>
                <li>Students missing deadlines</li>
                <li>Mentors losing track of applications</li>
                <li>Placement cells drowning in manual spreadsheets</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                This leads to wasted effort, missed opportunities, and inefficient resource utilization.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Solution</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Placement Portal provides a comprehensive, role-based platform that:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Centralizes all placement activities in one platform</li>
                <li>Automates job matching and recommendations</li>
                <li>Streamlines mentor approvals and interview scheduling</li>
                <li>Provides real-time tracking and analytics</li>
                <li>Ensures data privacy and security</li>
                <li>Works within existing institutional infrastructure</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">For Students</h3>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>• Digital profile management</li>
                    <li>• AI-powered job recommendations</li>
                    <li>• One-click application process</li>
                    <li>• Real-time application tracking</li>
                    <li>• Interview calendar integration</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">For Companies</h3>
                  <ul className="text-green-800 space-y-1 text-sm">
                    <li>• Easy job posting and management</li>
                    <li>• Automated candidate matching</li>
                    <li>• Application review and shortlisting</li>
                    <li>• Interview scheduling tools</li>
                    <li>• Feedback and evaluation system</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">For Placement Cell</h3>
                  <ul className="text-purple-800 space-y-1 text-sm">
                    <li>• Comprehensive dashboard and analytics</li>
                    <li>• User management and verification</li>
                    <li>• Placement statistics and trends</li>
                    <li>• Automated reporting</li>
                    <li>• System administration tools</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-2">For Faculty Mentors</h3>
                  <ul className="text-orange-800 space-y-1 text-sm">
                    <li>• Streamlined approval workflow</li>
                    <li>• Student progress monitoring</li>
                    <li>• Automated notifications</li>
                    <li>• Feedback submission tools</li>
                    <li>• Academic calendar integration</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technology Stack</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Built with modern, scalable technologies:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800">Frontend</h4>
                  <p className="text-sm text-gray-600">React, Vite, Tailwind CSS</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800">Backend</h4>
                  <p className="text-sm text-gray-600">Node.js, Express.js</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800">Database</h4>
                  <p className="text-sm text-gray-600">MongoDB</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get Started</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Ready to transform your placement process? Join our platform today and experience 
                the difference a streamlined, data-driven approach can make.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register/student" className="btn-primary text-center">
                  Register as Student
                </Link>
                <Link to="/register/company" className="btn-secondary text-center">
                  Register as Company
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default About
