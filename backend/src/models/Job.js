const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  type: {
    type: String,
    enum: ['Internship', 'Full-time', 'Part-time', 'Contract'],
    required: true
  },
  duration: {
    type: String, // e.g., "3 months", "6 months", "1 year"
    required: true
  },
  stipend: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  location: {
    type: String,
    required: true
  },
  workMode: {
    type: String,
    enum: ['On-site', 'Remote', 'Hybrid'],
    required: true
  },
  requiredSkills: [{
    type: String,
    trim: true
  }],
  preferredSkills: [{
    type: String,
    trim: true
  }],
  eligibility: {
    departments: [{
      type: String,
      enum: ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'Chemical', 'All']
    }],
    year: [{
      type: String,
      enum: ['First Year', 'Second Year', 'Third Year', 'Final Year']
    }],
    minCGPA: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    }
  },
  applicationDeadline: {
    type: Date,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  maxApplications: {
    type: Number,
    default: 100
  },
  currentApplications: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Active', 'Paused', 'Closed', 'Completed'],
    default: 'Active'
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }],
  isPlacementOpportunity: {
    type: Boolean,
    default: false
  },
  placementCriteria: {
    minPerformance: String,
    additionalRequirements: String
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
jobSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better search performance
jobSchema.index({ title: 'text', description: 'text', requiredSkills: 'text' });
jobSchema.index({ status: 1, applicationDeadline: 1 });

module.exports = mongoose.models.Job ||mongoose.model('Job', jobSchema);
