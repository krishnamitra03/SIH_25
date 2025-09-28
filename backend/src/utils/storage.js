const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'resume') {
      cb(null, 'uploads/resumes/');
    } else if (file.fieldname === 'profilePicture') {
      cb(null, 'uploads/profile-pictures/');
    } else if (file.fieldname === 'logo') {
      cb(null, 'uploads/logos/');
    } else {
      cb(null, 'uploads/');
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'resume') {
    // Only allow PDF files for resumes
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed for resumes'), false);
    }
  } else if (file.fieldname === 'profilePicture' || file.fieldname === 'logo') {
    // Allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  } else {
    cb(null, true);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Middleware for different upload types
const uploadResume = upload.single('resume');
const uploadProfilePicture = upload.single('profilePicture');
const uploadLogo = upload.single('logo');
const uploadMultiple = upload.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'profilePicture', maxCount: 1 }
]);

module.exports = {
  uploadResume,
  uploadProfilePicture,
  uploadLogo,
  uploadMultiple
};
