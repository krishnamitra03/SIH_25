const { body, validationResult } = require('express-validator');
const {
  getStudents,
  getStudentById,
  updateStudentProfile,
  getStudentStats
} = require('../controllers/studentController');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');

// Validation rules
const studentUpdateValidation = [
  body('firstName').optional().notEmpty().trim().withMessage('First name cannot be empty'),
  body('lastName').optional().notEmpty().trim().withMessage('Last name cannot be empty'),
  body('phone').optional().isMobilePhone('en-IN').withMessage('Valid phone number is required'),
  body('cgpa').optional().isFloat({ min: 0, max: 10 }).withMessage('CGPA must be between 0 and 10'),
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio too long'),
  body('linkedin').optional().isURL().withMessage('Valid LinkedIn URL is required'),
  body('github').optional().isURL().withMessage('Valid GitHub URL is required')
];

// Routes
const express = require('express');
const router = express.Router();

// @route   GET /api/students
// @desc    Get all students
// @access  Private (Admin, Company)
router.get('/', auth, roles('admin', 'company'), getStudents);

// @route   GET /api/students/:id
// @desc    Get single student
// @access  Private (Admin, Company)
router.get('/:id', auth, roles('admin', 'company'), getStudentById);

// @route   PUT /api/students/profile
// @desc    Update student profile
// @access  Private (Student)
router.put('/profile', auth, roles('student'), studentUpdateValidation, updateStudentProfile);

// @route   GET /api/students/stats/my-stats
// @desc    Get student statistics
// @access  Private (Student)
router.get('/stats/my-stats', auth, roles('student'), getStudentStats);

module.exports = router;
