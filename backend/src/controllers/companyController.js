const { validationResult } = require('express-validator');
const Company = require('../models/Company');
const User = require('../models/User');
const Job = require('../models/Job');

// Get all companies
const getCompanies = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, industry, companySize, isVerified } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { industry: { $regex: search, $options: 'i' } }
      ];
    }

    if (industry) {
      query.industry = industry;
    }

    if (companySize) {
      query.companySize = companySize;
    }

    if (isVerified !== undefined) {
      query.isVerified = isVerified === 'true';
    }

    const companies = await Company.find(query)
      .populate('userId', 'email lastLogin')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Company.countDocuments(query);

    res.json({
      companies,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get companies error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single company
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
      .populate('userId', 'email lastLogin')
      .populate('jobsPosted', 'title type status applicationDeadline');

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    console.error('Get company by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update company profile
const updateCompanyProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const company = await Company.findOne({ userId: req.user._id });
    if (!company) {
      return res.status(404).json({ message: 'Company profile not found' });
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      company._id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      company: updatedCompany
    });
  } catch (error) {
    console.error('Update company profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get company statistics
const getCompanyStats = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) {
      return res.status(404).json({ message: 'Company profile not found' });
    }

    const totalJobs = await Job.countDocuments({ companyId: company._id });
    const activeJobs = await Job.countDocuments({ 
      companyId: company._id, 
      status: 'Active' 
    });
    const totalApplications = await Job.aggregate([
      { $match: { companyId: company._id } },
      { $project: { applicationCount: { $size: '$applications' } } },
      { $group: { _id: null, total: { $sum: '$applicationCount' } } }
    ]);

    res.json({
      totalJobs,
      activeJobs,
      totalApplications: totalApplications[0]?.total || 0,
      isVerified: company.isVerified
    });
  } catch (error) {
    console.error('Get company stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify company (Admin only)
const verifyCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    company.isVerified = true;
    company.verifiedAt = new Date();
    await company.save();

    res.json({
      message: 'Company verified successfully',
      company
    });
  } catch (error) {
    console.error('Verify company error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCompanies,
  getCompanyById,
  updateCompanyProfile,
  getCompanyStats,
  verifyCompany
};
