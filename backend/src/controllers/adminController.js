const { validationResult } = require('express-validator');
const User = require('../models/User');
const Student = require('../models/Student');
const Company = require('../models/Company');
const Job = require('../models/Job');
const Application = require('../models/Application');

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const placedStudents = await Student.countDocuments({ isPlaced: true });
    const unplacedStudents = totalStudents - placedStudents;

    const totalCompanies = await Company.countDocuments();
    const verifiedCompanies = await Company.countDocuments({ isVerified: true });
    const unverifiedCompanies = totalCompanies - verifiedCompanies;

    const totalJobs = await Job.countDocuments();
    const activeJobs = await Job.countDocuments({ status: 'Active' });
    const closedJobs = await Job.countDocuments({ status: 'Closed' });

    const totalApplications = await Application.countDocuments();
    const pendingApplications = await Application.countDocuments({ 
      status: { $in: ['Applied', 'Under Review', 'Shortlisted'] }
    });
    const selectedApplications = await Application.countDocuments({ status: 'Selected' });

    // Recent activity
    const recentStudents = await Student.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('firstName lastName prn department createdAt');

    const recentCompanies = await Company.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('companyName industry contactPerson createdAt');

    const recentJobs = await Job.find()
      .populate('companyId', 'companyName')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title type companyId createdAt');

    res.json({
      students: {
        total: totalStudents,
        placed: placedStudents,
        unplaced: unplacedStudents,
        placementRate: totalStudents > 0 ? ((placedStudents / totalStudents) * 100).toFixed(2) : 0
      },
      companies: {
        total: totalCompanies,
        verified: verifiedCompanies,
        unverified: unverifiedCompanies
      },
      jobs: {
        total: totalJobs,
        active: activeJobs,
        closed: closedJobs
      },
      applications: {
        total: totalApplications,
        pending: pendingApplications,
        selected: selectedApplications
      },
      recentActivity: {
        students: recentStudents,
        companies: recentCompanies,
        jobs: recentJobs
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, isActive } = req.query;

    const query = {};

    if (role) {
      query.role = role;
    }

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user status
const updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isActive = isActive;
    await user.save();

    res.json({
      message: 'User status updated successfully',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get placement analytics
const getPlacementAnalytics = async (req, res) => {
  try {
    const { year, department } = req.query;

    const matchQuery = {};
    if (year) matchQuery.year = year;
    if (department) matchQuery.department = department;

    // Department-wise placement statistics
    const departmentStats = await Student.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$department',
          total: { $sum: 1 },
          placed: { $sum: { $cond: ['$isPlaced', 1, 0] } }
        }
      },
      {
        $project: {
          department: '$_id',
          total: 1,
          placed: 1,
          placementRate: { $multiply: [{ $divide: ['$placed', '$total'] }, 100] }
        }
      }
    ]);

    // Year-wise placement statistics
    const yearStats = await Student.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$year',
          total: { $sum: 1 },
          placed: { $sum: { $cond: ['$isPlaced', 1, 0] } }
        }
      },
      {
        $project: {
          year: '$_id',
          total: 1,
          placed: 1,
          placementRate: { $multiply: [{ $divide: ['$placed', '$total'] }, 100] }
        }
      }
    ]);

    // Monthly placement trends
    const monthlyTrends = await Student.aggregate([
      { $match: { isPlaced: true, placedAt: { $exists: true } } },
      {
        $group: {
          _id: {
            year: { $year: '$placedAt' },
            month: { $month: '$placedAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      departmentStats,
      yearStats,
      monthlyTrends
    });
  } catch (error) {
    console.error('Get placement analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  updateUserStatus,
  getPlacementAnalytics
};
