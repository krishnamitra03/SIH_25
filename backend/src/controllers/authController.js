const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Student = require('../models/Student');
const Company = require('../models/Company');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '7d'
  });
};

// Register Student
const registerStudent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, prn, firstName, lastName, phone, department, year } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Check if PRN already exists
    const existingStudent = await Student.findOne({ prn });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists with this PRN' });
    }

    // Create user
    const user = new User({
      email,
      password,
      role: 'student'
    });

    await user.save();

    // Create student profile
    const student = new Student({
      userId: user._id,
      prn,
      firstName,
      lastName,
      phone,
      department,
      year
    });

    await student.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Student registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      student: {
        prn: student.prn,
        firstName: student.firstName,
        lastName: student.lastName,
        department: student.department,
        year: student.year
      }
    });
  } catch (error) {
    console.error('Student registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Register Company
const registerCompany = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      email, 
      password, 
      companyName, 
      contactPerson, 
      phone, 
      industry, 
      companySize 
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create user
    const user = new User({
      email,
      password,
      role: 'company'
    });

    await user.save();

    // Create company profile
    const company = new Company({
      userId: user._id,
      companyName,
      contactPerson,
      phone,
      industry,
      companySize
    });

    await company.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Company registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      company: {
        companyName: company.companyName,
        contactPerson: company.contactPerson,
        industry: company.industry,
        companySize: company.companySize
      }
    });
  } catch (error) {
    console.error('Company registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(400).json({ message: 'Account is deactivated' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    // Get additional profile data based on role
    let profileData = {};
    if (user.role === 'student') {
      const student = await Student.findOne({ userId: user._id });
      profileData = student;
    } else if (user.role === 'company') {
      const company = await Company.findOne({ userId: user._id });
      profileData = company;
    }

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin
      },
      profile: profileData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Get current user
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    let profileData = {};
    if (user.role === 'student') {
      profileData = await Student.findOne({ userId: user._id });
    } else if (user.role === 'company') {
      profileData = await Company.findOne({ userId: user._id });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin
      },
      profile: profileData
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerStudent,
  registerCompany,
  login,
  getCurrentUser,
  changePassword
};
