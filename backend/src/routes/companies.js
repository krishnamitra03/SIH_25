const { body, validationResult } = require('express-validator');
const {
  getCompanies,
  getCompanyById,
  updateCompanyProfile,
  getCompanyStats,
  verifyCompany
} = require('../controllers/companyController');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');

// Validation rules
const companyUpdateValidation = [
  body('companyName').optional().notEmpty().trim().withMessage('Company name cannot be empty'),
  body('contactPerson').optional().notEmpty().trim().withMessage('Contact person cannot be empty'),
  body('phone').optional().isMobilePhone('en-IN').withMessage('Valid phone number is required'),
  body('website').optional().isURL().withMessage('Valid website URL is required'),
  body('description').optional().isLength({ max: 1000 }).withMessage('Description too long')
];

// Routes
const express = require('express');
const router = express.Router();

// @route   GET /api/companies
// @desc    Get all companies
// @access  Private (Admin, Student)
router.get('/', auth, roles('admin', 'student'), getCompanies);

// @route   GET /api/companies/:id
// @desc    Get single company
// @access  Private (Admin, Student)
router.get('/:id', auth, roles('admin', 'student'), getCompanyById);

// @route   PUT /api/companies/profile
// @desc    Update company profile
// @access  Private (Company)
router.put('/profile', auth, roles('company'), companyUpdateValidation, updateCompanyProfile);

// @route   GET /api/companies/stats/my-stats
// @desc    Get company statistics
// @access  Private (Company)
router.get('/stats/my-stats', auth, roles('company'), getCompanyStats);

// @route   PUT /api/companies/:id/verify
// @desc    Verify company
// @access  Private (Admin)
router.put('/:id/verify', auth, roles('admin'), verifyCompany);

module.exports = router;
