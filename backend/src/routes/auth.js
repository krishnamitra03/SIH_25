const { body, validationResult } = require('express-validator');
const { 
  registerStudent, 
  registerCompany, 
  login, 
  getCurrentUser, 
  changePassword 
} = require('../controllers/authController');
const auth = require('../middleware/auth');

// Validation rules
const studentValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('prn').notEmpty().withMessage('PRN is required'),
  body('firstName').notEmpty().trim().withMessage('First name is required'),
  body('lastName').notEmpty().trim().withMessage('Last name is required'),
  body('phone').isMobilePhone('en-IN').withMessage('Valid phone number is required'),
  body('department').notEmpty().withMessage('Department is required'),
  body('year').notEmpty().withMessage('Year is required')
];

const companyValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('companyName').notEmpty().trim().withMessage('Company name is required'),
  body('contactPerson').notEmpty().trim().withMessage('Contact person is required'),
  body('phone').isMobilePhone('en-IN').withMessage('Valid phone number is required'),
  body('industry').notEmpty().withMessage('Industry is required'),
  body('companySize').notEmpty().withMessage('Company size is required')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
];

// Routes
const express = require('express');
const router = express.Router();

// @route   POST /api/auth/register/student
// @desc    Register a new student
// @access  Public
router.post('/register/student', studentValidation, registerStudent);

// @route   POST /api/auth/register/company
// @desc    Register a new company
// @access  Public
router.post('/register/company', companyValidation, registerCompany);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', loginValidation, login);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, getCurrentUser);

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', auth, changePasswordValidation, changePassword);

module.exports = router;
