const { body, validationResult } = require('express-validator');
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyForJob,
  getCompanyJobs,
  getStudentApplications
} = require('../controllers/jobController');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');

// Validation rules
const jobValidation = [
  body('title').notEmpty().trim().withMessage('Job title is required'),
  body('description').notEmpty().withMessage('Job description is required'),
  body('type').isIn(['Internship', 'Full-time', 'Part-time', 'Contract']).withMessage('Valid job type is required'),
  body('duration').notEmpty().withMessage('Duration is required'),
  body('stipend.min').isNumeric().withMessage('Minimum stipend must be a number'),
  body('stipend.max').isNumeric().withMessage('Maximum stipend must be a number'),
  body('location').notEmpty().withMessage('Location is required'),
  body('workMode').isIn(['On-site', 'Remote', 'Hybrid']).withMessage('Valid work mode is required'),
  body('applicationDeadline').isISO8601().withMessage('Valid deadline date is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required')
];

const applicationValidation = [
  body('coverLetter').optional().isLength({ max: 1000 }).withMessage('Cover letter too long'),
  body('resume').notEmpty().withMessage('Resume is required')
];

// Routes
const express = require('express');
const router = express.Router();

// @route   GET /api/jobs
// @desc    Get all jobs with filters
// @access  Public
router.get('/', getJobs);

// @route   GET /api/jobs/:id
// @desc    Get single job
// @access  Public
router.get('/:id', getJobById);

// @route   POST /api/jobs
// @desc    Create new job
// @access  Private (Company)
router.post('/', auth, roles('company'), jobValidation, createJob);

// @route   PUT /api/jobs/:id
// @desc    Update job
// @access  Private (Company)
router.put('/:id', auth, roles('company'), jobValidation, updateJob);

// @route   DELETE /api/jobs/:id
// @desc    Delete job
// @access  Private (Company)
router.delete('/:id', auth, roles('company'), deleteJob);

// @route   POST /api/jobs/:id/apply
// @desc    Apply for job
// @access  Private (Student)
router.post('/:id/apply', auth, roles('student'), applicationValidation, applyForJob);

// @route   GET /api/jobs/company/my-jobs
// @desc    Get company's jobs
// @access  Private (Company)
router.get('/company/my-jobs', auth, roles('company'), getCompanyJobs);

// @route   GET /api/jobs/student/my-applications
// @desc    Get student's applications
// @access  Private (Student)
router.get('/student/my-applications', auth, roles('student'), getStudentApplications);

module.exports = router;
