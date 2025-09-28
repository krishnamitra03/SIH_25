const { validationResult } = require('express-validator');
const Job = require('../models/Job');
const Company = require('../models/Company');
const Application = require('../models/Application');
const Student = require('../models/Student');

// Get all jobs with filters
const getJobs = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      type, 
      department, 
      year, 
      minStipend,
      maxStipend,
      location,
      workMode,
      status = 'Active'
    } = req.query;

    const query = { status };

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { requiredSkills: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Filter by job type
    if (type) {
      query.type = type;
    }

    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Filter by work mode
    if (workMode) {
      query.workMode = workMode;
    }

    // Filter by stipend range
    if (minStipend || maxStipend) {
      query['stipend.min'] = {};
      if (minStipend) query['stipend.min'].$gte = parseInt(minStipend);
      if (maxStipend) query['stipend.min'].$lte = parseInt(maxStipend);
    }

    // Filter by eligibility
    if (department) {
      query.$or = [
        { 'eligibility.departments': department },
        { 'eligibility.departments': 'All' }
      ];
    }

    if (year) {
      query.$or = [
        { 'eligibility.year': year },
        { 'eligibility.year': { $exists: false } }
      ];
    }

    const jobs = await Job.find(query)
      .populate('companyId', 'companyName industry companySize logo')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Job.countDocuments(query);

    res.json({
      jobs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single job
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('companyId', 'companyName industry companySize logo website description')
      .populate('applications', 'studentId status appliedAt');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error('Get job by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create job (Company only)
const createJob = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const company = await Company.findOne({ userId: req.user._id });
    if (!company) {
      return res.status(404).json({ message: 'Company profile not found' });
    }

    const jobData = {
      ...req.body,
      companyId: company._id
    };

    const job = new Job(jobData);
    await job.save();

    // Add job to company's jobs list
    company.jobsPosted.push(job._id);
    await company.save();

    res.status(201).json({
      message: 'Job created successfully',
      job
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update job (Company only)
const updateJob = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const company = await Company.findOne({ userId: req.user._id });
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.companyId.toString() !== company._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Job updated successfully',
      job: updatedJob
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete job (Company only)
const deleteJob = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.companyId.toString() !== company._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);

    // Remove job from company's jobs list
    company.jobsPosted = company.jobsPosted.filter(
      jobId => jobId.toString() !== req.params.id
    );
    await company.save();

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Apply for job (Student only)
const applyForJob = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const student = await Student.findOne({ userId: req.user._id });
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if job is still active
    if (job.status !== 'Active') {
      return res.status(400).json({ message: 'Job is not available for applications' });
    }

    // Check if application deadline has passed
    if (new Date() > job.applicationDeadline) {
      return res.status(400).json({ message: 'Application deadline has passed' });
    }

    // Check if max applications reached
    if (job.currentApplications >= job.maxApplications) {
      return res.status(400).json({ message: 'Maximum applications reached for this job' });
    }

    // Check if student already applied
    const existingApplication = await Application.findOne({
      studentId: student._id,
      jobId: job._id
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Check if student is placed
    if (student.isPlaced) {
      return res.status(400).json({ message: 'You are already placed' });
    }

    const applicationData = {
      studentId: student._id,
      jobId: job._id,
      coverLetter: req.body.coverLetter || '',
      resume: req.body.resume || student.resume
    };

    const application = new Application(applicationData);
    await application.save();

    // Update job application count
    job.currentApplications += 1;
    job.applications.push(application._id);
    await job.save();

    // Add application to student's applications
    student.applications.push(application._id);
    await student.save();

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Apply for job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get company's jobs
const getCompanyJobs = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) {
      return res.status(404).json({ message: 'Company profile not found' });
    }

    const jobs = await Job.find({ companyId: company._id })
      .populate('applications', 'studentId status appliedAt')
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error('Get company jobs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get student's applications
const getStudentApplications = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    const applications = await Application.find({ studentId: student._id })
      .populate('jobId', 'title type duration stipend location companyId')
      .populate({
        path: 'jobId',
        populate: {
          path: 'companyId',
          select: 'companyName industry logo'
        }
      })
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Get student applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyForJob,
  getCompanyJobs,
  getStudentApplications
};
