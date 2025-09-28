const { body, validationResult } = require('express-validator');
const {
  getDashboardStats,
  getAllUsers,
  updateUserStatus,
  getPlacementAnalytics
} = require('../controllers/adminController');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');

// Validation rules
const userStatusValidation = [
  body('isActive').isBoolean().withMessage('isActive must be a boolean value')
];

// Routes
const express = require('express');
const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard statistics
// @access  Private (Admin)
router.get('/dashboard', auth, roles('admin'), getDashboardStats);

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin)
router.get('/users', auth, roles('admin'), getAllUsers);

// @route   PUT /api/admin/users/:id/status
// @desc    Update user status
// @access  Private (Admin)
router.put('/users/:id/status', auth, roles('admin'), userStatusValidation, updateUserStatus);

// @route   GET /api/admin/analytics/placement
// @desc    Get placement analytics
// @access  Private (Admin)
router.get('/analytics/placement', auth, roles('admin'), getPlacementAnalytics);

module.exports = router;
