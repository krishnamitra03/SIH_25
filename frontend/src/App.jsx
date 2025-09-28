import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth.jsx'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import Layout from './components/Layout/Layout'

// Auth Components
import Login from './pages/Auth/Login'
import RegisterStudent from './pages/Auth/RegisterStudent'
import RegisterCompany from './pages/Auth/RegisterCompany'

// Student Pages
import StudentDashboard from './pages/Student/Dashboard'
import { 
  StudentProfile, 
  JobList, 
  JobDetails, 
  MyApplications 
} from './pages/PlaceholderPages'

// Company Pages
import CompanyDashboard from './pages/Company/Dashboard'
import { 
  CompanyProfile, 
  PostJob, 
  MyJobs, 
  JobApplications 
} from './pages/PlaceholderPages'

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard'
import { 
  AdminUsers, 
  AdminAnalytics 
} from './pages/PlaceholderPages'

// Public Pages
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/student" element={<RegisterStudent />} />
        <Route path="/register/company" element={<RegisterCompany />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          {/* Student Routes */}
          <Route path="student" element={<StudentDashboard />} />
          <Route path="student/profile" element={<StudentProfile />} />
          <Route path="student/jobs" element={<JobList />} />
          <Route path="student/jobs/:id" element={<JobDetails />} />
          <Route path="student/applications" element={<MyApplications />} />

          {/* Company Routes */}
          <Route path="company" element={<CompanyDashboard />} />
          <Route path="company/profile" element={<CompanyProfile />} />
          <Route path="company/post-job" element={<PostJob />} />
          <Route path="company/jobs" element={<MyJobs />} />
          <Route path="company/jobs/:id/applications" element={<JobApplications />} />

          {/* Admin Routes */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/analytics" element={<AdminAnalytics />} />
        </Route>

        {/* Redirect to home for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
