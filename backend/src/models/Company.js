const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  contactPerson: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  website: {
    type: String,
    default: ''
  },
  industry: {
    type: String,
    required: true,
    trim: true
  },
  companySize: {
    type: String,
    enum: ['Startup (1-10)', 'Small (11-50)', 'Medium (51-200)', 'Large (201-1000)', 'Enterprise (1000+)'],
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  description: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  logo: {
    type: String, // URL to company logo
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedAt: {
    type: Date
  },
  jobsPosted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
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
companySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.models.Company ||mongoose.model('Company', companySchema);
