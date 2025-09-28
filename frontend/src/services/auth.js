import api from './api'

// Auth API
export const authAPI = {
  // Login
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Register Student
  registerStudent: (data) => api.post('/auth/register/student', data),
  
  // Register Company
  registerCompany: (data) => api.post('/auth/register/company', data),
  
  // Get current user
  getCurrentUser: () => api.get('/auth/me'),
  
  // Change password
  changePassword: (data) => api.put('/auth/change-password', data),
}

// Jobs API
export const jobsAPI = {
  // Get all jobs
  getJobs: (params) => api.get('/jobs', { params }),
  
  // Get single job
  getJobById: (id) => api.get(`/jobs/${id}`),
  
  // Create job (Company)
  createJob: (data) => api.post('/jobs', data),
  
  // Update job (Company)
  updateJob: (id, data) => api.put(`/jobs/${id}`, data),
  
  // Delete job (Company)
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  
  // Apply for job (Student)
  applyForJob: (id, data) => api.post(`/jobs/${id}/apply`, data),
  
  // Get company's jobs
  getCompanyJobs: () => api.get('/jobs/company/my-jobs'),
  
  // Get student's applications
  getStudentApplications: () => api.get('/jobs/student/my-applications'),
}

// Students API
export const studentsAPI = {
  // Get all students (Admin/Company)
  getStudents: (params) => api.get('/students', { params }),
  
  // Get single student
  getStudentById: (id) => api.get(`/students/${id}`),
  
  // Update student profile
  updateProfile: (data) => api.put('/students/profile', data),
  
  // Get student statistics
  getStats: () => api.get('/students/stats/my-stats'),
}

// Companies API
export const companiesAPI = {
  // Get all companies
  getCompanies: (params) => api.get('/companies', { params }),
  
  // Get single company
  getCompanyById: (id) => api.get(`/companies/${id}`),
  
  // Update company profile
  updateProfile: (data) => api.put('/companies/profile', data),
  
  // Get company statistics
  getStats: () => api.get('/companies/stats/my-stats'),
  
  // Verify company (Admin)
  verifyCompany: (id) => api.put(`/companies/${id}/verify`),
}

// Admin API
export const adminAPI = {
  // Get dashboard statistics
  getDashboardStats: () => api.get('/admin/dashboard'),
  
  // Get all users
  getAllUsers: (params) => api.get('/admin/users', { params }),
  
  // Update user status
  updateUserStatus: (id, data) => api.put(`/admin/users/${id}/status`, data),
  
  // Get placement analytics
  getPlacementAnalytics: (params) => api.get('/admin/analytics/placement', { params }),
}
