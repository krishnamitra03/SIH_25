const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  status: {
    type: String,
    enum: ['Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Interview Completed', 'Selected', 'Rejected', 'Withdrawn'],
    default: 'Applied'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  coverLetter: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  resume: {
    type: String, // URL to uploaded resume
    required: true
  },
  additionalDocuments: [{
    name: String,
    url: String
  }],
  interviewDetails: {
    scheduledAt: Date,
    location: String,
    mode: {
      type: String,
      enum: ['Online', 'Offline', 'Phone']
    },
    interviewer: String,
    notes: String,
    feedback: String
  },
  mentorApproval: {
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    approvedAt: Date,
    comments: String
  },
  supervisorFeedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String,
    skillsDemonstrated: [String],
    areasForImprovement: [String],
    recommendation: {
      type: String,
      enum: ['Strong Hire', 'Hire', 'No Hire', 'Not Applicable']
    },
    submittedAt: Date
  },
  offerDetails: {
    offeredAt: Date,
    stipend: Number,
    startDate: Date,
    endDate: Date,
    terms: String,
    acceptedAt: Date,
    declinedAt: Date
  },
  completionCertificate: {
    issuedAt: Date,
    certificateUrl: String,
    grade: String
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
applicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure one application per student per job
applicationSchema.index({ studentId: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.models.Application ||mongoose.model('Application', applicationSchema);
