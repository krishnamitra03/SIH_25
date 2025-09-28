const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  prn: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true,
    enum: ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'Chemical', 'Other']
  },
  year: {
    type: String,
    required: true,
    enum: ['First Year', 'Second Year', 'Third Year', 'Final Year']
  },
  cgpa: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  skills: [{
    type: String,
    trim: true
  }],
  resume: {
    type: String, // URL to resume file
    default: ''
  },
  profilePicture: {
    type: String, // URL to profile picture
    default: ''
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  linkedin: {
    type: String,
    default: ''
  },
  github: {
    type: String,
    default: ''
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }],
  isPlaced: {
    type: Boolean,
    default: false
  },
  placedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
studentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.models.Student || mongoose.model('Student', studentSchema);
