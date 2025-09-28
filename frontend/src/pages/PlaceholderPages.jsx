import React from 'react'

const PlaceholderPage = ({ title, description }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-600 mb-8">{description}</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-blue-800">
            This page is under development. More features will be added soon!
          </p>
        </div>
      </div>
    </div>
  )
}

// Student Pages
export const StudentProfile = () => (
  <PlaceholderPage 
    title="Student Profile" 
    description="Manage your profile information, skills, and preferences" 
  />
)

export const JobList = () => (
  <PlaceholderPage 
    title="Browse Jobs" 
    description="Discover internship and job opportunities" 
  />
)

export const JobDetails = () => (
  <PlaceholderPage 
    title="Job Details" 
    description="View detailed job information and apply" 
  />
)

export const MyApplications = () => (
  <PlaceholderPage 
    title="My Applications" 
    description="Track your job applications and their status" 
  />
)

// Company Pages
export const CompanyProfile = () => (
  <PlaceholderPage 
    title="Company Profile" 
    description="Manage your company information and branding" 
  />
)

export const PostJob = () => (
  <PlaceholderPage 
    title="Post New Job" 
    description="Create and publish new job opportunities" 
  />
)

export const MyJobs = () => (
  <PlaceholderPage 
    title="My Jobs" 
    description="Manage your posted jobs and applications" 
  />
)

export const JobApplications = () => (
  <PlaceholderPage 
    title="Job Applications" 
    description="Review and manage applications for your jobs" 
  />
)

// Admin Pages
export const AdminUsers = () => (
  <PlaceholderPage 
    title="User Management" 
    description="Manage users, verify companies, and handle accounts" 
  />
)

export const AdminAnalytics = () => (
  <PlaceholderPage 
    title="Analytics Dashboard" 
    description="View placement statistics and trends" 
  />
)
