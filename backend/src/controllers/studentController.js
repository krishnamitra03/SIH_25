const { validationResult } = require('express-validator');
const Student = require('../models/Student');
const User = require('../models/User');
const Application = require('../models/Application');

// Get all students
const getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, department, year, isPlaced } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { prn: { $regex: search, $options: 'i' } }
      ];
    }

    if (department) {
      query.department = department;
    }

    if (year) {
      query.year = year;
    }

    if (isPlaced !== undefined) {
      query.isPlaced = isPlaced === 'true';
    }

    const students = await Student.find(query)
      .populate('userId', 'email lastLogin')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Student.countDocuments(query);

    res.json({
      students,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single student
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('userId', 'email lastLogin')
      .populate('applications', 'jobId status appliedAt');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Get student by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update student profile
const updateStudentProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const student = await Student.findOne({ userId: req.user._id });
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      student._id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      student: updatedStudent
    });
  } catch (error) {
    console.error('Update student profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get student statistics
const getStudentStats = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    const totalApplications = await Application.countDocuments({ studentId: student._id });
    const pendingApplications = await Application.countDocuments({ 
      studentId: student._id, 
      status: { $in: ['Applied', 'Under Review', 'Shortlisted'] }
    });
    const selectedApplications = await Application.countDocuments({ 
      studentId: student._id, 
      status: 'Selected'
    });
    const rejectedApplications = await Application.countDocuments({ 
      studentId: student._id, 
      status: 'Rejected'
    });

    res.json({
      totalApplications,
      pendingApplications,
      selectedApplications,
      rejectedApplications,
      isPlaced: student.isPlaced
    });
  } catch (error) {
    console.error('Get student stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  updateStudentProfile,
  getStudentStats
};
