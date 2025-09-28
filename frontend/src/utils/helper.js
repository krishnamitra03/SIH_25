import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const getStatusColor = (status) => {
  const statusColors = {
    'Applied': 'bg-blue-100 text-blue-800',
    'Under Review': 'bg-yellow-100 text-yellow-800',
    'Shortlisted': 'bg-purple-100 text-purple-800',
    'Interview Scheduled': 'bg-indigo-100 text-indigo-800',
    'Interview Completed': 'bg-orange-100 text-orange-800',
    'Selected': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
    'Withdrawn': 'bg-gray-100 text-gray-800',
    'Active': 'bg-green-100 text-green-800',
    'Paused': 'bg-yellow-100 text-yellow-800',
    'Closed': 'bg-red-100 text-red-800',
    'Completed': 'bg-blue-100 text-blue-800',
  }
  return statusColors[status] || 'bg-gray-100 text-gray-800'
}

export const getJobTypeColor = (type) => {
  const typeColors = {
    'Internship': 'bg-blue-100 text-blue-800',
    'Full-time': 'bg-green-100 text-green-800',
    'Part-time': 'bg-yellow-100 text-yellow-800',
    'Contract': 'bg-purple-100 text-purple-800',
  }
  return typeColors[type] || 'bg-gray-100 text-gray-800'
}

export const getWorkModeColor = (mode) => {
  const modeColors = {
    'On-site': 'bg-red-100 text-red-800',
    'Remote': 'bg-green-100 text-green-800',
    'Hybrid': 'bg-blue-100 text-blue-800',
  }
  return modeColors[mode] || 'bg-gray-100 text-gray-800'
}

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePhone = (phone) => {
  const re = /^[6-9]\d{9}$/
  return re.test(phone)
}

export const validatePRN = (prn) => {
  const re = /^[A-Z0-9]{6,12}$/
  return re.test(prn.toUpperCase())
}
